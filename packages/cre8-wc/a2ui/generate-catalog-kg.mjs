/**
 * Generates catalog-kg.json — the knowledge graph cre8-mcp serves.
 *
 * This is the single source of truth for everything cre8-mcp says about
 * *relationships* between components. The catalog (catalog.json) says what
 * each component accepts; this graph says what goes where, and why it is
 * believed. Every tool that answers a structural question — get_composition,
 * get_content_model, get_patterns, list_components — reads this file, and so
 * does the eval oracle (evals/cre8-a2ui-vs-mcp/oracle/build_oracle.py). One
 * regeneration refreshes all of them; nothing downstream re-derives.
 *
 * Deterministic: same inputs in, same graph out. Runs after
 * generate-catalog.mjs, so `build:a2ui` keeps manifest -> catalog -> kg aligned.
 *
 * Nodes
 *   category   cat:<Name>
 *   component  <tag>            props, slots, accepts_children, category,
 *                               exemplar (smallest authored A2UI subtree)
 *   slot       slot:<tag>:<name>
 *   enum_prop  prop:<tag>:<prop>
 *   pattern    pattern:<slug>    name, description, spec (authored A2UI, validated)
 *
 * Edges
 *   BELONGS_TO     component -> category
 *   HAS_SLOT       component -> slot
 *   HAS_ENUM_PROP  component -> enum_prop
 *   CONTAINS       parent -> child   { slot, count, evidence:[{kind,file}] }
 *                  Only ever from observed artifacts (stories, component
 *                  render templates, a2ui examples, a2ui patterns) — never
 *                  from the naming rule. See kg-sources.mjs for the readers.
 *   USED_IN_PATTERN component -> pattern
 *   IN_FAMILY      component <-> component sharing a name prefix. Undirected
 *                  on purpose: cre8-tag-list contains cre8-tag, and the names
 *                  do not say so.
 *   EXTENDS        component -> base class (from graphify: Cre8FormElement …)
 *   IMPORTS        component -> component, module-level (from graphify)
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { newContainment, scanComponentsDir, scanExamples, scanGraphify, scanPatterns } from './kg-sources.mjs';
import { registerCatalog, validateSpec } from './index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const catalogPath = resolve(__dirname, 'catalog.json');
const pkgPath = resolve(__dirname, '..', 'package.json');
const outPath = resolve(__dirname, 'catalog-kg.json');
const componentsDir = resolve(__dirname, '..', 'components');
const examplesDir = resolve(__dirname, 'examples');
const patternsDir = resolve(__dirname, 'patterns');
const graphifyPath = process.env.CRE8_GRAPHIFY ?? resolve(__dirname, '..', '..', '..', 'graphify-out', 'graph.json');

const catalog = JSON.parse(readFileSync(catalogPath, 'utf8'));
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));

const components = catalog.$defs?.components ?? {};
const knownTags = new Set(Object.keys(components));

/** Collapses whitespace/newlines and truncates with an ellipsis. */
const summarize = (text, max) => {
    if (text == null) return null;
    const flat = String(text).replace(/\s+/g, ' ').trim();
    return flat.length > max ? `${flat.slice(0, max)}…` : flat;
};

// ─── evidence ───────────────────────────────────────────────────────────────

const stories = newContainment();
const sources = newContainment();
const scanned = scanComponentsDir(componentsDir, { stories, sources });
const examples = scanExamples(examplesDir);
const patternSet = scanPatterns(patternsDir);
const graphify = scanGraphify(graphifyPath, knownTags);

const nodes = [];
const edges = [];

// ─── categories ─────────────────────────────────────────────────────────────

// A component's category comes from the manifest's x-category. A component
// with none is not silently filed under "Other" any more: it is reported at
// the end and the build fails, because "Other" is exactly the kind of
// hand-maintained metadata this graph exists to stop drifting.
const uncategorized = [];
const categories = new Set();
for (const [tag, def] of Object.entries(components)) {
    if (!def['x-category'] || def['x-category'] === 'Other') uncategorized.push(tag);
    else categories.add(def['x-category']);
}
for (const label of [...categories].sort()) {
    nodes.push({ id: `cat:${label}`, type: 'category', label });
}

// ─── components, slots, enum props ──────────────────────────────────────────

for (const [tag, def] of Object.entries(components)) {
    const category = def['x-category'] ?? null;
    const propDefs = def.properties?.props?.properties ?? {};
    const slotNames = Object.keys(def.properties?.slots?.properties ?? {});
    const slotDescriptions = def['x-slot-descriptions'] ?? {};

    const props = {};
    for (const [name, p] of Object.entries(propDefs)) {
        props[name] = {
            type: p.type ?? null,
            enum: p.enum ?? null,
            default: p.default ?? null,
            description: summarize(p.description, 80),
            'x-kind': p['x-kind'] ?? null,
        };
    }

    const ex = examples.exemplar.get(tag);
    nodes.push({
        id: tag,
        type: 'component',
        category,
        description: summarize(def.description, 120),
        props,
        slots: slotNames,
        accepts_children: Boolean(def.properties?.children),
        extends: graphify.extends.get(tag) ?? null,
        exemplar: ex ? { source: ex.source, path: ex.path, spec: ex.spec } : null,
    });
    if (category) edges.push({ from: tag, to: `cat:${category}`, rel: 'BELONGS_TO' });

    for (const slotName of slotNames) {
        const id = `slot:${tag}:${slotName}`;
        nodes.push({
            id,
            type: 'slot',
            name: slotName,
            component: tag,
            description: slotDescriptions[slotName] ?? null,
        });
        edges.push({ from: tag, to: id, rel: 'HAS_SLOT' });
    }

    for (const [propName, p] of Object.entries(propDefs)) {
        if (!Array.isArray(p.enum) || p.enum.length === 0) continue;
        const id = `prop:${tag}:${propName}`;
        nodes.push({
            id,
            type: 'enum_prop',
            name: propName,
            component: tag,
            enum: p.enum,
            description: summarize(p.description, 80),
        });
        edges.push({ from: tag, to: id, rel: 'HAS_ENUM_PROP' });
    }
}

// ─── CONTAINS: merged evidence ──────────────────────────────────────────────

/**
 * HTML and A2UI name the same position differently: unslotted markup is
 * `children` in HTML, but for a component whose content model is slots the
 * spec calls it `slots.default`. The graph speaks A2UI, because that is what
 * the tools emit and validate — so the catalog's content model for the parent
 * decides, and a story's unslotted child lands in `default` on a slotted
 * component and in `children` (null) on a children component.
 */
const a2uiSlot = (parent, slot) => {
    const def = components[parent];
    const takesChildren = Boolean(def?.properties?.children);
    const slotNames = Object.keys(def?.properties?.slots?.properties ?? {});
    if (slot == null) return takesChildren || !slotNames.includes('default') ? null : 'default';
    if (slot === 'default' && takesChildren) return null;
    return slot;
};

/** key "parent|slot|child" -> { count, evidence: Map<kind, Set<file>> } */
const contains = new Map();
const merge = (kind, containment) => {
    for (const [parent, bySlot] of containment) {
        if (!knownTags.has(parent)) continue;
        for (const [rawSlot, byChild] of bySlot) {
            const slot = a2uiSlot(parent, rawSlot);
            for (const [child, rec] of byChild) {
                if (!knownTags.has(child)) continue; // cre8-icon-legacy and friends are not in the catalog
                const key = `${parent}|${slot ?? ''}|${child}`;
                const e = contains.get(key) ?? { parent, slot, child, count: 0, evidence: new Map() };
                e.count += rec.count;
                const files = e.evidence.get(kind) ?? new Set();
                for (const f of rec.files) files.add(f);
                e.evidence.set(kind, files);
                contains.set(key, e);
            }
        }
    }
};
merge('source', sources);
merge('story', stories);
merge('example', examples.containment);
merge('pattern', patternSet.containment);

const containsEdges = [...contains.values()]
    .sort((a, b) => a.parent.localeCompare(b.parent) || (a.slot ?? '').localeCompare(b.slot ?? '') || a.child.localeCompare(b.child))
    .map((e) => ({
        from: e.parent,
        to: e.child,
        rel: 'CONTAINS',
        slot: e.slot,
        count: e.count,
        evidence: [...e.evidence].flatMap(([kind, files]) => [...files].sort().map((file) => ({ kind, file }))),
    }));
edges.push(...containsEdges);

// ─── patterns ───────────────────────────────────────────────────────────────

// A pattern is an authored spec, so it is held to the same bar as anything an
// agent would emit: it must validate against the catalog it ships with.
const registered = registerCatalog(catalog);
const invalidPatterns = [];
for (const p of patternSet.patterns) {
    try {
        validateSpec(p.spec, registered);
    } catch (err) {
        invalidPatterns.push(`${p.source}: ${err?.message ?? err}`);
        continue;
    }
    nodes.push({
        id: `pattern:${p.slug}`,
        type: 'pattern',
        name: p.name,
        description: p.description,
        source: p.source,
        spec: p.spec,
        components: p.components,
    });
    for (const tag of p.components) edges.push({ from: tag, to: `pattern:${p.slug}`, rel: 'USED_IN_PATTERN' });
}

// ─── IN_FAMILY ──────────────────────────────────────────────────────────────

const tags = [...knownTags].sort();
for (const a of tags) {
    for (const b of tags) {
        if (a < b && (b.startsWith(`${a}-`) || a.startsWith(`${b}-`))) {
            edges.push({ from: a, to: b, rel: 'IN_FAMILY' });
        }
    }
}

// ─── EXTENDS / IMPORTS ──────────────────────────────────────────────────────

for (const [tag, base] of [...graphify.extends].sort()) {
    edges.push({ from: tag, to: `class:${base}`, rel: 'EXTENDS' });
}
for (const [from, set] of [...graphify.imports].sort()) {
    for (const to of [...set].sort()) edges.push({ from, to, rel: 'IMPORTS' });
}

// ─── write ──────────────────────────────────────────────────────────────────

const kg = {
    meta: {
        generated_from: ['catalog.json', 'components/*/*.stories.ts', 'components/*/*.ts', 'a2ui/examples/*.json', 'a2ui/patterns/*.json', graphify.found ? 'graphify-out/graph.json' : null].filter(Boolean),
        catalog_id: 'cre8-wc',
        library: pkg.name,
        library_version: pkg.version,
        graphify_commit: graphify.commit,
        evidence: {
            story_files: scanned.storyFiles,
            source_files: scanned.sourceFiles,
            example_files: examples.files,
            pattern_files: patternSet.patterns.map((p) => p.source.replace('a2ui/patterns/', '')),
        },
        total_nodes: nodes.length,
        total_edges: edges.length,
        contains_edges: containsEdges.length,
    },
    nodes,
    edges,
};

writeFileSync(outPath, `${JSON.stringify(kg, null, 2)}\n`, 'utf8');
console.log(
    `catalog-kg.json: ${nodes.length} nodes, ${edges.length} edges `
  + `(${knownTags.size} components, ${categories.size} categories, `
  + `${containsEdges.length} CONTAINS from ${scanned.storyFiles} stories + ${scanned.sourceFiles} sources + ${examples.files.length} examples + ${patternSet.patterns.length} patterns`
  + `${graphify.found ? `, graphify@${(graphify.commit ?? '').slice(0, 7)}` : ', no graphify graph'})`,
);

if (invalidPatterns.length) {
    console.error(`\ncatalog-kg: ${invalidPatterns.length} pattern(s) do not validate against the catalog:\n  ${invalidPatterns.join('\n  ')}`);
    process.exit(1);
}

if (uncategorized.length) {
    console.error(
        `\ncatalog-kg: ${uncategorized.length} component(s) have no category: ${uncategorized.join(', ')}\n`
      + 'Add them to CATEGORY_MAP in scripts/generate-mcp-manifest.ts — "Other" is not a category.',
    );
    process.exit(1);
}
