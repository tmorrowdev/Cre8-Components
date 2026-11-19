// node --test scripts/brand-audit/lib.test.mjs
import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import {
  collectComponentTokenUsage,
  compareToBaseline,
  discoverBrands,
  findUnresolved,
  makeResolver,
  parseThemeSheet,
  parseVars,
} from './lib.mjs';

test('parseVars splits name and fallback at the first top-level comma', () => {
  assert.deepEqual(parseVars('var(--a)'), [{ name: '--a', fallback: undefined }]);
  assert.deepEqual(parseVars('var( --a , 4px)'), [{ name: '--a', fallback: ' 4px' }]);
  assert.deepEqual(parseVars('calc(var(--a) + var(--b, var(--c, 1px)))'), [
    { name: '--a', fallback: undefined },
    { name: '--b', fallback: ' var(--c, 1px)' },
  ]);
  assert.deepEqual(parseVars('var(--a,)'), [{ name: '--a', fallback: '' }]);
});

test('resolver follows CSS semantics', () => {
  const declared = new Map([
    ['--seed', '#00f'],
    ['--ok', 'oklch(from var(--seed) l c h)'],
    ['--broken', 'oklch(from var(--missing) l c h)'],
    ['--cycle-a', 'var(--cycle-b)'],
    ['--cycle-b', 'var(--cycle-a)'],
  ]);
  const r = makeResolver(declared, new Set(['--local']));
  assert.equal(r.isDefined('--ok'), true);
  assert.equal(r.isDefined('--broken'), false, 'an undefined reference poisons the declaration');
  assert.equal(r.isDefined('--cycle-a'), false);
  assert.equal(r.isDefined('--local'), true, 'component-declared props count as defined');
  assert.equal(r.varResolves('--nope', ' 4px'), true, 'literal fallback');
  assert.equal(r.varResolves('--nope', ''), true, 'empty fallback is valid');
  assert.equal(r.varResolves('--nope', ' var(--ok)'), true, 'var fallback that resolves');
  assert.equal(r.varResolves('--nope', ' var(--also-nope)'), false);
  assert.equal(r.varResolves('--nope', undefined), false);
});

function fixture() {
  const root = mkdtempSync(join(tmpdir(), 'brand-audit-'));
  const comps = join(root, 'components');
  mkdirSync(join(comps, 'button'), { recursive: true });
  writeFileSync(
    join(comps, 'button', 'button.styles.ts'),
    "import { css } from 'lit';\nconst styles = css`:host{--cre8-button-local: 1px;} .b{color: var(--cre8-color-a); background: var(--cre8-color-b, transparent); border-width: var(--cre8-button-local); padding: var(--cre8-gone);}`;",
  );
  writeFileSync(join(comps, 'button', 'button.stories.ts'), 'const x = css`a{color: var(--cre8-story-only)}`');
  const brands = join(root, 'brands');
  mkdirSync(join(brands, 'demo', 'css'), { recursive: true });
  writeFileSync(join(brands, 'demo', 'brand.json'), '{}');
  writeFileSync(join(brands, 'demo', 'css', 'tokens_demo.css'), "@import './tokens_brand.css';\n:root{--cre8-gone-too: 1px;}");
  writeFileSync(
    join(brands, 'demo', 'css', 'tokens_brand.css'),
    `:root, [data-cre8-theme] { --cre8-color-a: var(--cre8-mode-a); --cre8-mode-a: #fff; }
     [data-mode="inverse"] { --cre8-mode-a: var(--cre8-undefined-dark); }
     @media (prefers-color-scheme: dark) { [data-mode="auto"] { --cre8-color-a: red; } }
     cre8-footer { --cre8-gone: 1px; }`,
  );
  mkdirSync(join(brands, 'not-a-brand'));
  return { comps, brands };
}

test('end to end over a fixture: usage, sheet parsing, modes', () => {
  const { comps, brands } = fixture();
  const usage = collectComponentTokenUsage(comps);
  assert.deepEqual([...usage.usage.keys()], ['cre8-button']);
  assert.ok(usage.declared.has('--cre8-button-local'));
  assert.ok(!usage.usage.get('cre8-button').some((c) => c.name === '--cre8-story-only'), 'stories are not styles');

  const found = discoverBrands(brands);
  assert.deepEqual(found.map((b) => b.name), ['demo']);

  const sheet = parseThemeSheet(found[0].themeCss);
  assert.equal(sheet.light.get('--cre8-mode-a'), '#fff');
  assert.ok(!sheet.light.has('--cre8-gone'), 'component-scoped rules are not global tokens');

  const light = findUnresolved(sheet.light, usage);
  assert.deepEqual([...light.keys()], ['--cre8-gone']);
  const inverse = findUnresolved(sheet.inverse, usage);
  assert.deepEqual([...inverse.keys()].sort(), ['--cre8-color-a', '--cre8-gone'], 'inverse override that breaks the chain is caught');
});

test('compareToBaseline gates only regressions', () => {
  const result = {
    unresolved: [{ token: '--a' }, { token: '--b' }],
    contrast: { byComponent: { 'cre8-x': 2, 'cre8-y': 1 } },
  };
  const entry = { unresolved: ['--a'], contrast: { 'cre8-x': 2 } };
  const cmp = compareToBaseline(result, entry);
  assert.deepEqual(cmp.newUnresolved, ['--b']);
  assert.deepEqual(cmp.contrastRegressions, [{ tag: 'cre8-y', count: 1, baseline: 0 }]);

  const notBaselined = compareToBaseline(result, { unresolved: ['--a', '--b'], contrast: null });
  assert.equal(notBaselined.contrastGated, false);
  assert.deepEqual(notBaselined.contrastRegressions, []);

  const newBrand = compareToBaseline(result, undefined);
  assert.equal(newBrand.newUnresolved.length, 2, 'a brand missing from the baseline must start clean');
  assert.equal(newBrand.contrastRegressions.length, 2);

  const noBrowser = compareToBaseline({ unresolved: [], contrast: null }, entry);
  assert.equal(noBrowser.contrastGated, false);
});
