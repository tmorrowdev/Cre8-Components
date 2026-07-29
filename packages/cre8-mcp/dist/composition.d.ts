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
import { z } from 'zod';
import type { RegisteredCatalog } from '@tmorrow/cre8-wc/a2ui/index.js';
interface SpecNode {
    component: string;
    props?: Record<string, unknown>;
    children?: (SpecNode | string)[];
    slots?: Record<string, (SpecNode | string)[]>;
    events?: Record<string, unknown>;
}
export interface ObservedChild {
    component: string;
    /** `null` means the parent's `children` array; a string names a slot. */
    slot: string | null;
    /** How many times this pairing appears across the shipped examples. */
    count: number;
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
        spec: SpecNode;
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
export {};
