/**
 * Generator tests. Run: pnpm test:tokens (node --test design-tokens/tools/*.test.mjs)
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import {
  BRANDS_DIR, checkContrast, generateBrandCss, generateBrandFiles, listBrands, listTokens,
  loadBrand, resolveToken, validateBrand, GENERATED_BANNER,
} from './brand.mjs';
import { createResolver, parseSheet } from './lib/resolve.mjs';
import { contrastRatio, oklchToHex, parseColor } from './lib/color.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const FIXTURES = path.join(HERE, 'fixtures');
const CLI = path.join(HERE, 'brand-cli.mjs');
const hex = (v) => v.replace(/oklch\([^)]*\)/g, (m) => oklchToHex(parseColor(m)));

describe('colour math', () => {
  test('WCAG ratios match the reference values', () => {
    assert.equal(Number(contrastRatio('#000000', '#ffffff').toFixed(2)), 21);
    assert.equal(Number(contrastRatio('#767676', '#ffffff').toFixed(2)), 4.54);
  });
  test('relative oklch ramps reproduce the Tailwind steps they were fitted to', () => {
    const cre8 = loadBrand('cre8');
    assert.equal(resolveToken(cre8, 'primary-600'), '#2563eb');
    assert.equal(resolveToken(cre8, 'neutral-900'), '#0f172a');
    assert.equal(resolveToken(cre8, 'error-600'), '#db2777');
  });
});

describe('loadBrand / validateBrand', () => {
  test('every shipped brand validates', () => {
    assert.deepEqual(listBrands(), ['blank', 'cre8', 'cre8-a2ui', 'cre8-vivid', 'regal']);
    for (const name of listBrands()) {
      const r = validateBrand(loadBrand(name));
      assert.equal(r.ok, true, `${name}: ${r.errors.join('; ')}`);
    }
  });
  test('unknown brand throws', () => {
    assert.throws(() => loadBrand('no-such-brand'), /Unknown brand/);
  });
  test('extends merges the parent: cre8-vivid inherits cre8 typography', () => {
    const vivid = loadBrand('cre8-vivid');
    assert.equal(vivid.name, 'cre8-vivid');
    assert.equal(vivid.typography.fontFaces.length, 4);
    assert.equal(vivid.color.primary.$value, '#4f46e5');
    assert.deepEqual(vivid.accessibility.waive, [], 'a child array replaces the parent array');
  });
  test('schema violations are errors', () => {
    const r = validateBrand(loadBrand(path.join(FIXTURES, 'invalid')));
    assert.equal(r.ok, false);
    const all = r.errors.join('\n');
    assert.match(all, /\/name/);
    assert.match(all, /\/color\/primary\/\$value/);
    assert.match(all, /\/shape\/radius\/\$value/);
    assert.match(all, /sparkle/);
  });
  test('overrides and waivers are warnings, not errors', () => {
    const vivid = validateBrand(loadBrand('cre8-vivid'));
    assert.equal(vivid.warnings.filter((w) => w.startsWith('override:')).length, 3);
    const waived = { ...structuredClone(loadBrand('cre8')) };
    waived.accessibility = { contrastTarget: 'AA', waive: [{ fg: 'content-link', bg: 'bg-default', mode: 'light', reason: 'test' }] };
    const r = validateBrand(waived);
    assert.equal(r.ok, true);
    assert.equal(r.warnings.filter((w) => w.startsWith('contrast waived')).length, 1);
  });
});

describe('generate: cre8 round trip', () => {
  const cre8 = loadBrand('cre8');
  const { brandCss, themeCss, fontsCss } = generateBrandCss(cre8);

  test('generated files carry the banner and match what is committed', () => {
    for (const css of [brandCss, themeCss, fontsCss]) assert.ok(css.includes(GENERATED_BANNER));
    const files = generateBrandFiles(cre8, { withModule: true });
    for (const [rel, content] of Object.entries(files)) {
      assert.equal(fs.readFileSync(path.join(BRANDS_DIR, 'cre8', rel), 'utf8'), content, `${rel} is stale`);
    }
  });

  test('with the guard off, every token of the hand-maintained sheet is emitted and resolves identically', () => {
    const legacy = parseSheet(fs.readFileSync(path.join(FIXTURES, 'cre8-legacy-tokens_brand.css.fixture'), 'utf8'));
    const generated = parseSheet(generateBrandCss(cre8, { autoCorrect: false }).brandCss);
    const a = createResolver(legacy); const b = createResolver(generated);
    let compared = 0;
    for (const name of legacy.base.keys()) {
      assert.ok(generated.base.has(name), `${name} missing`);
      for (const mode of ['light', 'inverse']) {
        assert.equal(hex(b.resolveName(name, mode)), hex(a.resolveName(name, mode)), `${name} (${mode})`);
        compared++;
      }
    }
    assert.ok(compared > 1900);
  });

  test('new tokens default to values that change nothing visible', () => {
    assert.equal(resolveToken(cre8, 'font-family-display'), resolveToken(cre8, 'font-family-base'));
    assert.equal(resolveToken(cre8, 'focus-ring-color'), '#3b82f6');
    assert.equal(resolveToken(cre8, 'focus-ring-width'), '2px');
    assert.equal(resolveToken(cre8, 'duration-base'), '200ms');
    assert.equal(resolveToken(cre8, 'bg-info'), resolveToken(cre8, 'accent-50'));
    assert.equal(resolveToken(cre8, 'chart-1'), '#3b82f6');
    assert.match(brandCss, /@media \(prefers-reduced-motion: reduce\)[\s\S]*--cre8-duration-base: 0ms/);
    assert.match(themeCss, /--cre8-typography-headline-large-font-family: var\(--cre8-font-family-display\)/);
    assert.match(themeCss, /--cre8-typography-body-default-font-family: var\(--cre8-font-families-inter\)/);
  });

  test('listTokens reports tiers', () => {
    const seeds = listTokens({ tier: 'seed' }).map((t) => t.name);
    assert.ok(seeds.includes('--cre8-seed-primary'));
    assert.ok(listTokens({ tier: 'legacy' }).some((t) => t.name === '--cre8-font-families-inter'));
    assert.ok(listTokens({ tier: 'semantic' }).some((t) => t.name === '--cre8-mode-bg-default'));
  });

  test('opts.scope replaces the :root / [data-cre8-theme] selectors', () => {
    const scoped = generateBrandCss(cre8, { scope: '.embed' }).brandCss;
    assert.ok(!/^:root/m.test(scoped));
    assert.match(scoped, /^\.embed\[data-mode="inverse"\],\n\[data-mode="inverse"\] \.embed \{/m);
  });
});

describe('phase 2 seeds', () => {
  const base = loadBrand('cre8');
  const variant = (patch) => ({ ...structuredClone(base), name: 'variant', accessibility: { contrastTarget: 'AA' }, ...patch });

  test('scaleRatio gives a modular scale around the body size', () => {
    const b = variant({ typography: { ...base.typography, scaleRatio: { $type: 'number', $value: 1.25 } } });
    assert.equal(validateBrand(b).ok, true);
    assert.equal(resolveToken(b, 'font-size-2'), '1rem');
    assert.equal(resolveToken(b, 'font-size-3'), '1.25rem');
    assert.equal(resolveToken(b, 'font-size-1'), '0.8rem');
  });
  test('density scales control padding, not layout spacing', () => {
    const b = variant({ space: { base: { $value: '0.25rem' }, density: 'compact' } });
    assert.equal(resolveToken(b, 'button-padding-horizontal-medium'), '1.2rem');
    assert.equal(resolveToken(b, 'padding-16'), '0.8rem');
    assert.equal(resolveToken(b, 'spacing-16'), '1rem');
  });
  test('control and button radius', () => {
    const b = variant({ shape: { radius: { $value: '16px' }, controlRadius: { $value: '6px' }, buttonRadius: { $value: '9999px' } } });
    assert.equal(resolveToken(b, 'radius-field'), '6px');
    assert.equal(resolveToken(b, 'radius-checkbox'), '2px');
    assert.equal(resolveToken(b, 'radius-button'), '9999px');
    assert.equal(resolveToken(b, 'radius-container'), '16px');
  });
  test('flat elevation removes shadows; regal is square and flat', () => {
    const regal = loadBrand('regal');
    for (const s of ['shadow-small', 'shadow-default', 'shadow-large']) assert.equal(resolveToken(regal, s), 'none');
    for (const r of ['radius-button', 'radius-field', 'radius-container', 'radius-pill', 'radius-checkbox']) assert.equal(resolveToken(regal, r), '0px');
    assert.equal(resolveToken(regal, 'font-family-base'), 'Aeonik, sans-serif');
    assert.match(generateBrandCss(regal).fontsCss, /Aeonik-Regular\.woff2/);
  });
  test('display and mono families, explicit chart and info seeds', () => {
    const b = variant({
      typography: { ...base.typography, display: { $value: ['Fraunces', 'serif'] }, mono: { $value: ['JetBrains Mono', 'monospace'] } },
      color: { ...base.color, info: { $value: '#0ea5e9' }, chart: ['#111111', '#222222', '#333333'].map(($value) => ({ $value })) },
    });
    assert.equal(validateBrand(b).ok, true);
    assert.equal(resolveToken(b, 'font-family-display'), 'Fraunces, serif');
    assert.equal(resolveToken(b, 'font-family-mono'), '"JetBrains Mono", monospace');
    assert.equal(resolveToken(b, 'info-500'), '#0ea5e9');
    assert.ok(contrastRatio(resolveToken(b, 'content-knockout'), resolveToken(b, 'bg-info-strong')) >= 4.5, 'the info fill is deepened until white reads on it');
    assert.equal(resolveToken(b, 'chart-3'), '#333333');
  });
});

describe('contrast guard', () => {
  test('cre8 passes with no waivers: primary deepens to 600, status text darkens', () => {
    const cre8 = loadBrand('cre8');
    assert.deepEqual(cre8.accessibility.waive ?? [], []);
    const r = checkContrast(cre8);
    assert.equal(r.pass, true);
    assert.ok(r.pairs.every((p) => p.pass));
    assert.equal(resolveToken(cre8, 'content-link'), '#2563eb', 'link moves to primary-600');
    assert.equal(resolveToken(cre8, 'bg-brand-strong'), '#2563eb', 'a mid-blue fill is deepened, the white knockout kept');
    assert.equal(resolveToken(cre8, 'content-knockout'), '#ffffff');
    assert.equal(resolveToken(cre8, 'bg-success-strong'), resolveToken(cre8, 'success-700'), 'cyan badge fill deepens');
    assert.equal(resolveToken(cre8, 'bg-success', 'inverse'), resolveToken(cre8, 'success-950', 'inverse'), 'status tints go dark in inverse');
    assert.equal(resolveToken(cre8, 'bg-success'), resolveToken(cre8, 'success-50'), 'and stay light in light mode');
    const raw = checkContrast(cre8, { autoCorrect: false });
    assert.ok(raw.pairs.some((p) => !p.pass && p.fg === 'content-knockout' && p.bg === 'bg-brand-strong'), 'white on primary-500 fails uncorrected');
  });

  test('every shipped brand passes in light and inverse mode', () => {
    for (const name of listBrands()) {
      const r = checkContrast(loadBrand(name));
      assert.equal(r.pass, true, name);
      assert.ok(r.pairs.some((p) => p.mode === 'inverse'));
    }
  });

  test('a yellow primary fails uncorrected and is auto-corrected', () => {
    const yellow = loadBrand(path.join(FIXTURES, 'yellow'));
    const raw = checkContrast(yellow, { autoCorrect: false });
    assert.equal(raw.pass, false);
    const rawFail = raw.pairs.filter((p) => !p.pass).map((p) => `${p.mode}:${p.fg}/${p.bg}`);
    assert.ok(rawFail.includes('light:content-knockout/bg-brand-strong'));
    assert.ok(rawFail.includes('light:content-link/bg-default'));

    const fixed = checkContrast(yellow);
    assert.equal(fixed.pass, true, fixed.pairs.filter((p) => !p.pass).map((p) => `${p.mode} ${p.fg}/${p.bg} ${p.ratio}`).join(', '));
    assert.equal(validateBrand(yellow).ok, true);
    // The yellow fill stays yellow and takes a dark knockout.
    assert.equal(resolveToken(yellow, 'bg-brand-strong'), '#facc15');
    assert.notEqual(resolveToken(yellow, 'content-knockout'), '#ffffff');
    // Links walk down the ramp to a passing step.
    const link = resolveToken(yellow, 'content-link');
    assert.ok(contrastRatio(link, '#ffffff') >= 4.5, link);
    // The choice is recorded in the generated file.
    const { brandCss } = generateBrandCss(yellow);
    assert.match(brandCss, /contrast guard: light: content-knockout on bg-brand-strong/);
    assert.match(brandCss, /contrast guard: light: content-link primary-500/);
  });

  test('AAA raises the text requirement to 7:1', () => {
    const cre8 = loadBrand('cre8');
    const aaa = { ...structuredClone(cre8), accessibility: { contrastTarget: 'AAA' } };
    const r = checkContrast(aaa);
    assert.ok(r.pairs.filter((p) => p.kind === 'text').every((p) => p.required === 7));
    assert.ok(r.pairs.filter((p) => p.kind === 'ui').every((p) => p.required === 3));
  });
});

describe('tokens:check', () => {
  function scratchBrands() {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'cre8-brands-'));
    for (const name of ['cre8', 'regal']) fs.cpSync(path.join(BRANDS_DIR, name), path.join(dir, name), { recursive: true });
    return dir;
  }
  const run = (dir, ...args) => spawnSync(process.execPath, [CLI, ...args], { env: { ...process.env, CRE8_BRANDS_DIR: dir }, encoding: 'utf8' });

  test('passes on fresh output and detects stale or hand-edited css', () => {
    const dir = scratchBrands();
    try {
      assert.equal(run(dir, 'check').status, 0);

      // Hand-edit a generated file.
      const sheet = path.join(dir, 'regal', 'css', 'tokens_brand.css');
      fs.writeFileSync(sheet, fs.readFileSync(sheet, 'utf8').replace('--cre8-seed-primary: #132342;', '--cre8-seed-primary: #ff0000;'));
      const edited = run(dir, 'check');
      assert.equal(edited.status, 1);
      assert.match(edited.stdout, /regal[\s\S]*css\/tokens_brand\.css is stale/);

      // Rebuild, then change brand.json without rebuilding.
      assert.equal(run(dir, 'build', 'regal').status, 0);
      assert.equal(run(dir, 'check').status, 0);
      const bj = path.join(dir, 'regal', 'brand.json');
      const json = JSON.parse(fs.readFileSync(bj, 'utf8'));
      json.shape.radius.$value = '4px';
      fs.writeFileSync(bj, JSON.stringify(json, null, 2));
      const stale = run(dir, 'check', 'regal');
      assert.equal(stale.status, 1);
      assert.match(stale.stdout, /stale/);
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });

  test('fails on an invalid brand', () => {
    const dir = scratchBrands();
    try {
      fs.cpSync(path.join(FIXTURES, 'invalid'), path.join(dir, 'invalid'), { recursive: true });
      const r = run(dir, 'check');
      assert.equal(r.status, 1);
      assert.match(r.stdout, /FAIL\s+schema/);
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });
});
