/**
 * The invariant that makes BYOK possible.
 *
 *   npx tsx test/credentials.test.mjs
 *
 * Nothing in this package may read ambient credentials. A provider that reaches
 * for `process.env` works fine on a server and fails silently in a browser or a
 * native shell — the exact failure that is cheap to introduce and expensive to
 * find, so it is asserted rather than left to review.
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const srcDir = join(here, '..', 'src');

let passed = 0;
const failures = [];

function test(name, fn) {
  try {
    fn();
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

/**
 * Strips comments before scanning.
 *
 * Without this the check matches its own documentation — every file here
 * explains *why* it does not read `process.env`, and prose describing the rule
 * would fail the rule. Code is what needs asserting.
 */
function code(file) {
  return readFileSync(file, 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:])\/\/.*$/gm, '$1');
}

function sourceFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...sourceFiles(full));
    else if (entry.endsWith('.ts')) out.push(full);
  }
  return out;
}

const files = sourceFiles(srcDir);

test('the package has sources to check', () => {
  assert(files.length >= 5, `only found ${files.length} source files`);
});

test('no source reads process.env', () => {
  const offenders = files.filter((f) => /process\s*\.\s*env/.test(code(f)));
  assert(
    offenders.length === 0,
    `ambient credential access in:\n      ${offenders.join('\n      ')}`
  );
});

test('no source reads other ambient credential stores', () => {
  const patterns = [/localStorage/, /sessionStorage/, /readFileSync\s*\(\s*['"`]~/, /\.aws\/credentials/];
  const offenders = [];
  for (const file of files) {
    const text = code(file);
    if (patterns.some((p) => p.test(text))) offenders.push(file);
  }
  assert(offenders.length === 0, `ambient credential access in: ${offenders.join(', ')}`);
});

test('credentials are reachable only through the ProviderCredentials argument', () => {
  const provider = code(join(srcDir, 'providers', 'gemini.ts'));
  assert(provider.includes('credentials'), 'the provider must take credentials');
  assert(
    !/apiKey\s*:\s*process/.test(provider),
    'the provider must not default a key from the environment'
  );
});

test('the loop takes no credentials at all', () => {
  const loop = code(join(srcDir, 'loop.ts'));
  assert(!/apiKey|credential/i.test(loop), 'the loop must be credential-free — providers hold them');
});

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) process.exit(1);
