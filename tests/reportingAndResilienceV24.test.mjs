import test from 'node:test';
import assert from 'node:assert/strict';
import { computeAssetLedgerSummary } from '../src/validation.ts';
import { sanitize, deterministicSafeFilename } from '../src/utils.ts';
import { writeFile, ensureFolder } from '../src/fileSystem.ts';
import { downloadCandidateWithLedger, isValidFilesApiId } from '../src/assetLedger.ts';

test('V2.4: computeAssetLedgerSummary distinguishes candidates from download attempts', () => {
  const ledger = [
    // Candidate 1: 1 attempt, success
    {
      conversation_id: 'conv-1',
      message_id: 'msg-1',
      candidate_type: 'attachment',
      original_ref: 'ref-1',
      file_id: 'file-1',
      library_file_id: null,
      download_method: 'primary_file_id',
      status: 'success',
      error: null,
      http_status: 200,
      local_path: 'attachments/file1.png',
      size_bytes: 100,
      mime_type: 'image/png',
      timestamp: 1,
    },
    // Candidate 2: attempt 1 failed (primary 403), attempt 2 failed (fallback 422)
    {
      conversation_id: 'conv-1',
      message_id: 'msg-2',
      candidate_type: 'attachment',
      original_ref: 'ref-2',
      file_id: 'file-2',
      library_file_id: 'lib-2',
      download_method: 'primary_file_id',
      status: 'failure',
      error: 'HTTP 403',
      http_status: 403,
      local_path: null,
      size_bytes: null,
      mime_type: 'application/pdf',
      timestamp: 2,
    },
    {
      conversation_id: 'conv-1',
      message_id: 'msg-2',
      candidate_type: 'attachment',
      original_ref: 'ref-2',
      file_id: 'lib-2',
      library_file_id: 'lib-2',
      download_method: 'library_file_id_fallback',
      status: 'failure',
      error: 'HTTP 422',
      http_status: 422,
      local_path: null,
      size_bytes: null,
      mime_type: 'application/pdf',
      timestamp: 3,
    },
    // Candidate 3: attempt 1 failed (primary 403), attempt 2 succeeded (fallback 200)
    {
      conversation_id: 'conv-2',
      message_id: 'msg-3',
      candidate_type: 'attachment',
      original_ref: 'ref-3',
      file_id: 'file-3',
      library_file_id: 'lib-3',
      download_method: 'primary_file_id',
      status: 'failure',
      error: 'HTTP 403',
      http_status: 403,
      local_path: null,
      size_bytes: null,
      mime_type: 'image/jpeg',
      timestamp: 4,
    },
    {
      conversation_id: 'conv-2',
      message_id: 'msg-3',
      candidate_type: 'attachment',
      original_ref: 'ref-3',
      file_id: 'lib-3',
      library_file_id: 'lib-3',
      download_method: 'library_file_id_fallback',
      status: 'success',
      error: null,
      http_status: 200,
      local_path: 'attachments/img3.jpg',
      size_bytes: 500,
      mime_type: 'image/jpeg',
      timestamp: 5,
    },
  ];

  const summary = computeAssetLedgerSummary(ledger);

  // Total attempts: 5, failed attempts: 3
  assert.equal(summary.total_download_attempts, 5, 'Total download attempts must be 5');
  assert.equal(summary.failed_download_attempts, 3, 'Failed download attempts must be 3');

  // Total candidates: 3 (Candidate 1, 2, 3)
  assert.equal(summary.total_candidate_assets, 3, 'Total candidate assets must be 3');
  // Candidate 1 saved, Candidate 2 failed, Candidate 3 saved (via fallback)
  assert.equal(summary.saved_candidate_assets, 2, 'Saved candidate assets must be 2');
  assert.equal(summary.failed_candidate_assets, 1, 'Failed candidate assets must be 1');
});

test('V2.4: primary failure + fallback failure results in exactly 1 failed candidate and 2 failed attempts', () => {
  const ledger = [
    {
      conversation_id: 'conv-A',
      message_id: 'msg-A',
      candidate_type: 'attachment',
      original_ref: 'ref-A',
      file_id: 'file-A',
      library_file_id: 'libfile-A',
      download_method: 'primary_file_id',
      status: 'failure',
      error: 'HTTP 403',
      http_status: 403,
      local_path: null,
      size_bytes: null,
      mime_type: null,
      timestamp: 10,
    },
    {
      conversation_id: 'conv-A',
      message_id: 'msg-A',
      candidate_type: 'attachment',
      original_ref: 'ref-A',
      file_id: 'libfile-A',
      library_file_id: 'libfile-A',
      download_method: 'library_file_id_fallback',
      status: 'failure',
      error: 'HTTP 422',
      http_status: 422,
      local_path: null,
      size_bytes: null,
      mime_type: null,
      timestamp: 11,
    },
  ];

  const summary = computeAssetLedgerSummary(ledger);
  assert.equal(summary.total_candidate_assets, 1, 'Exactly 1 candidate asset');
  assert.equal(summary.failed_candidate_assets, 1, 'Exactly 1 failed candidate asset');
  assert.equal(summary.saved_candidate_assets, 0, '0 saved candidate assets');
  assert.equal(summary.total_download_attempts, 2, '2 total download attempts');
  assert.equal(summary.failed_download_attempts, 2, '2 failed download attempts');
});

test('V2.4: sanitize extracts basename from full path and avoids trailing dots or spaces', () => {
  const longPath = 'user-NdXNtnqy2ZCNG9QtxJoaUS3Y/92cb2bc488234d79bcd8f896664a514d/mnt/data/frame_0.jpg';
  const sanitized = sanitize(longPath);
  assert.equal(sanitized, 'frame_0.jpg', 'Must extract clean basename and preserve extension');
  assert.equal(/[. ]+$/.test(sanitized), false, 'Must never end with trailing dot or space');

  const nameWithDots = 'some.very.long.file.name.with.lots.of.dots.and.spaces.at.end.txt. . ';
  const sanitizedDots = sanitize(nameWithDots);
  assert.equal(/[. ]+$/.test(sanitizedDots), false, 'Trailing dots/spaces stripped');
  assert.ok(sanitizedDots.endsWith('.txt'), 'Preserves extension');
});

test('V2.4: writeFile falls back to deterministicSafeFilename if Chromium rejects filename', async () => {
  let fileSavedAs = null;

  // Mock directory handle where 'invalid:name.txt' throws TypeError: Name is not allowed
  const mockParent = {
    getFileHandle: async (name, options) => {
      if (name.includes('invalid:name')) {
        const err = new TypeError("Failed to execute 'getFileHandle' on 'FileSystemDirectoryHandle': Name is not allowed.");
        err.name = 'TypeError';
        throw err;
      }
      fileSavedAs = name;
      return {
        createWritable: async () => ({
          write: async () => {},
          close: async () => {},
        }),
      };
    },
  };

  const savedName = await writeFile(mockParent, 'invalid:name.txt', 'test content');
  assert.ok(savedName.startsWith('asset_'), 'Fallback filename must start with asset_');
  assert.ok(savedName.endsWith('.txt'), 'Fallback filename must keep original extension');
  assert.equal(fileSavedAs, savedName, 'Actual saved filename must match returned name');
});

test('V2.4: writeFile reacquires parent handle on stale handle error (NotFoundError)', async () => {
  let reacquired = false;

  const staleParent = {
    getFileHandle: async () => {
      const err = new Error('A requested file or directory could not be found at the time an operation was processed.');
      err.name = 'NotFoundError';
      throw err;
    },
  };

  const freshParent = {
    getFileHandle: async (name) => {
      return {
        createWritable: async () => ({
          write: async () => {},
          close: async () => {},
        }),
      };
    },
  };

  const reacquireFn = async () => {
    reacquired = true;
    return freshParent;
  };

  const savedName = await writeFile(staleParent, 'test.txt', 'content', reacquireFn);
  assert.equal(savedName, 'test.txt');
  assert.equal(reacquired, true, 'reacquireParent callback must have been invoked');
});

test('V2.4: isValidFilesApiId correctly validates file IDs and rejects libfile_ and file_ with underscore', () => {
  // Valid ChatGPT backend file IDs
  assert.equal(isValidFilesApiId('file-019fe56cd6f47e83804dfee8f7679b5e'), true);
  assert.equal(isValidFilesApiId('file-abc123XYZ'), true);
  assert.equal(isValidFilesApiId('file-550e8400-e29b-41d4-a716-446655440000'), true);

  // Invalid IDs that cause HTTP 422
  assert.equal(isValidFilesApiId('libfile_62487e1cf8b081919f67db477371a65d'), false, 'libfile_ must be rejected');
  assert.equal(isValidFilesApiId('file_62487e1cf8b081919f67db477371a65d'), false, 'file_ with underscore must be rejected');
  assert.equal(isValidFilesApiId('file_00000000bc1881f680eeeca0f5f8d8f0'), false, 'file_0000... must be rejected');
  assert.equal(isValidFilesApiId(''), false);
  assert.equal(isValidFilesApiId(null), false);
  assert.equal(isValidFilesApiId(undefined), false);
});
