import { Cred } from './cred';
import { projectId, sanitize, gmDownload, gmFetchBlob, inferFilename, fetchWithRetry } from './utils';
import { Conversation, UserProfile } from './types';
import { Logger } from './logger';

export async function fetchConversation(id: string, projectId?: string): Promise<Conversation> {
  if (!Cred.token) {
    const ok = await Cred.ensureViaSession();
    if (!ok) throw new Error('Nelze získat přihlašovací údaje (accessToken)');
  }

  const headers = Cred.getAuthHeaders();
  if (projectId) headers.set('chatgpt-project-id', projectId);

  const url = `${location.origin}/backend-api/conversation/${id}`;
  const init: RequestInit = {
    method: 'GET',
    credentials: 'include',
    headers,
  };

  // Use fetchWithRetry for the initial request
  let resp = await fetchWithRetry(url, init).catch(() => null);
  if (!resp) throw new Error('Síťová chyba');

  if (resp.status === 401) {
    const ok = await Cred.ensureViaSession();
    if (!ok) throw new Error('401: Opětovné získání přihlašovacích údajů selhalo');
    const h2 = Cred.getAuthHeaders();
    if (projectId) h2.set('chatgpt-project-id', projectId);
    init.headers = h2;
    // Retry with new token, also using fetchWithRetry
    resp = await fetchWithRetry(url, init).catch(() => null);
    if (!resp) throw new Error('Síťová chyba (opakovaný pokus)');
  }
  if (!resp.ok) {
    const txt = await resp.text().catch(() => '');
    throw new Error(`HTTP ${resp.status}: ${txt.slice(0, 200)}`);
  }
  return resp.json();
}

export async function downloadSandboxFile({
  conversationId,
  messageId,
  sandboxPath,
}: {
  conversationId: string;
  messageId: string;
  sandboxPath: string;
}): Promise<void> {
  if (!Cred.token) {
    const ok = await Cred.ensureViaSession();
    if (!ok) throw new Error('Chybí accessToken, nelze stáhnout sandbox soubor');
  }
  const headers = Cred.getAuthHeaders();
  const pid = projectId();
  if (pid) headers.set('chatgpt-project-id', pid);

  const params = new URLSearchParams({
    message_id: messageId,
    sandbox_path: sandboxPath.replace(/^sandbox:/, ''),
  });
  const url = `${location.origin}/backend-api/conversation/${conversationId}/interpreter/download?${params.toString()}`;
  const resp = await fetchWithRetry(url, { headers, credentials: 'include' });
  if (!resp.ok) {
    const txt = await resp.text().catch(() => '');
    throw new Error(`sandbox download meta ${resp.status}: ${txt.slice(0, 200)}`);
  }
  let j: any;
  try {
    j = await resp.json();
  } catch (e) {
    throw new Error('Metadata sandbox download nejsou JSON');
  }
  const dl = j.download_url;
  if (!dl) throw new Error(`Sandbox download_url chybí: ${JSON.stringify(j).slice(0, 200)}`);
  const fname = sanitize(j.file_name || sandboxPath.split('/').pop() || 'sandbox_file');
  await gmDownload(dl, fname);
}

export async function downloadSandboxFileBlob({
  conversationId,
  messageId,
  sandboxPath,
}: {
  conversationId: string;
  messageId: string;
  sandboxPath: string;
}): Promise<{ blob: Blob; mime: string; filename: string }> {
  if (!Cred.token) {
    const ok = await Cred.ensureViaSession();
    if (!ok) throw new Error('Chybí accessToken, nelze stáhnout sandbox soubor');
  }
  const headers = Cred.getAuthHeaders();
  const pid = projectId();
  if (pid) headers.set('chatgpt-project-id', pid);

  const params = new URLSearchParams({
    message_id: messageId,
    sandbox_path: sandboxPath.replace(/^sandbox:/, ''),
  });
  const url = `${location.origin}/backend-api/conversation/${conversationId}/interpreter/download?${params.toString()}`;
  const resp = await fetchWithRetry(url, { headers, credentials: 'include' });
  if (!resp.ok) {
    const txt = await resp.text().catch(() => '');
    if (txt.includes('ace_pod_expired')) {
      throw new Error(`sandbox download meta 410: ace_pod_expired (Sandbox kontejner vypršel)`);
    }
    throw new Error(`sandbox download meta ${resp.status}: ${txt.slice(0, 200)}`);
  }
  let j: any;
  try {
    j = await resp.json();
  } catch (e) {
    throw new Error('Metadata sandbox download nejsou JSON');
  }
  const dl = j.download_url;
  if (!dl) throw new Error(`Sandbox download_url chybí: ${JSON.stringify(j).slice(0, 200)}`);
  const gmHeaders = {};
  const res = await gmFetchBlob(dl, gmHeaders);
  const fname = inferFilename(
    j.file_name || sandboxPath.split('/').pop() || 'sandbox_file',
    sandboxPath,
    res.mime || ''
  );
  return { blob: res.blob, mime: res.mime || '', filename: fname };
}

export async function fetchFileMeta(fileId: string, headers: Headers, conversationId?: string | null): Promise<any> {
  const u = new URL(`${location.origin}/backend-api/files/${fileId}`);
  if (conversationId) {
    u.searchParams.set('conversation_id', conversationId);
  }
  const resp = await fetchWithRetry(u.toString(), { method: 'GET', headers, credentials: 'include' });
  if (!resp.ok) throw new Error(`meta ${resp.status}`);
  return resp.json();
}

export async function fetchDownloadUrlOrResponse(
  fileId: string,
  headers: Headers,
  gizmoId?: string | null,
  conversationId?: string | null
): Promise<string | Response | null> {
  const makeUrl = (gid?: string | null, cid?: string | null) => {
    const u = new URL(`${location.origin}/backend-api/files/download/${fileId}`);
    u.searchParams.set('inline', 'false');
    if (cid) {
      u.searchParams.set('conversation_id', cid);
    }
    // Only append gizmo_id for Gizmo-owned files (starting with 'file-')
    // User-uploaded files (starting with 'file_') fail if gizmo_id is present
    if (gid && fileId.startsWith('file-')) {
      u.searchParams.set('gizmo_id', gid);
    }
    return u.toString();
  };

  let resp = await fetchWithRetry(makeUrl(gizmoId, conversationId), { method: 'GET', headers, credentials: 'include' });

  // Stage 1 Fallback: If 403 Forbidden and gizmoId was passed, retry immediately without gizmoId (retaining conversationId)!
  // User library attachments in GPT conversations return 403 if gizmo_id is attached.
  if (resp.status === 403 && gizmoId) {
    Logger.debug('API', `Download ${fileId} with gizmo_id returned 403, retrying without gizmo_id...`);
    const retryResp = await fetchWithRetry(makeUrl(null, conversationId), { method: 'GET', headers, credentials: 'include' });
    if (retryResp.ok || retryResp.status < 400) {
      resp = retryResp;
    }
  }

  // Stage 2 Fallback: If still 403 and conversationId was passed, retry without conversationId (for global user files)!
  if (resp.status === 403 && conversationId) {
    Logger.debug('API', `Download ${fileId} with conversation_id returned 403, retrying without conversation_id...`);
    const retryResp = await fetchWithRetry(makeUrl(null, null), { method: 'GET', headers, credentials: 'include' });
    if (retryResp.ok || retryResp.status < 400) {
      resp = retryResp;
    }
  }

  // Stage 3 Fallback: If 403 and conversationId was NOT passed initially, retry with conversationId if available from Cred
  if (resp.status === 403 && !conversationId && (Cred as any).currentConvId) {
    const fallbackCid = (Cred as any).currentConvId;
    Logger.debug('API', `Download ${fileId} without conversation_id returned 403, retrying with conversation_id ${fallbackCid}...`);
    const retryResp = await fetchWithRetry(makeUrl(null, fallbackCid), { method: 'GET', headers, credentials: 'include' });
    if (retryResp.ok || retryResp.status < 400) {
      resp = retryResp;
    }
  }

  if (!resp.ok) {
    const txt = await resp.text().catch(() => '');
    throw new Error(`download meta ${resp.status}: ${txt.slice(0, 200)}`);
  }
  const ct = resp.headers.get('content-type') || '';
  if (ct.includes('json')) {
    const j = await resp.json();
    if (!j.download_url && !j.url) {
      throw new Error(`download meta missing url: ${JSON.stringify(j).slice(0, 200)}`);
    }
    return j.download_url || j.url;
  }
  return resp;
}

export async function fetchCurrentUser(): Promise<UserProfile | null> {
  if (!Cred.token) return null;
  const url = `${location.origin}/backend-api/me`;
  const headers = Cred.getAuthHeaders();
  try {
    const resp = await fetchWithRetry(url, { method: 'GET', headers, credentials: 'include' });
    if (!resp.ok) {
      console.warn('fetchCurrentUser failed', resp.status);
      return null;
    }
    return await resp.json();
  } catch (e) {
    console.error('fetchCurrentUser error', e);
    return null;
  }
}

