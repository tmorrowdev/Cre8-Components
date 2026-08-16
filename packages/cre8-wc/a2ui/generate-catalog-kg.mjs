/**
 * Generates catalog-kg.json - the knowledge-graph projection of the a2ui
 * catalog that cre8-mcp's KG-backed handlers serve.
 *
 * Deterministic: same catalog.json in, same graph out. Runs after
 * generate-catalog.mjs (which derives catalog.json from mcp-manifest.json),
 * so `build:a2ui` keeps manifest -> catalog -> catalog-kg aligned.
 *
 * Graph shape (consumed by packages/cre8-mcp/src/handlers.ts and
 * surface-routes.ts):
 *   nodes: category (cat:<Name>), component (<tag>), slot (slot:<tag>:<name>),
 *          enum_prop (prop:<tag>:<prop>)
 *   edges: BELONGS_TO, HAS_SLOT, HAS_ENUM_PROP
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const catalogPath = resolve(__dirname, 'catalog.json');
const pkgPath = resolve(__dirname, '..', 'package.json');
const outPath = resolve(__dirname, 'catalog-kg.json');

const catalog = JSON.parse(readFileSync(catalogPath, 'utf8'));
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));

const components = catalog.$defs?.components ?? {};

/** Collapses whitespace/newlines and truncates with an ellipsis. */
const summarize = (text, max) => {
    if (text == null) return null;
    const flat = String(text).replace(/\s+/g, ' ').trim();
    return flat.length > max ? `${flat.slice(0, max)}…` : flat;
};

const nodes = [];
const edges = [];

// Category nodes, alphabetical. Components without x-category land in Other.
const categories = new Set();
for (const def of Object.values(components)) {
    categories.add(def['x-category'] || 'Other');
}
for (const label of [...categories].sort()) {
    nodes.push({ id: `cat:${label}`, type: 'category', label });
}

// Component, slot, and enum-prop nodes in catalog order.
for (const [tag, def] of Object.entries(components)) {
    const category = def['x-category'] || 'Other';
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

    nodes.push({
        id: tag,
        type: 'component',
        category,
        description: summarize(def.description, 120),
        props,
        slots: slotNames,
        accepts_children: Boolean(def.properties?.children),
    });
    edges.push({ from: tag, to: `cat:${category}`, rel: 'BELONGS_TO' });

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

const kg = {
    meta: {
        generated_from: 'catalog.json',
        catalog_id: 'cre8-wc',
        library: pkg.name,
        library_version: pkg.version,
        total_nodes: nodes.length,
        total_edges: edges.length,
    },
    nodes,
    edges,
};

writeFileSync(outPath, `${JSON.stringify(kg, null, 2)}\n`, 'utf8');
console.log(
    `catalog-kg.json: ${nodes.length} nodes, ${edges.length} edges `
  + `(${Object.keys(components).length} components, ${categories.size} categories)`,
);
