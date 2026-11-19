/**
 * Pure helpers for scripts/brand-audit.mjs. No browser, no I/O beyond reading
 * files handed in by path, so they can be unit tested with `node --test`.
 *
 * The central question these answer: "for brand X in mode Y, does every
 * `var(--cre8-*)` a component reads resolve to something?" That is decided
 * statically, with CSS's own semantics:
 *
 *   - a custom property is *defined* when the brand declares it AND every var()
 *     in its declared value resolves (an undefined reference makes the whole
 *     declaration guaranteed-invalid, exactly as the browser treats it);
 *   - `var(--a, <fallback>)` resolves when --a is defined, or the fallback is
 *     present and itself resolves (`var(--a,)` — an empty fallback — counts);
 *   - a custom property the component declares itself (in its own shadow
 *     styles) is the component's business, not the brand's, and is treated as
 *     defined.
 */

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import postcss from 'postcss';

// ─── var() parsing ──────────────────────────────────────────────────────────

/**
 * Top-level `var(...)` calls in a CSS value or stylesheet text.
 * Returns [{ name, fallback }] where fallback is the raw text after the first
 * comma (undefined when there is no comma). Nested var() inside a fallback is
 * left in the fallback text, to be evaluated only if the fallback is reached.
 */
export function parseVars(text) {
  const out = [];
  const re = /var\(\s*/g;
  let m;
  while ((m = re.exec(text))) {
    let i = m.index + m[0].length;
    let depth = 1;
    const start = i;
    let comma = -1;
    for (; i < text.length && depth > 0; i++) {
      const ch = text[i];
      if (ch === '(') depth++;
      else if (ch === ')') depth--;
      else if (ch === ',' && depth === 1 && comma < 0) comma = i;
    }
    const end = i - 1; // index of the closing paren
    const nameEnd = comma >= 0 ? comma : end;
    const name = text.slice(start, nameEnd).trim();
    const fallback = comma >= 0 ? text.slice(comma + 1, end) : undefined;
    if (name.startsWith('--')) out.push({ name, fallback });
    re.lastIndex = i; // skip the body; nested vars belong to the fallback
  }
  return out;
}

/**
 * Builds a resolver over a map of declared custom properties.
 * `declared`: Map<name, rawValue>. `assumeDefined`: Set<name> treated as defined.
 */
export function makeResolver(declared, assumeDefined = new Set()) {
  const memo = new Map();
  const visiting = new Set();

  function isDefined(name) {
    if (assumeDefined.has(name)) return true;
    if (memo.has(name)) return memo.get(name);
    if (!declared.has(name)) {
      memo.set(name, false);
      return false;
    }
    if (visiting.has(name)) return false; // cycle → guaranteed-invalid
    visiting.add(name);
    const ok = exprResolves(declared.get(name));
    visiting.delete(name);
    memo.set(name, ok);
    return ok;
  }

  function exprResolves(text) {
    return parseVars(text).every(({ name, fallback }) => varResolves(name, fallback));
  }

  function varResolves(name, fallback) {
    if (isDefined(name)) return true;
    if (fallback === undefined) return false;
    return exprResolves(fallback);
  }

  return { isDefined, exprResolves, varResolves };
}

// ─── component side ─────────────────────────────────────────────────────────

const CRE8_DECL = /(--cre8-[A-Za-z0-9_-]+)\s*:/g;

/**
 * Reads every component's style sources (compiled `*.styles.ts` plus any
 * inline `css\`` in the component's own .ts) and returns
 *   { usage: Map<tag, Array<{ name, fallback }>>, declared: Set<name> }
 * `usage` holds only var() calls whose *first* name is a --cre8-* token.
 */
export function collectComponentTokenUsage(componentsDir) {
  const usage = new Map();
  const declared = new Set();
  for (const dir of readdirSync(componentsDir).sort()) {
    const full = join(componentsDir, dir);
    if (!statSync(full).isDirectory()) continue;
    const files = readdirSync(full).filter(
      (f) => f.endsWith('.ts') && !/\.(stories|test|spec|d)\.ts$/.test(f),
    );
    if (!files.length) continue;
    const tag = `cre8-${dir}`;
    const calls = [];
    const seen = new Set();
    for (const f of files) {
      const text = readFileSync(join(full, f), 'utf8');
      // Only look inside CSS: compiled style modules are all CSS; component
      // modules contribute their css`` blocks.
      const chunks = f.endsWith('.styles.ts') ? [text] : [...text.matchAll(/css`([\s\S]*?)`/g)].map((m) => m[1]);
      for (const chunk of chunks) {
        for (const m of chunk.matchAll(CRE8_DECL)) declared.add(m[1]);
        for (const call of allVarCalls(chunk)) {
          if (!call.name.startsWith('--cre8-')) continue;
          const key = `${call.name}|${call.fallback ?? ''}`;
          if (seen.has(key)) continue;
          seen.add(key);
          calls.push(call);
        }
      }
    }
    if (calls.length) usage.set(tag, calls);
  }
  return { usage, declared };
}

/** Every var() call at any nesting depth (fallback-nested ones included). */
function allVarCalls(text) {
  const out = [];
  const stack = [text];
  while (stack.length) {
    const t = stack.pop();
    for (const call of parseVars(t)) {
      out.push(call);
      if (call.fallback) stack.push(call.fallback);
    }
  }
  return out;
}

// ─── brand side ─────────────────────────────────────────────────────────────

/**
 * Discovers brands under brandsDir. A brand is a directory holding
 * `brand.json` and/or `css/tokens_<dir>.css`; the theme sheet is always the
 * latter (brand.json is the source, the sheet is what ships).
 */
export function discoverBrands(brandsDir) {
  const brands = [];
  for (const name of readdirSync(brandsDir).sort()) {
    const dir = join(brandsDir, name);
    if (!statSync(dir).isDirectory()) continue;
    const brandJson = join(dir, 'brand.json');
    const themeCss = join(dir, 'css', `tokens_${name}.css`);
    const hasJson = existsSync(brandJson);
    const hasCss = existsSync(themeCss);
    if (!hasJson && !hasCss) continue;
    brands.push({
      name,
      dir,
      brandJson: hasJson ? brandJson : null,
      themeCss: hasCss ? themeCss : null,
    });
  }
  return brands;
}

const GLOBAL_SELECTOR = /^(:root|html|\[data-cre8-theme\]|:host)$/;
const INVERSE_SELECTOR = /^(:root|html)?\[data-mode=["']?inverse["']?\]$/;

/**
 * Parses a theme sheet (following relative @imports) into the custom
 * properties it declares for light mode and inverse mode.
 *
 * light   = declarations on :root / html / [data-cre8-theme], outside @media
 * inverse = light, overlaid with declarations on [data-mode="inverse"]
 *
 * `@media (prefers-color-scheme)` and `[data-mode="auto"]` blocks are ignored:
 * the audit pins modes explicitly. Component-scoped rules (e.g. `cre8-footer {}`)
 * are not global definitions and are ignored too.
 */
export function parseThemeSheet(file) {
  const light = new Map();
  const inverse = new Map();
  const visited = new Set();

  function walk(path) {
    const abs = resolve(path);
    if (visited.has(abs) || !existsSync(abs)) return;
    visited.add(abs);
    const root = postcss.parse(readFileSync(abs, 'utf8'), { from: abs });
    root.each((node) => {
      if (node.type === 'atrule' && node.name === 'import') {
        const m = node.params.match(/^(?:url\()?['"]?([^'")]+)['"]?\)?/);
        if (m && !/^[a-z]+:/i.test(m[1])) walk(join(dirname(abs), m[1]));
        return;
      }
      if (node.type !== 'rule') return; // @media, @font-face, … ignored
      const sels = node.selectors.map((s) => s.trim());
      const isGlobal = sels.some((s) => GLOBAL_SELECTOR.test(s));
      const isInverse = sels.some((s) => INVERSE_SELECTOR.test(s));
      if (!isGlobal && !isInverse) return;
      node.walkDecls(/^--/, (decl) => {
        if (decl.parent !== node) return;
        if (isGlobal) light.set(decl.prop, decl.value);
        if (isInverse) inverse.set(decl.prop, decl.value);
      });
    });
  }

  walk(file);
  const inverseFull = new Map([...light, ...inverse]);
  return { light, inverse: inverseFull, files: [...visited] };
}

/**
 * Unresolved tokens for one brand × mode.
 * Returns Map<tokenName, Set<tag>> — tokenName is the var() that failed with
 * nothing to fall back on.
 */
export function findUnresolved(declaredTokens, componentUsage) {
  const resolver = makeResolver(declaredTokens, componentUsage.declared);
  const out = new Map();
  for (const [tag, calls] of componentUsage.usage) {
    for (const { name, fallback } of calls) {
      if (resolver.varResolves(name, fallback)) continue;
      if (!out.has(name)) out.set(name, new Set());
      out.get(name).add(tag);
    }
  }
  return out;
}

// ─── baseline gating ────────────────────────────────────────────────────────

/**
 * Compares one brand × mode result against the committed baseline.
 * Baseline entry shape: { unresolved: string[], contrast: { [tag]: number } | null }
 *   - entry missing entirely  → gate both against empty (new brands start clean)
 *   - contrast === null       → contrast not baselined yet; reported, not gated
 * Returns { newUnresolved: string[], contrastRegressions: [{tag, count, baseline}],
 *           contrastGated: boolean }
 */
export function compareToBaseline(result, entry) {
  const baseUnresolved = new Set(entry?.unresolved ?? []);
  const newUnresolved = result.unresolved.map((u) => u.token).filter((t) => !baseUnresolved.has(t));

  const contrastGated = result.contrast != null && (entry == null || entry.contrast != null);
  const contrastRegressions = [];
  if (contrastGated) {
    const base = entry?.contrast ?? {};
    for (const [tag, count] of Object.entries(result.contrast.byComponent)) {
      const allowed = base[tag] ?? 0;
      if (count > allowed) contrastRegressions.push({ tag, count, baseline: allowed });
    }
  }
  return { newUnresolved, contrastRegressions, contrastGated };
}
