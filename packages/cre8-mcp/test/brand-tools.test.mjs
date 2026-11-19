/**
 * Brand and token tools: list_tokens, get_brand_contract, list_brands,
 * validate_brand, apply_brand — plus the brand voice on the generation path.
 *
 *   npx tsx test/brand-tools.test.mjs
 *
 * design-tokens/tools/brand.mjs is owned by the tokens workstream, so this
 * suite injects test/fixtures/brand-stub.mjs (same exported signatures) through
 * CRE8_BRAND_MODULE, and reads brands from test/fixtures/brands. The schema and
 * token-intents.json are the real ones from packages/cre8-wc/design-tokens.
 * What is under test is the tool layer: routing, input handling, output shape,
 * and the live-surface restyle — not the colour math.
 */

import { fileURLToPath } from 'node:url';

const fixture = (p) => fileURLToPath(new URL(`./fixtures/${p}`, import.meta.url));
process.env.CRE8_BRAND_MODULE = fixture('brand-stub.mjs');
process.env.CRE8_BRANDS_DIR = fixture('brands');

const { createApp } = await import('../src/app.ts');
const { surfaceStore } = await import('../src/surfaces.ts');
const { setBrandModule, handleListTokens } = await import('../src/brand-tools.ts');

const app = createApp({ port: 3999, token: '' });

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

let rpcId = 0;
async function rpc(method, params) {
  const res = await app.request('/mcp', {
    method: 'POST',
    headers: { 'content-type': 'application/json', accept: 'application/json, text/event-stream' },
    body: JSON.stringify({ jsonrpc: '2.0', id: ++rpcId, method, params }),
  });
  const json = await res.json();
  if (json.error) throw new Error(`rpc error: ${json.error.message}`);
  return json.result;
}

/** Calls a tool and parses its single text block. Returns { isError, body }. */
async function call(name, args = {}) {
  const result = await rpc('tools/call', { name, arguments: args });
  const text = result.content[0].text;
  return { isError: result.isError === true, text, body: result.isError ? null : JSON.parse(text) };
}

const ACME_OBJECT = {
  name: 'acme-live',
  extends: 'cre8',
  color: { primary: { $type: 'color', $value: '#0f766e' }, neutral: { $type: 'color', $value: '#57534e' } },
};

// ─── registration ───────────────────────────────────────────────────────────

await test('tools/list carries the five brand tools, each with an object input schema', async () => {
  const { tools } = await rpc('tools/list', {});
  for (const name of ['list_tokens', 'get_brand_contract', 'list_brands', 'validate_brand', 'apply_brand']) {
    const tool = tools.find((t) => t.name === name);
    assert(tool, `${name} missing`);
    assertEqual(tool.inputSchema.type, 'object', `${name} schema`);
    assert(tool.description.length > 80, `${name} needs a description written for agents`);
  }
  const apply = tools.find((t) => t.name === 'apply_brand');
  assert(apply.inputSchema.required.includes('brand'));
  assert('surface_id' in apply.inputSchema.properties && 'scope' in apply.inputSchema.properties);
});

// ─── list_tokens ────────────────────────────────────────────────────────────

await test('list_tokens with no arguments returns seed and semantic only, each described', async () => {
  const { body } = await call('list_tokens');
  assert(body.count > 0);
  assert(body.tokens.every((t) => t.tier === 'seed' || t.tier === 'semantic'), 'only seed + semantic by default');
  assert(body.tokens.every((t) => /^Use for .+\. Never for .+\.$/.test(t.description)), 'every row has use/never');
  assertEqual(body.tokens[0].tier, 'seed', 'seeds sort first');
  assert(body.note.includes('tier'), 'says how to see the rest');
});

await test('list_tokens values come from brand.mjs and descriptions from token-intents.json', async () => {
  const { body } = await call('list_tokens', { tier: 'seed' });
  const primary = body.tokens.find((t) => t.name === '--cre8-seed-primary');
  assertEqual(primary.value, '#3b82f6');
  assertEqual(primary.brandField, 'color.primary', 'a seed names the brand.json field that sets it');
  assert(body.valuesFrom.includes('brand.mjs'));
});

await test('list_tokens marks mode-aware semantic tokens and their legacy alias', async () => {
  const { body } = await call('list_tokens', { tier: 'semantic' });
  const t = body.tokens.find((x) => x.name === '--cre8-bg-brand-strong');
  assertEqual(t.modeAware, true);
  assertEqual(t.legacyAlias, '--cre8-color-bg-brand-strong');
});

await test('list_tokens query searches every tier and component tokens fall back to patterns', async () => {
  const { body } = await call('list_tokens', { query: 'header' });
  const header = body.tokens.find((t) => t.name === '--cre8-header-bg-default');
  assert(header, 'component token found by query');
  assert(header.description.startsWith('Use for'), 'described by pattern');
  const { body: legacy } = await call('list_tokens', { tier: 'legacy' });
  assert(legacy.tokens[0].description.includes('color- prefix'), 'legacy pattern points at the semantic name');
  const { body: unlisted } = await call('list_tokens', { query: 'unlisted' });
  assertEqual(unlisted.tokens[0].description, 'from the module', 'module description used when no intent matches');
});

await test('list_tokens still names seed and semantic tokens when brand.mjs is missing', async () => {
  const saved = process.env.CRE8_BRAND_MODULE;
  process.env.CRE8_BRAND_MODULE = fixture('does-not-exist.mjs');
  setBrandModule(null);
  try {
    const body = JSON.parse(await handleListTokens({}));
    assertEqual(body.count, 84, '11 seeds + 73 semantic from the intents file');
    assert(body.tokens.every((t) => t.value === null));
    assert(body.valuesFrom.startsWith('unavailable'));
  } finally {
    process.env.CRE8_BRAND_MODULE = saved;
    setBrandModule(null);
  }
});

// ─── get_brand_contract / list_brands ───────────────────────────────────────

await test('get_brand_contract returns the real schema, a guide, and the cre8 example', async () => {
  const { body } = await call('get_brand_contract');
  assertEqual(body.schema.title, 'cre8 brand contract');
  assert(body.schema.required.includes('color'));
  assert(body.guide.steps.length >= 3);
  assertEqual(body.example.name, 'cre8');
});

await test('list_brands lists brand.json brands with seeds and flags directories without one', async () => {
  const { body } = await call('list_brands');
  const names = body.brands.map((b) => b.name);
  assert(names.includes('cre8') && names.includes('acme'), names.join());
  const acme = body.brands.find((b) => b.name === 'acme');
  assertEqual(acme.displayName, 'Acme');
  assertEqual(acme.extends, 'cre8');
  assertEqual(acme.seeds.primary, '#0f766e');
  assertEqual(acme.seeds.accent, '#7c3aed', 'inherited seeds come through extends');
  assertEqual(acme.hasVoice, true);
  assert(body.withoutBrandJson.includes('legacy-only'));
});

// ─── validate_brand ─────────────────────────────────────────────────────────

await test('validate_brand passes a good brand object and reports contrast pairs', async () => {
  const { body } = await call('validate_brand', { brand: ACME_OBJECT });
  assertEqual(body.ok, true, JSON.stringify(body.errors));
  assert(Array.isArray(body.contrast.pairs) && body.contrast.pairs.length > 0);
  assertEqual(body.contrast.pass, true);
});

await test('validate_brand fails a low-contrast seed with the pair in errors and contrast', async () => {
  const { body } = await call('validate_brand', {
    brand: { ...ACME_OBJECT, color: { ...ACME_OBJECT.color, primary: { $value: '#fde047' } } },
  });
  assertEqual(body.ok, false);
  assert(body.errors.some((e) => e.startsWith('contrast:')), body.errors.join('; '));
  assertEqual(body.contrast.pass, false);
});

await test('validate_brand reports schema errors and still returns a contrast field', async () => {
  const { body } = await call('validate_brand', { brand: { name: 'Bad Name', color: {} } });
  assertEqual(body.ok, false);
  assert(body.errors.some((e) => e.includes('/name')));
  assert(body.errors.some((e) => e.includes("'primary'")));
  assert('error' in body.contrast, 'contrast explains why it could not run');
});

await test('validate_brand accepts a brand name and warns on overrides', async () => {
  const named = await call('validate_brand', { brand: 'acme' });
  assertEqual(named.body.ok, true);
  const withOverride = await call('validate_brand', {
    brand: { ...ACME_OBJECT, overrides: { '--cre8-bg-default': '#fff' } },
  });
  assertEqual(withOverride.body.warnings.length, 1);
});

await test('a brand name that looks like a path is refused', async () => {
  const res = await call('validate_brand', { brand: '../../etc/passwd' });
  assert(res.isError);
  assert(res.text.includes('not a brand name'));
});

// ─── apply_brand ────────────────────────────────────────────────────────────

await test('apply_brand by name returns the three stylesheets and the brand voice', async () => {
  const { body } = await call('apply_brand', { brand: 'acme' });
  assertEqual(body.brand, 'acme');
  assert(body.css.brandCss.includes('--cre8-seed-primary: #0f766e'));
  assert(body.css.themeCss.length > 0);
  assert(body.css.fontsCss.includes('@font-face'), 'fonts inherited from cre8');
  assertEqual(body.scope, ':root, [data-cre8-theme]');
  assertEqual(body.voice.tone, 'Plain, warm, brief.');
});

await test('apply_brand with scope passes it to the generator', async () => {
  const { body } = await call('apply_brand', { brand: ACME_OBJECT, scope: '[data-cre8-theme="acme"]' });
  assert(body.css.brandCss.startsWith('/* acme-live') && body.css.brandCss.includes('[data-cre8-theme="acme"] {'));
  assert(!body.voice, 'an object without voice gets none');
});

await test('apply_brand refuses a scope that could end the rule', async () => {
  const res = await call('apply_brand', { brand: 'acme', scope: 'x} body{display:none' });
  assert(res.isError);
});

await test('apply_brand refuses a brand that fails validation and generates nothing', async () => {
  const res = await call('apply_brand', {
    brand: { ...ACME_OBJECT, color: { ...ACME_OBJECT.color, primary: { $value: '#fde047' } } },
  });
  assert(res.isError);
  assert(res.text.includes('does not validate') && res.text.includes('contrast:'));
});

await test('apply_brand with surface_id restyles a live surface, and late viewers get the style', async () => {
  const opened = await rpc('tools/call', {
    name: 'ui_open_surface',
    arguments: { spec: { component: 'cre8-layout-container' } },
  });
  const { surfaceId } = JSON.parse(opened.content[0].text);

  const live = [];
  const unsubscribe = surfaceStore.subscribe(surfaceId, (m) => live.push(m));
  const { body } = await call('apply_brand', { brand: 'acme', surface_id: surfaceId });
  unsubscribe();

  assertEqual(body.surface.restyled, true);
  assertEqual(body.surface.brandOverride, 'acme');
  const style = live.find((m) => m.type === 'surface.style');
  assert(style, 'a connected viewer receives surface.style');
  assert(style.css.includes('--cre8-seed-primary: #0f766e'));
  assert(!style.css.includes('@import'), 'sibling @imports are stripped for inline use');
  assert(style.css.includes('url(/themes/acme/assets/fonts/'), 'relative font urls point at the theme route');
  assert(!('seq' in style), 'style messages never touch the model sequence');

  const late = [];
  surfaceStore.subscribe(surfaceId, (m) => late.push(m))();
  assertEqual(late[0].type, 'surface.create', 'replay starts with the resync');
  assertEqual(late[1]?.type, 'surface.style', 'then the style, so the reset does not drop it');

  const state = await (await app.request(`/surfaces/${surfaceId}/state`)).json();
  assertEqual(state.brandOverride, 'acme');
});

await test('apply_brand with an unknown surface_id is a tool error', async () => {
  const res = await call('apply_brand', { brand: 'acme', surface_id: 'nope' });
  assert(res.isError);
  assert(res.text.includes('No surface'));
});

await test('the viewer page handles surface.style without passing it to the renderer', async () => {
  const { renderSurfacePage } = await import('../src/surface-page.ts');
  const html = renderSurfacePage({ surfaceId: 'x' });
  const at = html.indexOf("message.type === 'surface.style'");
  assert(at > 0, 'page knows the message');
  assert(at < html.indexOf('renderer.apply(message)'), 'and returns before the renderer sees it');
  assert(html.includes('el.textContent'), 'css goes in as text, never markup');
});

// ─── voice on the generation path ───────────────────────────────────────────

await test('GET /a2ui/context?brand= carries the brand voice', async () => {
  const res = await app.request('/a2ui/context?names=cre8-button&brand=acme');
  assertEqual(res.status, 200);
  const body = await res.json();
  assertEqual(body.brand.name, 'acme');
  assertEqual(body.brand.voice.tone, 'Plain, warm, brief.');
  assert(body.brand.voice.avoid.includes('synergy'));
});

await test('a brand without voice reports null, and an unknown brand is a 400', async () => {
  const none = await (await app.request('/a2ui/context?names=cre8-button&brand=cre8')).json();
  assertEqual(none.brand.voice, null);
  const res = await app.request('/a2ui/context?names=cre8-button&brand=no-such-brand');
  assertEqual(res.status, 400);
});

await test('ui_open_surface adds no voice when the theme brand sets none', async () => {
  // The fixture brands dir only governs brand.json; the theme must still be
  // a servable sheet, so open on cre8 (no voice) and expect none.
  const opened = await rpc('tools/call', { name: 'ui_open_surface', arguments: { theme: 'cre8' } });
  const summary = JSON.parse(opened.content[0].text);
  assert(!('voice' in summary), 'no voice on a brand that sets none');
});

console.log(`\n${passed} passed, ${failures.length} failed`);
if (failures.length) process.exit(1);
