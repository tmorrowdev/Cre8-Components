/**
 * Team key custody.
 *
 *   npx tsx test/custody.test.mjs
 *
 * Custody is the part of the harness with a real obligation attached, so these
 * lean on the properties that matter if something goes wrong: a stolen database
 * is useless, records cannot be moved between tenants, tampering is detected,
 * and plaintext never escapes the callback it is handed to.
 */

import { randomBytes } from 'node:crypto';

const { LocalRootKey, RootKeyError, seal, open } = await import('../src/envelope.ts');
const { TeamKeyCustody, InMemoryKeyRecordStore, fingerprint } = await import('../src/custody.ts');

let passed = 0;
const failures = [];

async function test(name, fn) {
  try {
    await fn();
    passed++;
    console.log(`  ok  ${name}`);
  } catch (err) {
    failures.push(name);
    console.log(`FAIL  ${name}\n      ${err.message}`);
  }
}

function assert(cond, message) {
  if (!cond) throw new Error(message ?? 'assertion failed');
}
function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(`${message ?? 'not equal'}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}
async function assertThrows(fn, message) {
  try {
    await fn();
  } catch {
    return;
  }
  throw new Error(message ?? 'expected a throw');
}

const rootMaterial = randomBytes(32);
const root = () => new LocalRootKey(rootMaterial);
const SECRET = 'AIza-team-key-not-real-000000000000';

const custody = (audit) =>
  new TeamKeyCustody({ root: root(), store: new InMemoryKeyRecordStore(), audit });

// ── Refusing weak configuration ──────────────────────────────────────

await test('a short root key is refused, with instructions', async () => {
  try {
    new LocalRootKey(Buffer.alloc(16, 7));
    throw new Error('expected a throw');
  } catch (err) {
    assert(err instanceof RootKeyError, `wrong error type: ${err.message}`);
    assert(/32 bytes/.test(err.message), 'the message should say what is required');
    assert(/randomBytes/.test(err.message), 'the message should say how to generate one');
  }
});

await test('an all-zero root key is refused as a placeholder', async () => {
  await assertThrows(async () => new LocalRootKey(Buffer.alloc(32, 0)), 'all-zero key accepted');
});

await test('a repeating-pattern root key is refused', async () => {
  const repeating = Buffer.from(Array.from({ length: 32 }, (_, i) => i % 4));
  await assertThrows(async () => new LocalRootKey(repeating), 'repeating key accepted');
});

await test('real entropy is accepted', async () => {
  new LocalRootKey(randomBytes(32));
});

// ── The properties that matter if a database leaks ───────────────────

await test('the sealed record contains no trace of the plaintext', async () => {
  const sealed = await seal(SECRET, root(), { tenantId: 'acme', provider: 'gemini' });
  const serialised = JSON.stringify(sealed);
  assert(!serialised.includes(SECRET), 'plaintext present in the sealed record');
  assert(!serialised.includes(SECRET.slice(0, 12)), 'a prefix of the plaintext is present');
});

await test('a record is useless without the root key', async () => {
  const sealed = await seal(SECRET, root(), { tenantId: 'acme', provider: 'gemini' });
  const attacker = new LocalRootKey(randomBytes(32), 'local-v1');
  await assertThrows(
    () => open(sealed, attacker, { tenantId: 'acme', provider: 'gemini' }),
    'a different root key decrypted the record'
  );
});

await test('a record cannot be moved to another tenant', async () => {
  const sealed = await seal(SECRET, root(), { tenantId: 'acme', provider: 'gemini' });
  await assertThrows(
    () => open(sealed, root(), { tenantId: 'other-co', provider: 'gemini' }),
    'a record decrypted under the wrong tenant'
  );
});

await test('a record cannot be reused for another provider', async () => {
  const sealed = await seal(SECRET, root(), { tenantId: 'acme', provider: 'gemini' });
  await assertThrows(
    () => open(sealed, root(), { tenantId: 'acme', provider: 'anthropic' }),
    'a record decrypted under the wrong provider'
  );
});

await test('tampering is detected rather than decrypted into garbage', async () => {
  const sealed = await seal(SECRET, root(), { tenantId: 'acme', provider: 'gemini' });
  const bytes = Buffer.from(sealed.ciphertext, 'base64');
  bytes[0] ^= 0xff;
  const tampered = { ...sealed, ciphertext: bytes.toString('base64') };
  await assertThrows(
    () => open(tampered, root(), { tenantId: 'acme', provider: 'gemini' }),
    'tampered ciphertext was accepted'
  );
});

await test('rotating the root key is detected instead of failing obscurely', async () => {
  const sealed = await seal(SECRET, root(), { tenantId: 'acme', provider: 'gemini' });
  const rotated = new LocalRootKey(randomBytes(32), 'local-v2');
  try {
    await open(sealed, rotated, { tenantId: 'acme', provider: 'gemini' });
    throw new Error('expected a throw');
  } catch (err) {
    assert(/Rewrap/.test(err.message), `expected rotation guidance, got: ${err.message}`);
  }
});

await test('a round trip returns exactly the original secret', async () => {
  const context = { tenantId: 'acme', provider: 'gemini' };
  assertEqual(await open(await seal(SECRET, root(), context), root(), context), SECRET);
});

await test('each seal uses fresh material, so identical secrets differ on disk', async () => {
  const context = { tenantId: 'acme', provider: 'gemini' };
  const a = await seal(SECRET, root(), context);
  const b = await seal(SECRET, root(), context);
  assert(a.ciphertext !== b.ciphertext, 'ciphertext repeated across seals');
  assert(a.wrappedDataKey !== b.wrappedDataKey, 'data key repeated across seals');
});

// ── The custody service ──────────────────────────────────────────────

await test('the key is handed to a callback and never returned', async () => {
  const service = custody();
  await service.store('acme', 'gemini', SECRET);

  let seen = null;
  const result = await service.withKey('acme', 'gemini', async (secret) => {
    seen = secret;
    return 'called';
  });

  assertEqual(seen, SECRET, 'the callback must receive the real key');
  assertEqual(result, 'called');
  // There is deliberately no API that returns the plaintext.
  assert(typeof service.get !== 'function', 'a plaintext getter must not exist');
  assert(typeof service.reveal !== 'function', 'a plaintext getter must not exist');
});

await test('describe() exposes metadata but never key material', async () => {
  const service = custody();
  await service.store('acme', 'gemini', SECRET);
  const described = JSON.stringify(await service.describe('acme'));
  assert(!described.includes(SECRET), 'describe leaked the key');
  assert(described.includes('fingerprint'), 'describe should carry a fingerprint');
});

await test('a fingerprint is not reversible and is salted per tenant', async () => {
  const a = fingerprint(SECRET, 'acme');
  const b = fingerprint(SECRET, 'other-co');
  assert(!a.includes(SECRET.slice(0, 8)), 'fingerprint contains the key');
  assert(a !== b, 'the same key must not fingerprint alike across tenants');
});

await test('revocation makes the key unusable immediately', async () => {
  const service = custody();
  await service.store('acme', 'gemini', SECRET);
  await service.revoke('acme', 'gemini');
  await assertThrows(
    () => service.withKey('acme', 'gemini', async () => 'should not run'),
    'a revoked key was still usable'
  );
});

await test('one tenant cannot use another tenant key', async () => {
  const service = custody();
  await service.store('acme', 'gemini', SECRET);
  await assertThrows(
    () => service.withKey('other-co', 'gemini', async () => 'should not run'),
    'cross-tenant access allowed'
  );
});

await test('the audit trail records use without recording the key', async () => {
  const events = [];
  const service = custody((e) => events.push(e));
  await service.store('acme', 'gemini', SECRET);
  await service.withKey('acme', 'gemini', async () => 'ok');
  await service.revoke('acme', 'gemini');

  assertEqual(events.map((e) => e.action).join(','), 'stored,used,revoked');
  const serialised = JSON.stringify(events);
  assert(!serialised.includes(SECRET), 'the audit trail leaked the key');
  assert(events.every((e) => e.at), 'every event needs a timestamp');
});

await test('a failing audit sink cannot break the operation it describes', async () => {
  const service = custody(() => {
    throw new Error('sink is down');
  });
  await service.store('acme', 'gemini', SECRET);
  assertEqual(await service.withKey('acme', 'gemini', async () => 'ok'), 'ok');
});

await test('an empty key is refused rather than stored', async () => {
  const service = custody();
  await assertThrows(() => service.store('acme', 'gemini', '   '), 'an empty key was stored');
});

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) process.exit(1);
