import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateValidationStatus, buildScanReport } from '../src/validation.ts';

const mockCompleteInventory = {
  timestamp: Date.now(),
  complete: true,
  items: [{ id: 'c1' }, { id: 'c2' }],
  scopes: {
    regular: { scope: 'regular', status: 'ok', count: 2 },
    projects: { scope: 'project', status: 'ok', count: 0 },
    archived: { scope: 'archived', status: 'ok', count: 0 },
  },
  errors: [],
};

const mockIncompleteInventory = {
  timestamp: Date.now(),
  complete: false,
  items: [{ id: 'c1' }],
  scopes: {
    regular: { scope: 'regular', status: 'ok', count: 1 },
    projects: { scope: 'project', status: 'failed', count: 0, error: 'Endpoint 404' },
    archived: { scope: 'archived', status: 'ok', count: 0 },
  },
  errors: ['Endpoint 404'],
};

test('evaluateValidationStatus: COMPLETE when all passed without errors', () => {
  const status = evaluateValidationStatus({
    inventoryReport: mockCompleteInventory,
    expectedIds: ['c1', 'c2'],
    savedIds: ['c1', 'c2'],
    failedIds: [],
    missingIds: [],
    totalAssets: 5,
    failedAssets: 0,
  });
  assert.equal(status, 'COMPLETE');
});

test('evaluateValidationStatus: COMPLETE_WITH_ASSET_ERRORS when assets failed but all convs saved', () => {
  const status = evaluateValidationStatus({
    inventoryReport: mockCompleteInventory,
    expectedIds: ['c1', 'c2'],
    savedIds: ['c1', 'c2'],
    failedIds: [],
    missingIds: [],
    totalAssets: 5,
    failedAssets: 2,
  });
  assert.equal(status, 'COMPLETE_WITH_ASSET_ERRORS');
});

test('evaluateValidationStatus: INCOMPLETE_INVENTORY when inventory scope failed', () => {
  const status = evaluateValidationStatus({
    inventoryReport: mockIncompleteInventory,
    expectedIds: ['c1'],
    savedIds: ['c1'],
    failedIds: [],
    missingIds: [],
    totalAssets: 1,
    failedAssets: 0,
  });
  assert.equal(status, 'INCOMPLETE_INVENTORY');
});

test('evaluateValidationStatus: INCOMPLETE_CONVERSATIONS when expected conversation failed', () => {
  const status = evaluateValidationStatus({
    inventoryReport: mockCompleteInventory,
    expectedIds: ['c1', 'c2'],
    savedIds: ['c1'],
    failedIds: ['c2'],
    missingIds: [],
    totalAssets: 2,
    failedAssets: 0,
  });
  assert.equal(status, 'INCOMPLETE_CONVERSATIONS');
});

test('evaluateValidationStatus: INCOMPLETE_CONVERSATIONS when expected conversation is missing', () => {
  const status = evaluateValidationStatus({
    inventoryReport: mockCompleteInventory,
    expectedIds: ['c1', 'c2'],
    savedIds: ['c1'],
    failedIds: [],
    missingIds: ['c2'],
    totalAssets: 2,
    failedAssets: 0,
  });
  assert.equal(status, 'INCOMPLETE_CONVERSATIONS');
});

test('evaluateValidationStatus: FAILED when unhandled exception is present', () => {
  const status = evaluateValidationStatus({
    inventoryReport: mockCompleteInventory,
    expectedIds: ['c1'],
    savedIds: ['c1'],
    failedIds: [],
    missingIds: [],
    totalAssets: 0,
    failedAssets: 0,
    unhandledException: new Error('Disk full'),
  });
  assert.equal(status, 'FAILED');
});
