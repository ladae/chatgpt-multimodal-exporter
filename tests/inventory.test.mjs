import test from 'node:test';
import assert from 'node:assert/strict';
import { mergeInventoryItem } from '../src/inventory.ts';

test('mergeInventoryItem: adds new item correctly', () => {
  const map = new Map();
  const item = mergeInventoryItem(map, {
    id: 'conv-1',
    title: 'Test Conversation 1',
    update_time: 1700000000000,
    scope: 'regular',
  });

  assert.equal(map.size, 1);
  assert.equal(item.id, 'conv-1');
  assert.equal(item.title, 'Test Conversation 1');
  assert.deepEqual(item.scopes, ['regular']);
});

test('mergeInventoryItem: deduplicates by id and merges scopes', () => {
  const map = new Map();
  mergeInventoryItem(map, {
    id: 'conv-1',
    title: 'Test Conversation 1',
    update_time: 1700000000000,
    scope: 'regular',
  });

  // Seen again under project scope with projectId
  const updated = mergeInventoryItem(map, {
    id: 'conv-1',
    title: 'Test Conversation 1',
    update_time: 1700005000000,
    projectId: 'gizmo-abc',
    scope: 'project',
  });

  assert.equal(map.size, 1, 'Map should contain only 1 deduplicated entry');
  assert.deepEqual(updated.scopes, ['regular', 'project']);
  assert.equal(updated.projectId, 'gizmo-abc');
  assert.equal(updated.update_time, 1700005000000);
});

test('mergeInventoryItem: keeps newer update_time when older is passed', () => {
  const map = new Map();
  mergeInventoryItem(map, {
    id: 'conv-1',
    title: 'Newer title',
    update_time: '2026-09-01T12:00:00Z',
    scope: 'regular',
  });

  const merged = mergeInventoryItem(map, {
    id: 'conv-1',
    title: 'Older title',
    update_time: '2026-08-01T12:00:00Z',
    scope: 'archived',
  });

  assert.equal(map.size, 1);
  assert.deepEqual(merged.scopes, ['regular', 'archived']);
  assert.equal(merged.update_time, '2026-09-01T12:00:00Z');
});
