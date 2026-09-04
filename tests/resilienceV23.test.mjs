import test from 'node:test';
import assert from 'node:assert/strict';
import { sanitize, inferFilename, pointerToFileId } from '../src/utils.ts';
import { collectFileCandidates } from '../src/files.ts';
import { downloadSandboxFileBlob } from '../src/api.ts';
import { writeFile, readFile } from '../src/fileSystem.ts';

test('Fix A: sanitize handles Windows reserved names, trailing dots/spaces, and illegal characters', () => {
  assert.equal(sanitize('report. '), 'report', 'Trailing dot and space must be stripped');
  assert.equal(sanitize('con'), '_con', 'DOS reserved device name CON must be prefixed');
  assert.equal(sanitize('CON.txt'), '_CON.txt', 'CON.txt must be prefixed');
  assert.equal(sanitize('nul.png'), '_nul.png', 'NUL.png must be prefixed');
  assert.equal(sanitize('aux'), '_aux', 'AUX must be prefixed');
  assert.equal(sanitize('com1.pdf'), '_com1.pdf', 'COM1 must be prefixed');
  assert.equal(sanitize('lpt9.dat'), '_lpt9.dat', 'LPT9 must be prefixed');
  assert.equal(sanitize(''), 'untitled', 'Empty string must default to untitled');
  assert.equal(sanitize('   ...  '), 'untitled', 'Only dots and spaces must default to untitled');
  assert.equal(sanitize('hello:world*foo?bar'), 'hello_world_foo_bar', 'Illegal chars must be replaced');

  assert.equal(inferFilename('con', 'fallbackId', 'application/pdf'), '_con.pdf', 'inferFilename must return safe name');
  assert.equal(inferFilename('name. ', 'fallbackId', ''), 'name', 'inferFilename must strip trailing dot/space');
});

test('Fix B: pointerToFileId and collectFileCandidates cleanly strip file-service:// scheme', () => {
  assert.equal(pointerToFileId('file-service://file-abc123XYZ'), 'file-abc123XYZ', 'Must strip file-service://');
  assert.equal(pointerToFileId('file-service://file_legacy_456'), 'file_legacy_456', 'Must strip file-service:// with underscore ID');
  assert.equal(pointerToFileId('file-service://550e8400-e29b-41d4-a716-446655440000'), '550e8400-e29b-41d4-a716-446655440000', 'Must handle UUID under file-service://');

  const mockConv = {
    conversation_id: 'conv-test-file-service',
    mapping: {
      'node-1': {
        message: {
          id: 'msg-1',
          metadata: {
            attachments: [
              {
                id: 'file-service://file-target-999',
                name: 'spreadsheet.xlsx',
                mime_type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
              },
            ],
          },
        },
      },
    },
  };

  const candidates = collectFileCandidates(mockConv);
  assert.equal(candidates.length, 1);
  assert.equal(candidates[0].file_id, 'file-target-999', 'Candidate file_id must not contain file-service://');
});

test('Fix C: downloadSandboxFileBlob retries on status: retry and recovers when download_url is ready', async () => {
  await window.fetch('https://chatgpt.com/dummy', { headers: { authorization: 'Bearer mock-token' } });

  let callCount = 0;
  const originalFetch = window.fetch;

  window.fetch = async (url, options) => {
    const urlStr = String(url);
    if (urlStr.includes('/interpreter/download')) {
      callCount++;
      if (callCount <= 2) {
        // First 2 calls return status: retry
        return new Response(JSON.stringify({ status: 'retry' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      // 3rd call returns ready download_url
      return new Response(JSON.stringify({
        download_url: 'https://files.oaiusercontent.com/sandbox-ready.csv',
        file_name: 'sandbox-ready.csv',
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (urlStr.includes('sandbox-ready.csv')) {
      return new Response(new Blob(['col1,col2\n1,2'], { type: 'text/csv' }), {
        status: 200,
        headers: { 'Content-Type': 'text/csv' },
      });
    }

    return originalFetch(url, options);
  };

  try {
    const res = await downloadSandboxFileBlob({
      conversationId: 'conv-sandbox-retry-test',
      messageId: 'msg-sandbox-1',
      sandboxPath: 'sandbox:/mnt/data/sandbox-ready.csv',
    });

    assert.ok(res.blob);
    assert.equal(res.filename, 'sandbox-ready.csv');
    assert.ok(callCount >= 3, 'Must have made at least 3 attempts to poll sandbox');
  } finally {
    window.fetch = originalFetch;
  }
});

test('Fix D: writeFile and readFile safely retry on transient cached state changed error', async () => {
  let writeAttempts = 0;
  const storage = new Map();

  const mockParentHandle = {
    async getFileHandle(name, opts) {
      return {
        async createWritable() {
          writeAttempts++;
          if (writeAttempts === 1) {
            const err = new Error('An attempt was made to access a handle whose cached state has changed');
            err.name = 'InvalidStateError';
            throw err;
          }
          return {
            async write(content) {
              storage.set(name, content);
            },
            async close() {},
          };
        },
        async getFile() {
          return {
            async text() {
              return String(storage.get(name) || '');
            },
          };
        },
      };
    },
  };

  await writeFile(mockParentHandle, 'transient_test.txt', 'repaired content');
  assert.equal(writeAttempts, 2, 'Must have retried write once after transient cached state error');

  const content = await readFile(mockParentHandle, 'transient_test.txt');
  assert.equal(content, 'repaired content');
});
