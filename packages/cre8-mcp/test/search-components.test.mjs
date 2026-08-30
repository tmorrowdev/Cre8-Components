/**
 * search_components tests — the lexical-fallback path.
 *
 *   npx tsx test/search-components.test.mjs
 *
 * Semantic search needs a committed catalog-embeddings.json and a live
 * OPENAI_API_KEY, neither of which this suite can assume. What it locks in
 * instead is the contract handleSearchComponents makes to every caller:
 * with no key and no embeddings file it must behave exactly as the old
 * synchronous, lexical-only implementation did, and say so via
 * `searchMode: 'lexical'` rather than silently returning fewer results.
 */
delete process.env.OPENAI_API_KEY;

const { handleSearchComponents } = await import('../src/handlers.ts');

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

await test('with no OPENAI_API_KEY, a real query is answered lexically', async () => {
  const result = JSON.parse(await handleSearchComponents({ query: 'button' }));
  assertEqual(result.searchMode, 'lexical');
  assert(result.count > 0, 'expected at least one match for "button"');
  assert(result.results.some((r) => r.name.includes('button')), 'a matching component name should include "button"');
  assert('score' in result.results[0] === false, 'lexical results should not carry a semantic score');
});

await test('with no OPENAI_API_KEY, an unmatched query says so, still lexically', async () => {
  const result = JSON.parse(
    await handleSearchComponents({ query: 'zzz-nonexistent-component-zzz' })
  );
  assertEqual(result.searchMode, 'lexical');
  assert(result.message?.includes('No components found'), 'should report no matches, not throw');
});

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) process.exit(1);
