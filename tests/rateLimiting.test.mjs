import test from 'node:test';
import assert from 'node:assert/strict';
import { parseRetryAfter, AdaptiveRateLimiter, fetchWithRetry } from '../src/utils.ts';
import { fetchConvWithRetry } from '../src/conversations.ts';
import { fetchDownloadUrlOrResponse } from '../src/api.ts';

test('parseRetryAfter: parses numeric seconds correctly', () => {
  assert.equal(parseRetryAfter('5'), 5000);
  assert.equal(parseRetryAfter('120'), 120000);
  assert.equal(parseRetryAfter('0'), 0);
  assert.equal(parseRetryAfter(''), null);
  assert.equal(parseRetryAfter(null), null);
  assert.equal(parseRetryAfter(undefined), null);
  assert.equal(parseRetryAfter('invalid-header'), null);
});

test('parseRetryAfter: parses HTTP date format correctly', () => {
  const futureDate = new Date(Date.now() + 10000).toUTCString();
  const parsed = parseRetryAfter(futureDate);
  assert.ok(parsed !== null && parsed > 5000 && parsed <= 11000, 'Expected ~10000ms but got ' + parsed);
});

test('AdaptiveRateLimiter: dynamic throttling and recovery', () => {
  const limiter = new AdaptiveRateLimiter(200, 3000);
  assert.equal(limiter.getCurrentDelay(), 200);

  // Rate limit hits
  limiter.recordRateLimit(1500);
  assert.ok(limiter.getCurrentDelay() >= 1500, 'Delay should increase on rate limit');

  // Consecutive successes gradually cool down
  limiter.recordSuccess();
  limiter.recordSuccess();
  limiter.recordSuccess();
  assert.ok(limiter.getCurrentDelay() < 1500, 'Delay should decay after 3 successes');

  limiter.reset();
  assert.equal(limiter.getCurrentDelay(), 200);
});

test('fetchWithRetry: 429 -> wait/backoff -> retry -> 200 success', async () => {
  let callCount = 0;
  const originalFetch = window.fetch;

  window.fetch = async (url, options) => {
    callCount++;
    if (callCount === 1) {
      // First attempt returns 429 Too Many Requests with Retry-After: 0
      return new Response('Too Many Requests', {
        status: 429,
        headers: { 'Retry-After': '0' },
      });
    }
    // Second attempt returns 200 OK
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  };

  try {
    const resp = await fetchWithRetry('https://chatgpt.com/backend-api/test-429', {}, 3, 50);
    assert.equal(resp.status, 200, 'Should recover and return HTTP 200');
    assert.equal(callCount, 2, 'Should have made exactly 2 attempts');
  } finally {
    window.fetch = originalFetch;
  }
});

test('fetchConvWithRetry: recovers from 429 to 200 and returns conversation', async () => {
  // 1. Ensure Cred has token
  await window.fetch('https://chatgpt.com/dummy', { headers: { authorization: 'Bearer mock-test-token' } });

  let callCount = 0;
  const originalFetch = window.fetch;

  window.fetch = async (url, options) => {
    const urlStr = String(url);
    if (urlStr.includes('/dummy')) {
      return new Response('ok', { status: 200 });
    }
    if (urlStr.includes('/backend-api/conversation/test-conv-429')) {
      callCount++;
      if (callCount <= 2) {
        return new Response('Too Many Requests', {
          status: 429,
          headers: { 'Retry-After': '0' },
        });
      }
      return new Response(JSON.stringify({
        conversation_id: 'test-conv-429',
        title: 'Recovered Chat',
        create_time: 1700000000,
        update_time: 1700001000,
        mapping: {},
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return originalFetch(url, options);
  };

  try {
    const conv = await fetchConvWithRetry('test-conv-429', null, 3);
    assert.equal(conv.conversation_id, 'test-conv-429');
    assert.equal(conv.title, 'Recovered Chat');
    assert.ok(callCount > 1, 'Should have retried after initial 429s');
  } finally {
    window.fetch = originalFetch;
  }
});

test('fetchDownloadUrlOrResponse: includes conversation_id and recovers from 403', async () => {
  const calls = [];
  const originalFetch = window.fetch;

  window.fetch = async (url, options) => {
    const urlStr = String(url);
    calls.push(urlStr);

    // If gizmo_id is passed, simulate 403 Forbidden
    if (urlStr.includes('gizmo_id=g-custom123')) {
      return new Response('Forbidden', { status: 403 });
    }

    // Without gizmo_id, verify conversation_id is present and return download URL
    if (urlStr.includes('conversation_id=conv-xyz-999')) {
      return new Response(JSON.stringify({
        download_url: 'https://files.oaiusercontent.com/file-success-abc',
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response('Not Found', { status: 404 });
  };

  try {
    const headers = new Headers();
    const result = await fetchDownloadUrlOrResponse(
      'file-success-abc',
      headers,
      'g-custom123',
      'conv-xyz-999'
    );

    assert.equal(result, 'https://files.oaiusercontent.com/file-success-abc');
    assert.equal(calls.length, 2, 'Must have attempted with gizmo_id first, then retried without gizmo_id');
    assert.ok(calls[0].includes('conversation_id=conv-xyz-999'), 'First call must include conversation_id');
    assert.ok(calls[0].includes('gizmo_id=g-custom123'), 'First call must include gizmo_id');
    assert.ok(calls[1].includes('conversation_id=conv-xyz-999'), 'Retry call must retain conversation_id');
    assert.ok(!calls[1].includes('gizmo_id='), 'Retry call must strip gizmo_id');
  } finally {
    window.fetch = originalFetch;
  }
});
