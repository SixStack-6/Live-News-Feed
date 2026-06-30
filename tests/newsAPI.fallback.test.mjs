import test from 'node:test';
import assert from 'node:assert/strict';

test('fetchNews falls back to mock articles when the API request fails', async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => ({ ok: false });

  try {
    const { newsAPI } = await import('../js/api/newsAPI.js');
    const result = await newsAPI.fetchNews({ category: 'general', query: '' });

    assert.ok(Array.isArray(result.articles));
    assert.ok(result.articles.length > 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
