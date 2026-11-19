/**
 * Brand and token tools: the theming half of the connector.
 *
 * A brand is one `brand.json` (design-tokens/schema/brand.schema.json). Every
 * stylesheet a brand ships is generated from it by
 * `design-tokens/tools/brand.mjs`, the module these tools call — so the CSS an
 * agent gets from apply_brand is byte-for-byte what `pnpm tokens:build` would
 * write, and the contrast verdict is the one `pnpm tokens:check` enforces.
 * Nothing here re-implements colour math.
 *
 * `brand.mjs` is plain ESM outside this package. It is located at
 * `<cre8-wc root>/design-tokens/tools/brand.mjs` (set CRE8_WC_ROOT to point at
 * a checkout), or exactly at CRE8_BRAND_MODULE when that is set. Tests inject a
 * stub through either the env var or `setBrandModule`. A published
 * `@tmorrow/cre8-wc` does not ship `design-tokens/tools/`; the tools that need
 * it then fail with a message saying so, and the ones that only read JSON
 * (get_brand_contract, list_brands, list_tokens descriptions) keep working.
 */

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { z } from 'zod';
import { wcRoot } from './surface-routes.js';
import { surfaceStore } from './surfaces.js';

// ─── the brand.mjs contract (design-tokens/BRAND_CONTRACT.md) ───────────────

export type TokenTier = 'seed' | 'primitive' | 'semantic' | 'component' | 'legacy';

export type Brand = Record<string, unknown> & { name: string };

export interface ValidationResult {
  ok: boolean;
  errors: string[];
  warnings: string[];
}

export interface ContrastResult {
  target: 'AA' | 'AAA';
  pairs: Array<{ fg: string; bg: string; mode: string; ratio: number; required: number; pass: boolean }>;
  pass: boolean;
}

export interface GeneratedCss {
  brandCss: string;
  themeCss: string;
  fontsCss: string;
}

export interface BrandModule {
  loadBrand(nameOrPath: string): Brand | Promise<Brand>;
  validateBrand(brand: unknown): ValidationResult;
  generateBrandCss(brand: Brand, opts?: { scope?: string }): GeneratedCss;
  checkContrast(brand: Brand): ContrastResult;
  listTokens(opts?: { tier?: TokenTier }): Array<{
    name: string;
    tier: TokenTier;
    value: string;
    description?: string;
  }>;
  resolveToken(brand: Brand, name: string, mode?: string): string;
}

let injected: BrandModule | null = null;
let loading: Promise<BrandModule> | null = null;

/** Dependency injection for tests and embedders. Pass null to go back to the file. */
export function setBrandModule(mod: BrandModule | null): void {
  injected = mod;
  loading = null;
}

export function brandModulePath(): string {
  return process.env.CRE8_BRAND_MODULE
    ? resolve(process.env.CRE8_BRAND_MODULE)
    : join(wcRoot(), 'design-tokens', 'tools', 'brand.mjs');
}

export async function brandModule(): Promise<BrandModule> {
  if (injected) return injected;
  if (!loading) {
    const path = brandModulePath();
    loading = (async () => {
      if (!existsSync(path)) {
        throw new Error(
          `Brand tooling not found at ${path}. These tools need design-tokens/tools/brand.mjs from a ` +
            'cre8 source checkout: set CRE8_WC_ROOT to packages/cre8-wc in one, or CRE8_BRAND_MODULE ' +
            'to the module itself.'
        );
      }
      return (await import(pathToFileURL(path).href)) as BrandModule;
    })();
    // A failed load is not cached: the checkout may appear (or the env var
    // change) without a restart.
    loading.catch(() => {
      loading = null;
    });
  }
  return loading;
}

// ─── files ──────────────────────────────────────────────────────────────────

/** `design-tokens/` in a checkout, or the built copy in a published package. */
export function designTokensDir(): string {
  for (const candidate of [
    join(wcRoot(), 'design-tokens'),
    join(wcRoot(), 'lib', 'design-tokens'),
  ]) {
    if (existsSync(join(candidate, 'schema'))) return candidate;
  }
  return join(wcRoot(), 'design-tokens');
}

export function brandsDir(): string {
  return process.env.CRE8_BRANDS_DIR
    ? resolve(process.env.CRE8_BRANDS_DIR)
    : join(designTokensDir(), 'brands');
}

const BRAND_NAME = /^[a-z][a-z0-9-]*$/;

function assertBrandName(name: string): void {
  // Names only, never paths: loadBrand accepts a path, and an MCP caller
  // must not be able to point it at an arbitrary file.
  if (!BRAND_NAME.test(name)) {
    throw new Error(`"${name}" is not a brand name. Brand names match ${BRAND_NAME}; list_brands shows them.`);
  }
}

/** The brand.json as written, `extends` not applied. Null when absent. */
export function readBrandJson(name: string): Brand | null {
  assertBrandName(name);
  const file = join(brandsDir(), name, 'brand.json');
  if (!existsSync(file)) return null;
  return JSON.parse(readFileSync(file, 'utf-8')) as Brand;
}

export function brandNames(): { withContract: string[]; withoutContract: string[] } {
  let dirs: string[] = [];
  try {
    dirs = readdirSync(brandsDir(), { withFileTypes: true })
      .filter((e) => e.isDirectory() && BRAND_NAME.test(e.name))
      .map((e) => e.name)
      .sort();
  } catch {
    /* no brands directory: both lists empty */
  }
  const withContract = dirs.filter((d) => existsSync(join(brandsDir(), d, 'brand.json')));
  return { withContract, withoutContract: dirs.filter((d) => !withContract.includes(d)) };
}

export interface BrandVoice {
  tone?: string;
  avoid?: string[];
  prefer?: string[];
}

/**
 * A brand's copy guidance, following `extends` until one sets it. Synchronous
 * and JSON-only so the generation path can attach it without brand.mjs.
 */
export function brandVoice(name: string): { brand: string; displayName?: string; voice: BrandVoice | null } {
  const seen = new Set<string>();
  let current: string | null = name;
  let displayName: string | undefined;
  while (current && !seen.has(current)) {
    seen.add(current);
    const json = readBrandJson(current);
    if (!json) {
      if (current === name) throw new Error(`Unknown brand "${name}". list_brands shows the brands this server has.`);
      break;
    }
    displayName ??= json.displayName as string | undefined;
    if (json.voice) return { brand: name, displayName, voice: json.voice as BrandVoice };
    current = typeof json.extends === 'string' ? json.extends : null;
  }
  return { brand: name, displayName, voice: null };
}

interface TokenIntent {
  tier: TokenTier;
  use: string;
  never: string;
  brandField?: string;
  modeAware?: boolean;
  legacyAlias?: string;
}

interface TokenIntents {
  tiers: Record<TokenTier, { order: number; summary: string; change: string }>;
  tokens: Record<string, TokenIntent>;
  patterns: Array<{ pattern: string; tier: TokenTier; use: string; never: string }>;
}

let intentsCache: TokenIntents | null = null;

export function loadTokenIntents(): TokenIntents {
  if (intentsCache) return intentsCache;
  const file = join(designTokensDir(), 'schema', 'token-intents.json');
  intentsCache = JSON.parse(readFileSync(file, 'utf-8')) as TokenIntents;
  return intentsCache;
}

function intentFor(name: string, intents: TokenIntents): (TokenIntent & { matchedPattern?: string }) | null {
  const exact = intents.tokens[name];
  if (exact) return exact;
  for (const p of intents.patterns) {
    if (new RegExp(p.pattern).test(name)) return { tier: p.tier, use: p.use, never: p.never, matchedPattern: p.pattern };
  }
  return null;
}

function oneLine(intent: { use: string; never: string }): string {
  return `Use for ${intent.use}. Never for ${intent.never}.`;
}

// ─── brand input ────────────────────────────────────────────────────────────

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** Objects merge key by key; arrays and leaves (`{ $value }`) replace. */
function deepMerge(base: Record<string, unknown>, over: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(over)) {
    const prior = out[key];
    out[key] =
      isPlainObject(prior) && isPlainObject(value) && !('$value' in value)
        ? deepMerge(prior, value)
        : value;
  }
  return out;
}

/**
 * A brand name → loadBrand. A brand object → itself, with its `extends`
 * parent (loaded by name, so already merged) folded underneath.
 */
async function resolveBrand(mod: BrandModule, input: unknown): Promise<{ raw: unknown; brand: Brand }> {
  if (typeof input === 'string') {
    assertBrandName(input);
    const brand = await mod.loadBrand(input);
    return { raw: brand, brand };
  }
  if (!isPlainObject(input)) throw new Error('`brand` must be a brand.json object or a brand name.');
  const parentName = input.extends;
  if (typeof parentName === 'string') {
    assertBrandName(parentName);
    const parent = (await mod.loadBrand(parentName)) as Record<string, unknown>;
    const merged = deepMerge(parent, input);
    merged.extends = null;
    return { raw: input, brand: merged as Brand };
  }
  return { raw: input, brand: input as Brand };
}

function contrastOrError(mod: BrandModule, brand: Brand): ContrastResult | { error: string } {
  try {
    return mod.checkContrast(brand);
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

// ─── handlers ───────────────────────────────────────────────────────────────

export interface ListTokensInput {
  tier?: TokenTier;
  query?: string;
}

export async function handleListTokens(input: ListTokensInput): Promise<string> {
  const intents = loadTokenIntents();
  // With nothing to narrow on, the ~1,000-token answer would bury the two
  // tiers an agent actually writes against.
  const tiers: TokenTier[] | null = input.tier
    ? [input.tier]
    : input.query
      ? null
      : ['seed', 'semantic'];

  let rows: Array<{ name: string; tier: TokenTier; value: string | null; description?: string }>;
  let valueSource: 'brand.mjs' | 'unavailable';
  try {
    const mod = await brandModule();
    rows = mod.listTokens(input.tier ? { tier: input.tier } : undefined);
    valueSource = 'brand.mjs';
  } catch {
    // No tooling: the intents file still names every seed and semantic token.
    rows = Object.entries(intents.tokens).map(([name, i]) => ({ name, tier: i.tier, value: null }));
    valueSource = 'unavailable';
  }

  const q = input.query?.toLowerCase();
  const tokens = rows
    .filter((r) => !tiers || tiers.includes(r.tier))
    .map((r) => {
      const intent = intentFor(r.name, intents);
      return {
        name: r.name,
        tier: r.tier,
        value: r.value,
        description: intent ? oneLine(intent) : (r.description ?? null),
        ...(intent?.modeAware ? { modeAware: true } : {}),
        ...(intent?.brandField ? { brandField: intent.brandField } : {}),
        ...(intent?.legacyAlias ? { legacyAlias: intent.legacyAlias } : {}),
      };
    })
    .filter((t) => !q || t.name.includes(q) || (t.description ?? '').toLowerCase().includes(q))
    .sort((a, b) => intents.tiers[a.tier].order - intents.tiers[b.tier].order || a.name.localeCompare(b.name));

  return JSON.stringify(
    {
      tiers: tiers ?? 'all',
      query: input.query ?? null,
      count: tokens.length,
      valuesFrom: valueSource === 'brand.mjs' ? 'cre8 brand (brand.mjs listTokens)' : 'unavailable — brand tooling not found',
      rule:
        'Read semantic tokens in CSS; change seeds in brand.json. Never write a hex value or a ' +
        'primitive ramp step where a semantic token carries the meaning — only semantic tokens ' +
        'follow data-mode.',
      tierGuide: Object.fromEntries(
        (tiers ?? (Object.keys(intents.tiers) as TokenTier[])).map((t) => [t, intents.tiers[t]])
      ),
      ...(input.tier || input.query ? {} : { note: 'Seed and semantic only. Pass tier or query for primitive, component or legacy tokens.' }),
      tokens,
    },
    null,
    2
  );
}

export function handleGetBrandContract(): string {
  const dir = designTokensDir();
  const schema = JSON.parse(readFileSync(join(dir, 'schema', 'brand.schema.json'), 'utf-8'));
  const example = readBrandJson('cre8');
  return JSON.stringify(
    {
      guide: {
        whatItIs:
          'brand.json is the single source of a cre8 brand. Every --cre8-* value a brand changes is ' +
          'derived from it; tokens_brand.css, tokens_<name>.css and fonts.css are generated and never ' +
          'hand-edited.',
        minimum: 'name plus color.primary and color.neutral. Everything else falls back to `extends`, then to cre8.',
        steps: [
          '1. Start from `extends: "cre8"` and set only what differs: seeds in `color`, fonts in `typography`, corner radius in `shape`.',
          '2. Colours are seeds, not palettes: each produces an 11-step OKLCH ramp with the seed at step 500. Give the brand colour itself, not a lighter or darker variant of it.',
          '3. validate_brand before anything else. It runs the schema and the contrast guard (light and dark/inverse) at accessibility.contrastTarget.',
          '4. apply_brand to get the CSS (or restyle a live surface); in the repo, save as design-tokens/brands/<name>/brand.json and run pnpm tokens:build.',
        ],
        rules: [
          'Colour values are #rgb/#rrggbb/#rrggbbaa or oklch(...). Dimensions are px or rem.',
          '`overrides` sets literal --cre8-* values last and is warned on every entry — it bypasses the contrast guard. Prefer a seed.',
          '`voice` is copy guidance for agents writing on this brand (tone, avoid, prefer). It is not rendered.',
          'A neutral with a little chroma gives the brand its temperature; a pure grey reads as unbranded.',
        ],
      },
      schema,
      example,
    },
    null,
    2
  );
}

export async function handleListBrands(): Promise<string> {
  const { withContract, withoutContract } = brandNames();
  let mod: BrandModule | null = null;
  try {
    mod = await brandModule();
  } catch {
    /* fall back to brand.json as written */
  }

  const brands = [];
  for (const name of withContract) {
    const raw = readBrandJson(name)!;
    let merged: Record<string, unknown> = raw;
    if (mod) {
      try {
        merged = (await mod.loadBrand(name)) as Record<string, unknown>;
      } catch {
        /* keep raw */
      }
    }
    const color = (merged.color ?? {}) as Record<string, { $value?: string } | unknown>;
    const seeds = Object.fromEntries(
      Object.entries(color)
        .filter(([, v]) => isPlainObject(v) && typeof (v as { $value?: unknown }).$value === 'string')
        .map(([k, v]) => [k, (v as { $value: string }).$value])
    );
    const typography = (merged.typography ?? {}) as Record<string, { $value?: unknown }>;
    brands.push({
      name,
      displayName: raw.displayName ?? name,
      description: raw.description ?? null,
      extends: raw.extends ?? null,
      seeds,
      bodyFont: typography.body?.$value ?? null,
      contrastTarget: (merged.accessibility as { contrastTarget?: string } | undefined)?.contrastTarget ?? 'AA',
      hasVoice: brandVoice(name).voice !== null,
      // An older brand.json shape (no `name`, no `color` seeds) predates the
      // contract: readable for voice, not validatable or regenerable as is.
      ...(raw.name === name ? {} : { predatesContract: true }),
    });
  }

  return JSON.stringify(
    {
      count: brands.length,
      brands,
      ...(withoutContract.length
        ? {
            withoutBrandJson: withoutContract,
            note: 'These brand directories have stylesheets but no brand.json yet, so they cannot be validated or regenerated.',
          }
        : {}),
      next: 'apply_brand { brand: "<name>" } for its CSS, or get_brand_contract to author a new one.',
    },
    null,
    2
  );
}

export async function handleValidateBrand(input: { brand: unknown }): Promise<string> {
  const mod = await brandModule();
  const { raw, brand } = await resolveBrand(mod, input.brand);
  const validation = mod.validateBrand(raw);
  // A schema-invalid brand may still have checkable seeds; when it does not,
  // the contrast step reports why instead of failing the whole call.
  const contrast = contrastOrError(mod, brand);
  return JSON.stringify(
    {
      ok: validation.ok,
      errors: validation.errors,
      warnings: validation.warnings,
      contrast,
      ...(validation.ok ? { next: 'apply_brand with the same object.' } : {}),
    },
    null,
    2
  );
}

/** A selector to scope generated CSS to. Rejects anything that could end the rule. */
const SCOPE_UNSAFE = /[{};<>@\\]|\/\*/;

/** CSS a <style> element can hold on a page that did not load the brand's files. */
function inlineCss(css: GeneratedCss, brandName: string, servable: boolean): string {
  const fonts = servable
    ? css.fontsCss.replace(/url\((['"]?)(?!https?:|\/|data:)/g, `url($1/themes/${brandName}/`)
    : // Relative font files only exist next to a brand on disk.
      css.fontsCss.replace(/@font-face\s*{[^}]*url\((['"]?)(?!https?:|data:)[^}]*}/g, '');
  return [fonts, css.brandCss, css.themeCss]
    .join('\n')
    // Siblings are inlined above; an @import would resolve against the page.
    .replace(/@import[^;]*;/g, '')
    .replace(/<\/style/gi, '<\\/style');
}

export interface ApplyBrandInput {
  brand: unknown;
  scope?: string;
  surface_id?: string;
}

export async function handleApplyBrand(input: ApplyBrandInput): Promise<string> {
  if (input.scope !== undefined && (!input.scope.trim() || SCOPE_UNSAFE.test(input.scope))) {
    throw new Error('`scope` must be a plain CSS selector such as "[data-cre8-theme=\\"acme\\"]" or ".checkout".');
  }
  const mod = await brandModule();
  const { raw, brand } = await resolveBrand(mod, input.brand);

  const validation = mod.validateBrand(raw);
  if (!validation.ok) {
    throw new Error(
      `Brand "${brand.name}" does not validate, so no CSS was generated:\n- ${validation.errors.join('\n- ')}\n` +
        'Fix the errors (validate_brand shows contrast detail) and call apply_brand again.'
    );
  }

  const css = mod.generateBrandCss(brand, input.scope ? { scope: input.scope } : undefined);
  const named = typeof input.brand === 'string';
  let voice: BrandVoice | null = null;
  if (isPlainObject(brand.voice)) voice = brand.voice as BrandVoice;
  else if (named) voice = brandVoice(brand.name).voice;

  let surface: unknown;
  if (input.surface_id) {
    const summary = surfaceStore.setStyle(input.surface_id, {
      brand: brand.name,
      css: inlineCss(css, brand.name, named && readBrandJson(brand.name) !== null),
    });
    surface = { surfaceId: summary.surfaceId, brandOverride: summary.brandOverride, viewers: summary.viewers, restyled: true };
  }

  return JSON.stringify(
    {
      brand: brand.name,
      scope: input.scope ?? ':root, [data-cre8-theme]',
      warnings: validation.warnings,
      ...(surface ? { surface } : {}),
      css,
      howToUse: input.scope
        ? `Load the base cre8 theme, then inject brandCss and themeCss (and fontsCss) after it. Only elements matching ${input.scope} take this brand.`
        : 'Replace the cre8 theme sheet with these, or inject them after it: fontsCss, then brandCss, then themeCss. themeCss @imports its siblings by file name; inlined, drop those @import lines. To brand one region only, call again with scope.',
      ...(voice ? { voice, voiceNote: 'Write copy on this brand to this voice.' } : {}),
    },
    null,
    2
  );
}

// ─── tool definitions ───────────────────────────────────────────────────────

const TIERS = ['seed', 'primitive', 'semantic', 'component', 'legacy'] as const;

const BRAND_INPUT = {
  description:
    'A brand: either the name of one this server has (list_brands), or a whole brand.json object ' +
    '(get_brand_contract has the schema). An object may set `extends` to an existing brand name and ' +
    'give only what differs.',
  oneOf: [{ type: 'string' }, { type: 'object' }],
};

export const brandTools = [
  {
    name: 'list_tokens',
    description:
      'The cre8 design-token vocabulary with a one-line "Use for … Never for …" per token, so you can ' +
      'pick the right --cre8-* name instead of writing a colour. Tiers: seed (the only literals; set ' +
      'from brand.json), primitive (ramps derived from seeds), semantic (purpose — what CSS should ' +
      'read), component, legacy (old --cre8-color-* aliases). With no arguments returns seed + ' +
      'semantic, the two tiers you write against. A token not listed does not exist, and var() on ' +
      'it renders nothing.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        tier: { type: 'string', enum: [...TIERS], description: 'Restrict to one tier.' },
        query: {
          type: 'string',
          description: 'Substring over token names and descriptions, e.g. "error", "link", "focus". Searches all tiers unless tier is set.',
        },
      },
    },
  },
  {
    name: 'get_brand_contract',
    description:
      'The brand.json JSON Schema plus a short authoring guide and the default cre8 brand as an ' +
      'example. Read it before writing a brand: a brand is a handful of seeds (primary, neutral, ' +
      'status colours, font, radius, spacing unit), not a list of tokens.',
    inputSchema: { type: 'object' as const, properties: {} },
  },
  {
    name: 'list_brands',
    description:
      'Brands this server has, each with display name, description, what it extends, its seed ' +
      'colours and body font, and whether it carries voice guidance for copy. Use a name with ' +
      'apply_brand, or as `extends` in a new brand.',
    inputSchema: { type: 'object' as const, properties: {} },
  },
  {
    name: 'validate_brand',
    description:
      'Checks a brand against the schema and the contrast guard. Returns { ok, errors, warnings, ' +
      'contrast }: contrast lists every required text/background pair in light and inverse mode ' +
      'with its ratio. A brand that fails contrast is an error, not a warning — fix the seed ' +
      '(usually darken primary, or the status colour named in the failing pair). Each `overrides` ' +
      'entry is a warning. Call before apply_brand.',
    inputSchema: {
      type: 'object' as const,
      properties: { brand: BRAND_INPUT },
      required: ['brand'],
    },
  },
  {
    name: 'apply_brand',
    description:
      'Generates the stylesheets for a brand — { brandCss, themeCss, fontsCss }, the same output ' +
      'pnpm tokens:build writes — ready to inject after (or instead of) the cre8 theme. `scope` ' +
      'confines it to a selector for a one-region rebrand. `surface_id` restyles a live ' +
      'ui_open_surface surface in place: every viewer re-renders in the new brand immediately, ' +
      'nothing about the spec changes. Refuses a brand that fails validation. Returns the ' +
      'brand\'s voice when it has one.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        brand: BRAND_INPUT,
        scope: {
          type: 'string',
          description:
            'CSS selector to scope the brand to instead of ":root, [data-cre8-theme]", e.g. ' +
            '"[data-cre8-theme=\\"acme\\"]". The element must also carry data-cre8-theme for the ' +
            'token stack to re-resolve there.',
        },
        surface_id: {
          type: 'string',
          description: 'A surfaceId from ui_open_surface to restyle live.',
        },
      },
      required: ['brand'],
    },
  },
];

export const BRAND_TOOL_NAMES = new Set(brandTools.map((t) => t.name));

const BrandInputSchema = z.union([z.string(), z.record(z.unknown())]);

export const ListTokensSchema = z.object({
  tier: z.enum(TIERS).optional(),
  query: z.string().optional(),
});
export const ValidateBrandSchema = z.object({ brand: BrandInputSchema });
export const ApplyBrandSchema = z.object({
  brand: BrandInputSchema,
  scope: z.string().optional(),
  surface_id: z.string().optional(),
});

export async function handleBrandTool(name: string, args: unknown): Promise<string> {
  switch (name) {
    case 'list_tokens':
      return handleListTokens(ListTokensSchema.parse(args ?? {}));
    case 'get_brand_contract':
      return handleGetBrandContract();
    case 'list_brands':
      return handleListBrands();
    case 'validate_brand':
      return handleValidateBrand(ValidateBrandSchema.parse(args));
    case 'apply_brand':
      return handleApplyBrand(ApplyBrandSchema.parse(args));
    default:
      throw new Error(`Unknown brand tool: ${name}`);
  }
}
