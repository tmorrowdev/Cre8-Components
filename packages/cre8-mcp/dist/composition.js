/**
 * Compound-component families: which components nest inside which, and a real
 * worked example of each.
 *
 * `docs/kb/01-components.md` states the rule this starts from — anything needing
 * internal structure is split into a parent and children, and the children are
 * named after the parent — and warns that children are not optional scaffolding:
 * skipping a level renders, but is subtly wrong. `docs/kb/04-a2ui.md` calls table
 * specs the most error-prone thing an agent generates.
 *
 * **Nothing here is synthesized.** An earlier cut of this file built skeletons
 * from the naming rule and they were wrong in the way that matters most: it
 * nested `cre8-table-cell` directly inside `cre8-table`, and inverted
 * `cre8-tag` / `cre8-tag-list`. Worse, they *validated* — the catalog does not
 * type slot contents — so an agent would have received a confidently wrong
 * structure carrying a validation stamp. That is the exact failure
 * `docs/kb/04-a2ui.md` describes: green means "consistent with the catalog", not
 * "correct".
 *
 * So containment comes from ground truth instead: the worked specs in
 * `a2ui/examples/`, which are authored, shipped, and checked by `pnpm kb:check`.
 * The naming rule is still reported, but as a *family* relation — never as a
 * nesting prescription.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { z } from 'zod';
import { validateSpec } from '@tmorrow/cre8-wc/a2ui/index.js';
import { loadA2uiCatalog } from './handlers.js';
let indexCache = null;
function examplesDir() {
    if (process.env.CRE8_WC_ROOT)
        return join(process.env.CRE8_WC_ROOT, 'a2ui', 'examples');
    try {
        const require = createRequire(import.meta.url);
        return join(dirname(require.resolve('@tmorrow/cre8-wc/package.json')), 'a2ui', 'examples');
    }
    catch {
        return null;
    }
}
function sizeOf(node) {
    if (typeof node === 'string')
        return 1;
    let total = 1;
    for (const child of node.children ?? [])
        total += sizeOf(child);
    for (const list of Object.values(node.slots ?? {})) {
        for (const child of list)
            total += sizeOf(child);
    }
    return total;
}
function buildIndex() {
    if (indexCache)
        return indexCache;
    const index = {
        containment: new Map(),
        parentsOf: new Map(),
        exemplar: new Map(),
    };
    const dir = examplesDir();
    let files = [];
    try {
        files = dir ? readdirSync(dir).filter((f) => f.endsWith('.json')) : [];
    }
    catch {
        files = [];
    }
    const note = (parent, slot, child) => {
        const bySlot = index.containment.get(parent) ?? new Map();
        const counts = bySlot.get(slot) ?? new Map();
        counts.set(child, (counts.get(child) ?? 0) + 1);
        bySlot.set(slot, counts);
        index.containment.set(parent, bySlot);
        const parents = index.parentsOf.get(child) ?? new Set();
        parents.add(parent);
        index.parentsOf.set(child, parents);
    };
    const visit = (node, source, path) => {
        if (typeof node === 'string' || typeof node?.component !== 'string')
            return;
        // Keep the *smallest* subtree rooted at this component: a worked example is
        // most useful when it is the structure and nothing else.
        const existing = index.exemplar.get(node.component);
        if (!existing || sizeOf(node) < sizeOf(existing.spec)) {
            index.exemplar.set(node.component, { source, path, spec: node });
        }
        (node.children ?? []).forEach((child, i) => {
            if (typeof child !== 'string')
                note(node.component, null, child.component);
            visit(child, source, `${path}.children[${i}]`);
        });
        for (const [slot, list] of Object.entries(node.slots ?? {})) {
            list.forEach((child, i) => {
                if (typeof child !== 'string')
                    note(node.component, slot, child.component);
                visit(child, source, `${path}.slots.${slot}[${i}]`);
            });
        }
    };
    for (const file of files) {
        try {
            const spec = JSON.parse(readFileSync(join(dir, file), 'utf8'));
            visit(spec, file, '$');
        }
        catch {
            // A malformed example is the example suite's problem, not this tool's.
        }
    }
    indexCache = index;
    return index;
}
// ─── the naming rule, reported as family rather than as nesting ─────────────
function nameFamily(tag, all) {
    // Undirected on purpose. The prefix reliably identifies a family and
    // unreliably identifies a parent: cre8-tag-list contains cre8-tag, not the
    // other way round, and nothing in the names says so.
    return all
        .filter((other) => other === tag || other.startsWith(`${tag}-`) || tag.startsWith(`${other}-`))
        .sort();
}
export const GetCompositionSchema = z.object({ component: z.string().optional() });
function normalize(name) {
    return name.startsWith('cre8-') ? name : `cre8-${name}`;
}
export function handleGetComposition(input, catalog = loadA2uiCatalog()) {
    const index = buildIndex();
    const all = [...catalog.components.keys()];
    if (input.component) {
        const tag = normalize(input.component);
        if (!catalog.components.has(tag)) {
            throw new Error(`Component "${tag}" is not in the catalog.`);
        }
        const observedChildren = [];
        for (const [slot, counts] of index.containment.get(tag) ?? []) {
            for (const [child, count] of counts)
                observedChildren.push({ component: child, slot, count });
        }
        observedChildren.sort((a, b) => b.count - a.count || a.component.localeCompare(b.component));
        const exemplar = index.exemplar.get(tag);
        if (exemplar) {
            // Re-validate rather than trusting the corpus: an example that has drifted
            // out of step with the catalog must not be handed on as a model to copy.
            try {
                validateSpec(exemplar.spec, catalog);
            }
            catch {
                return answer(tag, observedChildren, index, all, undefined, 'the worked example for this component no longer validates against the catalog and was withheld');
            }
        }
        return answer(tag, observedChildren, index, all, exemplar);
    }
    const parents = [...index.containment.entries()]
        .map(([parent, bySlot]) => ({
        component: parent,
        children: [...bySlot.entries()].flatMap(([slot, counts]) => [...counts.keys()].map((child) => (slot ? `${child} (slot: ${slot})` : child))),
    }))
        .sort((a, b) => a.component.localeCompare(b.component));
    return JSON.stringify({
        catalogId: catalog.id,
        source: 'a2ui/examples — authored, shipped, and checked by pnpm kb:check',
        rule: 'Compound children are not optional scaffolding: skipping a level renders, but is subtly ' +
            'wrong. Ask about a single component to get the worked subtree rather than assembling one ' +
            'from this list.',
        observedNestings: parents.length,
        parents,
        caveat: parents.length === 0
            ? 'No example specs were found next to the installed @tmorrow/cre8-wc, so nesting cannot be reported.'
            : 'These are the pairings that appear in the worked examples. Absence here means "not ' +
                'demonstrated", not "not allowed".',
    }, null, 2);
}
function answer(tag, observedChildren, index, all, exemplar, withheld) {
    const family = nameFamily(tag, all);
    return JSON.stringify({
        component: tag,
        observedChildren,
        observedParents: [...(index.parentsOf.get(tag) ?? [])].sort(),
        nameFamily: family.length > 1 ? family : [],
        example: exemplar
            ? { source: `a2ui/examples/${exemplar.source}`, path: exemplar.path, spec: exemplar.spec }
            : undefined,
        ...(withheld ? { withheld } : {}),
        guidance: observedChildren.length || exemplar
            ? 'Copy the shape of `example` rather than inventing one. It is an authored spec that ' +
                'validates against this catalog.'
            : 'No worked example ships for this component. Use get_content_model for the ' +
                'children-vs-slots rule, then validate_a2ui_spec before returning anything.',
        warning: family.length > 1 && !observedChildren.length && !(index.parentsOf.get(tag)?.size ?? 0)
            ? `${tag} shares a name prefix with ${family.filter((f) => f !== tag).join(', ')}, which ` +
                'usually means a compound family — but no shipped example demonstrates the nesting, ' +
                'and a shared prefix does not say which way containment runs. cre8-tag-list contains ' +
                'cre8-tag, not the reverse. Check reference/content-model.md and validate before ' +
                'committing to a structure.'
            : undefined,
    }, null, 2);
}
export const compositionTool = {
    name: 'get_composition',
    description: 'Returns how a component actually nests — the parents and children observed in the worked ' +
        'example specs that ship with cre8 — plus the smallest real subtree demonstrating it, ' +
        're-validated against the catalog before you get it. Use it before emitting any multi-level ' +
        'structure (tables above all): compound children are not optional scaffolding, and skipping a ' +
        'level produces markup that renders but is subtly wrong. Where no example demonstrates a ' +
        'nesting, this says so rather than guessing — a name like cre8-tag-list does not tell you ' +
        'which way containment runs.',
    inputSchema: {
        type: 'object',
        properties: {
            component: {
                type: 'string',
                description: 'Component name; the "cre8-" prefix is optional. Works from either end of a family. ' +
                    'Omit for every nesting the examples demonstrate.',
            },
        },
    },
};
