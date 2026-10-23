'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function loadWorker() {
  const listeners = new Map();
  const deleted = [];
  const self = {
    location: { origin: 'https://example.test' },
    registration: { scope: 'https://example.test/my-app/' },
    clients: { claim: async () => {} },
    skipWaiting: async () => {},
    addEventListener: (type, callback) => listeners.set(type, callback)
  };
  const caches = {
    keys: async () => ['another-pwa-v1', 'ofertanalisis-preanalitica-v8'],
    delete: async (key) => { deleted.push(key); return true; }
  };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', 'sw.js'), 'utf8'),
    { self, caches, URL }, { filename: 'sw.js' });
  return { listeners, deleted };
}

test('ignores navigation requests outside the registered application scope', () => {
  const { listeners } = loadWorker();
  const handler = listeners.get('fetch');
  for (const url of ['https://example.test/other-app/index.html', 'https://external.test/my-app/index.html']) {
    let responded = false;
    handler({ request: { method: 'GET', url, mode: 'navigate' }, respondWith: () => { responded = true; } });
    assert.equal(responded, false);
  }
});

test('never purges caches owned by another application', async () => {
  const { listeners, deleted } = loadWorker();
  let activation;
  listeners.get('activate')({ waitUntil: (promise) => { activation = promise; } });
  await activation;
  assert.deepEqual(deleted, []);
});
