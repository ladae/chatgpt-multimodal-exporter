import { deterministicSafeFilename } from './utils';

// idb-keyval replaced by manual implementation
// Handles cannot be stored in localStorage. They must be in IndexedDB.
// Since I don't have idb-keyval, I'll implement a minimal IDB helper for the handle.

const DB_NAME = 'ChatGPTExporterDB';
const STORE_NAME = 'handles';
const HANDLE_KEY = 'root_dir_handle';

function openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);
        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME);
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function getHandleFromDB(): Promise<FileSystemDirectoryHandle | undefined> {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.get(HANDLE_KEY);
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

async function saveHandleToDB(handle: FileSystemDirectoryHandle): Promise<void> {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const req = store.put(handle, HANDLE_KEY);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
    });
}

export async function getRootHandle(): Promise<FileSystemDirectoryHandle | null> {
    try {
        const handle = await getHandleFromDB();
        return handle || null;
    } catch (e) {
        console.warn('Failed to get handle from DB', e);
        return null;
    }
}

export async function pickAndSaveRootHandle(): Promise<FileSystemDirectoryHandle> {
    // @ts-ignore
    const handle = await window.showDirectoryPicker();
    await saveHandleToDB(handle);
    return handle;
}

export async function verifyPermission(handle: FileSystemDirectoryHandle, readWrite = false): Promise<boolean> {
    const options: any = {};
    if (readWrite) {
        options.mode = 'readwrite';
    }
    // @ts-ignore
    if ((await handle.queryPermission(options)) === 'granted') {
        return true;
    }
    // @ts-ignore
    if ((await handle.requestPermission(options)) === 'granted') {
        return true;
    }
    return false;
}

function isTransientFsError(e: any): boolean {
    if (!e) return false;
    const msg = e.message || String(e);
    return (
        msg.includes('cached state') ||
        msg.includes('state has changed') ||
        msg.includes('could not be found') ||
        e.name === 'InvalidStateError' ||
        e.name === 'NotFoundError' ||
        e.name === 'NoModificationAllowedError'
    );
}

function isNameNotAllowedError(e: any): boolean {
    if (!e) return false;
    const msg = e.message || String(e);
    return (
        msg.includes('not allowed') ||
        msg.includes('Name is not allowed') ||
        e.name === 'TypeError' ||
        e.name === 'NotAllowedError'
    );
}

export async function ensureFolder(
    parent: FileSystemDirectoryHandle,
    name: string,
    reacquireParent?: () => Promise<FileSystemDirectoryHandle>
): Promise<FileSystemDirectoryHandle> {
    let currentParent = parent;
    for (let attempt = 0; attempt < 2; attempt++) {
        try {
            // @ts-ignore
            return await currentParent.getDirectoryHandle(name, { create: true });
        } catch (e: any) {
            if (attempt === 0 && isTransientFsError(e)) {
                if (reacquireParent) {
                    try {
                        currentParent = await reacquireParent();
                    } catch {}
                }
                await new Promise(r => setTimeout(r, 150));
                continue;
            }
            throw e;
        }
    }
    // @ts-ignore
    return await currentParent.getDirectoryHandle(name, { create: true });
}

export async function writeFile(
    parent: FileSystemDirectoryHandle,
    name: string,
    content: string | Blob | BufferSource,
    reacquireParent?: () => Promise<FileSystemDirectoryHandle>
): Promise<string> {
    let currentParent = parent;
    let targetName = name;

    for (let attempt = 0; attempt < 3; attempt++) {
        try {
            // @ts-ignore
            const fileHandle = await currentParent.getFileHandle(targetName, { create: true });
            // @ts-ignore
            const writable = await fileHandle.createWritable();
            await writable.write(content);
            await writable.close();
            return targetName;
        } catch (e: any) {
            // 1. Fallback for illegal filenames rejected by Chromium / OS
            if (targetName === name && isNameNotAllowedError(e)) {
                const fallbackName = deterministicSafeFilename(name);
                console.warn(`[fileSystem] getFileHandle "${name}" odmítnuto (${e.message}). Používám bezpečný fallback název "${fallbackName}".`);
                targetName = fallbackName;
                continue;
            }

            // 2. Transient / stale handle errors
            if (isTransientFsError(e)) {
                if (reacquireParent) {
                    try {
                        console.warn(`[fileSystem] writeFile "${targetName}" narazil na chybu handle (${e.message}). Znovu získávám parent handle...`);
                        currentParent = await reacquireParent();
                    } catch (reacquireErr) {
                        console.warn('[fileSystem] Selhalo znovuzískání parent handle:', reacquireErr);
                    }
                }
                if (attempt < 2) {
                    await new Promise(r => setTimeout(r, 150));
                    continue;
                }
            }
            throw e;
        }
    }
    return targetName;
}

export async function fileExists(parent: FileSystemDirectoryHandle, name: string): Promise<boolean> {
    try {
        // @ts-ignore
        await parent.getFileHandle(name);
        return true;
    } catch (e) {
        return false;
    }
}

export async function readFile(parent: FileSystemDirectoryHandle, name: string): Promise<string> {
    for (let attempt = 0; attempt < 2; attempt++) {
        try {
            // @ts-ignore
            const fileHandle = await parent.getFileHandle(name);
            // @ts-ignore
            const file = await fileHandle.getFile();
            return await file.text();
        } catch (e: any) {
            if (attempt === 0 && isTransientFsError(e)) {
                await new Promise(r => setTimeout(r, 150));
                continue;
            }
            throw e;
        }
    }
    // @ts-ignore
    const fileHandle = await parent.getFileHandle(name);
    // @ts-ignore
    const file = await fileHandle.getFile();
    return await file.text();
}
