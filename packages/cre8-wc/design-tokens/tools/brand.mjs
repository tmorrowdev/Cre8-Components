/**
 * cre8 brand generator.
 *
 * brand.json (validated against ../schema/brand.schema.json) is the single
 * source of truth for a brand. This module turns it into the brand's css:
 *
 *   css/tokens_brand.css   the four-tier token sheet (seed → primitive →
 *                          semantic → component, plus legacy aliases)
 *   css/tokens_<name>.css  the theme entry point (@imports + typography roles)
 *   css/fonts.css          @font-face rules
 *   css/tokens_<name>.module.ts  Storybook's inlined copy, where one exists
 *
 * The sheet is filled into templates/tokens_brand.css.tpl, which is the cre8
 * sheet as it was hand-maintained before generation, with the brand-variable
 * parts replaced by slots. Generating from brands/cre8/brand.json therefore
 * reproduces that sheet's tokens, and every colour resolves to the same value.
 *
 * The interface is documented in ../BRAND_CONTRACT.md. Plain ESM, Node 22.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { contrastRatio, hexToOklch, oklchToHex, parseColor } from './lib/color.mjs';
import { createResolver, parseSheet } from './lib/resolve.mjs';

const require = createRequire(import.meta.url);
const TOOLS_DIR = path.dirname(fileURLToPath(import.meta.url));
export const DESIGN_TOKENS_DIR = path.resolve(TOOLS_DIR, '..');
/** Where brands live. CRE8_BRANDS_DIR overrides it (tests run the CLI against a scratch copy). */
export const BRANDS_DIR = process.env.CRE8_BRANDS_DIR ? path.resolve(process.env.CRE8_BRANDS_DIR) : path.join(DESIGN_TOKENS_DIR, 'brands');
const SCHEMA_PATH = path.join(DESIGN_TOKENS_DIR, 'schema', 'brand.schema.json');
const TEMPLATE_BRAND = fs.readFileSync(path.join(TOOLS_DIR, 'templates', 'tokens_brand.css.tpl'), 'utf8');
const TEMPLATE_THEME = fs.readFileSync(path.join(TOOLS_DIR, 'templates', 'tokens_theme.css.tpl'), 'utf8');

export const GENERATED_BANNER = 'GENERATED from brand.json by tools/brand.mjs — do not edit';
const DEFAULT_SCOPE = ':root,\n[data-cre8-theme]';

/* ===========================================================================
   Defaults — the cre8 brand. Anything a brand (and its `extends` chain)
   leaves unset falls back to these.
   =========================================================================== */
const DEFAULTS = {
  color: {
    primary: '#3b82f6', neutral: '#64748b', accent: '#7c3aed',
    success: '#06b6d4', warning: '#f59e0b', error: '#ec4899',
  },
  typography: {
    body: ['Plus Jakarta Sans', 'sans-serif'],
    mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
    baseSize: '1rem',
    weights: { regular: 400, medium: 500, semibold: 600, bold: 700 },
  },
  shape: { radius: '24px', borderWidth: '0.0625rem' },
  space: { base: '0.25rem', density: 'comfortable' },
  elevation: { style: 'standard' },
  motion: {
    durationFast: '100ms', durationBase: '200ms', durationSlow: '300ms',
    easing: [0.2, 0, 0, 1], easingEmphasized: [0.3, 0, 0, 1],
  },
  focus: { color: '{color.primary.500}', width: '2px', offset: '2px' },
  accessibility: { contrastTarget: 'AA' },
};

const DENSITY = { compact: 0.8, comfortable: 1, spacious: 1.25 };

/* ===========================================================================
   Ramp specs. Channel strings are exactly those of the cre8 sheet; the
   identity step is the seed itself. L values are tuned for the cre8 seeds
   (TEMPLATE_SEEDS); a seed whose lightness differs is re-anchored (see
   anchorRamp) so the ramp stays monotonic around it.
   =========================================================================== */
const TEMPLATE_SEEDS = { ...DEFAULTS.color };
const RAMPS = {
  primary: [
    ['50', '0.9705 calc(c * 0.0754) calc(h - 5.21)'], ['100', '0.9319 calc(c * 0.168) calc(h - 4.23)'],
    ['200', '0.8823 calc(c * 0.3035) calc(h - 5.69)'], ['300', '0.8091 calc(c * 0.5085) calc(h - 8)'],
    ['400', '0.7137 calc(c * 0.7626) calc(h - 5.19)'], ['500', null],
    ['600', '0.5461 calc(c * 1.1446) calc(h + 3.07)'], ['700', '0.4882 calc(c * 1.155) calc(h + 4.56)'],
    ['800', '0.4244 calc(c * 0.962) calc(h + 5.82)'], ['900', '0.3791 calc(c * 0.7327) calc(h + 5.71)'],
    ['950', '0.2823 calc(c * 0.4651) calc(h + 8.12)'],
  ],
  neutral: [
    ['0', '1 calc(c * 0) calc(h - 167.54)'], ['50', '0.9842 calc(c * 0.0838) calc(h - 9.56)'],
    ['100', '0.9683 calc(c * 0.1683) calc(h - 9.52)'], ['200', '0.9288 calc(c * 0.3099) calc(h - 1.91)'],
    ['300', '0.869 calc(c * 0.4875) calc(h - 4.52)'], ['400', '0.7107 calc(c * 0.8624) calc(h - 0.63)'],
    ['500', null], ['600', '0.4455 calc(c * 0.9197) calc(h - 0.14)'],
    ['700', '0.3717 calc(c * 0.9617) calc(h - 0.13)'], ['800', '0.2795 calc(c * 0.905) calc(h + 2.61)'],
    ['900', '0.2077 calc(c * 0.9781) calc(h + 8.34)'], ['950', '0.1288 calc(c * 0.9972) calc(h + 7.28)'],
  ],
  success: [
    ['50', '0.9841 calc(c * 0.1502) calc(h - 14.35)'], ['400', '0.7971 calc(c * 1.0648) calc(h - 3.69)'],
    ['500', null], ['600', '0.6089 calc(c * 0.8823) calc(h + 6.5)'],
  ],
  error: [
    ['50', '0.9714 calc(c * 0.0668) calc(h - 11.11)'], ['100', '0.9482 calc(c * 0.1305) calc(h - 12.05)'],
    ['200', '0.8994 calc(c * 0.278) calc(h - 11.08)'], ['300', '0.8228 calc(c * 0.5171) calc(h - 8.29)'],
    ['400', '0.7253 calc(c * 0.8274) calc(h - 4.55)'], ['500', null],
    ['600', '0.5916 calc(c * 1.0293) calc(h + 6.28)'], ['700', '0.5246 calc(c * 0.9395) calc(h + 9.65)'],
  ],
  warning: [
    ['50', '0.9869 calc(c * 0.13) calc(h + 25.2)'], ['400', '0.8369 calc(c * 0.9986) calc(h + 14.35)'],
    ['500', null], ['600', '0.6658 calc(c * 0.956) calc(h - 11.76)'],
  ],
  accent: [
    ['50', '0.96 calc(c * 0.15) h'], ['200', '0.9024 calc(c * 0.245) calc(h + 13.69)'],
    ['500', 'calc(l + 0.08) c h'], ['600', null],
  ],
};
const ACCENT_COMMENT = `  /* accent
     -50 and -500 added by hand (not from the original generator, which never
     emitted them) to give info-status tokens a real ramp to point at instead
     of borrowing primary's. Simple relative lightness offsets from the -600
     identity step, not the per-hue-tuned coefficients the rest of this ramp
     uses -- close enough for a light tint and a mid-strength fill, not a
     claim of the same precision. */`;
/** Darker steps the cre8 sheet never had. Used as contrast-correction candidates. */
const EXTENDED = {
  success: [['700', '0.4882 calc(c * 0.95) h'], ['800', '0.4244 calc(c * 0.8) h'], ['900', '0.3791 calc(c * 0.65) h']],
  warning: [['700', '0.4882 calc(c * 0.95) h'], ['800', '0.4244 calc(c * 0.8) h'], ['900', '0.3791 calc(c * 0.65) h']],
  error: [['800', '0.4244 calc(c * 0.85) calc(h + 9.65)'], ['900', '0.3791 calc(c * 0.7) calc(h + 9.65)']],
  accent: [['700', '0.4882 calc(c * 0.95) h'], ['800', '0.4244 calc(c * 0.8) h']],
};

const LEGACY_FONT_SIZE = [0.75, 0.875, 1, 1.125, 1.25, 1.5, 1.75, 2, 2.5, 3, 3.5, 4, 4.5, 5];

/* ===========================================================================
   Loading and merging
   =========================================================================== */
const isObj = (v) => v && typeof v === 'object' && !Array.isArray(v);
function deepMerge(base, over) {
  if (!isObj(base) || !isObj(over)) return over === undefined ? base : over;
  const out = { ...base };
  for (const [k, v] of Object.entries(over)) {
    // A DTCG leaf ({ $value }) replaces wholesale.
    out[k] = isObj(v) && !('$value' in v) && isObj(base[k]) ? deepMerge(base[k], v) : v;
  }
  return out;
}

function readBrandFile(nameOrPath) {
  const looksLikePath = /[\\/]/.test(nameOrPath) || nameOrPath.endsWith('.json');
  let file = looksLikePath ? path.resolve(nameOrPath) : path.join(BRANDS_DIR, nameOrPath, 'brand.json');
  if (looksLikePath && fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'brand.json');
  if (!fs.existsSync(file)) throw new Error(`Unknown brand "${nameOrPath}" (no ${path.relative(process.cwd(), file)})`);
  return { file, json: JSON.parse(fs.readFileSync(file, 'utf8')) };
}

/** Load a brand by name (directory under brands/) or path, merging its `extends` chain. */
export function loadBrand(nameOrPath) {
  const { file, json } = readBrandFile(nameOrPath);
  const chain = [json]; const seen = new Set([json.name]);
  let parent = json.extends;
  while (parent) {
    if (seen.has(parent)) throw new Error(`Brand "${json.name}": extends cycle at "${parent}"`);
    seen.add(parent);
    const { json: p } = readBrandFile(parent);
    chain.unshift(p);
    parent = p.extends;
  }
  let merged = {};
  for (const b of chain) merged = deepMerge(merged, b);
  merged.name = json.name;
  merged.extends = json.extends ?? null;
  Object.defineProperty(merged, '__file', { value: file, enumerable: false });
  return merged;
}

export function listBrands() {
  return fs.readdirSync(BRANDS_DIR)
    .filter((d) => fs.existsSync(path.join(BRANDS_DIR, d, 'brand.json')))
    .sort();
}

/* ===========================================================================
   Validation
   =========================================================================== */
let ajvValidate;
function schemaValidator() {
  if (!ajvValidate) {
    const Ajv2020 = require('ajv/dist/2020.js');
    const ajv = new (Ajv2020.default || Ajv2020)({ allErrors: true, strict: false });
    ajvValidate = ajv.compile(JSON.parse(fs.readFileSync(SCHEMA_PATH, 'utf8')));
  }
  return ajvValidate;
}

/** Schema errors + contrast failures in `errors`; each override and waiver is a warning. */
export function validateBrand(brand) {
  const errors = []; const warnings = [];
  const validate = schemaValidator();
  if (!validate(brand)) {
    for (const e of validate.errors) errors.push(`schema: ${e.instancePath || '/'} ${e.message}${e.params?.additionalProperty ? ` (${e.params.additionalProperty})` : ''}`);
  }
  if (brand.extends && !fs.existsSync(path.join(BRANDS_DIR, brand.extends, 'brand.json'))) {
    errors.push(`extends: unknown brand "${brand.extends}"`);
  }
  for (const [k, v] of Object.entries(brand.overrides || {})) warnings.push(`override: ${k}: ${v} (prefer a seed)`);
  for (const w of brand.accessibility?.waive || []) {
    warnings.push(`contrast waived: ${w.fg} on ${w.bg}${w.mode ? ` (${w.mode})` : ''} — ${w.reason}`);
  }
  const brandDir = brand.__file ? path.dirname(brand.__file) : path.join(BRANDS_DIR, brand.name || '');
  for (const f of brand.typography?.fontFaces || []) {
    if (/^https?:/.test(f.src)) continue;
    if (!fs.existsSync(path.join(brandDir, 'css', f.src))) warnings.push(`fontFaces: ${f.src} not found relative to css/`);
  }
  if (errors.length === 0) {
    try {
      const report = checkContrast(brand);
      for (const p of report.pairs) {
        if (!p.pass && !p.waived) errors.push(`contrast (${p.mode}): ${p.fg} on ${p.bg} is ${p.ratio}:1, needs ${p.required}:1`);
      }
    } catch (e) {
      errors.push(`generate: ${e.message}`);
    }
  }
  return { ok: errors.length === 0, errors, warnings };
}

/* ===========================================================================
   Normalisation: brand.json → flat config with defaults applied
   =========================================================================== */
const val = (leaf) => (leaf && typeof leaf === 'object' && '$value' in leaf ? leaf.$value : leaf);

function normalise(brand) {
  const c = brand.color || {}; const t = brand.typography || {}; const s = brand.shape || {};
  const sp = brand.space || {}; const el = brand.elevation || {}; const m = brand.motion || {};
  const f = brand.focus || {};
  const colour = (k) => val(c[k]) ?? DEFAULTS.color[k];
  return {
    name: brand.name,
    displayName: brand.displayName || brand.name,
    description: brand.description || '',
    color: {
      primary: colour('primary'), neutral: colour('neutral'), accent: colour('accent'),
      success: colour('success'), warning: colour('warning'), error: colour('error'),
      info: val(c.info), chart: c.chart ? c.chart.map(val) : null,
    },
    typography: {
      body: val(t.body) ?? DEFAULTS.typography.body,
      display: val(t.display) ?? null,
      mono: val(t.mono) ?? DEFAULTS.typography.mono,
      baseSize: val(t.baseSize) ?? DEFAULTS.typography.baseSize,
      scaleRatio: val(t.scaleRatio) ?? null,
      weights: { ...DEFAULTS.typography.weights, ...Object.fromEntries(Object.entries(t.weights || {}).map(([k, v]) => [k, val(v)])) },
      fontFaces: t.fontFaces || [],
    },
    shape: {
      radius: val(s.radius) ?? DEFAULTS.shape.radius,
      controlRadius: val(s.controlRadius) ?? null,
      buttonRadius: val(s.buttonRadius) ?? null,
      borderWidth: val(s.borderWidth) ?? DEFAULTS.shape.borderWidth,
    },
    space: { base: val(sp.base) ?? DEFAULTS.space.base, density: sp.density ?? DEFAULTS.space.density },
    elevation: { style: el.style ?? DEFAULTS.elevation.style, shadowColor: val(el.shadowColor) ?? null },
    motion: Object.fromEntries(Object.keys(DEFAULTS.motion).map((k) => [k, val(m[k]) ?? DEFAULTS.motion[k]])),
    focus: {
      color: val(f.color) ?? DEFAULTS.focus.color,
      colorIsDefault: val(f.color) === undefined,
      width: val(f.width) ?? DEFAULTS.focus.width,
      offset: val(f.offset) ?? DEFAULTS.focus.offset,
    },
    colorScheme: brand.colorScheme ?? 'light',
    contrastTarget: brand.accessibility?.contrastTarget ?? 'AA',
    waive: brand.accessibility?.waive || [],
    overrides: brand.overrides || {},
  };
}

/* ===========================================================================
   Emission helpers
   =========================================================================== */
const GENERIC_FAMILIES = new Set(['serif', 'sans-serif', 'monospace', 'cursive', 'fantasy', 'system-ui',
  'ui-serif', 'ui-sans-serif', 'ui-monospace', 'ui-rounded', 'math', 'emoji', 'fangsong', '-apple-system', 'BlinkMacSystemFont']);
function fontStack(list) {
  return list.map((f) => (GENERIC_FAMILIES.has(f) || /^-?[A-Za-z][A-Za-z0-9_-]*$/.test(f) ? f : `"${f}"`)).join(', ');
}
const decl = (name, value) => `  ${name}: ${value};`;
const num = (x, d = 4) => String(Number(x.toFixed(d)));
const refVar = (ref) => `var(--cre8-${ref})`;

/** `{color.primary.500}` → `var(--cre8-primary-500)`; literals pass through. */
function colourRefToCss(v) {
  const m = /^\{color\.([a-z]+)\.(\d+)\}$/.exec(v);
  return m ? `var(--cre8-${m[1]}-${m[2]})` : v;
}

/**
 * Re-anchor a ramp's absolute L values around a seed whose lightness differs
 * from the template's. Steps lighter than the identity step are mapped
 * linearly from [identityL, lightest] onto [seedL, lightest], darker ones from
 * [darkest, identityL] onto [darkest', seedL], so the ramp stays monotonic and
 * the seed stays in its slot. darkest' only moves when the seed is itself
 * darker than the template's darkest step (e.g. a navy primary).
 */
function anchorRamp(steps, identityL, seedL) {
  if (Math.abs(identityL - seedL) <= 0.02) return { steps, anchored: false };
  const isNumeric = (ch) => ch && /^[\d.]+ /.test(ch);
  const numericL = steps.filter(([, ch]) => isNumeric(ch)).map(([, ch]) => parseFloat(ch));
  const lightEnd = Math.max(...numericL, identityL); const darkEnd = Math.min(...numericL, identityL);
  const lightTo = seedL < lightEnd - 0.03 ? lightEnd : Math.min(0.995, seedL + 0.03);
  const darkTo = seedL > darkEnd + 0.05 ? darkEnd : Math.max(0.08, seedL * (darkEnd / identityL));
  const remap = (L) => {
    if (L > identityL) return seedL + ((L - identityL) / (lightEnd - identityL || 1)) * (lightTo - seedL);
    return seedL - ((identityL - L) / (identityL - darkEnd || 1)) * (seedL - darkTo);
  };
  return {
    anchored: true,
    steps: steps.map(([k, ch]) => {
      if (!isNumeric(ch)) return [k, ch];
      const [L, ...rest] = ch.split(' ');
      return [k, [num(remap(parseFloat(L))), ...rest].join(' ')];
    }),
  };
}

function rampLines(cfg) {
  const out = []; const notes = [];
  for (const ramp of ['primary', 'neutral', 'success', 'error', 'warning', 'accent']) {
    const seed = cfg.color[ramp];
    const identityL = hexToOklch(TEMPLATE_SEEDS[ramp]).L;
    const seedL = parseColor(seed).L;
    const { steps, anchored } = anchorRamp([...RAMPS[ramp], ...(EXTENDED[ramp] || [])], identityL, seedL);
    const base = steps.slice(0, RAMPS[ramp].length); const ext = steps.slice(RAMPS[ramp].length);
    out.push(ramp === 'accent' ? ACCENT_COMMENT : `  /* ${ramp} */`);
    if (anchored) {
      const note = `${ramp}: seed L ${num(seedL, 3)} vs template ${num(identityL, 3)}; step lightness re-anchored around the seed`;
      notes.push(note);
      out.push(`  /* ${note} */`);
    }
    for (const [k, ch] of base) {
      out.push(decl(`--cre8-${ramp}-${k}`, ch === null ? `var(--cre8-seed-${ramp})` : `oklch(from var(--cre8-seed-${ramp}) ${ch})`));
    }
    out.push('');
  }
  out.push('  /* Extended steps — darker status/accent steps the hand-maintained sheet');
  out.push('     never had. Contrast-correction candidates; nothing reads them by default. */');
  for (const ramp of ['success', 'error', 'warning', 'accent']) {
    const seed = cfg.color[ramp];
    const { steps } = anchorRamp([...RAMPS[ramp], ...EXTENDED[ramp]], hexToOklch(TEMPLATE_SEEDS[ramp]).L, parseColor(seed).L);
    for (const [k, ch] of steps.slice(RAMPS[ramp].length)) out.push(decl(`--cre8-${ramp}-${k}`, `oklch(from var(--cre8-seed-${ramp}) ${ch})`));
  }
  out.push('');
  out.push('  /* info — the info status ramp. Without an info seed it is the accent ramp,');
  out.push('     which is what info has always read. */');
  if (cfg.color.info) {
    out.push(decl('--cre8-info-50', 'oklch(from var(--cre8-seed-info) 0.96 calc(c * 0.15) h)'));
    out.push(decl('--cre8-info-500', 'var(--cre8-seed-info)'));
    out.push(decl('--cre8-info-600', 'oklch(from var(--cre8-seed-info) calc(l - 0.08) c h)'));
    out.push(decl('--cre8-info-700', 'oklch(from var(--cre8-seed-info) calc(l - 0.16) c h)'));
  } else {
    for (const k of ['50', '500', '600', '700']) out.push(decl(`--cre8-info-${k}`, `var(--cre8-accent-${k})`));
  }
  return { text: out.join('\n'), notes };
}

function seedLines(cfg) {
  const c = cfg.color; const t = cfg.typography; const s = cfg.shape;
  const out = [
    decl('--cre8-seed-primary', c.primary),
    decl('--cre8-seed-neutral', c.neutral),
    decl('--cre8-seed-success', c.success),
    decl('--cre8-seed-error', c.error),
    decl('--cre8-seed-warning', c.warning),
    decl('--cre8-seed-accent', c.accent),
    decl('--cre8-seed-font', fontStack(t.body)),
    decl('--cre8-seed-radius', s.radius),
    decl('--cre8-seed-space', cfg.space.base),
    decl('--cre8-seed-font-size', t.baseSize),
    decl('--cre8-seed-border-width', s.borderWidth),
  ];
  if (c.info) out.push(decl('--cre8-seed-info', c.info));
  if (t.display) out.push(decl('--cre8-seed-font-display', fontStack(t.display)));
  out.push(decl('--cre8-seed-font-mono', fontStack(t.mono)));
  if (s.controlRadius !== null) out.push(decl('--cre8-seed-radius-control', s.controlRadius));
  if (s.buttonRadius !== null) out.push(decl('--cre8-seed-radius-button', s.buttonRadius));
  out.push(decl('--cre8-seed-density', num(DENSITY[cfg.space.density])));
  if (cfg.elevation.shadowColor) out.push(decl('--cre8-seed-shadow', cfg.elevation.shadowColor));
  (c.chart || []).forEach((hex, i) => out.push(decl(`--cre8-seed-chart-${i + 1}`, hex)));
  return out.join('\n');
}

function fontSizeLines(cfg) {
  const r = cfg.typography.scaleRatio;
  const out = [r
    ? `  /* Font size — modular scale, ratio ${r}; step 2 is the body size (the seed) */`
    : '  /* Font size — multiples of the font-size seed */'];
  for (let i = 0; i < LEGACY_FONT_SIZE.length; i++) {
    const k = r ? r ** (i - 2) : LEGACY_FONT_SIZE[i];
    out.push(decl(`--cre8-font-size-${i}`, i === 2 ? 'var(--cre8-seed-font-size)' : `calc(var(--cre8-seed-font-size) * ${num(k)})`));
  }
  return out.join('\n');
}

function radiiLines(cfg) {
  const ctl = cfg.shape.controlRadius !== null; const btn = cfg.shape.buttonRadius !== null;
  const control = ctl ? 'var(--cre8-seed-radius-control)' : 'calc(var(--cre8-seed-radius) * 0.5)';
  return [
    '  /* Radii — multiples of the radius seed */',
    decl('--cre8-radius-none', '0px'),
    decl('--cre8-radius-checkbox', ctl ? 'calc(var(--cre8-seed-radius-control) / 3)' : 'calc(var(--cre8-seed-radius) / 6)'),
    decl('--cre8-radius-small', control),
    decl('--cre8-radius-field', control),
    decl('--cre8-radius-field-brand', control),
    decl('--cre8-radius-tabs', control),
    decl('--cre8-radius-large', 'var(--cre8-seed-radius)'),
    decl('--cre8-radius-container', 'var(--cre8-seed-radius)'),
    btn
      ? '  /* Buttons take their own radius seed (brand.json shape.buttonRadius). */'
      : `  /* Rounder than a card by convention, but proportional to the seed --
     not forced to a pill. A near-zero seed radius should produce a nearly
     square button, not a full pill regardless of that value. */`,
    decl('--cre8-radius-button', btn ? 'var(--cre8-seed-radius-button)' : 'calc(var(--cre8-seed-radius) * 2)'),
    decl('--cre8-radius-pill', 'calc(var(--cre8-seed-radius) * 37.5)'),
  ].join('\n');
}

function fontFamilyLines(cfg) {
  return [
    decl('--cre8-font-family-base', 'var(--cre8-seed-font)'),
    decl('--cre8-font-family-display', cfg.typography.display ? 'var(--cre8-seed-font-display)' : 'var(--cre8-seed-font)'),
    decl('--cre8-font-family-mono', 'var(--cre8-seed-font-mono)'),
  ].join('\n');
}

function fontWeightLines(cfg) {
  const w = cfg.typography.weights;
  return ['regular', 'medium', 'semibold', 'bold'].map((k) => decl(`--cre8-font-weight-${k}`, w[k])).join('\n');
}

const bezier = (b) => `cubic-bezier(${b.join(', ')})`;
function primitiveExtraLines(cfg) {
  const m = cfg.motion;
  return [
    '',
    '  /* Motion — zeroed under prefers-reduced-motion (end of file) */',
    decl('--cre8-duration-fast', m.durationFast),
    decl('--cre8-duration-base', m.durationBase),
    decl('--cre8-duration-slow', m.durationSlow),
    decl('--cre8-easing-standard', bezier(m.easing)),
    decl('--cre8-easing-emphasized', bezier(m.easingEmphasized)),
    '',
    '  /* Control gap — the space between a control\'s parts, scaled by density */',
    decl('--cre8-control-gap', 'calc(var(--cre8-seed-space) * 2 * var(--cre8-seed-density))'),
  ].join('\n');
}

function semanticExtraLines(cfg) {
  const chart = cfg.color.chart
    ? cfg.color.chart.map((_, i) => `var(--cre8-seed-chart-${i + 1})`)
    : ['primary-500', 'accent-600', 'primary-300', 'accent-500', 'primary-700', 'accent-800'].map(refVar);
  return [
    '',
    '  /* Focus ring */',
    decl('--cre8-focus-ring-color', 'var(--cre8-mode-focus-ring-color)'),
    decl('--cre8-focus-ring-width', cfg.focus.width),
    decl('--cre8-focus-ring-offset', cfg.focus.offset),
    '',
    `  /* Chart — categorical series, in order${cfg.color.chart ? '' : ' (derived from primary and accent)'} */`,
    ...chart.map((v, i) => decl(`--cre8-chart-${i + 1}`, v)),
    '',
    '  /* Brand gradient — primary into accent */',
    decl('--cre8-gradient-brand-from', 'var(--cre8-primary-500)'),
    decl('--cre8-gradient-brand-to', 'var(--cre8-accent-600)'),
    decl('--cre8-gradient-brand', 'linear-gradient(135deg, var(--cre8-gradient-brand-from) 0%, var(--cre8-gradient-brand-to) 100%)'),
    decl('--cre8-gradient-brand-rich', 'linear-gradient(150deg, var(--cre8-gradient-brand-from) 0%, var(--cre8-accent-600) 42%, var(--cre8-gradient-brand-to) 100%)'),
  ].join('\n');
}

function shadowLines(cfg) {
  const style = cfg.elevation.style;
  const colour = cfg.elevation.shadowColor ? 'var(--cre8-seed-shadow)' : 'var(--cre8-neutral-900)';
  const out = [decl('--cre8-shadow-none', 'none'), decl('--cre8-shadow-button', 'none')];
  const spec = [['small', 1, 3, 0.06], ['default', 4, 12, 0.08], ['large', 8, 24, 0.12]];
  const k = { subtle: [1, 0.5], standard: [1, 1], dramatic: [1.5, 2] }[style];
  if (style !== 'standard') out.unshift(`  /* elevation.style: ${style} */`);
  for (const [n, y, blur, a] of spec) {
    out.push(decl(`--cre8-shadow-${n}`, style === 'flat'
      ? 'none'
      : `0 ${num(y * k[0])}px ${num(blur * k[0])}px 0 oklch(from ${colour} l c h / ${num(a * k[1], 3)})`));
  }
  return out.join('\n');
}

/* ===========================================================================
   Mode indirection and the contrast guard
   =========================================================================== */
const MODE_LIGHT = {
  'bg-default': 'neutral-0', 'bg-default-hover': 'neutral-50', 'bg-subtle': 'neutral-100', 'bg-strong': 'neutral-800',
  'bg-disabled': 'neutral-200', 'bg-brand': 'neutral-0', 'bg-brand-hover': 'primary-100', 'bg-brand-strong': 'primary-500',
  'bg-brand-strong-hover': 'primary-600', 'content-default': 'neutral-900', 'content-subtle': 'neutral-500',
  'content-disabled': 'neutral-400', 'content-knockout': 'neutral-0', 'content-brand': 'primary-500',
  'content-brand-strong': 'primary-600', 'content-link': 'primary-500', 'content-link-hover': 'primary-600',
  'border-default': 'neutral-200', 'border-strong': 'neutral-400', 'border-brand': 'primary-500',
};
const MODE_INVERSE = {
  'bg-default': 'neutral-800', 'bg-default-hover': 'neutral-700', 'bg-subtle': 'neutral-900', 'bg-strong': 'neutral-50',
  'bg-disabled': 'neutral-700', 'bg-brand': 'primary-900', 'bg-brand-hover': 'primary-800', 'bg-brand-strong': 'primary-300',
  'bg-brand-strong-hover': 'primary-200', 'content-default': 'neutral-50', 'content-subtle': 'neutral-400',
  'content-disabled': 'neutral-600', 'content-knockout': 'neutral-900', 'content-brand': 'primary-300',
  'content-brand-strong': 'primary-200', 'content-link': 'primary-300', 'content-link-hover': 'primary-200',
  'border-default': 'neutral-700', 'border-strong': 'neutral-500', 'border-brand': 'primary-300',
};

/**
 * The pairs the guard checks. `kind: text` needs 4.5:1 (AA) / 7:1 (AAA);
 * `kind: ui` (component boundaries, focus indicators) needs 3:1.
 * Status tints (bg-success, bg-error) are not mode-aware, so the status
 * text-on-tint pairs are checked in light mode only.
 */
export const CONTRAST_PAIRS = [
  { fg: 'content-default', bg: 'bg-default', kind: 'text', modes: ['light', 'inverse'] },
  { fg: 'content-default', bg: 'bg-subtle', kind: 'text', modes: ['light', 'inverse'] },
  { fg: 'content-subtle', bg: 'bg-default', kind: 'text', modes: ['light', 'inverse'] },
  { fg: 'content-knockout', bg: 'bg-brand-strong', kind: 'text', modes: ['light', 'inverse'] },
  { fg: 'content-link', bg: 'bg-default', kind: 'text', modes: ['light', 'inverse'] },
  { fg: 'content-brand', bg: 'bg-default', kind: 'text', modes: ['light', 'inverse'] },
  { fg: 'content-success', bg: 'bg-success', kind: 'text', modes: ['light'] },
  { fg: 'content-error', bg: 'bg-error', kind: 'text', modes: ['light'] },
  { fg: 'content-error', bg: 'bg-default', kind: 'text', modes: ['light', 'inverse'] },
  { fg: 'border-strong', bg: 'bg-default', kind: 'ui', modes: ['light', 'inverse'] },
  { fg: 'focus-ring-color', bg: 'bg-default', kind: 'ui', modes: ['light', 'inverse'] },
];
const required = (kind, target) => (kind === 'ui' ? 3 : target === 'AAA' ? 7 : 4.5);

const steps = (ramp, list) => list.map((k) => `${ramp}-${k}`);
/** Candidate ramp steps per correctable token, in order of preference, per mode. */
const CANDIDATES = {
  'content-default': { light: steps('neutral', [900, 950]), inverse: steps('neutral', [50, 0]) },
  'content-subtle': { light: steps('neutral', [500, 600, 700, 800]), inverse: steps('neutral', [400, 300, 200, 100]) },
  'content-link': { light: steps('primary', [500, 600, 700, 800, 900, 950]), inverse: steps('primary', [300, 200, 100, 50]), follower: 'content-link-hover' },
  'content-brand': { light: steps('primary', [500, 600, 700, 800, 900, 950]), inverse: steps('primary', [300, 200, 100, 50]), follower: 'content-brand-strong' },
  'border-strong': { light: steps('neutral', [400, 500, 600, 700]), inverse: steps('neutral', [500, 400, 300, 200]) },
  'focus-ring-color': { light: steps('primary', [500, 600, 700, 800, 900]), inverse: steps('primary', [300, 200, 400, 100]) },
  'content-success': { light: steps('success', [600, 700, 800, 900]) },
  'content-error': { light: steps('error', [600, 700, 800, 900]), inverse: steps('error', [600, 400, 300, 200]) },
};
const KNOCKOUT = {
  light: { knockout: steps('neutral', [0, 900, 950]), bg: steps('primary', [500, 600, 700, 800, 900]) },
  inverse: { knockout: steps('neutral', [900, 950, 0]), bg: steps('primary', [300, 200, 100, 400, 500]) },
};

const isWaived = (cfg, fg, bg, mode) => cfg.waive.some((w) => w.fg === fg && w.bg === bg && (!w.mode || w.mode === mode));

/**
 * Work out the mode maps and semantic rewrites, correcting any failing pair
 * to the first passing ramp step. Returns { light, inverse, semantic, notes }.
 */
function planContrast(cfg, primitives, autoCorrect) {
  const light = { ...MODE_LIGHT }; const inverse = { ...MODE_INVERSE };
  const focusDefault = cfg.focus.colorIsDefault;
  light['focus-ring-color'] = focusDefault ? 'primary-500' : null;
  inverse['focus-ring-color'] = focusDefault ? 'primary-300' : null;
  const focusLiteral = focusDefault ? null : colourRefToCss(cfg.focus.color);
  const semantic = { 'content-success': 'success-600', 'content-error': 'error-600' };
  const modeSplit = new Set(); const notes = [];
  if (!autoCorrect) return { light, inverse, semantic, modeSplit, notes, focusLiteral };

  const target = cfg.contrastTarget;
  const colourOf = (ref) => primitives(ref);
  const ratio = (a, b) => contrastRatio(colourOf(a), colourOf(b));
  const bgOf = (mode, bg) => {
    const map = mode === 'light' ? light : inverse;
    if (map[bg]) return map[bg];
    return { 'bg-success': 'success-50', 'bg-error': 'error-50' }[bg];
  };
  const fmtR = (r) => `${num(r, 2)}:1`;

  // Knockout on brand-strong: flip the knockout first, then deepen the fill.
  for (const mode of ['light', 'inverse']) {
    if (isWaived(cfg, 'content-knockout', 'bg-brand-strong', mode)) continue;
    const map = mode === 'light' ? light : inverse; const need = required('text', target);
    const before = ratio(map['content-knockout'], map['bg-brand-strong']);
    if (before >= need) continue;
    const { knockout, bg } = KNOCKOUT[mode];
    // A fill the default knockout barely reads on (under 3:1, e.g. a yellow
    // primary) keeps its colour and takes the other knockout; a fill that is
    // merely a little light (a mid blue) is deepened first.
    const flipFirst = before < 3;
    const order = flipFirst
      ? [...knockout.map((k) => ({ k, b: bg[0] })), ...bg.slice(1).flatMap((b) => knockout.map((k) => ({ k, b })))]
      : [...bg.map((b) => ({ k: knockout[0], b })), ...bg.flatMap((b) => knockout.slice(1).map((k) => ({ k, b })))];
    const chosen = order.find(({ k, b }) => ratio(k, b) >= need) || null;
    if (!chosen) continue;
    const idx = bg.indexOf(chosen.b);
    const from = `${map['content-knockout']} on ${map['bg-brand-strong']}`;
    map['content-knockout'] = chosen.k;
    if (chosen.b !== map['bg-brand-strong']) {
      map['bg-brand-strong'] = chosen.b;
      map['bg-brand-strong-hover'] = bg[idx + 1] || chosen.b;
    }
    notes.push(`${mode}: content-knockout on bg-brand-strong was ${from} (${fmtR(before)}); now ${chosen.k} on ${chosen.b} (${fmtR(ratio(chosen.k, chosen.b))})`);
  }

  for (const [token, cand] of Object.entries(CANDIDATES)) {
    if (token === 'focus-ring-color' && !focusDefault) continue;
    const pairs = CONTRAST_PAIRS.filter((p) => p.fg === token);
    const chosenByMode = {};
    for (const mode of ['light', 'inverse']) {
      const relevant = pairs.filter((p) => p.modes.includes(mode) && !isWaived(cfg, p.fg, p.bg, mode));
      if (!relevant.length) continue;
      const list = cand[mode] || cand.light;
      const current = semantic[token] && !modeSplit.has(token) ? semantic[token] : (mode === 'light' ? light : inverse)[token];
      const passes = (ref) => relevant.every((p) => ratio(ref, bgOf(mode, p.bg)) >= required(p.kind, target));
      if (passes(current)) { chosenByMode[mode] = current; continue; }
      const pick = list.find(passes);
      if (!pick) continue; // left failing: checkContrast reports it
      chosenByMode[mode] = pick;
      const worst = (ref) => Math.min(...relevant.map((p) => ratio(ref, bgOf(mode, p.bg))));
      notes.push(`${mode}: ${token} ${current} (${fmtR(worst(current))}) -> ${pick} (${fmtR(worst(pick))}) on ${relevant.map((p) => p.bg).join(', ')}`);
      if (token in semantic) {
        // A non-mode token: one value for both modes unless the modes need different steps.
        if (mode === 'light') semantic[token] = pick;
      } else {
        const map = mode === 'light' ? light : inverse;
        map[token] = pick;
        // The hover/strong partner moves with it, one step further on.
        if (cand.follower) map[cand.follower] = list[list.indexOf(pick) + 1] || pick;
      }
    }
    if (token in semantic && chosenByMode.inverse && chosenByMode.inverse !== semantic[token]) {
      modeSplit.add(token);
      light[token] = semantic[token];
      inverse[token] = chosenByMode.inverse;
    }
  }
  return { light, inverse, semantic, modeSplit, notes, focusLiteral };
}

function modeLines(map, indent, plan) {
  return Object.entries(map)
    .filter(([k, v]) => v !== null || (k === 'focus-ring-color' && plan.focusLiteral))
    .map(([k, v]) => `${indent}--cre8-mode-${k}: ${v === null ? plan.focusLiteral : refVar(v)};`)
    .join('\n');
}

/* ===========================================================================
   Generation
   =========================================================================== */
function headerComment(cfg, lines) {
  return [
    '/**',
    ` * ${GENERATED_BANNER}.`,
    ` * Edit design-tokens/brands/${cfg.name}/brand.json, then run \`pnpm tokens:build ${cfg.name}\`.`,
    ' *',
    ` * ${cfg.displayName}${cfg.description ? ` — ${cfg.description}` : ''}`,
    ...lines.map((l) => (l ? ` * ${l}` : ' *')),
    ' */',
  ].join('\n');
}

function fill(template, slots) {
  return template.replace(/\/\*@@([A-Z_]+)@@\*\//g, (m, k) => {
    if (!(k in slots)) throw new Error(`template slot ${k} not filled`);
    return slots[k];
  });
}

function selectors(scope, colorScheme = 'light') {
  const followSystem = colorScheme === 'auto';
  if (!scope) {
    return {
      seed: ':root', scope: DEFAULT_SCOPE, inverse: '[data-mode="inverse"]', theme: ':root,\n[data-cre8-theme]',
      auto: followSystem ? '[data-mode="auto"],\n  :root:not([data-mode])' : '[data-mode="auto"]',
    };
  }
  return {
    seed: scope, scope,
    inverse: `${scope}[data-mode="inverse"],\n[data-mode="inverse"] ${scope}`,
    auto: `${scope}[data-mode="auto"],\n  [data-mode="auto"] ${scope}${followSystem ? `,\n  ${scope}:not([data-mode])` : ''}`,
    theme: scope,
  };
}

function rewriteDecl(css, name, value) {
  const re = new RegExp(`^(  ${name.replace(/[-]/g, '\\-')}: )[^;]*;`, 'm');
  if (!re.test(css)) throw new Error(`rewrite: ${name} not found`);
  return css.replace(re, `$1${value};`);
}

function buildBrandCss(cfg, plan, rampText, rampNotes, opts) {
  const sel = selectors(opts.scope, cfg.colorScheme);
  const overrides = Object.entries(cfg.overrides);
  const guardNotes = [
    ...plan.notes.map((n) => `contrast guard: ${n}`),
    ...cfg.waive.map((w) => `contrast waived: ${w.fg} on ${w.bg}${w.mode ? ` (${w.mode})` : ''} — ${w.reason}`),
  ];
  const headerLines = [
    '',
    'Four tiers, each referencing only the tier above it. Literal values appear',
    'in exactly one place — the seed — so rebranding means overriding the seed',
    'block, not editing this file.',
    '',
    'The legacy --cre8-color-* names are still emitted, as aliases, in tier 3.',
  ];
  if (rampNotes.length || guardNotes.length || overrides.length) headerLines.push('');
  for (const n of rampNotes) headerLines.push(`ramp: ${n}`);
  for (const n of guardNotes) headerLines.push(n);
  if (overrides.length) headerLines.push(`${overrides.length} override(s) from brand.json, applied last in the main block.`);

  const modeLightText = [
    ...plan.notes.filter((n) => n.startsWith('light')).map((n) => `  /* contrast guard: ${n.slice(7)} */`),
    modeLines(plan.light, '  ', plan),
  ].join('\n');
  const modeInverseText = [
    ...plan.notes.filter((n) => n.startsWith('inverse')).map((n) => `  /* contrast guard: ${n.slice(9)} */`),
    modeLines(plan.inverse, '  ', plan),
  ].join('\n');

  let css = fill(TEMPLATE_BRAND, {
    HEADER: headerComment(cfg, headerLines),
    SEED_SELECTOR: sel.seed,
    SEED: seedLines(cfg),
    SCOPE_SELECTOR: sel.scope,
    RAMPS: rampText,
    FONT_SIZE: fontSizeLines(cfg),
    RADII: radiiLines(cfg),
    FONT_FAMILY: fontFamilyLines(cfg),
    FONT_WEIGHT: fontWeightLines(cfg),
    PRIMITIVE_EXTRA: primitiveExtraLines(cfg),
    MODE_LIGHT: modeLightText,
    SEMANTIC_EXTRA: semanticExtraLines(cfg),
    SHADOWS: shadowLines(cfg),
    OVERRIDES: overrides.length
      ? ['', '  /* Overrides — literal values from brand.json `overrides`. Each is a', '     validator warning; prefer a seed. */',
        ...overrides.map(([k, v]) => decl(k, v))].join('\n')
      : '',
    INVERSE_SELECTOR: sel.inverse,
    MODE_INVERSE: modeInverseText,
    AUTO_SELECTOR: sel.auto,
    MODE_AUTO: modeLines(plan.inverse, '    ', plan),
    TAIL: [
      '',
      '/* Reduced motion — durations collapse to zero; easings are left alone. */',
      '@media (prefers-reduced-motion: reduce) {',
      `  ${sel.scope.replace('\n', '\n  ')} {`,
      '    --cre8-duration-fast: 0ms;',
      '    --cre8-duration-base: 0ms;',
      '    --cre8-duration-slow: 0ms;',
      '  }',
      '}',
      '',
    ].join('\n'),
  });
  for (const [token, ref] of Object.entries(plan.semantic)) {
    css = rewriteDecl(css, `--cre8-${token}`, plan.modeSplit.has(token) ? `var(--cre8-mode-${token})` : refVar(ref));
  }
  // An unchanged slot that emitted nothing leaves a stray blank line; tidy it.
  return css.replace(/\n\n\n+/g, '\n\n').replace(/;\n\n\}/g, ';\n}');
}

function buildThemeCss(cfg, opts) {
  const sel = selectors(opts.scope);
  return fill(TEMPLATE_THEME, {
    HEADER: headerComment(cfg, ['', 'Theme entry point: the token sheet, the brand\'s fonts, and the typography', 'roles. Headings (title, headline, display) read --cre8-font-family-display.']),
    THEME_SELECTOR: sel.theme,
  }) + '\n';
}

function fontFormat(src) {
  const ext = src.split('?')[0].split('.').pop().toLowerCase();
  return { woff2: 'woff2', woff: 'woff', ttf: 'truetype', otf: 'opentype' }[ext] || ext;
}

function buildFontsCss(cfg, { absolute = false } = {}) {
  const faces = cfg.typography.fontFaces;
  const head = `/* ${GENERATED_BANNER}. */\n`;
  if (!faces.length) {
    return `${head}/**
 * ${cfg.displayName} ships no custom typeface — the font seeds resolve to
 * system or already-loaded families, so there is nothing to declare here.
 * A brand that adds typography.fontFaces to brand.json gets its @font-face
 * rules generated into this file.
 */
`;
  }
  return head + faces.map((f) => {
    const src = absolute && !/^(https?:|\/|\.\.)/.test(f.src) ? `/${f.src}` : f.src;
    return `@font-face {
\tfont-family: '${f.family}';
\tfont-style: ${f.style || 'normal'};
\tfont-weight: ${f.weight};
\tsrc: url('${src}') format('${fontFormat(f.src)}');
\tfont-display: ${f.display || 'swap'};
}
`;
  }).join('\n');
}

function moduleIdent(name) {
  return name.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase()).replace(/^[^a-zA-Z_$]/, '_$&');
}

function buildModuleTs(cfg, files) {
  const escape = (s) => s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
  const theme = files.themeCss.split('\n').filter((l) => !l.startsWith('@import')).join('\n');
  const body = [buildFontsCss(cfg, { absolute: true }), files.brandCss, theme].join('\n');
  const id = moduleIdent(cfg.name);
  return `// ${GENERATED_BANNER}.\n// Storybook's inlined copy of fonts.css + tokens_brand.css + tokens_${cfg.name}.css.\nconst ${id} = \`\n${escape(body)}\`;\n\nexport default ${id};\n`;
}

const generationCache = new WeakMap();

function generate(brand, opts = {}) {
  const autoCorrect = opts.autoCorrect !== false;
  const key = `${opts.scope || ''}|${autoCorrect}`;
  let perBrand = generationCache.get(brand);
  if (perBrand?.has(key)) return perBrand.get(key);
  const cfg = normalise(brand);
  const { text: rampText, notes: rampNotes } = rampLines(cfg);
  // First pass: the uncorrected sheet, to resolve primitives for the guard.
  const draftPlan = planContrast(cfg, null, false);
  const draft = buildBrandCss(cfg, draftPlan, rampText, rampNotes, { scope: null });
  const draftResolver = createResolver(parseSheet(draft));
  const primitive = (ref) => parseColor(draftResolver.resolveName(`--cre8-${ref}`, 'light'));
  const plan = planContrast(cfg, primitive, autoCorrect);
  const brandCss = buildBrandCss(cfg, plan, rampText, rampNotes, opts);
  const themeCss = buildThemeCss(cfg, opts);
  const fontsCss = buildFontsCss(cfg);
  const result = { cfg, plan, brandCss, themeCss, fontsCss };
  if (!perBrand) { perBrand = new Map(); generationCache.set(brand, perBrand); }
  perBrand.set(key, result);
  return result;
}

/** -> { brandCss, themeCss, fontsCss } (contents of the three css files). */
export function generateBrandCss(brand, opts = {}) {
  const { brandCss, themeCss, fontsCss } = generate(brand, opts);
  return { brandCss, themeCss, fontsCss };
}

/**
 * Every file a brand's css/ directory should hold, keyed by path relative to
 * the brand directory. The .module.ts (Storybook's inlined copy) is included
 * when `withModule` is true.
 */
export function generateBrandFiles(brand, { withModule = false } = {}) {
  const g = generate(brand);
  const files = {
    'css/tokens_brand.css': g.brandCss,
    [`css/tokens_${g.cfg.name}.css`]: g.themeCss,
    'css/fonts.css': g.fontsCss,
  };
  if (withModule) files[`css/tokens_${g.cfg.name}.module.ts`] = buildModuleTs(g.cfg, g);
  return files;
}

/* ===========================================================================
   Resolution and the contrast report
   =========================================================================== */
function resolverFor(brand, opts = {}) {
  const g = generate(brand, opts);
  if (!g.resolver) g.resolver = createResolver(parseSheet(g.brandCss));
  return g.resolver;
}

function concrete(value) {
  // Turn any oklch(L C H [/ a]) in a resolved value into hex (or #rrggbbaa).
  return value.replace(/oklch\(([\d.]+) ([\d.]+) ([\d.]+)(?: \/ ([\d.]+))?\)/g, (m, L, C, H, a) => {
    const hex = oklchToHex({ L: +L, C: +C, H: +H });
    if (a === undefined || +a >= 1) return hex;
    return hex + Math.round(+a * 255).toString(16).padStart(2, '0');
  });
}

/** Concrete colour/dimension string for a token after resolving its var() chain. */
export function resolveToken(brand, name, mode = 'light') {
  const token = name.startsWith('--') ? name : `--${name.startsWith('cre8-') ? name : `cre8-${name}`}`;
  const v = resolverFor(brand).resolveName(token, mode === 'dark' ? 'inverse' : mode);
  if (v === undefined) throw new Error(`Unknown token ${token}`);
  return concrete(v);
}

/**
 * -> { target, pairs: [{ fg, bg, mode, ratio, required, pass, waived }], pass, corrections }
 * Reports on the css that would ship (after auto-correction). Pass
 * { autoCorrect: false } to see the uncorrected pairs.
 */
export function checkContrast(brand, opts = {}) {
  const g = generate(brand, { autoCorrect: opts.autoCorrect !== false });
  const resolver = g.resolver || (g.resolver = createResolver(parseSheet(g.brandCss)));
  const target = g.cfg.contrastTarget;
  const pairs = [];
  for (const p of CONTRAST_PAIRS) {
    for (const mode of p.modes) {
      const fg = parseColor(resolver.resolveName(`--cre8-${p.fg}`, mode));
      const bg = parseColor(resolver.resolveName(`--cre8-${p.bg}`, mode));
      const ratio = Number(contrastRatio(fg, bg).toFixed(2));
      const need = required(p.kind, target);
      pairs.push({
        fg: p.fg, bg: p.bg, mode, kind: p.kind, ratio, required: need, pass: ratio >= need,
        waived: isWaived(g.cfg, p.fg, p.bg, mode),
        fgValue: oklchToHex(fg), bgValue: oklchToHex(bg),
      });
    }
  }
  return { target, pairs, pass: pairs.every((p) => p.pass || p.waived), corrections: g.plan.notes };
}

/* ===========================================================================
   Token listing
   =========================================================================== */
const TIER_BANNERS = [[/TIER 0/, 'seed'], [/TIER 1/, 'primitive'], [/TIER 2/, 'semantic'], [/TIER 3b/, 'legacy'], [/TIER 3 /, 'component']];

/** -> [{ name, tier, value, description? }] for the cre8 brand (or opts.brand). */
export function listTokens({ tier, brand } = {}) {
  const b = brand || loadBrand('cre8');
  const css = generate(b).brandCss;
  const out = []; const seen = new Map();
  let current = null; let description;
  const mainEnd = css.indexOf('\n}\n\n/* ===', css.indexOf('TIER 3b'));
  const text = css.slice(0, mainEnd > 0 ? mainEnd : undefined);
  for (const raw of text.split('\n')) {
    const line = raw.trim();
    for (const [re, t] of TIER_BANNERS) if (re.test(line)) { current = t; description = undefined; }
    const c = /^\/\*\s*(.+?)(?:\s*\*\/)?$/.exec(line);
    if (c && !/^=+$/.test(c[1]) && !/TIER/.test(c[1])) description = c[1].replace(/\s*\*\/$/, '');
    const m = /^(--cre8-[a-z0-9-]+):\s*(.*);$/.exec(line);
    if (!m || !current) continue;
    let t = current;
    if (/^--cre8-shadow-/.test(m[1])) t = 'primitive';
    const entry = { name: m[1], tier: t, value: m[2] };
    if (description) entry.description = description;
    if (seen.has(m[1])) out[seen.get(m[1])] = entry; else { seen.set(m[1], out.length); out.push(entry); }
  }
  return tier ? out.filter((e) => e.tier === tier) : out;
}
