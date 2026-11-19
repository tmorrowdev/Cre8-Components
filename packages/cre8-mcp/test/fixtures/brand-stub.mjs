/**
 * Test stand-in for packages/cre8-wc/design-tokens/tools/brand.mjs.
 *
 * Implements the exported signatures from design-tokens/BRAND_CONTRACT.md with
 * just enough behaviour for cre8-mcp's tests: real `extends` merging, a schema
 * subset, a real WCAG contrast ratio for one pair, and CSS whose shape matches
 * the generated files (seed block under the scope, a theme sheet that @imports
 * its siblings, @font-face rules). It is NOT the generator. Brands are read
 * from CRE8_BRANDS_DIR.
 */

import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const brandsDir = () => process.env.CRE8_BRANDS_DIR;

const isObj = (v) => typeof v === 'object' && v !== null && !Array.isArray(v);

function merge(base, over) {
  const out = { ...base };
  for (const [k, v] of Object.entries(over)) {
    out[k] = isObj(out[k]) && isObj(v) && !('$value' in v) ? merge(out[k], v) : v;
  }
  return out;
}

export function loadBrand(nameOrPath) {
  const file = nameOrPath.includes('/') ? nameOrPath : join(brandsDir(), nameOrPath, 'brand.json');
  if (!existsSync(file)) throw new Error(`Unknown brand "${nameOrPath}"`);
  const raw = JSON.parse(readFileSync(file, 'utf8'));
  if (typeof raw.extends === 'string') {
    return { ...merge(loadBrand(raw.extends), raw), extends: raw.extends };
  }
  return raw;
}

const HEX = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;

function luminance(hex) {
  let h = hex.slice(1);
  if (h.length === 3) h = [...h].map((c) => c + c).join('');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  const lin = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function ratio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return Math.round(((hi + 0.05) / (lo + 0.05)) * 100) / 100;
}

export function checkContrast(brand) {
  const target = brand.accessibility?.contrastTarget ?? 'AA';
  // Non-text UI contrast (WCAG 1.4.11): 3:1, raised to 4.5:1 at AAA.
  const required = target === 'AAA' ? 4.5 : 3;
  const primary = brand.color?.primary?.$value;
  if (!primary || !HEX.test(primary)) throw new Error('color.primary must be a hex colour to check contrast');
  const r = ratio('#ffffff', primary);
  const pairs = [
    { fg: '--cre8-border-brand', bg: '--cre8-bg-default', mode: 'light', ratio: r, required, pass: r >= required },
  ];
  return { target, pairs, pass: pairs.every((p) => p.pass) };
}

export function validateBrand(brand) {
  const errors = [];
  const warnings = [];
  if (!isObj(brand)) return { ok: false, errors: ['brand must be an object'], warnings };
  if (typeof brand.name !== 'string' || !/^[a-z][a-z0-9-]*$/.test(brand.name)) errors.push('/name: must match ^[a-z][a-z0-9-]*$');
  if (typeof brand.extends === 'string' && !existsSync(join(brandsDir(), brand.extends, 'brand.json'))) {
    errors.push(`/extends: unknown brand "${brand.extends}"`);
  }
  const resolved = typeof brand.extends === 'string' && errors.length === 0 ? merge(loadBrand(brand.extends), brand) : brand;
  for (const seed of ['primary', 'neutral']) {
    const v = resolved.color?.[seed]?.$value;
    if (v === undefined) errors.push(`/color: must have required property '${seed}'`);
    else if (!HEX.test(v) && !v.startsWith('oklch(')) errors.push(`/color/${seed}/$value: must match colour pattern`);
  }
  for (const name of Object.keys(brand.overrides ?? {})) warnings.push(`overrides: ${name} is set literally; prefer a seed`);
  if (errors.length === 0) {
    const c = checkContrast(resolved);
    for (const p of c.pairs.filter((x) => !x.pass)) {
      errors.push(`contrast: ${p.fg} on ${p.bg} (${p.mode}) is ${p.ratio}:1, needs ${p.required}:1 for ${c.target}`);
    }
  }
  return { ok: errors.length === 0, errors, warnings };
}

export function generateBrandCss(brand, opts = {}) {
  const scope = opts.scope ?? ':root, [data-cre8-theme]';
  const seeds = Object.entries(brand.color ?? {})
    .filter(([, v]) => isObj(v))
    .map(([k, v]) => `  --cre8-seed-${k}: ${v.$value};`)
    .join('\n');
  const fontsCss = (brand.typography?.fontFaces ?? [])
    .map((f) => `@font-face { font-family: "${f.family}"; src: url(${f.src}) format("woff2"); font-weight: ${f.weight}; }`)
    .join('\n');
  return {
    brandCss: `/* ${brand.name}: generated */\n${scope} {\n${seeds}\n}\n`,
    themeCss: `@import './tokens_brand.css';\n@import './fonts.css';\n${scope} { --cre8-typography-body-default-font-family: var(--cre8-seed-font); }\n`,
    fontsCss,
  };
}

export function listTokens({ tier } = {}) {
  const cre8 = loadBrand('cre8');
  const all = [
    { name: '--cre8-seed-primary', tier: 'seed', value: cre8.color.primary.$value },
    { name: '--cre8-seed-neutral', tier: 'seed', value: cre8.color.neutral.$value },
    { name: '--cre8-primary-500', tier: 'primitive', value: 'var(--cre8-seed-primary)' },
    { name: '--cre8-bg-brand-strong', tier: 'semantic', value: 'var(--cre8-mode-bg-brand-strong)' },
    { name: '--cre8-content-error', tier: 'semantic', value: 'var(--cre8-error-600)' },
    { name: '--cre8-header-bg-default', tier: 'component', value: 'var(--cre8-bg-default)' },
    { name: '--cre8-color-bg-brand-strong', tier: 'legacy', value: 'var(--cre8-bg-brand-strong)' },
    { name: '--cre8-unlisted-thing', tier: 'component', value: '0', description: 'from the module' },
  ];
  return tier ? all.filter((t) => t.tier === tier) : all;
}

export function resolveToken(brand, name) {
  const key = name.replace('--cre8-seed-', '');
  return brand.color?.[key]?.$value ?? '';
}
