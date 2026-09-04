import { GM_download, GM_xmlhttpRequest } from 'vite-plugin-monkey/dist/client';



export const sanitize = (s: string): string => (s || '').replace(/[\\/:*?"<>|]+/g, '_').slice(0, 80);

export const isInlinePointer = (p: string): boolean => {
  if (!p) return false;
  const prefixes = [
    'https://cdn.oaistatic.com/',
    'https://oaidalleapiprodscus.blob.core.windows.net/',
  ];
  return prefixes.some((x) => p.startsWith(x));
};

export function resolveSedimentPointer(p: string): string | null {
  if (!p || typeof p !== 'string' || !p.startsWith('sediment://')) return null;
  const path = p.replace(/^sediment:\/\//, '').trim();

  // 1. Check if contains file- or file_ identifier (allowing alphanumeric, dashes and underscores)
  const fileMatch = path.match(/file[-_][0-9a-zA-Z_-]+/i);
  if (fileMatch) return fileMatch[0];

  // 2. Check if contains UUID
  const uuidMatch = path.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
  if (uuidMatch) return uuidMatch[0];

  // 3. Extract last non-empty segment
  const segments = path.split('/').filter(Boolean);
  if (segments.length > 0) {
    const last = segments[segments.length - 1].replace(/[?#].*$/, '');
    if (last && last.length > 3) return last;
  }
  return null;
}

export function normalizeSandboxPointer(raw: string): string | null {
  if (!raw || typeof raw !== 'string') return null;
  let p = raw.trim();
  p = p.replace(/^[`'"“”‘’(\[{<]+/, '');
  if (!p.startsWith('sandbox:')) return null;

  p = p.replace(/[`'"“”‘’()[\]{}<>.,;:!?*~_\\]+$/g, '');

  const path = p.replace(/^sandbox:/, '').trim();
  if (!path || path === '/' || path === '/mnt/data' || path === '/mnt/data/' || !path.includes('/')) {
    return null;
  }
  if (path.endsWith('/')) {
    return null;
  }
  return `sandbox:${path}`;
}

export const pointerToFileId = (p: string): string => {
  if (!p) return '';
  if (isInlinePointer(p)) return p; // already a CDN URL
  if (p.startsWith('sediment://')) {
    const resolved = resolveSedimentPointer(p);
    if (resolved) return resolved;
    return p.replace(/^sediment:\/\//, '');
  }
  const m = p.match(/file[-_][0-9a-f]+/i);
  return m ? m[0] : p;
};

export const fileExtFromMime = (mime: string): string => {
  if (!mime) return '';
  const map: Record<string, string> = {
    'image/png': '.png',
    'image/jpeg': '.jpg',
    'image/webp': '.webp',
    'image/gif': '.gif',
    'application/pdf': '.pdf',
    'text/plain': '.txt',
    'text/markdown': '.md',
  };
  if (map[mime]) return map[mime];
  if (mime.includes('/')) return `.${mime.split('/')[1]}`;
  return '';
};

export const formatBytes = (n: number | null | undefined): string => {
  if (!n || isNaN(n)) return '';
  const units = ['B', 'KB', 'MB', 'GB'];
  let v = n;
  let i = 0;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i++;
  }
  return `${v.toFixed(v >= 10 || v % 1 === 0 ? 0 : 1)}${units[i]}`;
};

export const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms));

// 支持 /c/xxx 和 /g/yyy/c/xxx 两种路径
export const convId = (): string => {
  const p = location.pathname;
  let m = p.match(/^\/c\/([0-9a-f-]+)$/i);
  if (m) return m[1];
  m = p.match(/^\/g\/[^/]+\/c\/([0-9a-f-]+)$/i);
  return m ? m[1] : '';
};

export const projectId = (): string => {
  const p = location.pathname;
  const m = p.match(/^\/g\/([^/]+)\/c\/[0-9a-f-]+$/i);
  return m ? m[1] : '';
};

export const isHostOK = (): boolean => location.host.endsWith('chatgpt.com') || location.host.endsWith('chat.openai.com');

// Deprecated: U object for backward compatibility during refactor if needed, but we are removing it.
// export const U = { qs, ce, sanitize, isInlinePointer, pointerToFileId, fileExtFromMime, formatBytes, sleep, convId, projectId, isHostOK };

export const BATCH_CONCURRENCY = 4;
export const LIST_PAGE_SIZE = 50;

export function saveBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 3000);
  a.remove();
}

export function saveJSON(obj: any, filename: string): void {
  const blob = new Blob([JSON.stringify(obj, null, 2)], {
    type: 'application/json',
  });
  saveBlob(blob, filename);
}

export function gmDownload(url: string, filename: string): Promise<void> {
  return new Promise((resolve, reject) => {
    GM_download({
      url,
      name: filename || '',
      onload: () => resolve(),
      onerror: (err) => reject(err),
      ontimeout: () => reject(new Error('timeout')),
    });
  });
}

export function parseMimeFromHeaders(raw: string): string {
  if (!raw) return '';
  const m = raw.match(/content-type:\s*([^\r\n;]+)/i);
  return m ? m[1].trim() : '';
}

export function gmFetchBlob(url: string, headers?: Record<string, string>): Promise<{ blob: Blob; mime: string }> {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      url,
      method: 'GET',
      headers: headers || {},
      responseType: 'arraybuffer',
      onload: (res) => {
        const mime = parseMimeFromHeaders(res.responseHeaders || '') || '';
        const buf = res.response || res.responseText;
        resolve({ blob: new Blob([buf], { type: mime }), mime });
      },
      onerror: (err) => reject(new Error(err && err.error ? err.error : 'gm_fetch_error')),
      ontimeout: () => reject(new Error('gm_fetch_timeout')),
    });
  });
}

const HAS_EXT_RE = /\.[^./\\]+$/;

export function inferFilename(name: string, fallbackId: string, mime: string): string {
  const base = sanitize(name || '') || sanitize(fallbackId || '') || 'untitled';
  const ext = fileExtFromMime(mime || '');
  if (!ext || HAS_EXT_RE.test(base)) return base;
  return `${base}${ext}`;
}


export function parseRetryAfter(header: string | null | undefined): number | null {
  if (!header) return null;
  const trimmed = header.trim();
  const seconds = Number(trimmed);
  if (!isNaN(seconds) && seconds >= 0) {
    return seconds * 1000;
  }
  const dateMs = Date.parse(trimmed);
  if (!isNaN(dateMs)) {
    const diff = dateMs - Date.now();
    return diff > 0 ? diff : 0;
  }
  return null;
}

export class AdaptiveRateLimiter {
  private minDelayMs: number;
  private maxDelayMs: number;
  private currentDelayMs: number;
  private consecutiveSuccesses: number = 0;

  constructor(minDelayMs = 350, maxDelayMs = 5000) {
    this.minDelayMs = minDelayMs;
    this.maxDelayMs = maxDelayMs;
    this.currentDelayMs = minDelayMs;
  }

  recordSuccess(): void {
    this.consecutiveSuccesses++;
    if (this.consecutiveSuccesses >= 3 && this.currentDelayMs > this.minDelayMs) {
      this.currentDelayMs = Math.max(this.minDelayMs, this.currentDelayMs - 250);
      this.consecutiveSuccesses = 0;
    }
  }

  recordRateLimit(suggestedWaitMs?: number): void {
    this.consecutiveSuccesses = 0;
    const bump = suggestedWaitMs ? Math.min(this.maxDelayMs, suggestedWaitMs) : 2500;
    this.currentDelayMs = Math.min(this.maxDelayMs, Math.max(this.currentDelayMs * 2, bump));
  }

  async pace(): Promise<void> {
    if (this.currentDelayMs > 0) {
      await sleep(this.currentDelayMs);
    }
  }

  getCurrentDelay(): number {
    return this.currentDelayMs;
  }

  reset(): void {
    this.currentDelayMs = this.minDelayMs;
    this.consecutiveSuccesses = 0;
  }
}

export const globalRateLimiter = new AdaptiveRateLimiter();

export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retries: number = 4,
  backoff: number = 1000
): Promise<Response> {
  let lastError: any;
  for (let i = 0; i <= retries; i++) {
    try {
      const res = await fetch(url, options);

      if (res.ok) {
        globalRateLimiter.recordSuccess();
        return res;
      }

      // 429 Too Many Requests: Exponential backoff + Jitter, respect Retry-After
      if (res.status === 429) {
        let delayMs = parseRetryAfter(res.headers.get('Retry-After'));
        if (delayMs === null || delayMs <= 0) {
          const base = Math.max(2000, backoff) * Math.pow(2, i);
          const jitter = Math.floor(Math.random() * 1000);
          delayMs = Math.min(60000, base + jitter);
        } else {
          delayMs += Math.floor(Math.random() * 500);
        }

        globalRateLimiter.recordRateLimit(delayMs);

        if (i < retries) {
          console.warn(`[fetchWithRetry] HTTP 429 received for ${url}. Waiting ${delayMs}ms before retry ${i + 1}/${retries}...`);
          await sleep(delayMs);
          continue;
        }
        return res;
      }

      // 5xx Server Errors: Exponential backoff
      if (res.status >= 500) {
        if (i < retries) {
          const delayMs = backoff * Math.pow(2, i) + Math.floor(Math.random() * 500);
          console.warn(`[fetchWithRetry] HTTP ${res.status} received for ${url}. Waiting ${delayMs}ms before retry ${i + 1}/${retries}...`);
          await sleep(delayMs);
          continue;
        }
        return res;
      }

      // Other 4xx responses (401, 403, 404, etc.): return immediately for caller handling
      return res;
    } catch (e) {
      lastError = e;
      if (i < retries) {
        const delayMs = backoff * Math.pow(2, i) + Math.floor(Math.random() * 500);
        await sleep(delayMs);
      }
    }
  }
  throw lastError;
}

