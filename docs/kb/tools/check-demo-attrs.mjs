#!/usr/bin/env node
/**
 * Lints every `cre8-*` attribute in the repo's standalone HTML pages against
 * the real observed-attribute set of each component.
 *
 *   node docs/kb/tools/check-demo-attrs.mjs
 *
 * Why this exists: these pages are what a newcomer copies from, and both
 * failure modes below are invisible in review because the page still renders —
 * just wrong.
 *
 *   1. Kebab-cased attributes. Lit derives the observed attribute by
 *      LOWERCASING the property name; it never inserts hyphens. So
 *      `tag-variant` is not `tagVariant`, and is silently ignored.
 *      See [[06-frameworks#attribute-casing]].
 *   2. Attributes that cannot be set from markup at all — either not a member
 *      of that element, or `@state()` / `attribute: false`, which have no
 *      associated attribute under any spelling.
 *
 * Source of truth is `custom-elements.json` (the CEM analyzer output), whose
 * `attributes` entries mirror `observedAttributes`. This matters: the a2ui
 * catalog cannot serve here, because it flattens `@property` and `@state` into
 * one `props` map. That is exactly why an `isActive` on `cre8-primary-nav-item`
 * — a `@state`, settable only from JS — survived the earlier catalog-based scan
 * of these same pages.
 *
 * Two gaps in CEM are compensated for:
 *   - it records attributes only on the declaring class, so superclass chains
 *     are walked;
 *   - it emits no declaration at all for `Cre8Element` / `Cre8FormElement`, so
 *     their `@property` fields (name, value, disabled, required, ...) are
 *     parsed from source.
 */

import { readFileSync, globSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const KB = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const REPO = resolve(KB, '../..');

const PAGE_GLOBS = ['*.html', 'website/*.html'];
const BASE_CLASSES = ['components/cre8-element.ts', 'components/cre8-form-element.ts'];

/** Valid on any element, so never component-specific. */
const GLOBAL = new Set([
  'slot', 'id', 'class', 'style', 'hidden', 'title', 'role', 'part', 'is',
  'tabindex', 'lang', 'dir', 'exportparts', 'draggable', 'contenteditable',
  'autocomplete', 'inert', 'popover', 'itemprop',
]);
const isGlobal = (a) =>
  GLOBAL.has(a) || a.startsWith('aria-') || a.startsWith('data-') || a.startsWith('on');

const read = (p) => {
  try {
    return readFileSync(resolve(REPO, p), 'utf8');
  } catch {
    return null;
  }
};

/** Strip comments so documented-but-not-declared code is never parsed as real. */
const decomment = (src) => src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '');

/**
 * Attribute names contributed by the base classes, which CEM omits entirely.
 * `@state()` is correctly excluded — it has no attribute.
 */
function baseClassAttrs() {
  const out = new Set();
  for (const rel of BASE_CLASSES) {
    const src = read(`packages/cre8-wc/${rel}`);
    if (src === null) continue;
    // `(?:get|set)` covers accessor-declared properties such as `value`.
    for (const m of decomment(src).matchAll(
      /@property\(([^)]*)\)\s*(?:(?:get|set|static|readonly)\s+)*([a-zA-Z_$][\w$]*)/g
    )) {
      const [, opts, field] = m;
      if (/attribute\s*:\s*false/.test(opts)) continue;
      const renamed = opts.match(/attribute\s*:\s*['"]([^'"]+)['"]/);
      out.add((renamed ? renamed[1] : field).toLowerCase());
    }
  }
  return out;
}

/**
 * Scans the repo's HTML pages.
 * @returns {{findings: object[], pages: string[]} | null} null if CEM is absent.
 */
export function findInvalidAttrs() {
  const raw = read('packages/cre8-wc/custom-elements.json');
  if (raw === null) return null;
  const cem = JSON.parse(raw);

  const byClass = new Map();
  const tagToClass = new Map();
  for (const mod of cem.modules ?? []) {
    for (const d of mod.declarations ?? []) {
      if (d.name) byClass.set(d.name, d);
      if (d.tagName) tagToClass.set(d.tagName, d.name);
    }
  }

  const inherited = baseClassAttrs();

  /** Walk the superclass chain collecting `pick`ed names. */
  const chain = (tag, pick) => {
    const out = new Set();
    let cls = byClass.get(tagToClass.get(tag));
    const seen = new Set();
    while (cls && !seen.has(cls.name)) {
      seen.add(cls.name);
      pick(cls, out);
      cls = cls.superclass?.name ? byClass.get(cls.superclass.name) : null;
    }
    return out;
  };

  const cache = new Map();
  const surfaceOf = (tag) => {
    if (!cache.has(tag)) {
      cache.set(tag, {
        // Lowercased, to compare against parsed markup as the HTML parser sees it.
        attrs: new Set([
          ...inherited,
          ...chain(tag, (c, o) => (c.attributes ?? []).forEach((a) => a.name && o.add(a.name.toLowerCase()))),
        ]),
        // Original casing, so messages can name the property the author wanted.
        fields: chain(tag, (c, o) =>
          (c.members ?? []).forEach((m) => m.kind === 'field' && m.name && o.add(m.name))
        ),
      });
    }
    return cache.get(tag);
  };

  const pages = PAGE_GLOBS.flatMap((g) => globSync(g, { cwd: REPO })).sort();
  const findings = [];

  for (const page of pages) {
    const src = read(page);
    if (src === null) continue;
    // Blank out comments (preserving newlines) so commented-out markup is skipped
    // without shifting the line numbers reported below.
    const html = src.replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, ' '));

    for (const tagMatch of html.matchAll(/<(cre8-[a-z0-9-]+)((?:\s+[^>]*?)?)\/?>/g)) {
      const [, tag, attrBlob] = tagMatch;
      if (!tagToClass.has(tag)) continue;
      const { attrs, fields } = surfaceOf(tag);

      for (const am of attrBlob.matchAll(
        /([a-zA-Z][a-zA-Z0-9-]*)(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?/g
      )) {
        const written = am[1];
        const asParsed = written.toLowerCase();
        if (isGlobal(asParsed) || attrs.has(asParsed)) continue;

        const line = html.slice(0, tagMatch.index + am.index).split('\n').length;
        const camel = written.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
        const nameOf = (want) => [...fields].find((f) => f.toLowerCase() === want.toLowerCase());

        // Only a casing mistake if the de-kebabed name IS a real attribute.
        const fixable = attrs.has(camel.toLowerCase()) && (nameOf(camel) ?? camel);
        // A member with no attribute => @state or attribute:false.
        const propOnly = nameOf(asParsed) ?? nameOf(camel);

        findings.push({
          page,
          line,
          tag,
          attr: written,
          reason: fixable
            ? `kebab-cased — Lit lowercases property names, it does not hyphenate. Write "${fixable}" or "${fixable.toLowerCase()}".`
            : propOnly
              ? `"${propOnly}" is a member of <${tag}> but has no attribute (@state or attribute:false) — no markup spelling sets it. Assign it as a JS property.`
              : `not an attribute of <${tag}>.`,
        });
      }
    }
  }

  return { findings, pages };
}

// CLI
if (import.meta.url === `file://${process.argv[1]}`) {
  const result = findInvalidAttrs();
  if (result === null) {
    console.error('custom-elements.json not found — run `pnpm build:wc` first.');
    process.exit(1);
  }
  const { findings, pages } = result;
  for (const f of findings) {
    console.error(`${f.page}:${f.line}  <${f.tag} ${f.attr}>  ${f.reason}`);
  }
  if (findings.length) {
    const files = new Set(findings.map((f) => f.page)).size;
    console.error(`\n${findings.length} invalid cre8-* attribute(s) across ${files} file(s).`);
    process.exit(1);
  }
  console.log(`ok — ${pages.length} HTML page(s) set only attributes the browser observes`);
}
