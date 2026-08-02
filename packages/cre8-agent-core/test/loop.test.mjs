/**
 * Behaviour-parity tests for the extracted agent loop.
 *
 *   npx tsx test/loop.test.mjs
 *
 * The extraction only counts as a refactor if the bytes on the wire are
 * unchanged, so these assert exact SSE frames against what the original
 * cre8-studio route emitted — not merely "an equivalent shape".
 */

const { runTurn } = await import('../src/loop.ts');
const { toSseFrame } = await import('../src/sse.ts');

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
    throw new Error(
      `${message ?? 'not equal'}\n      expected: ${JSON.stringify(expected)}\n      actual:   ${JSON.stringify(actual)}`
    );
  }
}

/** A provider that replays a fixed chunk script. */
const fakeProvider = (chunks, { throwAfter } = {}) => ({
  name: 'fake',
  async *stream() {
    for (const chunk of chunks) yield chunk;
    if (throwAfter) throw new Error(throwAfter);
  },
});

const collect = async (events) => {
  const out = [];
  for await (const event of events) out.push(event);
  return out;
};

const okValidate = async () => ({ ok: true });
const failValidate = async () => ({ ok: false, error: 'bad spec' });

const run = (chunks, validate = okValidate, opts = {}) =>
  collect(
    runTurn([], { provider: fakeProvider(chunks, opts), systemPrompt: 'sys', validate })
  );

// ── SSE wire format ──────────────────────────────────────────────────

await test('text frames match the original wire format byte for byte', async () => {
  const [event] = await run([{ type: 'text', delta: 'hi' }]);
  assertEqual(toSseFrame(event), 'event: text\ndata: {"delta":"hi"}\n\n');
});

await test('thinking frames are distinct from text frames', async () => {
  const [event] = await run([{ type: 'thinking', delta: 'hmm' }]);
  assertEqual(toSseFrame(event), 'event: thinking\ndata: {"delta":"hmm"}\n\n');
});

await test('a valid tool call emits tool_use with id, spec and caption in order', async () => {
  const spec = { component: 'cre8-button' };
  const [event] = await run([
    { type: 'tool_call', id: 'c1', name: 'render_ui', args: { spec, caption: 'A button' } },
  ]);
  assertEqual(
    toSseFrame(event),
    'event: tool_use\ndata: {"id":"c1","spec":{"component":"cre8-button"},"caption":"A button"}\n\n'
  );
});

await test('an absent caption is omitted from the payload, not sent as null', async () => {
  const [event] = await run([
    { type: 'tool_call', id: 'c1', name: 'render_ui', args: { spec: { component: 'cre8-button' } } },
  ]);
  assert(!toSseFrame(event).includes('caption'), toSseFrame(event));
});

await test('an invalid spec emits tool_use_error carrying the spec back', async () => {
  const spec = { component: 'cre8-nope' };
  const [event] = await run(
    [{ type: 'tool_call', id: 'c1', name: 'render_ui', args: { spec } }],
    failValidate
  );
  assertEqual(
    toSseFrame(event),
    'event: tool_use_error\ndata: {"id":"c1","error":"bad spec","spec":{"component":"cre8-nope"}}\n\n'
  );
});

await test('render_ui without a spec is rejected before validation runs', async () => {
  let called = false;
  const [event] = await run(
    [{ type: 'tool_call', id: 'c1', name: 'render_ui', args: {} }],
    async () => {
      called = true;
      return { ok: true };
    }
  );
  assert(!called, 'validation must not run on a missing spec');
  assertEqual(
    toSseFrame(event),
    'event: tool_use_error\ndata: {"id":"c1","error":"render_ui called without a spec"}\n\n'
  );
});

await test('done carries stop reason and usage', async () => {
  const [event] = await run([{ type: 'stop', stopReason: 'STOP', usage: { total: 7 } }]);
  assertEqual(
    toSseFrame(event),
    'event: done\ndata: {"stop_reason":"STOP","usage":{"total":7}}\n\n'
  );
});

await test('a provider failure becomes an in-band error event, not a throw', async () => {
  const events = await run([{ type: 'text', delta: 'partial' }], okValidate, {
    throwAfter: 'upstream exploded',
  });
  assertEqual(events.length, 2);
  assertEqual(toSseFrame(events[1]), 'event: error\ndata: {"message":"upstream exploded"}\n\n');
});

await test('no done event follows a failure, matching the original', async () => {
  const events = await run([], okValidate, { throwAfter: 'boom' });
  assert(!events.some((e) => e.type === 'done'), 'a failed turn must not report done');
});

// ── Anonymous call numbering ─────────────────────────────────────────

await test('an unknown function is reported as tool_use_error', async () => {
  const [event] = await run([{ type: 'tool_call', id: 'c1', name: 'delete_everything', args: {} }]);
  assertEqual(
    toSseFrame(event),
    'event: tool_use_error\ndata: {"id":"c1","error":"Unknown function: delete_everything"}\n\n'
  );
});

await test('anonymous render_ui calls are numbered in order', async () => {
  const spec = { component: 'cre8-button' };
  const events = await run([
    { type: 'tool_call', name: 'render_ui', args: { spec } },
    { type: 'tool_call', name: 'render_ui', args: { spec } },
  ]);
  assertEqual(events[0].id, 'call_0');
  assertEqual(events[1].id, 'call_1');
});

await test('an unknown function does not advance the counter — preserved from the original', async () => {
  // This asymmetry is almost certainly a latent bug: the unknown call and the
  // render_ui call that follows it share an id. It is preserved deliberately so
  // this change stays a refactor. Fixing it is a separate, declared change.
  const events = await run([
    { type: 'tool_call', name: 'nope', args: {} },
    { type: 'tool_call', name: 'render_ui', args: { spec: { component: 'cre8-button' } } },
  ]);
  assertEqual(events[0].id, 'call_0');
  assertEqual(events[1].id, 'call_0', 'the original reused call_0 here');
});

// ── Ordering ─────────────────────────────────────────────────────────

await test('event order follows chunk order', async () => {
  const events = await run([
    { type: 'thinking', delta: 'a' },
    { type: 'text', delta: 'b' },
    { type: 'tool_call', id: 'c', name: 'render_ui', args: { spec: { component: 'cre8-button' } } },
    { type: 'stop', stopReason: 'STOP' },
  ]);
  assertEqual(events.map((e) => e.type).join(','), 'thinking,text,tool_use,done');
});

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) process.exit(1);
