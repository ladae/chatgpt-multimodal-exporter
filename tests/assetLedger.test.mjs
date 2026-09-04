import test from 'node:test';
import assert from 'node:assert/strict';
import { extractHttpStatus, downloadCandidateWithLedger } from '../src/assetLedger.ts';
import { collectFileCandidates } from '../src/files.ts';
import { normalizeSandboxPointer, resolveSedimentPointer } from '../src/utils.ts';

function createMockDirHandle() {
  const files = new Map();
  return {
    async getFileHandle(name, opts) {
      if (!files.has(name)) {
        if (opts?.create) {
          files.set(name, null);
        } else {
          throw new Error('NotFound');
        }
      }
      return {
        async createWritable() {
          return {
            async write(content) {
              files.set(name, content);
            },
            async close() {},
          };
        },
        async getFile() {
          return {
            async text() {
              const val = files.get(name);
              if (val instanceof Blob) return await val.text();
              return String(val || '');
            },
          };
        },
      };
    },
    _files: files,
  };
}

test('extractHttpStatus: extracts HTTP codes reliably', () => {
  assert.equal(extractHttpStatus('HTTP 404'), 404);
  assert.equal(extractHttpStatus('sandbox download meta 404: Not Found'), 404);
  assert.equal(extractHttpStatus('Download HTTP 500: Internal Server Error'), 500);
  assert.equal(extractHttpStatus('download meta 403: Forbidden'), 403);
  assert.equal(extractHttpStatus(new Error('HTTP 429: Too Many Requests')), 429);
  assert.equal(extractHttpStatus('Unrelated network error'), null);
});

test('normalizeSandboxPointer: cleans trailing backticks and punctuation, discards invalid paths', () => {
  assert.equal(normalizeSandboxPointer('`sandbox:/mnt/data/file.csv`'), 'sandbox:/mnt/data/file.csv');
  assert.equal(normalizeSandboxPointer('sandbox:/mnt/data/file.csv`'), 'sandbox:/mnt/data/file.csv');
  assert.equal(normalizeSandboxPointer('sandbox:/mnt/data/file.csv).'), 'sandbox:/mnt/data/file.csv');
  assert.equal(normalizeSandboxPointer('sandbox:/mnt/data/file.csv***'), 'sandbox:/mnt/data/file.csv');
  assert.equal(normalizeSandboxPointer('["sandbox:/mnt/data/table.xlsx"]'), 'sandbox:/mnt/data/table.xlsx');
  assert.equal(normalizeSandboxPointer('sandbox:/mnt/data'), null, 'Directory path should be rejected');
  assert.equal(normalizeSandboxPointer('sandbox:/mnt/data/'), null, 'Directory path should be rejected');
  assert.equal(normalizeSandboxPointer('sandbox:'), null, 'Empty sandbox scheme should be rejected');
  assert.equal(normalizeSandboxPointer('sandbox:/'), null, 'Root sandbox path should be rejected');
});

test('resolveSedimentPointer: extracts fileId and UUID correctly without network request', () => {
  assert.equal(resolveSedimentPointer('sediment://file-service_xyz789'), 'file-service_xyz789');
  assert.equal(resolveSedimentPointer('sediment://550e8400-e29b-41d4-a716-446655440000'), '550e8400-e29b-41d4-a716-446655440000');
  assert.equal(resolveSedimentPointer('sediment://files/file_abc123'), 'file_abc123');
  assert.equal(resolveSedimentPointer('sediment://'), null);
  assert.equal(resolveSedimentPointer('https://chatgpt.com/file'), null);
});

test('collectFileCandidates: extracts library_file_id when id is UUID', () => {
  const mockConv = {
    conversation_id: 'conv-test-1',
    mapping: {
      'node-1': {
        message: {
          id: 'msg-1',
          metadata: {
            attachments: [
              {
                id: '550e8400-e29b-41d4-a716-446655440000', // UUID
                library_file_id: 'file-service_xyz789',
                name: 'document.pdf',
                mime_type: 'application/pdf',
                size_bytes: 12345,
              },
            ],
          },
          content: {
            content_type: 'text',
            parts: ['Here is the file: `sandbox:/mnt/data/output.zip`.'],
          },
        },
      },
    },
  };

  const candidates = collectFileCandidates(mockConv);
  assert.equal(candidates.length, 2, 'Should find 1 attachment and 1 sandbox link');

  const attachment = candidates.find((c) => c.source === 'attachment');
  assert.ok(attachment, 'Attachment should be found');
  assert.equal(attachment.message_id, 'msg-1', 'message_id must be present on attachment');
  assert.equal(attachment.library_file_id, 'file-service_xyz789');
  assert.equal(attachment.file_id, 'file-service_xyz789', 'Primary file_id should prefer library_file_id over bare UUID');

  const sandbox = candidates.find((c) => c.source === 'sandbox-link');
  assert.ok(sandbox, 'Sandbox link should be found');
  assert.equal(sandbox.pointer, 'sandbox:/mnt/data/output.zip', 'Sandbox pointer must be cleaned of backticks/punctuation');
  assert.equal(sandbox.message_id, 'msg-1');
});

test('downloadCandidateWithLedger regression: file_id -> 403 -> library_file_id -> success', async () => {
  // 1. Ensure Cred has token
  await window.fetch('https://chatgpt.com/dummy', { headers: { authorization: 'Bearer mock-test-token' } });

  // 2. Mock global fetch to simulate 403 on primary and 200 on library fallback
  const originalFetch = window.fetch;
  window.fetch = async (url, options) => {
    const urlStr = String(url);
    if (urlStr.includes('/backend-api/files/download/file-primary-403')) {
      return new Response('Forbidden', { status: 403 });
    }
    if (urlStr.includes('/backend-api/files/download/file-library-fallback-200')) {
      return new Response(new Blob(['fallback-content-ok'], { type: 'text/plain' }), {
        status: 200,
        headers: {
          'Content-Type': 'text/plain',
          'Content-Disposition': 'attachment; filename="document.txt"',
        },
      });
    }
    return originalFetch(url, options);
  };

  try {
    const candidate = {
      conversation_id: 'conv-test-regression',
      message_id: 'msg-reg-1',
      file_id: 'file-primary-403',
      library_file_id: 'file-library-fallback-200',
      source: 'attachment',
      candidate_type: 'attachment',
      name: 'document.txt',
    };

    const mockFolder = createMockDirHandle();
    const result = await downloadCandidateWithLedger(candidate, mockFolder);

    assert.equal(result.entry.status, 'success', 'Overall result must be success');
    assert.equal(result.entries.length, 2, 'Must record 2 ledger entries (1 failure, 1 success)');

    // First attempt: primary_file_id
    const primaryEntry = result.entries[0];
    assert.equal(primaryEntry.download_method, 'primary_file_id');
    assert.equal(primaryEntry.status, 'failure');
    assert.equal(primaryEntry.http_status, 403);
    assert.equal(primaryEntry.file_id, 'file-primary-403');

    // Second attempt: library_file_id_fallback
    const fallbackEntry = result.entries[1];
    assert.equal(fallbackEntry.download_method, 'library_file_id_fallback');
    assert.equal(fallbackEntry.status, 'success');
    assert.equal(fallbackEntry.http_status, 200);
    assert.equal(fallbackEntry.file_id, 'file-library-fallback-200');

    // Saved metadata check
    assert.ok(result.savedMeta);
    assert.equal(result.savedMeta.download_method, 'library_file_id_fallback');
    assert.equal(result.savedMeta.saved_as, 'document.txt');

    // Verify file content written to folder
    assert.ok(mockFolder._files.has('document.txt'), 'File must be written to destination folder');
  } finally {
    window.fetch = originalFetch;
  }
});
