import { fetchConvWithRetry } from './conversations';
import { Cred } from './cred';
import { loadState, updateConversationState, updateWorkspaceCheckTime, updateGizmoCheckTime, saveState } from './autoSaveState';
import { getRootHandle, verifyPermission, ensureFolder, writeFile, readFile, fileExists } from './fileSystem';
import { collectFileCandidates } from './files';
import { Conversation, ConversationMetadata, AssetLedgerEntry } from './types';
import { Logger } from './logger';
import { autoSaveStore, AutoSaveState } from './state/autoSaveStore';
import { runExclusiveStateOp, tryAcquireLeader } from './mutex';
import { generateHTML } from './htmlGenerator';
import { buildConversationInventory } from './inventory';
import { downloadCandidateWithLedger } from './assetLedger';
import { buildScanReport, saveScanReport } from './validation';
import { globalRateLimiter } from './utils';

// Re-export file system helpers for UI
export { pickAndSaveRootHandle, getRootHandle } from './fileSystem';

export interface AutoSaveStatus {
    lastRun: number;
    state: AutoSaveState;
    message: string;
}

/**
 * Saves a single conversation to disk.
 * MUST be called within a lock (runExclusiveStateOp).
 * 
 * Structure: UserFolder / WorkspaceFolder / CategoryFolder / ConversationID
 */
async function saveConversationToDisk(
    userFolder: FileSystemDirectoryHandle,
    conv: Conversation,
    workspaceName: string,
    categoryName: string,
    runAssetLedger?: AssetLedgerEntry[]
): Promise<{ total: number; saved: number; failed: number }> {
    const id = conv.conversation_id;

    // 1. Ensure Workspace Folder (Personal or WorkspaceID)
    const wsFolder = await ensureFolder(userFolder, workspaceName);

    // 2. Ensure Category Folder (ProjectID or 'conversations')
    const catFolder = await ensureFolder(wsFolder, categoryName);

    // 3. Ensure Conversation Folder
    const folderName = await resolveConversationFolderName(catFolder, id);
    const convFolder = await ensureFolder(catFolder, folderName);

    // 1. Save conversation.json
    await writeFile(convFolder, 'conversation.json', JSON.stringify(conv, null, 2));

    // 2. Save metadata.json
    const meta: ConversationMetadata = {
        id: conv.conversation_id,
        title: conv.title,
        create_time: conv.create_time,
        update_time: conv.update_time,
        model_slug: conv.default_model_slug,
        attachments: [],
        failed_attachments: [],
        asset_ledger: [],
    };

    // 3. Save attachments with asset ledger
    const candidates = collectFileCandidates(conv);
    let savedAssets = 0;
    let failedAssets = 0;

    if (candidates.length > 0) {
        const attFolder = await ensureFolder(convFolder, 'attachments');
        for (const c of candidates) {
            const { entry, entries, savedMeta } = await downloadCandidateWithLedger(c, attFolder);
            const allEntries = entries && entries.length > 0 ? entries : [entry];
            for (const e of allEntries) {
                if (meta.asset_ledger) meta.asset_ledger.push(e);
                if (runAssetLedger) runAssetLedger.push(e);
            }

            if (savedMeta) {
                meta.attachments.push(savedMeta);
                savedAssets++;
            } else {
                meta.failed_attachments.push({
                    pointer: entry.original_ref || undefined,
                    file_id: entry.file_id || undefined,
                    library_file_id: entry.library_file_id,
                    source: entry.candidate_type,
                    candidate_type: entry.candidate_type,
                    download_method: entry.download_method,
                    error: entry.error || 'unknown',
                    http_status: entry.http_status,
                });
                failedAssets++;
            }
        }
    }

    await writeFile(convFolder, 'metadata.json', JSON.stringify(meta, null, 2));

    // 4. Save conversation.html
    try {
        const htmlContent = generateHTML(conv, meta.attachments);
        await writeFile(convFolder, 'conversation.html', htmlContent);
    } catch (e) {
        Logger.warn('AutoSave', 'Failed to generate HTML', e);
    }

    return { total: candidates.length, saved: savedAssets, failed: failedAssets };
}

async function resolveConversationFolderName(
    catFolder: FileSystemDirectoryHandle,
    id: string
): Promise<string> {
    let fallbackName = '';
    // Type assertion to access entries() typing across TS lib versions.
    const entries = (catFolder as FileSystemDirectoryHandle & {
        entries: () => AsyncIterable<[string, FileSystemHandle]>;
    }).entries();
    for await (const [name, handle] of entries) {
        if (!handle || handle.kind !== 'directory') continue;
        if (name === id) return name;
        if (!fallbackName && name.endsWith(`_${id}`)) {
            fallbackName = name;
        }
    }
    return fallbackName || id;
}

/**
 * Single run of the auto-save logic.
 * @param forceFullScan If true, scans ALL conversations regardless of update time.
 */
export async function runAutoSaveCycle(forceFullScan = false) {
    // If already running (shouldn't happen if serial, but good safety)
    if (autoSaveStore.status.value === 'saving' || autoSaveStore.status.value === 'checking') return;

    const rootHandle = await getRootHandle();
    if (!rootHandle) {
        autoSaveStore.setError('Automatické ukládání není nakonfigurováno');
        return;
    }

    if (!(await verifyPermission(rootHandle, true))) {
        autoSaveStore.setError('Přístup ke složce byl zamítnut');
        return;
    }

    const modeLabel = forceFullScan ? 'Úplné skenování' : 'Auto-save';
    autoSaveStore.setStatus('checking', `${modeLabel}: Probíhá inventarizace konverzací...`);
    Logger.info('AutoSave', `Starting ${modeLabel} cycle`);

    try {
        // Enforce Mutex for the entire read-check-write cycle
        await runExclusiveStateOp(async () => {
            // Strict check: User must be identified by email
            if (!Cred.userLabel) {
                throw new Error('Uživatelský email nenalezen (Strict Mode)');
            }

            // Ensure User folder (Email)
            const userFolder = await ensureFolder(rootHandle, Cred.userLabel);

            // NOTE: loadState is called inside here
            const state = await loadState(userFolder);

            // Update User Info in State
            if (state.user.id !== (Cred.accountId || '') || state.user.email !== Cred.userLabel) {
                state.user = {
                    id: Cred.accountId || '',
                    email: Cred.userLabel!
                };
                await saveState(state, userFolder);
            }

            const currentWorkspaceId = Cred.accountId;
            let currentWorkspaceKey = 'personal';
            if (currentWorkspaceId && currentWorkspaceId !== 'personal' && currentWorkspaceId !== 'x') {
                currentWorkspaceKey = currentWorkspaceId;
            }
            await updateWorkspaceCheckTime(userFolder, currentWorkspaceKey);

            // Step 1: Build Complete Inventory
            const inventoryReport = await buildConversationInventory({
                includeArchived: true,
                includeProjects: true,
                progressCb: (statusText) => {
                    autoSaveStore.setStatus('checking', `${modeLabel}: ${statusText}`);
                }
            });

            // Update gizmo check times in state for discovered projects
            if (inventoryReport.scopes.projects.subScopeDetails) {
                for (const pid of Object.keys(inventoryReport.scopes.projects.subScopeDetails)) {
                    await updateGizmoCheckTime(userFolder, currentWorkspaceKey, pid);
                }
            }

            // Step 2: Determine Candidates for saving
            const candidates = inventoryReport.items.filter((item) => {
                if (forceFullScan) return true;
                const local = state.conversations[item.id];
                if (!local) return true;
                const remoteTime = item.update_time ? new Date(item.update_time).getTime() : 0;
                return remoteTime > local.update_time;
            });

            const expected_conversation_ids = candidates.map(c => c.id);
            const saved_conversation_ids: string[] = [];
            const failed_conversation_ids: string[] = [];
            const chatDetails: {
                conversation_id: string;
                title: string;
                scope: any[];
                status: 'saved' | 'failed' | 'missing';
                error?: string;
                asset_count?: number;
                failed_assets?: number;
            }[] = [];
            const runAssetLedger: AssetLedgerEntry[] = [];

            if (candidates.length === 0) {
                // If inventory had error, report it!
                const scanReport = buildScanReport({
                    scanMode: forceFullScan ? 'full' : 'incremental',
                    inventoryReport,
                    expectedIds: [],
                    savedIds: [],
                    failedIds: [],
                    missingIds: [],
                    chatDetails: [],
                    assetLedger: [],
                });
                await saveScanReport(userFolder, scanReport);

                if (scanReport.status === 'COMPLETE') {
                    autoSaveStore.setStatus('idle', 'Nebyly nalezeny žádné změny');
                    autoSaveStore.setLastRun(Date.now());
                    autoSaveStore.resetError();
                } else if (scanReport.status === 'INCOMPLETE_INVENTORY') {
                    autoSaveStore.setError(`Nekompletní inventář (${inventoryReport.errors[0] || 'Chyba'})`);
                } else {
                    autoSaveStore.setStatus('idle', `Stav scanu: ${scanReport.status}`);
                    autoSaveStore.setLastRun(Date.now());
                }
                Logger.info('AutoSave', `Cycle finished with status ${scanReport.status}`);
                return;
            }

            autoSaveStore.setStatus('saving', `Ukládání ${candidates.length} konverzací...`);
            Logger.info('AutoSave', `Found ${candidates.length} updates to process`);

            const REGULAR_FOLDER = 'conversations';

            // Step 3: Process Each Conversation with Error Isolation
            for (let i = 0; i < candidates.length; i++) {
                const c = candidates[i];
                const category = c.projectId || REGULAR_FOLDER;
                const wsFolderName = (c.workspaceId && c.workspaceId !== 'personal' && c.workspaceId !== 'x')
                    ? c.workspaceId
                    : (currentWorkspaceId && currentWorkspaceId !== 'personal' && currentWorkspaceId !== 'x' ? currentWorkspaceId : 'Personal');

                const typeStr = c.projectId ? `[Gizmo ${c.projectId}]` : `[${wsFolderName}]`;

                // Resumption check: If conversation is already up to date in state and complete on disk, skip network fetch
                const local = state.conversations[c.id];
                const remoteTime = c.update_time ? new Date(c.update_time).getTime() : 0;
                const isUpToDate = !!(local && remoteTime <= local.update_time);

                if (isUpToDate) {
                    let alreadySavedOnDisk = false;
                    let diskMeta: any = null;
                    try {
                        const wsFolder = await ensureFolder(userFolder, wsFolderName);
                        const catFolder = await ensureFolder(wsFolder, category);
                        const folderName = await resolveConversationFolderName(catFolder, c.id);
                        if (folderName) {
                            const convFolder = await ensureFolder(catFolder, folderName);
                            if (await fileExists(convFolder, 'metadata.json')) {
                                const metaStr = await readFile(convFolder, 'metadata.json');
                                diskMeta = JSON.parse(metaStr);
                                if (!diskMeta.failed_attachments || diskMeta.failed_attachments.length === 0) {
                                    alreadySavedOnDisk = true;
                                }
                            }
                        }
                    } catch {
                        alreadySavedOnDisk = false;
                    }

                    if (alreadySavedOnDisk) {
                        Logger.info('AutoSave', `Conversation ${c.id} is already up to date on disk. Skipping network download.`);
                        saved_conversation_ids.push(c.id);
                        chatDetails.push({
                            conversation_id: c.id,
                            title: (diskMeta && diskMeta.title) || c.title,
                            scope: c.scopes,
                            status: 'saved',
                            asset_count: diskMeta?.attachments?.length || 0,
                            failed_assets: 0,
                        });
                        continue;
                    }
                }

                // Apply adaptive pacing before network requests
                await globalRateLimiter.pace();

                autoSaveStore.setStatus('saving', `Ukládání ${i + 1}/${candidates.length}: ${typeStr} ${c.id}`);
                Logger.info('AutoSave', `Saving ${c.id} to ${wsFolderName}/${category}`);

                try {
                    const conv = await fetchConvWithRetry(c.id, c.projectId);
                    const assetResults = await saveConversationToDisk(
                        userFolder,
                        conv,
                        wsFolderName,
                        category,
                        runAssetLedger
                    );

                    await updateConversationState(
                        userFolder,
                        c.id,
                        new Date(c.update_time).getTime() || Date.now(),
                        Date.now(),
                        wsFolderName,
                        c.projectId
                    );

                    saved_conversation_ids.push(c.id);
                    chatDetails.push({
                        conversation_id: c.id,
                        title: conv.title || c.title,
                        scope: c.scopes,
                        status: 'saved',
                        asset_count: assetResults.total,
                        failed_assets: assetResults.failed,
                    });
                } catch (chatErr: any) {
                    const errStr = chatErr?.message || String(chatErr);
                    Logger.error('AutoSave', `Chyba při ukládání konverzace ${c.id}`, chatErr);
                    failed_conversation_ids.push(c.id);
                    chatDetails.push({
                        conversation_id: c.id,
                        title: c.title,
                        scope: c.scopes,
                        status: 'failed',
                        error: errStr,
                    });
                }
            }

            // Step 4: Missing IDs and Fail-Closed Validation
            const missing_conversation_ids = expected_conversation_ids.filter(
                id => !saved_conversation_ids.includes(id) && !failed_conversation_ids.includes(id)
            );

            const scanReport = buildScanReport({
                scanMode: forceFullScan ? 'full' : 'incremental',
                inventoryReport,
                expectedIds: expected_conversation_ids,
                savedIds: saved_conversation_ids,
                failedIds: failed_conversation_ids,
                missingIds: missing_conversation_ids,
                chatDetails,
                assetLedger: runAssetLedger,
            });

            await saveScanReport(userFolder, scanReport);

            // Step 5: Update Store Status according to Fail-Closed Validation
            autoSaveStore.setLastRun(Date.now());

            if (scanReport.status === 'COMPLETE') {
                autoSaveStore.setStatus('idle', `Vše uloženo (${saved_conversation_ids.length} chatů, ${runAssetLedger.length} souborů)`);
                autoSaveStore.resetError();
                Logger.info('AutoSave', 'Cycle completed successfully (COMPLETE)');
            } else if (scanReport.status === 'COMPLETE_WITH_ASSET_ERRORS') {
                autoSaveStore.setStatus('idle', `Uloženo s chybami souborů (${scanReport.assets.failed_count} chyb)`);
                autoSaveStore.resetError();
                Logger.warn('AutoSave', 'Cycle completed with asset errors (COMPLETE_WITH_ASSET_ERRORS)');
            } else if (scanReport.status === 'INCOMPLETE_CONVERSATIONS') {
                autoSaveStore.setError(`Nekompletní: Selhalo ${failed_conversation_ids.length} konverzací`);
                Logger.error('AutoSave', `Cycle incomplete: ${failed_conversation_ids.length} failed, ${missing_conversation_ids.length} missing`);
            } else if (scanReport.status === 'INCOMPLETE_INVENTORY') {
                autoSaveStore.setError(`Nekompletní inventář (${inventoryReport.errors[0] || 'Chyba'})`);
                Logger.error('AutoSave', `Cycle incomplete inventory: ${inventoryReport.errors.join('; ')}`);
            } else {
                autoSaveStore.setError(`Běh selhal: ${scanReport.status}`);
                Logger.error('AutoSave', `Cycle failed: ${scanReport.status}`);
            }
        });
    } catch (e: any) {
        Logger.error('AutoSave', 'Auto-save fatal error', e);
        autoSaveStore.setError(e.message || 'Neznámá chyba');
    }
}

// Legacy alias for UI components
export const runAutoSave = () => runAutoSaveCycle(false);
export const runFullAutoSave = () => runAutoSaveCycle(true);



// --- Leader Election & Loop ---

// --- Leader Election & Loop ---

let stopRequested = false;
let isStarted = false;
let interruptSleep: (() => void) | null = null;
let currentIntervalMs = 5 * 60 * 1000;

// The loop that Only the Leader runs
async function leaderLoop() {
    Logger.info('AutoSave', 'I am the Leader. Starting loop.');

    while (!stopRequested) {
        // Calculate Next Run
        const nextRun = Date.now() + currentIntervalMs;
        autoSaveStore.setNextRun(nextRun);

        // Wait for interval (Interruptible)
        await new Promise<void>(resolve => {
            interruptSleep = resolve;
            setTimeout(resolve, currentIntervalMs);
        });
        interruptSleep = null;

        if (stopRequested) break;

        await runAutoSaveCycle();
    }
}

// Global start function
export async function startAutoSaveLoop(intervalMs: number = 5 * 60 * 1000) {
    const previousIntervalMs = currentIntervalMs;
    currentIntervalMs = intervalMs;

    if (isStarted) {
        // Avoid waking the loop on repeated init calls from UI remounts.
        // Only interrupt sleep when the interval is actually changed.
        const intervalChanged = previousIntervalMs !== intervalMs;
        if (intervalChanged && autoSaveStore.role.value === 'leader' && interruptSleep) {
            Logger.info('AutoSave', `Updating interval from ${previousIntervalMs}ms to ${intervalMs}ms`);
            interruptSleep();
        }
        return;
    }

    isStarted = true;
    stopRequested = false;
    Logger.info('AutoSave', `Initializing AutoSave system...`);
    autoSaveStore.setStatus('idle', 'Spouštění...');

    // Initial check (Leader election logic)
    attemptLeaderElection();
}

// Recursive election attempt
async function attemptLeaderElection() {
    if (stopRequested) return;

    try {
        const acquired = await tryAcquireLeader(async () => {
            // Callback runs ONLY when we are leader
            autoSaveStore.setRole('leader');
            try {
                // Run one immediately upon becoming leader?
                // Yes, usually good practice.
                await runAutoSaveCycle();

                await leaderLoop();
            } finally {
                // We lost leadership or loop stopped
                autoSaveStore.setRole('unknown'); // Will become standby or leader again shortly
            }
        });

        if (!acquired) {
            // We are Standby
            autoSaveStore.setRole('standby');
            autoSaveStore.setStatus('idle', 'Pohotovost: automatické ukládání provádí jiná karta');
            autoSaveStore.setNextRun(0);

            // Wait and retry
            // If tryAcquireLeader used {ifAvailable: true}, it returns immediately.
            // We poll every 10 seconds to see if leader died.
            setTimeout(() => attemptLeaderElection(), 10000);
        } else {
            // If we returned from acquired=true, it means we LOST leadership (loop finished or error)
            // We should retry becoming leader immediately or after delay
            if (!stopRequested) {
                setTimeout(() => attemptLeaderElection(), 1000);
            }
        }
    } catch (e) {
        Logger.error('AutoSave', 'Election error', e);
        // Retry logic needed
        setTimeout(() => attemptLeaderElection(), 10000);
    }
}

export function stopAutoSaveLoop() {
    stopRequested = true;
    isStarted = false;

    // Wake up leader loop if sleeping
    if (interruptSleep) {
        interruptSleep();
        interruptSleep = null;
    }

    autoSaveStore.setStatus('disabled', 'Automatické ukládání vypnuto');
    Logger.info('AutoSave', 'Stopping loop requested');
}
