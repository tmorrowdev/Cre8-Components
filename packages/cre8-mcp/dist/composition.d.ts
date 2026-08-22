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
 * **Nothing here is synthesized, and nothing here is derived at runtime.** An
 * earlier cut built skeletons from the naming rule and they were wrong in the
 * way that matters most: it nested `cre8-table-cell` directly inside
 * `cre8-table`, and inverted `cre8-tag` / `cre8-tag-list`. Worse, they
 * *validated* — the catalog does not type slot contents — so an agent would
 * have received a confidently wrong structure carrying a validation stamp.
 *
 * A later cut walked `a2ui/examples/` on every call. That was ground truth,
 * but a private one: five specs, read by this tool alone, while the eval
 * oracle re-derived the same thing separately and the catalog graph knew
 * nothing about nesting at all.
 *
 * Now containment is read from the knowledge graph (`catalog-kg.json`), where
 * `generate-catalog-kg.mjs` builds CONTAINS edges from every shipped artifact
 * that demonstrates a nesting — component stories, component render
 * templates, and the authored A2UI examples — and records which artifact
 * each edge came from. This tool reports that evidence rather than hiding it.
 * The naming rule is still reported, via IN_FAMILY edges, but as a *family*
 * relation — never as a nesting prescription.
 */
import { z } from 'zod';
import type { RegisteredCatalog } from '@tmorrow/cre8-wc/a2ui/index.js';
import { type KGEvidenceKind, type KGSpecNode } from './handlers.js';
export interface ObservedChild {
    component: string;
    /** `null` means the parent's `children` array; a string names a slot. */
    slot: string | null;
    /** How many times this pairing appears across all evidence. */
    count: number;
    /** Which kinds of shipped artifact demonstrate it. */
    evidence: KGEvidenceKind[];
}
export interface CompositionAnswer {
    component: string;
    observedChildren: ObservedChild[];
    observedParents: string[];
    /**
     * Components sharing a name prefix. Deliberately undirected: `cre8-tag` and
     * `cre8-tag-list` are one family, and the name does not say which contains
     * which — it is `cre8-tag-list` that holds tags, the opposite of what the
     * prefix suggests.
     */
    nameFamily: string[];
    example?: {
        source: string;
        path: string;
        spec: KGSpecNode;
    };
}
export interface GetCompositionInput {
    component?: string;
}
export declare const GetCompositionSchema: z.ZodObject<{
    component: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    component?: string | undefined;
}, {
    component?: string | undefined;
}>;
export declare function handleGetComposition(input: GetCompositionInput, catalog?: RegisteredCatalog): string;
export declare const compositionTool: {
    name: string;
    description: string;
    inputSchema: {
        type: "object";
        properties: {
            component: {
                type: string;
                description: string;
            };
        };
    };
};
