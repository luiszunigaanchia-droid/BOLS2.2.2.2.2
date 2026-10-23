'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const match = html.match(/function runDedupKey\(run\) \{[\s\S]*?\n\}/);
assert.ok(match, 'runDedupKey should exist');
const context = vm.createContext({ JSON });
vm.runInContext(match[0], context);
const key = context.runDedupKey;
// The same comparison is used for existing and imported runs.
test('duplicate signature matches date, sample count and observations', () => {
  const existing = { date: '2026-10-23', samples: [{}, {}], obs: 'observación' };
  assert.equal(key(existing), key({ ...existing, id: 'different', samples: [{}, {}] }));
  assert.notEqual(key(existing), key({ ...existing, obs: 'different' }));
  assert.notEqual(key(existing), key({ ...existing, samples: [{}] }));
});
test('JSON tuple keys are unambiguous even with separators in observations', () => {
  assert.notEqual(
    key({ date: 'a|b', samples: [], obs: 'c' }),
    key({ date: 'a', samples: [], obs: 'b|c' })
  );
});
