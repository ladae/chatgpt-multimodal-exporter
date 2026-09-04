import { FileCandidate, AssetLedgerEntry } from './types';
import { fileExists, writeFile } from './fileSystem';
import { sanitize, isInlinePointer, inferFilename, gmFetchBlob, normalizeSandboxPointer, resolveSedimentPointer, pointerToFileId } from './utils';
import { Cred } from './cred';
import { downloadSandboxFileBlob, fetchDownloadUrlOrResponse, fetchFileMeta } from './api';
import { Logger } from './logger';

export function extractHttpStatus(err: any): number | null {
  if (!err) return null;
  const msg = typeof err === 'string' ? err : err.message || '';
  const match = msg.match(/\b(HTTP\s+)?([1-5]\d{2})\b/i);
  if (match && match[2]) {
    const code = parseInt(match[2], 10);
    if (!isNaN(code) && code >= 100 && code < 600) return code;
  }
  return null;
}

export interface ProcessAssetResult {
  entry: AssetLedgerEntry;
  entries: AssetLedgerEntry[];
  savedMeta?: {
    pointer: string;
    file_id: string;
    original_name: string;
    saved_as: string;
    size_bytes: number | null;
    mime: string;
    source: string;
    library_file_id?: string | null;
    download_method: string;
  };
}

export function isValidFilesApiId(id: string | null | undefined): boolean {
  if (!id || typeof id !== 'string') return false;
  // Valid ChatGPT backend file IDs for files/download API start with 'file-' followed by alphanumeric/dash characters
  // Internal library references like 'libfile_...' or mutated 'file_...' with underscore are not accepted by files API
  return /^file-[a-zA-Z0-9_-]+$/.test(id);
}

/**
 * Downloads a candidate asset and records full ledger details.
 * Fail-safe: Returns failure entry on error rather than throwing,
 * ensuring conversation archiving never aborts due to a single asset.
 */
export async function downloadCandidateWithLedger(
  candidate: FileCandidate,
  attFolder: FileSystemDirectoryHandle,
  reacquireAttFolder?: () => Promise<FileSystemDirectoryHandle>
): Promise<ProcessAssetResult> {
  const convId = candidate.conversation_id || '';
  const messageId = candidate.message_id || null;
  const candidateType = candidate.candidate_type || candidate.source || 'unknown';
  let fileId = candidate.file_id || null;
  let libraryFileId = candidate.library_file_id || null;
  const pointer = candidate.pointer || null;
  const originalRef = pointer || fileId || libraryFileId || candidate.download_url || null;

  const originalName = (candidate.meta && (candidate.meta.name || candidate.meta.file_name)) || candidate.name || '';
  const predictedName = originalName ? sanitize(originalName) : '';

  // 1. Check if already exists on disk
  if (predictedName && (await fileExists(attFolder, predictedName))) {
    const mime = candidate.mime_type || candidate.meta?.mime_type || candidate.meta?.mime || 'application/octet-stream';
    const size = candidate.size_bytes || candidate.meta?.size_bytes || candidate.meta?.size || null;

    const entry: AssetLedgerEntry = {
      conversation_id: convId,
      message_id: messageId,
      candidate_type: candidateType,
      file_id: fileId,
      library_file_id: libraryFileId,
      original_ref: originalRef,
      download_method: 'existing_file',
      status: 'success',
      error: null,
      http_status: null,
      local_path: `attachments/${predictedName}`,
      size_bytes: size,
      mime_type: mime,
      timestamp: Date.now(),
    };

    Logger.debug('AssetLedger', `Asset already exists on disk: ${predictedName}`);
    return {
      entry,
      entries: [entry],
      savedMeta: {
        pointer: pointer || '',
        file_id: fileId || '',
        original_name: originalName || predictedName,
        saved_as: predictedName,
        size_bytes: size,
        mime,
        source: candidateType,
        library_file_id: libraryFileId,
        download_method: 'existing_file',
      },
    };
  }

  const entries: AssetLedgerEntry[] = [];

  const recordSuccess = async (
    blob: Blob,
    mime: string,
    rawFilename: string,
    usedMethod: string,
    currentId: string | null
  ): Promise<ProcessAssetResult> => {
    const safeName = sanitize(rawFilename);
    let actualSavedName = safeName;

    if (!(await fileExists(attFolder, safeName))) {
      actualSavedName = await writeFile(attFolder, safeName, blob, reacquireAttFolder);
    }

    const localRelPath = `attachments/${actualSavedName}`;

    const successEntry: AssetLedgerEntry = {
      conversation_id: convId,
      message_id: messageId,
      candidate_type: candidateType,
      file_id: currentId || fileId,
      library_file_id: libraryFileId,
      original_ref: originalRef,
      download_method: usedMethod,
      status: 'success',
      error: null,
      http_status: 200,
      local_path: localRelPath,
      size_bytes: blob.size,
      mime_type: mime,
      timestamp: Date.now(),
    };

    entries.push(successEntry);
    Logger.debug('AssetLedger', `Asset uložen (${usedMethod}): ${actualSavedName}`);

    return {
      entry: successEntry,
      entries,
      savedMeta: {
        pointer: pointer || '',
        file_id: currentId || fileId || '',
        original_name: originalName || rawFilename || actualSavedName,
        saved_as: actualSavedName,
        size_bytes: blob.size,
        mime,
        source: candidateType,
        library_file_id: libraryFileId,
        download_method: usedMethod,
      },
    };
  };

  const recordFailure = (
    method: string,
    err: any,
    currentId: string | null = fileId
  ): AssetLedgerEntry => {
    const errorMsg = err?.message || String(err);
    const httpStatus = extractHttpStatus(err);

    const failEntry: AssetLedgerEntry = {
      conversation_id: convId,
      message_id: messageId,
      candidate_type: candidateType,
      file_id: currentId,
      library_file_id: libraryFileId,
      original_ref: originalRef,
      download_method: method,
      status: 'failure',
      error: errorMsg,
      http_status: httpStatus,
      local_path: null,
      size_bytes: null,
      mime_type: candidate.mime_type || null,
      timestamp: Date.now(),
    };
    entries.push(failEntry);
    Logger.warn('AssetLedger', `Asset pokus selhal (${method}, id: ${currentId || pointer}): ${errorMsg}`);
    return failEntry;
  };

  // Route A: Sandbox interpreter file
  if (pointer && pointer.startsWith('sandbox:')) {
    const cleanPath = normalizeSandboxPointer(pointer);
    if (!cleanPath) {
      const failEntry = recordFailure('sandbox_interpreter', new Error('Neplatná cesta sandbox pointeru'));
      return { entry: failEntry, entries };
    }
    if (!convId || !messageId) {
      const failEntry = recordFailure('sandbox_interpreter', new Error('Sandbox pointer chybí conversation_id nebo message_id'));
      return { entry: failEntry, entries };
    }

    try {
      const res = await downloadSandboxFileBlob({
        conversationId: convId,
        messageId,
        sandboxPath: cleanPath,
      });
      return await recordSuccess(res.blob, res.mime, res.filename, 'sandbox_interpreter', null);
    } catch (err: any) {
      let errMsg = err?.message || String(err);
      if (errMsg.includes('ace_pod_expired')) {
        errMsg = 'ace_pod_expired: Sandbox kontejner vypršel';
      }
      const failEntry = recordFailure('sandbox_interpreter', new Error(errMsg));
      return { entry: failEntry, entries };
    }
  }

  // Route B: Inline CDN pointer
  if ((fileId && isInlinePointer(fileId)) || (pointer && isInlinePointer(pointer))) {
    const url = pointer && isInlinePointer(pointer) ? pointer : fileId!;
    try {
      const res = await gmFetchBlob(url);
      const mime = res.mime || candidate.mime_type || candidate.meta?.mime_type || '';
      const fname = inferFilename(originalName, fileId || pointer || 'cdn_file', mime);
      return await recordSuccess(res.blob, mime, fname, 'inline_cdn', fileId);
    } catch (err: any) {
      const failEntry = recordFailure('inline_cdn', err, fileId);
      return { entry: failEntry, entries };
    }
  }

  // Resolve sediment:// if present in fileId or pointer (without making network calls to sediment://)
  if (fileId && fileId.startsWith('sediment://')) {
    const resolved = resolveSedimentPointer(fileId);
    if (resolved) {
      fileId = resolved;
    } else {
      const failEntry = recordFailure('primary_file_id', new Error('Nelze extrahovat file_id ze sediment:// odkazu'), fileId);
      return { entry: failEntry, entries };
    }
  }
  if (!fileId && pointer && pointer.startsWith('sediment://')) {
    const resolved = resolveSedimentPointer(pointer);
    if (resolved) {
      fileId = resolved;
    }
  }

  // Resolve file-service:// if present in fileId, libraryFileId or pointer
  if (fileId && fileId.startsWith('file-service://')) {
    fileId = pointerToFileId(fileId);
  }
  if (libraryFileId && libraryFileId.startsWith('file-service://')) {
    libraryFileId = pointerToFileId(libraryFileId);
  }
  if (!fileId && pointer && pointer.startsWith('file-service://')) {
    fileId = pointerToFileId(pointer);
  }

  // Route C: ChatGPT backend files API & Fallbacks
  const tryFilesApiDownload = async (
    targetId: string,
    gizmoId?: string | null,
    conversationId?: string | null
  ): Promise<{ blob: Blob; mime: string; filename: string }> => {
    if (!Cred.token) {
      const ok = await Cred.ensureViaSession();
      if (!ok) throw new Error('Chybí accessToken pro stažení souboru');
    }

    const headers = Cred.getAuthHeaders();
    const pid = candidate.project_id || (Cred as any).projectId;
    if (pid) headers.set('chatgpt-project-id', pid);

    let lastErr: any = null;

    // 1. Try download endpoint with conversation_id & gizmoId
    try {
      const downloadResult = await fetchDownloadUrlOrResponse(targetId, headers, gizmoId, conversationId);
      if (downloadResult instanceof Response) {
        if (!downloadResult.ok) {
          const txt = await downloadResult.text().catch(() => '');
          throw new Error(`Download HTTP ${downloadResult.status}: ${txt.slice(0, 120)}`);
        }
        const blob = await downloadResult.blob();
        const mime = candidate.mime_type || candidate.meta?.mime_type || downloadResult.headers.get('Content-Type') || '';
        const cd = downloadResult.headers.get('Content-Disposition') || '';
        const m = cd.match(/filename\*?=(?:UTF-8''|")?([^\";]+)/i);
        const resolvedName = originalName || (m && decodeURIComponent(m[1])) || '';
        const filename = inferFilename(resolvedName, targetId, mime);
        return { blob, mime, filename };
      } else if (typeof downloadResult === 'string') {
        const res = await gmFetchBlob(downloadResult);
        const mime = res.mime || candidate.mime_type || candidate.meta?.mime_type || '';
        const filename = inferFilename(originalName, targetId, mime);
        return { blob: res.blob, mime, filename };
      }
    } catch (e: any) {
      lastErr = e;
      Logger.debug('AssetLedger', `Download endpoint selhal pro ${targetId}: ${e.message}, zkouším meta endpoint...`);
    }

    // 2. Try file meta endpoint as fallback (passing conversationId)
    try {
      const meta = await fetchFileMeta(targetId, headers, conversationId);
      const dlUrl = meta?.download_url || meta?.url;
      if (dlUrl && typeof dlUrl === 'string' && (dlUrl.startsWith('http://') || dlUrl.startsWith('https://'))) {
        const res = await gmFetchBlob(dlUrl);
        const mime = res.mime || meta.mime_type || candidate.mime_type || '';
        const resolvedName = originalName || meta.filename || meta.file_name || '';
        const filename = inferFilename(resolvedName, targetId, mime);
        return { blob: res.blob, mime, filename };
      }
    } catch (metaErr: any) {
      Logger.debug('AssetLedger', `File meta endpoint selhal pro ${targetId}: ${metaErr.message}`);
    }

    throw lastErr || new Error(`Nelze stáhnout soubor pro ID ${targetId}`);
  };

  // Step 1: primary_file_id
  if (fileId) {
    try {
      const res = await tryFilesApiDownload(fileId, candidate.gizmo_id, convId);
      return await recordSuccess(res.blob, res.mime, res.filename, 'primary_file_id', fileId);
    } catch (err: any) {
      recordFailure('primary_file_id', err, fileId);
    }
  }

  // Step 1b: If candidate.meta contains alternative file id (e.g. meta.file_id or meta.id) that differs from fileId
  const altFileId = (candidate.meta?.file_id && candidate.meta.file_id !== fileId)
    ? candidate.meta.file_id
    : (candidate.meta?.id && candidate.meta.id !== fileId && (candidate.meta.id.startsWith('file-') || candidate.meta.id.startsWith('file_')) ? candidate.meta.id : null);
  if (altFileId) {
    try {
      const res = await tryFilesApiDownload(altFileId, candidate.gizmo_id, convId);
      return await recordSuccess(res.blob, res.mime, res.filename, 'alt_file_id', altFileId);
    } catch (err: any) {
      recordFailure('alt_file_id', err, altFileId);
    }
  }

  // Step 2: library_file_id_fallback
  if (libraryFileId && libraryFileId !== fileId && libraryFileId !== altFileId) {
    if (isValidFilesApiId(libraryFileId)) {
      try {
        // Pass convId to authorize library file download within this conversation!
        const res = await tryFilesApiDownload(libraryFileId, null, convId);
        return await recordSuccess(res.blob, res.mime, res.filename, 'library_file_id_fallback', libraryFileId);
      } catch (err: any) {
        recordFailure('library_file_id_fallback', err, libraryFileId);
      }
    } else {
      Logger.debug('AssetLedger', `library_file_id "${libraryFileId}" není platným files API ID (fallback_not_applicable). Přeskakuji.`);
    }
  }

  // Step 3: direct_url
  if (candidate.download_url && (candidate.download_url.startsWith('http://') || candidate.download_url.startsWith('https://'))) {
    try {
      const res = await gmFetchBlob(candidate.download_url);
      const mime = res.mime || candidate.mime_type || '';
      const fname = inferFilename(originalName, fileId || 'direct_file', mime);
      return await recordSuccess(res.blob, mime, fname, 'direct_url', fileId);
    } catch (err: any) {
      recordFailure('direct_url', err, fileId);
    }
  }

  if (entries.length === 0) {
    recordFailure('unknown', new Error('Neplatný kandidát (chybí souborové identifikátory)'), fileId);
  }

  return {
    entry: entries[entries.length - 1],
    entries,
  };
}
