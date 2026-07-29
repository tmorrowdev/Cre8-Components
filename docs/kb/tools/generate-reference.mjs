#!/usr/bin/env node
/**
 * Regenerates the derived pages of the cre8 knowledge base from the manifests
 * that ship with @tmorrow/cre8-wc. Run from the repo root:
 *
 *   node docs/kb/tools/generate-reference.mjs
 *
 * Outputs:
 *   docs/kb/reference/components.md   — one row per component, grouped by category
 *   docs/kb/reference/content-model.md — children vs slots, per component
 *   docs/kb/reference/events.md       — event names, per component
 *   docs/kb/reference/props.md        — every declared prop, per component
 *   docs/kb/reference/parts.md        — CSS shadow parts, read from source
 *   docs/kb/reference/tokens.md       — every --cre8-* token, by tier
 *   docs/kb/reference/intents.json    — machine-readable intent → destination index
 *   docs/kb/reference/facts.json      — version/count facts the prose pages cite
 */

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const KB = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const REPO = resolve(KB, '../..');
const WC = resolve(REPO, 'packages/cre8-wc');

const read = (p) => JSON.parse(readFileSync(resolve(WC, p), 'utf8'));

const wcManifest = read('mcp-manifest.json');
const reactManifest = read('react-manifest.json');
const catalog = read('a2ui/catalog.json');

const CATEGORY_ORDER = [
  'Layout',
  'Typography',
  'Actions',
  'Forms',
  'Data',
  'Navigation',
  'Disclosure',
  'Feedback',
  'Media',
  'Marketing',
  'Other',
];

/** Intent phrasing per category — this is what makes the reference routable by goal. */
const CATEGORY_INTENT = {
  Layout: 'I need to place things on a page',
  Typography: 'I need to set text and headings',
  Actions: 'I need the user to do something',
  Forms: 'I need to collect input from the user',
  Data: 'I need to show a set of records',
  Navigation: 'I need the user to move somewhere else',
  Disclosure: 'I need to hide content until it is asked for',
  Feedback: 'I need to tell the user what just happened or is happening',
  Media: 'I need to show an image, icon, or mark',
  Marketing: 'I need to persuade rather than inform',
  Other: 'Uncategorized',
};

const reactByTag = new Map(reactManifest.components.map((c) => [c.tagName, c.name]));
const catalogDefs = catalog.$defs?.components ?? {};

/**
 * Descriptions come from component JSDoc, which is prose and can be wrong. Where
 * a description states something we have verified false, replace it — a caveat
 * at the top of the page does not help a reader scanning one row, and this is
 * the column an agent is most likely to trust.
 */
const DESCRIPTION_OVERRIDES = {
  'cre8-card':
    'A general container sectioned by slots: `header`, `footer`, and the ' +
    'default slot for body content. (Its JSDoc names a `body` slot; there is ' +
    'none — see 02-composition-patterns.)',
};

const firstSentence = (text = '') => {
  const cleaned = text.replace(/\s+/g, ' ').trim();
  const stop = cleaned.search(/\.\s/);
  const out = stop === -1 ? cleaned : cleaned.slice(0, stop + 1);
  return out.length > 200 ? `${out.slice(0, 197)}...` : out;
};

const propSummary = (component) => {
  const props = component.properties ?? component.props ?? [];
  const list = Array.isArray(props) ? props : Object.entries(props).map(([name, v]) => ({ name, ...v }));
  return list
    .slice(0, 6)
    .map((p) => `\`${p.name ?? p.attribute}\``)
    .join(', ');
};

const byCategory = new Map();
for (const c of wcManifest.components) {
  const key = c.category ?? 'Other';
  if (!byCategory.has(key)) byCategory.set(key, []);
  byCategory.get(key).push(c);
}

const categories = [...byCategory.keys()].sort(
  (a, b) => (CATEGORY_ORDER.indexOf(a) + 1 || 99) - (CATEGORY_ORDER.indexOf(b) + 1 || 99)
);

let md = `---
title: Component Reference
generated: true
generator: docs/kb/tools/generate-reference.mjs
source: packages/cre8-wc/mcp-manifest.json, packages/cre8-wc/react-manifest.json, packages/cre8-wc/a2ui/catalog.json
intents:
  - "which component should I use for X"
  - "what is the react name for a cre8 tag"
  - "is this component available to agents through a2ui"
---

# Component Reference

<!-- DO NOT EDIT BY HAND. Regenerate with: node docs/kb/tools/generate-reference.mjs -->

Every component in \`${wcManifest.library}\` v${wcManifest.version}, grouped by the
job it does. The **React** column is the \`${reactManifest.library}\` wrapper name;
the **A2UI** column says whether an agent can emit the component through the
[A2UI catalog](../04-a2ui.md).

Start from the intent line under each heading, not from the component name — the
whole point of grouping this way is that you usually know the goal before you
know the tag.

> **The "What it is for" column is the component's own JSDoc**, reproduced from
> the manifest — descriptive prose written by component authors, not a checked
> API surface. Descriptions known to be wrong are corrected here in place, but
> treat the column as orientation rather than specification. For API facts use
> the generated pages below, which derive from schemas and source, not comments.

- Prose about *how these compose* lives in [Composition Patterns](../02-composition-patterns.md); about
  *how these are themed*, [Token Theming](../03-token-theming.md).
- Every declared prop, with types, enums, defaults, and attribute-vs-property
  kind: [props](props.md).
- What each component emits: [events](events.md). What it accepts as
  content: [content model](content-model.md). What you can style inside
  it: [parts](parts.md).
- Long-form usage guidance per component lives in
  \`packages/cre8-wc/agent-docs/COMPONENTS.md\` (${'~'}3.1k lines). Prefer the
  generated pages above for API facts — COMPONENTS.md carries known
  inaccuracies ([Provenance and drift](../07-research.md#provenance-and-drift)).

`;

const totals = { wc: wcManifest.components.length, react: 0, a2ui: 0 };

for (const category of categories) {
  const items = byCategory.get(category).sort((a, b) => a.name.localeCompare(b.name));
  md += `## ${category}\n\n`;
  md += `> **Intent:** ${CATEGORY_INTENT[category] ?? 'Uncategorized'}\n\n`;
  md += `| Tag | React | A2UI | What it is for |\n|---|---|---|---|\n`;
  for (const c of items) {
    const react = reactByTag.get(c.name);
    const inCatalog = Boolean(catalogDefs[c.name]);
    if (react) totals.react += 1;
    if (inCatalog) totals.a2ui += 1;
    const blurb = DESCRIPTION_OVERRIDES[c.name] ?? firstSentence(c.description);
    md += `| \`<${c.name}>\` | ${react ? `\`${react}\`` : '—'} | ${inCatalog ? 'yes' : 'no'} | ${blurb} |\n`;
  }
  md += '\n';
}

md += `## Counts

| Surface | Components |
|---|---|
| Web components (\`${wcManifest.library}\` v${wcManifest.version}) | ${totals.wc} |
| React wrappers (\`${reactManifest.library}\` v${reactManifest.version}) | ${totals.react} |
| A2UI catalog entries (\`${catalog.$id}\`) | ${totals.a2ui} |

If these three numbers disagree, the wrappers or the catalog are stale relative to
the components — regenerate them before trusting a count you find elsewhere.
See [Provenance and drift](../07-research.md#provenance-and-drift) for why marketing copy quotes a different number.
`;

writeFileSync(resolve(KB, 'reference/components.md'), md);

/**
 * Content model: in the A2UI catalog every component accepts its content EITHER
 * through `children` OR through `slots`, never both, and 13 accept neither.
 * Getting this wrong is the most common way a generated spec fails validation,
 * and it is not guessable — hence a generated table.
 */
const buckets = { children: [], slots: [], neither: [] };
for (const [tag, def] of Object.entries(catalogDefs)) {
  const props = def.properties ?? {};
  const hasChildren = props.children !== undefined;
  const hasSlots = props.slots !== undefined;
  if (hasChildren && hasSlots) buckets.both = [...(buckets.both ?? []), tag];
  else if (hasChildren) buckets.children.push(tag);
  else if (hasSlots) buckets.slots.push(tag);
  else buckets.neither.push(tag);
}

const slotNamesFor = (tag) =>
  Object.keys(catalogDefs[tag]?.properties?.slots?.properties ?? {});

/** Slot-only components that do not even declare a `default` slot. */
const noDefaultSlot = buckets.slots.filter((t) => !slotNamesFor(t).includes('default'));

let cm = `---
title: A2UI Content Model
generated: true
generator: docs/kb/tools/generate-reference.mjs
source: packages/cre8-wc/a2ui/catalog.json
intents:
  - "should I use children or slots for this component"
  - "why does my spec fail with does not accept default children"
  - "which components are slot-only"
---

# A2UI Content Model

<!-- DO NOT EDIT BY HAND. Regenerate with: node docs/kb/tools/generate-reference.mjs -->

In the A2UI catalog, every component takes its content through **either
\`children\` or \`slots\` — never both**. Using the wrong one is a hard validation
error, and the split is not guessable from the component's name or purpose.

| Bucket | Count | Emit content as |
|---|---|---|
| Children-only | ${buckets.children.length} | \`"children": [...]\` — \`slots\` is an error |
| Slot-only | ${buckets.slots.length} | \`"slots": { "default": [...] }\` — \`children\` is an error |
| Leaf (neither) | ${buckets.neither.length} | Neither; content comes from props |
| Both | ${(buckets.both ?? []).length} | — (the catalog never does this) |

Full rule and worked examples: [Children vs slots](../04-a2ui.md#children-vs-slots-the-rule-that-breaks-specs).

## Slot-only components

All ${buckets.slots.length} of them. Use \`slots.default\`, **not** \`children\`. Named slots each accepts.

**${noDefaultSlot.length} of these have no \`default\` slot at all** (marked below) — they
accept *no* free content in any form, and their visible text comes from props such
as \`text\` or \`label\`. \`cre8-button\` is the one that catches people: its label is
the \`text\` prop, not slotted content.


| Component | Slots | Note |
|---|---|---|
${buckets.slots
  .sort()
  .map(
    (t) =>
      `| \`${t}\` | ${slotNamesFor(t).map((s) => `\`${s}\``).join(', ') || '—'} | ${
        slotNamesFor(t).includes('default') ? '' : '**no default slot**'
      } |`
  )
  .join('\n')}

## Leaf components

All ${buckets.neither.length} of them. These accept no child content at all. Everything they render comes from props
(\`text\`, \`iconName\`, \`data\`, …).

${buckets.neither.sort().map((t) => `- \`${t}\``).join('\n')}

## Children-only components

The remaining ${buckets.children.length}. Use \`children\`; passing \`slots\` is an error.

${buckets.children.sort().map((t) => `- \`${t}\``).join('\n')}
`;

writeFileSync(resolve(KB, 'reference/content-model.md'), cm);

/**
 * Events. Names follow `component-action` kebab-case, except the form
 * components that re-fire native `change` / `input` under their native names.
 * The rule narrows the guess; the generated table still settles it.
 */
const eventsByComponent = Object.entries(catalogDefs)
  .map(([tag, def]) => [tag, Object.keys(def['x-events'] ?? {})])
  .filter(([, events]) => events.length)
  .sort(([a], [b]) => a.localeCompare(b));

const allEventNames = [...new Set(eventsByComponent.flatMap(([, e]) => e))].sort();

/** `on*` props the React wrapper generates for a tag, from react-manifest.json. */
const reactPropsByTag = new Map(
  reactManifest.components.map((c) => [c.tagName, Object.keys(c.props ?? {})])
);
const reactEventPropsFor = (tag) =>
  (reactPropsByTag.get(tag) ?? []).filter((p) => /^on[A-Z]/.test(p));
const styleOf = (name) => {
  if (name.includes('.')) return 'dotted';
  if (name.startsWith('cre8-')) return 'prefixed kebab';
  if (/[A-Z]/.test(name)) return 'camelCase';
  if (name.includes('-')) return 'kebab-case';
  return 'single word';
};
const styles = [...new Set(allEventNames.map(styleOf))].sort();

let ev = `---
title: Event Reference
generated: true
generator: docs/kb/tools/generate-reference.mjs
source: packages/cre8-wc/a2ui/catalog.json (x-events)
intents:
  - "what event does this component emit"
  - "what is the event name for a cre8 component"
  - "how do I listen for a change on cre8-select"
---

# Event Reference

<!-- DO NOT EDIT BY HAND. Regenerate with: node docs/kb/tools/generate-reference.mjs -->

${eventsByComponent.length} of ${Object.keys(catalogDefs).length} components emit events.

**Names are \`component-action\` kebab-case.** \`cre8-tabs\` emits \`tab-change\`,
\`cre8-modal\` emits \`modal-close\`. There is **no \`cre8-\` prefix** on events — the
tag is namespaced, the event is not. The exception is the form components, which
re-fire native events under their native names: \`cre8-select\` emits \`change\`,
not \`select-change\` and emphatically not \`cre8-change\`. Observed styles in the
table below: ${styles.join(', ')}. See
[how events are named](../01-components.md#events-are-named-component-action).

| Component | Event | React prop |
|---|---|---|
${eventsByComponent
  .flatMap(([tag, events]) =>
    events.map((e) => {
      const react = reactEventPropsFor(tag);
      // @lit/react derives on* props from the event name; match case-insensitively
      // on the de-hyphenated form so a rename on either side shows up as a gap.
      const key = `on${e.replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase())}`;
      const prop = react.find((r) => r.toLowerCase() === key.toLowerCase());
      return `| \`${tag}\` | \`${e}\` | ${prop ? `\`${prop}\`` : '—'} |`;
    })
  )
  .join('\n')}

## How to listen

**Plain DOM / Vue / Angular / Svelte** — a normal DOM event listener:

\`\`\`js
document.querySelector('cre8-select').addEventListener('change', (e) => console.log(e.detail));
\`\`\`

**React** — use the \`@tmorrow/cre8-react\` wrapper, which maps each event onto the
\`on*\` prop in the third column above. The names were renamed alongside the events
and are **not** aliased, unlike DOM listeners — see
[how events are named](../01-components.md#events-are-named-component-action).

**A2UI** — declare a handler *name*, never a function. The renderer routes it to
your \`onEvent\` callback. See [Events and the return path](../04-a2ui.md#events-and-the-return-path).

\`\`\`json
{ "component": "cre8-select", "props": { "label": "Plan" }, "events": { "change": "plan-selected" } }
\`\`\`

## All event names

${allEventNames.map((n) => `- \`${n}\` — ${styleOf(n)}`).join('\n')}
`;

writeFileSync(resolve(KB, 'reference/events.md'), ev);

/**
 * Props. The most common lookup there is ("what does this component take?"),
 * and until now the KB could only answer it by pointing at a 3k-line file.
 * `x-kind` matters: a `property` prop cannot be set as an HTML attribute.
 */
const typeOf = (schema) => {
  if (schema.const !== undefined) return `\`${JSON.stringify(schema.const)}\``;
  if (Array.isArray(schema.type)) return schema.type.join(' \\| ');
  if (schema.type === 'array') return `${schema.items?.type ?? 'any'}[]`;
  return schema['x-tsType'] ? `\`${schema['x-tsType']}\`` : schema.type ?? 'any';
};
const valuesOf = (schema) =>
  Array.isArray(schema.enum) ? schema.enum.map((v) => `\`${v}\``).join(', ') : '';

let propCount = 0;
let pr = `---
title: Prop Reference
generated: true
generator: docs/kb/tools/generate-reference.mjs
source: packages/cre8-wc/a2ui/catalog.json
intents:
  - "what props does this component take"
  - "what values does this prop accept"
  - "what is the default value for this prop"
  - "is this an attribute or a property"
---

# Prop Reference

<!-- DO NOT EDIT BY HAND. Regenerate with: node docs/kb/tools/generate-reference.mjs -->

Every declared prop on every component, from the A2UI catalog.

**Names are camelCase here, and camelCase is what you write in markup too.** Lit
derives a prop's observed attribute by **lowercasing** the property name, not by
kebab-casing it, and no cre8 component overrides that with \`attribute:\`. So
\`tagVariant\` is observed as \`tagvariant\`, and \`tag-variant\` binds to nothing:
Lit ignores the unrecognized attribute and the prop silently keeps its default.
Since HTML attribute names are case-insensitive, writing the camelCase name
straight into markup (\`<cre8-heading tagVariant="h3">\`) is both correct and
readable. Use camelCase everywhere — HTML, Vue/Angular templates, A2UI specs, and
React (\`@tmorrow/cre8-react\`).

**The Kind column matters for structured values.** A \`property\` prop carrying an
array or object must be assigned as a JavaScript property, because an HTML
attribute can only hold a string — use \`:prop\` in Vue, \`[prop]\` in Angular. For
scalars and booleans the attribute form is fine and is what the examples in this
KB use (\`fullWidth\`, \`isHoverable\`). The A2UI renderer decides for you
([How props reach the element](../04-a2ui.md#how-props-actually-reach-the-element)).

**These generated pages are a complete offline substitute for the catalog.**
Between this page, [content model](content-model.md),
[events](events.md), and [parts](parts.md), every constraint
\`validate_a2ui_spec\` enforces is written down — component allowlist, prop names,
enums, slot names, event shape. If you cannot call the validator, checking a spec
against these four pages is equivalent. The one thing they cannot give you is a
guarantee the catalog itself is right; see
[What validation cannot catch](../04-a2ui.md#what-validation-cannot-catch).

Related: [events](events.md) · [content model](content-model.md) ·
[component index](components.md)

`;

for (const category of categories) {
  const items = byCategory
    .get(category)
    .map((c) => c.name)
    .filter((tag) => catalogDefs[tag])
    .sort();
  if (!items.length) continue;
  pr += `## ${category}\n\n`;
  for (const tag of items) {
    const props = catalogDefs[tag]?.properties?.props?.properties ?? {};
    const names = Object.keys(props);
    pr += `### \`${tag}\`\n\n`;
    if (!names.length) {
      pr += `No declared props — this component is configured entirely by its content.\n\n`;
      continue;
    }
    pr += `| Prop | Type | Values | Default | Kind |\n|---|---|---|---|---|\n`;
    for (const name of names) {
      const s = props[name];
      propCount += 1;
      pr += `| \`${name}\` | ${typeOf(s)} | ${valuesOf(s)} | ${
        s.default !== undefined ? `\`${s.default}\`` : ''
      } | ${s['x-kind'] === 'property' ? '**property**' : 'attribute'} |\n`;
    }
    pr += '\n';
  }
}

writeFileSync(resolve(KB, 'reference/props.md'), pr);

/**
 * CSS shadow parts, read from component sources rather than from the generated
 * component docs — only 3 components document parts in COMPONENTS.md, while 10
 * actually expose them.
 */
const componentsDir = resolve(WC, 'components');
const partsByTag = [];
for (const dir of readdirSync(componentsDir)) {
  const file = resolve(componentsDir, dir, `${dir}.ts`);
  let src;
  try {
    src = readFileSync(file, 'utf8');
  } catch {
    continue;
  }
  const parts = [...new Set([...src.matchAll(/\bpart="([a-z0-9-]+)"/g)].map((m) => m[1]))].sort();
  if (parts.length) partsByTag.push([`cre8-${dir}`, parts]);
}
partsByTag.sort(([a], [b]) => a.localeCompare(b));

const partsMd = `---
title: CSS Shadow Parts Reference
generated: true
generator: docs/kb/tools/generate-reference.mjs
source: packages/cre8-wc/components/*/*.ts (part="..." attributes)
intents:
  - "what parts can I style on this component"
  - "how do I style inside a component"
  - "which components expose css shadow parts"
---

# CSS Shadow Parts Reference

<!-- DO NOT EDIT BY HAND. Regenerate with: node docs/kb/tools/generate-reference.mjs -->

\`::part()\` is the sanctioned way to style a component's internals when a token
does not cover what you need — the second door in
[Styling across the shadow boundary](../03-token-theming.md#styling-across-the-shadow-boundary).

**Only ${partsByTag.length} of ${Object.keys(catalogDefs).length} components expose any parts.**
This list is read from the component sources, not from \`agent-docs/COMPONENTS.md\`,
which documents parts for only three of them. If the component you want is not
here, it has no styling escape hatch: use tokens, or open a PR adding a part.

| Component | Parts |
|---|---|
${partsByTag
  .map(([tag, parts]) => `| \`${tag}\` | ${parts.map((p) => `\`${p}\``).join(', ')} |`)
  .join('\n')}

## Using a part

\`\`\`css
cre8-card::part(header) {
  border-block-end: 1px solid var(--cre8-border-default);
}
\`\`\`

You can set properties on the part itself. You **cannot** select its descendants —
\`::part(header) h3\` does not work. If you need that, the component needs a new
part upstream.
`;

writeFileSync(resolve(KB, 'reference/parts.md'), partsMd);

/**
 * Tokens. The KB documented four theming methods but never the vocabulary —
 * a blind test showed an agent could pick the right method, tier and dark-mode
 * mechanism and still not finish a theme, because only ~9 token names appeared
 * anywhere in the prose and none was a surface or foreground token. The
 * semantic tier is the one you override, and it is small enough to list whole.
 */
const TIERS = [
  ['Semantic (tier 2)', resolve(REPO, 'packages/2-semantic.css')],
  ['Primitive (tier 1)', resolve(REPO, 'packages/1-primitives.css')],
  ['Component (tier 3)', resolve(REPO, 'packages/3-components.css')],
];

const tokensIn = (file) => {
  let css;
  try {
    css = readFileSync(file, 'utf8');
  } catch {
    return new Map();
  }
  const out = new Map();
  for (const m of css.matchAll(/(--cre8-[a-z0-9-]+)\s*:\s*([^;]+);/g)) {
    out.set(m[1], m[2].trim());
  }
  return out;
};

const semantic = tokensIn(TIERS[0][1]);
const primitives = tokensIn(TIERS[1][1]);
const componentTokens = tokensIn(TIERS[2][1]);

const groupBy = (map, depth) => {
  const g = new Map();
  for (const [name, value] of map) {
    const key = name.replace('--cre8-', '').split('-').slice(0, depth).join('-');
    if (!g.has(key)) g.set(key, []);
    g.get(key).push([name, value]);
  }
  return [...g.entries()].sort(([a], [b]) => a.localeCompare(b));
};

let tk = `---
title: Design Token Reference
generated: true
generator: docs/kb/tools/generate-reference.mjs
source: packages/1-primitives.css, packages/2-semantic.css, packages/3-components.css
intents:
  - "what tokens can I override"
  - "what is the token for background or text or border"
  - "which token do I use for a surface color"
  - "is this token name real"
---

# Design Token Reference

<!-- DO NOT EDIT BY HAND. Regenerate with: node docs/kb/tools/generate-reference.mjs -->

Every \`--cre8-*\` token, by tier. **This is the vocabulary**; the grammar — which
tier to override and how — is in [Token Theming](../03-token-theming.md).

| Tier | Count | Override it when |
|---|---|---|
| Semantic (tier 2) | ${semantic.size} | Almost always. This expresses intent and is what branding should change |
| Primitive (tier 1) | ${primitives.size} | You want every use of a hue to move |
| Component (tier 3) | ${componentTokens.size} | One component needs a one-off, accepting the debt |

A name not in this file does not exist. \`var(--cre8-…)\` with no definition and no
fallback renders as nothing, silently — which is why
[Verifying a theme](../03-token-theming.md#verifying-a-theme) tells you to check, and why \`pnpm kb:check\`
fails on any token named in these pages that is not defined here.

## Semantic tokens, tier 2: the ones to override

The complete list. Values shown are the \`cre8\` brand's; a brand override
redefines the same names.

`;

for (const [family, entries] of groupBy(semantic, 1)) {
  tk += `### \`--cre8-${family}-*\`\n\n| Token | Value |\n|---|---|\n`;
  for (const [name, value] of entries.sort(([a], [b]) => a.localeCompare(b))) {
    tk += `| \`${name}\` | \`${value}\` |\n`;
  }
  tk += '\n';
}

tk += `## Primitive tokens (tier 1)

${primitives.size} raw values with no meaning attached. Grouped by family; these are
what semantic tokens point at.

| Family | Count | Example |
|---|---|---|
${groupBy(primitives, 1)
  .map(([fam, e]) => `| \`--cre8-${fam}-*\` | ${e.length} | \`${e[0][0]}\` = \`${e[0][1]}\` |`)
  .join('\n')}

## Component tokens (tier 3)

${componentTokens.size} tokens scoped to a single component. Grouped by the component
they belong to — override one of these only for a genuine one-off.

| Component prefix | Count |
|---|---|
${groupBy(componentTokens, 1)
  .map(([fam, e]) => `| \`--cre8-${fam}-*\` | ${e.length} |`)
  .join('\n')}

## What is missing

Tokens are generated from Figma, so this list is what the pipeline produced —
not necessarily everything a theme needs. Notably there is **no dedicated focus
token family**, although [Verifying a theme](../03-token-theming.md#verifying-a-theme) warns that a
brand which darkens backgrounds without adjusting focus indicators ships
invisible focus rings. Check focus visibility by eye; the tokens will not tell
you.
`;

writeFileSync(resolve(KB, 'reference/tokens.md'), tk);
const tokenFacts = {
  semantic: semantic.size,
  primitive: primitives.size,
  component: componentTokens.size,
};
const surfaceFacts = { props: propCount, componentsWithParts: partsByTag.length };
const eventFacts = {
  componentsWithEvents: eventsByComponent.length,
  distinctEventNames: allEventNames.length,
  namingConventions: styles,
};
const contentModel = {
  childrenOnly: buckets.children.length,
  slotOnly: buckets.slots.length,
  leaf: buckets.neither.length,
  slotOnlyWithoutDefault: noDefaultSlot.length,
  both: (buckets.both ?? []).length,
};

const facts = {
  generatedFrom: {
    wcManifest: 'packages/cre8-wc/mcp-manifest.json',
    reactManifest: 'packages/cre8-wc/react-manifest.json',
    a2uiCatalog: 'packages/cre8-wc/a2ui/catalog.json',
  },
  library: wcManifest.library,
  libraryVersion: wcManifest.version,
  reactLibrary: reactManifest.library,
  reactVersion: reactManifest.version,
  reactFramework: reactManifest.framework,
  tagPrefix: wcManifest.tagPrefix,
  framework: wcManifest.framework,
  catalogId: catalog['x-a2ui']?.catalogId,
  catalogVersion: catalog['x-a2ui']?.libraryVersion,
  counts: totals,
  categories: Object.fromEntries(categories.map((c) => [c, byCategory.get(c).length])),
  tokenPackage: wcManifest.designTokens?.tokenPackage,
  tokenCategories: wcManifest.designTokens?.categories,
  contentModel,
  events: eventFacts,
  surfaces: surfaceFacts,
  tokens: tokenFacts,
  knowledgeGraph: (() => {
    try {
      const kg = read('a2ui/catalog-kg.json');
      return { nodes: kg.meta.total_nodes, edges: kg.meta.total_edges };
    } catch {
      return null;
    }
  })(),
  patternNames: (wcManifest.patterns ?? []).map((p) => p.name),
};

writeFileSync(resolve(KB, 'reference/facts.json'), `${JSON.stringify(facts, null, 2)}\n`);

/**
 * Intent index. Each entry maps a phrasing a human or agent would actually use
 * onto exactly one destination, so routing never requires reading every page.
 */
const intents = [
  ['what is cre8 and how are its layers arranged', '00-orientation.md'],
  ['where do I start', '00-orientation.md'],
  ['which component should I use', 'reference/components.md'],
  ['what does variant or size or behavior mean on a component', '01-components.md#naming-conventions-you-can-rely-on'],
  ['what are a components api surfaces', '01-components.md#the-four-api-surfaces'],
  ['what is a compound component', '01-components.md#compound-components'],
  ['why is there no storybook story for this component', '01-components.md#compound-components'],
  ['is this component supported or experimental', '01-components.md#support-tiers'],
  ['how does form participation work', '01-components.md#the-two-base-classes'],
  ['why is my event listener not firing', '01-components.md#events-are-named-component-action'],
  ['who is responsible for accessibility', '01-components.md#accessibility-posture'],
  ['what event does this component emit', 'reference/events.md'],
  ['what props does this component take', 'reference/props.md'],
  ['what values does this prop accept', 'reference/props.md'],
  ['is this prop an attribute or a property', 'reference/props.md'],
  ['what parts can I style on this component', 'reference/parts.md'],
  ['which components expose css shadow parts', 'reference/parts.md'],
  ['how do I use ::part on a cre8 component', 'reference/parts.md#using-a-part'],
  ['what does this cre8 term mean', 'glossary.md'],
  ['define a design token or semantic token', 'glossary.md'],
  ['what is a form-associated custom element', 'glossary.md'],
  ['what is the difference between a slot and a child', 'glossary.md'],
  ['what tokens can I override', 'reference/tokens.md'],
  ['where is the evidence for this design decision', '07-research.md'],
  ['what standards does cre8 follow', '07-research.md#accessibility'],
  ['what research is the token architecture based on', '07-research.md#design-tokens'],
  ['what is the published a2ui protocol', '07-research.md#agent-driven-ui'],
  ['what is the ai fluency framework', '07-research.md#ai-fluency'],
  ['why does our documentation disagree with our code', '07-research.md#provenance-and-drift'],
  ['what is known to be wrong right now', '07-research.md#provenance-and-drift'],
  ['what design decisions are still unresolved', '07-research.md#open-questions-not-open-bugs'],
  ['why does required not block form submission', '07-research.md#open-questions-not-open-bugs'],
  ['why do cre8 components avoid aria where possible', '07-research.md#accessibility'],
  ['what is the token for a background or text color', 'reference/tokens.md'],
  ['is this token name real', 'reference/tokens.md'],
  ['how do I listen for a change on cre8-select', 'reference/events.md'],
  ['should I use children or slots', 'reference/content-model.md'],
  ['why does my spec say does not accept default children', 'reference/content-model.md'],
  ['which components are slot-only', 'reference/content-model.md#slot-only-components'],
  ['what props does a component take', 'reference/components.md#component-reference'],
  ['how do I build a page out of components', '02-composition-patterns.md'],
  ['how do I lay out a form', '02-composition-patterns.md#forms-that-behave'],
  ['how do I show tabular data', '02-composition-patterns.md#data-display'],
  ['slot vs child vs prop', '02-composition-patterns.md#the-three-ways-to-pass-content'],
  ['how do I change the colors', '03-token-theming.md'],
  ['how do I brand this for a client', '03-token-theming.md#method-2-brand-override-file'],
  ['why is my css not applying to a component', '03-token-theming.md#styling-across-the-shadow-boundary'],
  ['how do I add dark mode', '03-token-theming.md#dark-mode-and-modes-in-general'],
  ['how do I generate a theme from a website', '03-token-theming.md#method-4-generated-themes'],
  ['how do agents emit cre8 ui', '04-a2ui.md'],
  ['what is the a2ui spec shape', '04-a2ui.md#the-cre8-dialect'],
  ['how do I validate an a2ui spec', '04-a2ui.md#validation'],
  ['does cre8 a2ui match the a2ui.org protocol', '04-a2ui.md#conformance-with-a2uiorg-v10'],
  ['how should I prompt an agent to build cre8 ui', '05-ai-fluency.md'],
  ['what mcp tools exist for cre8', '05-ai-fluency.md#the-tool-surface'],
  ['how do I check what an agent generated', '05-ai-fluency.md#discernment-checking-the-output'],
  ['how do I use cre8 in react', '06-frameworks.md#react'],
  ['how do I use cre8 in next.js', '06-frameworks.md#nextjs-and-ssr'],
  ['how do I use cre8 in vue', '06-frameworks.md#vue'],
  ['how do I use cre8 in angular', '06-frameworks.md#angular'],
  ['how do I use cre8 in svelte', '06-frameworks.md#svelte'],
  ['how do I use cre8 from a cdn with no build step', '06-frameworks.md#plain-html-and-cdn'],
  ['why does my react onClick not fire', '06-frameworks.md#the-four-interop-problems'],
  ['where is the research behind this', '07-research.md'],
  ['what does this term mean', 'glossary.md'],
];

writeFileSync(
  resolve(KB, 'reference/intents.json'),
  `${JSON.stringify(
    {
      description:
        'Intent → destination index for the cre8 knowledge base. Match on intent text, then open the path relative to docs/kb/.',
      base: 'docs/kb/',
      entries: intents.map(([intent, path]) => ({ intent, path })),
    },
    null,
    2
  )}\n`
);

console.log(
  `wrote reference/components.md (${totals.wc} components), reference/facts.json, reference/intents.json (${intents.length} intents)`
);
