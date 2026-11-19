#!/usr/bin/env node
/**
 * Brand audit: every component, under every brand, in light and inverse mode.
 *
 *   pnpm audit:brands                       # full audit, gate against baseline
 *   pnpm audit:brands --update-baseline     # rewrite scripts/brand-audit.baseline.json
 *   pnpm audit:brands --brands cre8,regal   # subset
 *   pnpm audit:brands --static-only         # token resolution only, no browser
 *   pnpm audit:brands --out <dir>           # default: brand-audit-report/
 *
 * What it checks, per brand × mode:
 *   1. Unresolved tokens (static, no browser). Every `var(--cre8-*)` in every
 *      component's shadow styles is resolved against the tokens the brand's
 *      theme sheet defines, with CSS's own semantics — fallbacks honoured, an
 *      undefined reference poisons the declaration that holds it. A token that
 *      resolves to nothing is a hole in the brand: the component silently drops
 *      that colour/size/font. This is the inter-brand rethemability guarantee.
 *   2. Leaked literals (browser). Render once with the brand's own primary seed
 *      and once with its complementary hue; a primary-looking colour that does
 *      not move is a literal that bypasses the token chain. Reported, not gated.
 *   3. Colour contrast (browser): axe-core `color-contrast` over the rendered
 *      components.
 *   4. One full-page screenshot per brand × mode.
 *
 * Components are rendered from A2UI material, not hand-written fixtures: every
 * authored example and pattern spec in a2ui/examples and a2ui/patterns, plus a
 * minimal spec synthesised from catalog.json for each component those do not
 * cover. The page loads the CDN bundle (cdn/cre8-wc.esm.js — the same bundle
 * a2ui/render-audit.mjs uses), so build it first: `pnpm build:cdn`.
 *
 * Exit status: 1 when an unresolved token or a per-component contrast count is
 * above scripts/brand-audit.baseline.json; 2 on an audit error (bundle missing,
 * browser failed to launch). Leaks never fail the run.
 */

import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { dirname, extname, join, normalize, relative, resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import {
  collectComponentTokenUsage,
  compareToBaseline,
  discoverBrands,
  findUnresolved,
  parseThemeSheet,
} from './brand-audit/lib.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const WC = resolve(HERE, '..');
const BASELINE = join(HERE, 'brand-audit.baseline.json');
const MODES = ['light', 'inverse'];
const require = createRequire(import.meta.url);
const TEXTY = /^(text|label|heading|headline|title|caption|message|fieldNote|placeholder|content)$/i;
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.png': 'image/png',
};

// ─── args ───────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};
const OUT = resolve(process.cwd(), opt('out', join(WC, 'brand-audit-report')));
const ONLY = opt('brands', '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);
const STATIC_ONLY = flag('static-only');
const UPDATE = flag('update-baseline');

// ─── brands ─────────────────────────────────────────────────────────────────
const brandsDir = join(WC, 'design-tokens', 'brands');
let brands = discoverBrands(brandsDir);
if (ONLY.length) brands = brands.filter((b) => ONLY.includes(b.name));
if (!brands.length) {
  console.error('brand-audit: no brands found');
  process.exit(2);
}

/**
 * The tokens workstream's module (design-tokens/BRAND_CONTRACT.md). Optional:
 * when present, its token-level checkContrast() is folded into the report for
 * brands that have a schema-valid brand.json.
 */
async function loadBrandModule() {
  const file = join(WC, 'design-tokens', 'tools', 'brand.mjs');
  if (!existsSync(file)) return null;
  try {
    return await import(pathToFileURL(file).href);
  } catch (err) {
    console.warn(`brand-audit: brand.mjs present but failed to load (${err.message}); skipping token-level contrast`);
    return null;
  }
}

// ─── 1. static token resolution ─────────────────────────────────────────────
const usage = collectComponentTokenUsage(join(WC, 'components'));
const report = {
  generatedAt: new Date().toISOString(),
  components: usage.usage.size,
  tokenReferences: [...usage.usage.values()].reduce((n, calls) => n + calls.length, 0),
  browser: null,
  render: null,
  brands: {},
};

for (const brand of brands) {
  report.brands[brand.name] = { themeCss: brand.themeCss && relative(WC, brand.themeCss), brandJson: !!brand.brandJson, modes: {} };
  if (!brand.themeCss) {
    report.brands[brand.name].error = `no css/tokens_${brand.name}.css — generate it from brand.json`;
    continue;
  }
  const sheet = parseThemeSheet(brand.themeCss);
  for (const mode of MODES) {
    const unresolved = findUnresolved(sheet[mode], usage);
    report.brands[brand.name].modes[mode] = {
      tokensDefined: sheet[mode].size,
      unresolved: [...unresolved]
        .map(([token, tags]) => ({ token, components: [...tags].sort() }))
        .sort((a, b) => b.components.length - a.components.length || a.token.localeCompare(b.token)),
      leaks: null,
      contrast: null,
      screenshot: null,
    };
  }
}

const brandModule = await loadBrandModule();
if (brandModule?.checkContrast && brandModule?.loadBrand) {
  for (const brand of brands) {
    if (!brand.brandJson) continue;
    try {
      const result = brandModule.checkContrast(brandModule.loadBrand(brand.name));
      const failing = result.pairs.filter((p) => !p.pass);
      report.brands[brand.name].tokenContrast = { target: result.target, pass: result.pass, failing };
    } catch (err) {
      report.brands[brand.name].tokenContrast = { error: err.message };
    }
  }
}

// ─── 2–4. browser checks ────────────────────────────────────────────────────
mkdirSync(OUT, { recursive: true });
let auditError = null;

if (!STATIC_ONLY) {
  try {
    await runBrowserChecks();
  } catch (err) {
    auditError = `browser checks failed: ${err.message.split('\n')[0]}`;
    report.browser = { error: auditError };
  }
}

// ─── gate, write, exit ──────────────────────────────────────────────────────
const baseline = existsSync(BASELINE) ? JSON.parse(readFileSync(BASELINE, 'utf8')) : { brands: {} };
const failures = [];
for (const [name, b] of Object.entries(report.brands)) {
  if (b.error) {
    failures.push(`${name}: ${b.error}`);
    continue;
  }
  for (const mode of MODES) {
    const r = b.modes[mode];
    const contrastResult = r.contrast && !r.contrast.error ? r.contrast : null;
    const cmp = compareToBaseline({ unresolved: r.unresolved, contrast: contrastResult }, baseline.brands?.[name]?.[mode]);
    r.gate = cmp;
    for (const t of cmp.newUnresolved) failures.push(`${name}/${mode}: new unresolved token ${t}`);
    for (const c of cmp.contrastRegressions) failures.push(`${name}/${mode}: ${c.tag} has ${c.count} contrast violations (baseline ${c.baseline})`);
  }
}

const nextBaseline = buildBaseline(report, baseline);
writeFileSync(join(OUT, 'brand-audit.json'), JSON.stringify(report, null, 2) + '\n');
writeFileSync(join(OUT, 'baseline.next.json'), JSON.stringify(nextBaseline, null, 2) + '\n');
if (process.env.CI && flag('print-baseline')) {
  // Artifact downloads are not always reachable; the job log always is.
  console.log('::group::baseline.next.json');
  console.log('BASELINE-BEGIN');
  console.log(JSON.stringify(nextBaseline));
  console.log('BASELINE-END');
  console.log('::endgroup::');
}
const md = renderMarkdown(report, failures);
writeFileSync(join(OUT, 'summary.md'), md);
console.log(md);

if (UPDATE) {
  writeFileSync(BASELINE, JSON.stringify(nextBaseline, null, 2) + '\n');
  console.log(`brand-audit: baseline written to ${relative(process.cwd(), BASELINE)}`);
  process.exit(auditError ? 2 : 0);
}
if (auditError) {
  console.error(`brand-audit: ${auditError}`);
  process.exit(2);
}
if (failures.length) {
  console.error(`brand-audit: ${failures.length} regression(s) above baseline`);
  process.exit(1);
}
process.exit(0);

// ─────────────────────────────────────────────────────────────────────────────

function buildBaseline(rep, previous) {
  const out = {
    $comment:
      'Generated by `pnpm audit:brands --update-baseline`. The audit fails only on unresolved tokens not listed here, or on a component whose contrast violations exceed its count here. `contrast: null` means contrast has not been baselined for that brand × mode (no browser when generated) and is reported but not gated; regenerate with a browser, or copy baseline.next.json from the CI artifact.',
    brands: {},
  };
  for (const [name, b] of Object.entries(rep.brands)) {
    if (b.error) continue;
    out.brands[name] = {};
    for (const mode of MODES) {
      const r = b.modes[mode];
      const prevContrast = previous.brands?.[name]?.[mode]?.contrast ?? null;
      out.brands[name][mode] = {
        unresolved: r.unresolved.map((u) => u.token).sort(),
        contrast: r.contrast && !r.contrast.error ? sortObject(r.contrast.byComponent) : prevContrast,
      };
    }
  }
  return out;
}

function sameTokens(a, b) {
  const key = (list) => list.map((u) => u.token).sort().join('\n');
  return key(a) === key(b);
}

function sortObject(obj) {
  return Object.fromEntries(Object.entries(obj).sort(([a], [b]) => a.localeCompare(b)));
}

/** Specs to render: authored A2UI examples + patterns, then catalog synthesis for the rest. */
function buildSpecs() {
  const catalog = JSON.parse(readFileSync(join(WC, 'a2ui', 'catalog.json'), 'utf8'));
  const defs = catalog.$defs?.components ?? {};
  const specs = [];
  const covered = new Set();
  const walk = (n) => {
    if (!n || typeof n !== 'object') return;
    if (Array.isArray(n)) return n.forEach(walk);
    if (typeof n.component === 'string') covered.add(n.component);
    Object.values(n).forEach(walk);
  };
  for (const [kind, dir] of [
    ['example', join(WC, 'a2ui', 'examples')],
    ['pattern', join(WC, 'a2ui', 'patterns')],
  ]) {
    if (!existsSync(dir)) continue;
    for (const file of readdirSync(dir).filter((f) => f.endsWith('.json')).sort()) {
      const json = JSON.parse(readFileSync(join(dir, file), 'utf8'));
      const spec = json.spec ?? json;
      if (typeof spec.component !== 'string') continue;
      walk(spec);
      specs.push({ id: file.replace(/\.json$/, ''), kind, spec });
    }
  }
  for (const tag of Object.keys(defs).sort()) {
    if (covered.has(tag)) continue;
    specs.push({ id: tag, kind: 'catalog', spec: synthesise(tag, defs) });
  }
  return { specs, catalogComponents: Object.keys(defs).length };
}

function synthesise(tag, defs, depth = 0) {
  const def = defs[tag] ?? {};
  const propDefs = def.properties?.props?.properties ?? {};
  const required = new Set(def.properties?.props?.required ?? []);
  const props = {};
  for (const [name, schema] of Object.entries(propDefs)) {
    const types = [].concat(schema.type ?? []);
    if (schema.enum && required.has(name)) props[name] = schema.enum[0];
    else if (types.includes('string') && !schema.enum && TEXTY.test(name)) props[name] = `Sample ${name}`;
    else if (required.has(name) && types.includes('string')) props[name] = `sample-${name}`;
    else if (name === 'items' && types.includes('array')) {
      props[name] = [
        { label: 'Option one', value: 'one' },
        { label: 'Option two', value: 'two' },
      ];
    }
  }
  const item = `${tag}-item`;
  const content = depth === 0 && defs[item] ? [synthesise(item, defs, 1), synthesise(item, defs, 1)] : ['Sample content'];
  const spec = { component: tag, props };
  const slots = Object.keys(def.properties?.slots?.properties ?? {});
  if (def.properties?.children !== undefined) spec.children = content;
  else if (slots.length) {
    // Fill every declared slot: overlays (popover, tooltip) need their trigger
    // to render at all, and header/footer slots carry styled text worth seeing.
    spec.slots = {};
    for (const slot of slots) {
      if (slot === 'default') spec.slots.default = content;
      else if (slot === 'trigger') spec.slots.trigger = [{ component: 'cre8-button', props: { text: 'Trigger' } }];
      else if (!/icon|svg|image|media|logo/i.test(slot)) spec.slots[slot] = [`Sample ${slot}`];
    }
  }
  return spec;
}

function pageHtml(brand) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>cre8 brand audit · ${brand.name}</title>
<link rel="stylesheet" href="/${relative(WC, brand.themeCss).split(sep).join('/')}">
<style>
  body { margin: 0; padding: 24px; background: var(--cre8-color-bg-default, Canvas); color: var(--cre8-color-content-default, CanvasText);
         font-family: var(--cre8-seed-font, system-ui, sans-serif); }
  #root { display: grid; gap: 24px; max-width: 1200px; margin: 0 auto; }
  .cell { border: 1px dashed rgb(128 128 128 / 0.5); padding: 16px; }
  .cell-label { font: 12px/1.4 ui-monospace, monospace; opacity: 0.7; margin-bottom: 8px; }
</style>
<script type="module" src="/__audit/page.js"></script>
</head>
<body><main id="root"></main></body>
</html>`;
}

async function startServer(specsJson) {
  const page = new Map(brands.filter((b) => b.themeCss).map((b) => [b.name, pageHtml(b)]));
  const server = createServer((req, res) => {
    const url = new URL(req.url, 'http://localhost');
    const send = (status, type, body) => {
      res.writeHead(status, { 'content-type': type, 'cache-control': 'no-store' });
      res.end(body);
    };
    if (url.pathname === '/__audit/index.html') return send(200, MIME['.html'], page.get(url.searchParams.get('brand')) ?? 'unknown brand');
    if (url.pathname === '/__audit/specs.json') return send(200, MIME['.json'], specsJson);
    if (url.pathname === '/__audit/page.js') return send(200, MIME['.js'], readFileSync(join(HERE, 'brand-audit', 'page.js')));
    const file = normalize(join(WC, decodeURIComponent(url.pathname)));
    if (!file.startsWith(WC + sep) || !existsSync(file)) return send(404, 'text/plain', 'not found');
    try {
      return send(200, MIME[extname(file)] ?? 'application/octet-stream', readFileSync(file));
    } catch {
      return send(404, 'text/plain', 'not found');
    }
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  return server;
}

async function runBrowserChecks() {
  const bundle = join(WC, 'cdn', 'cre8-wc.esm.js');
  if (!existsSync(bundle)) throw new Error('cdn/cre8-wc.esm.js missing — run `pnpm build:cdn` first');
  const axePath = require.resolve('axe-core/axe.min.js');
  const { chromium } = await import('playwright');

  const { specs, catalogComponents } = buildSpecs();
  writeFileSync(join(OUT, 'specs.json'), JSON.stringify(specs, null, 2) + '\n');
  const server = await startServer(JSON.stringify(specs));
  const base = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch();
  report.browser = { name: 'chromium', version: browser.version() };
  const shotsDir = join(OUT, 'screenshots');
  mkdirSync(shotsDir, { recursive: true });

  try {
    for (const brand of brands) {
      if (!brand.themeCss) continue;
      const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, colorScheme: 'light', reducedMotion: 'reduce' });
      const page = await context.newPage();
      page.on('pageerror', (err) => console.error(`brand-audit: [${brand.name}] page error: ${err.message.split('\n')[0]}`));
      await page.goto(`${base}/__audit/index.html?brand=${encodeURIComponent(brand.name)}`);
      await page.waitForFunction(() => window.__audit?.state?.ready === true, null, { timeout: 120_000 });
      await page.addScriptTag({ path: axePath });
      const state = await page.evaluate(() => window.__audit.state);
      if (!report.render) {
        report.render = {
          cells: specs.length,
          byKind: specs.reduce((acc, s) => ((acc[s.kind] = (acc[s.kind] ?? 0) + 1), acc), {}),
          catalogComponents,
          componentsPresent: state.componentsPresent.length,
          errors: state.errors,
        };
      }
      for (const mode of MODES) {
        const r = report.brands[brand.name].modes[mode];
        await page.evaluate((m) => window.__audit.setMode(m), mode);
        const shot = join(shotsDir, `${brand.name}-${mode}.png`);
        await page.screenshot({ path: shot, fullPage: true });
        r.screenshot = relative(OUT, shot).split(sep).join('/');
        try {
          const c = await page.evaluate(() => window.__audit.contrast());
          const byComponent = {};
          for (const v of c.violations) byComponent[v.component] = (byComponent[v.component] ?? 0) + 1;
          r.contrast = { count: c.violations.length, incomplete: c.incomplete, byComponent: sortObject(byComponent), violations: c.violations };
        } catch (err) {
          r.contrast = { error: err.message.split('\n')[0] };
        }
        try {
          r.leaks = await page.evaluate(() => window.__audit.detectLeaks());
        } catch (err) {
          r.leaks = { error: err.message.split('\n')[0], candidates: [] };
        }
        console.error(
          `brand-audit: ${brand.name}/${mode}: ${r.unresolved.length} unresolved, ` +
            `${r.leaks?.candidates?.length ?? '?'} leak candidates, ${r.contrast?.count ?? '?'} contrast violations`,
        );
      }
      await context.close();
    }
  } finally {
    await browser.close();
    server.close();
  }
}

function renderMarkdown(rep, fails) {
  const L = [];
  L.push('# cre8 brand audit', '');
  L.push(
    `${rep.components} components, ${rep.tokenReferences} distinct \`var(--cre8-*)\` references.` +
      (rep.render
        ? ` Rendered ${rep.render.cells} cells (${Object.entries(rep.render.byKind)
            .map(([k, n]) => `${n} ${k}`)
            .join(', ')}); ${rep.render.componentsPresent}/${rep.render.catalogComponents} catalog components present on the page${rep.render.errors.length ? `, ${rep.render.errors.length} render errors` : ''}.`
        : ''),
  );
  if (rep.browser?.error) L.push('', `> **Browser checks did not run:** ${rep.browser.error}`);
  else if (!rep.browser) L.push('', '> Browser checks skipped (`--static-only`): no leak, contrast or screenshot data.');
  L.push('');
  L.push(fails.length ? `**Result: FAIL** — ${fails.length} regression(s) above baseline.` : '**Result: PASS** — nothing above baseline.');
  L.push('');
  L.push('| brand | mode | unresolved tokens | components affected | leak candidates | contrast violations | gate |');
  L.push('|---|---|--:|--:|--:|--:|---|');
  for (const [name, b] of Object.entries(rep.brands)) {
    if (b.error) {
      L.push(`| ${name} | – | – | – | – | – | error: ${b.error} |`);
      continue;
    }
    for (const mode of MODES) {
      const r = b.modes[mode];
      const affected = new Set(r.unresolved.flatMap((u) => u.components)).size;
      const leaks = r.leaks ? (r.leaks.skipped ? `n/a` : r.leaks.error ? 'error' : r.leaks.candidates.length) : '–';
      const contrast = r.contrast ? (r.contrast.error ? 'error' : r.contrast.count) : '–';
      const g = r.gate;
      const gate = g.newUnresolved.length || g.contrastRegressions.length
        ? `❌ ${g.newUnresolved.length} new token(s), ${g.contrastRegressions.length} contrast regression(s)`
        : g.contrastGated || !r.contrast ? '✅' : '✅ (contrast not baselined)';
      L.push(`| ${name} | ${mode} | ${r.unresolved.length} | ${affected} | ${leaks} | ${contrast} | ${gate} |`);
    }
  }
  if (fails.length) {
    L.push('', '## Regressions', '');
    for (const f of fails.slice(0, 50)) L.push(`- ${f}`);
    if (fails.length > 50) L.push(`- … and ${fails.length - 50} more (see brand-audit.json)`);
  }
  for (const [name, b] of Object.entries(rep.brands)) {
    if (b.error) continue;
    L.push('', `## ${name}`, '');
    if (b.tokenContrast) {
      L.push(
        b.tokenContrast.error
          ? `- Token-level contrast (brand.mjs): error — ${b.tokenContrast.error}`
          : `- Token-level contrast (brand.mjs, ${b.tokenContrast.target}): ${b.tokenContrast.pass ? 'pass' : `${b.tokenContrast.failing.length} failing pair(s)`}`,
      );
    }
    for (const mode of MODES) {
      const r = b.modes[mode];
      L.push(`<details><summary><b>${mode}</b> — ${r.unresolved.length} unresolved, ${r.leaks?.candidates?.length ?? '–'} leaks, ${r.contrast?.count ?? '–'} contrast</summary>`, '');
      const sameAsLight = mode !== 'light' && sameTokens(r.unresolved, b.modes.light.unresolved);
      if (sameAsLight && r.unresolved.length) L.push('Unresolved tokens: same set as light.', '');
      else if (r.unresolved.length) {
        L.push('Unresolved tokens (token → components reading it with no fallback):', '');
        for (const u of r.unresolved.slice(0, 25)) {
          L.push(`- \`${u.token}\` — ${u.components.length}: ${u.components.slice(0, 6).join(', ')}${u.components.length > 6 ? ', …' : ''}`);
        }
        if (r.unresolved.length > 25) L.push(`- … ${r.unresolved.length - 25} more in brand-audit.json`);
        L.push('');
      }
      if (r.leaks?.skipped) L.push(`Leaks: skipped — ${r.leaks.skipped}.`, '');
      else if (r.leaks?.candidates?.length) {
        L.push(`Leak candidates (primary-hued colours unchanged when the seed moves ${r.leaks.seed} → ${r.leaks.alternate}; ${r.leaks.changed}/${r.leaks.sampled} sampled colours did move):`, '');
        const top = [...r.leaks.candidates].sort((a, z) => z.elements - a.elements).slice(0, 15);
        for (const c of top) L.push(`- ${c.component} \`${c.property}\` ${c.value} (${c.elements} element${c.elements === 1 ? '' : 's'})`);
        L.push('');
      }
      if (r.contrast?.count) {
        L.push('Contrast violations by component:', '');
        for (const [tag, n] of Object.entries(r.contrast.byComponent).sort(([, a], [, z]) => z - a)) L.push(`- ${tag}: ${n}`);
        L.push('');
        // The distinct failing colour pairs, so a fix can target the tokens behind them.
        const pairs = new Map();
        for (const v of r.contrast.violations || []) {
          if (!v.data) continue;
          const key = `${v.component} ${v.data.fg} on ${v.data.bg}`;
          const p = pairs.get(key) || { ...v.data, component: v.component, n: 0 };
          p.n += 1;
          pairs.set(key, p);
        }
        if (pairs.size) {
          L.push('Failing colour pairs:', '');
          for (const p of [...pairs.values()].sort((a, z) => z.n - a.n)) {
            L.push(`- ${p.component}: \`${p.fg}\` on \`${p.bg}\` is ${p.ratio}:1, needs ${p.expected} (${p.n}×)`);
          }
          L.push('');
        }
      }
      L.push('</details>', '');
    }
  }
  return L.join('\n') + '\n';
}
