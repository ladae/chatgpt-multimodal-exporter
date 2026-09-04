import test from 'node:test';
import assert from 'node:assert/strict';
import { tryAcquireLeader, runExclusiveStateOp, LEADER_LOCK_NAME, STATE_LOCK_NAME } from '../src/mutex.ts';

// Mock Web Locks API
function createMockLocks() {
  const heldLocks = new Set();
  const queue = [];

  return {
    async request(name, optionsOrCallback, maybeCallback) {
      const options = typeof optionsOrCallback === 'object' ? optionsOrCallback : {};
      const callback = typeof optionsOrCallback === 'function' ? optionsOrCallback : maybeCallback;

      if (options.ifAvailable) {
        if (heldLocks.has(name)) {
          return callback(null);
        }
        heldLocks.add(name);
        try {
          return await callback({ name, mode: options.mode || 'exclusive' });
        } finally {
          heldLocks.delete(name);
        }
      }

      // Exclusive FIFO queue
      return new Promise((resolve, reject) => {
        const runTask = async () => {
          heldLocks.add(name);
          try {
            const res = await callback({ name, mode: options.mode || 'exclusive' });
            resolve(res);
          } catch (e) {
            reject(e);
          } finally {
            heldLocks.delete(name);
            if (queue.length > 0) {
              const next = queue.shift();
              next();
            }
          }
        };

        if (heldLocks.has(name)) {
          queue.push(runTask);
        } else {
          runTask();
        }
      });
    },
  };
}

test('tryAcquireLeader: single tab acquires leadership', async () => {
  const locks = createMockLocks();
  Object.defineProperty(globalThis.navigator, 'locks', { value: locks, configurable: true, writable: true });

  let ran = false;
  const acquired = await tryAcquireLeader(async () => {
    ran = true;
  });

  assert.equal(acquired, true, 'First caller should acquire leader');
  assert.equal(ran, true, 'Callback should have executed');
});

test('tryAcquireLeader: second tab is rejected when first tab holds lock', async () => {
  const locks = createMockLocks();
  Object.defineProperty(globalThis.navigator, 'locks', { value: locks, configurable: true, writable: true });

  let tab1Release;
  const tab1Promise = new Promise((r) => { tab1Release = r; });

  const tab1Execution = tryAcquireLeader(async () => {
    await tab1Promise;
  });

  // Second tab attempts while tab 1 holds
  let tab2Ran = false;
  const tab2Acquired = await tryAcquireLeader(async () => {
    tab2Ran = true;
  });

  assert.equal(tab2Acquired, false, 'Second tab must receive false (standby role)');
  assert.equal(tab2Ran, false, 'Second tab callback must not execute');

  // Release tab 1
  tab1Release();
  await tab1Execution;

  // Now tab 2 can acquire
  const tab2AcquiredAfter = await tryAcquireLeader(async () => {
    tab2Ran = true;
  });
  assert.equal(tab2AcquiredAfter, true, 'Tab 2 can acquire leader once released');
  assert.equal(tab2Ran, true);
});

test('runExclusiveStateOp: executes sequentially', async () => {
  const locks = createMockLocks();
  Object.defineProperty(globalThis.navigator, 'locks', { value: locks, configurable: true, writable: true });

  const order = [];
  const p1 = runExclusiveStateOp(async () => {
    await new Promise((r) => setTimeout(r, 20));
    order.push('op1');
  });

  const p2 = runExclusiveStateOp(async () => {
    order.push('op2');
  });

  await Promise.all([p1, p2]);
  assert.deepEqual(order, ['op1', 'op2'], 'State operations must be strictly serialized');
});
