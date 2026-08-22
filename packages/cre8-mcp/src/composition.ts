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
import { validateSpec } from '@tmorrow/cre8-wc/a2ui/index.js';
import { loadA2uiCatalog, loadKG, type KGEdge, type KGEvidenceKind, type KGSpecNode } from './handlers.js';

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
  example?: { source: string; path: string; spec: KGSpecNode };
}

// ─── graph queries ──────────────────────────────────────────────────────────

const kinds = (e: KGEdge): KGEvidenceKind[] =>
  [...new Set((e.evidence ?? []).map((v) => v.kind))].sort() as KGEvidenceKind[];

function childrenOf(tag: string): ObservedChild[] {
  const { edgesFrom } = loadKG();
  return (edgesFrom.get(tag) ?? [])
    .filter((e) => e.rel === 'CONTAINS')
    .map((e) => ({ component: e.to, slot: e.slot ?? null, count: e.count ?? 0, evidence: kinds(e) }))
    .sort((a, b) => b.count - a.count || a.component.localeCompare(b.component));
}

function parentsOf(tag: string): string[] {
  const { edgesTo } = loadKG();
  return [...new Set((edgesTo.get(tag) ?? []).filter((e) => e.rel === 'CONTAINS').map((e) => e.from))].sort();
}

function nameFamily(tag: string): string[] {
  const { edgesFrom, edgesTo } = loadKG();
  const fam = new Set<string>();
  for (const e of edgesFrom.get(tag) ?? []) if (e.rel === 'IN_FAMILY') fam.add(e.to);
  for (const e of edgesTo.get(tag) ?? []) if (e.rel === 'IN_FAMILY') fam.add(e.from);
  if (fam.size === 0) return [];
  fam.add(tag);
  return [...fam].sort();
}

// ─── the tool ───────────────────────────────────────────────────────────────

export interface GetCompositionInput {
  component?: string;
}

export const GetCompositionSchema = z.object({ component: z.string().optional() });

function normalize(name: string): string {
  return name.startsWith('cre8-') ? name : `cre8-${name}`;
}

export function handleGetComposition(
  input: GetCompositionInput,
  catalog: RegisteredCatalog = loadA2uiCatalog()
): string {
  const kg = loadKG();
  const source =
    `catalog-kg.json — CONTAINS edges from ${kg.meta.evidence.story_files} component stories, ` +
    `${kg.meta.evidence.source_files} component render templates and ` +
    `${kg.meta.evidence.example_files.length} authored a2ui examples (${kg.meta.library}@${kg.meta.library_version})`;

  if (input.component) {
    const tag = normalize(input.component);
    if (!catalog.components.has(tag)) {
      throw new Error(`Component "${tag}" is not in the catalog.`);
    }

    const observedChildren = childrenOf(tag);
    const exemplar = kg.components.get(tag)?.exemplar ?? undefined;
    if (exemplar) {
      // Re-validate rather than trusting the graph: an exemplar that has
      // drifted out of step with the catalog must not be handed on as a model
      // to copy.
      try {
        validateSpec(exemplar.spec, catalog);
      } catch {
        return answer(tag, observedChildren, source, undefined, 'the worked example for this component no longer validates against the catalog and was withheld');
      }
    }

    return answer(tag, observedChildren, source, exemplar ?? undefined);
  }

  const parents = [...kg.components.keys()]
    .map((parent) => ({
      component: parent,
      children: childrenOf(parent).map((c) => (c.slot ? `${c.component} (slot: ${c.slot})` : c.component)),
    }))
    .filter((p) => p.children.length > 0)
    .sort((a, b) => a.component.localeCompare(b.component));

  return JSON.stringify(
    {
      catalogId: catalog.id,
      source,
      rule:
        'Compound children are not optional scaffolding: skipping a level renders, but is subtly ' +
        'wrong. Ask about a single component to get the worked subtree rather than assembling one ' +
        'from this list.',
      observedNestings: parents.length,
      parents,
      caveat:
        parents.length === 0
          ? 'The knowledge graph carries no CONTAINS edges, so nesting cannot be reported. Rebuild it with pnpm build:a2ui:kg.'
          : 'These are the pairings some shipped artifact demonstrates. Absence here means "not ' +
            'demonstrated", not "not allowed".',
    },
    null,
    2
  );
}

function answer(
  tag: string,
  observedChildren: ObservedChild[],
  source: string,
  exemplar?: { source: string; path: string; spec: KGSpecNode },
  withheld?: string
): string {
  const family = nameFamily(tag);
  const parents = parentsOf(tag);
  return JSON.stringify(
    {
      component: tag,
      source,
      observedChildren,
      observedParents: parents,
      nameFamily: family,
      example: exemplar,
      ...(withheld ? { withheld } : {}),
      guidance:
        observedChildren.length || exemplar
          ? 'Copy the shape of `example` rather than inventing one. It is an authored spec that ' +
            'validates against this catalog. `observedChildren[].evidence` says whether a nesting is ' +
            'demonstrated by the library\'s own stories and render templates, by an authored a2ui ' +
            'example, or both.'
          : 'No shipped artifact demonstrates nesting for this component. Use get_content_model for ' +
            'the children-vs-slots rule, then validate_a2ui_spec before returning anything.',
      warning:
        family.length > 1 && !observedChildren.length && !parents.length
          ? `${tag} shares a name prefix with ${family.filter((f) => f !== tag).join(', ')}, which ` +
            'usually means a compound family — but no shipped artifact demonstrates the nesting, ' +
            'and a shared prefix does not say which way containment runs. cre8-tag-list contains ' +
            'cre8-tag, not the reverse. Check reference/content-model.md and validate before ' +
            'committing to a structure.'
          : undefined,
    },
    null,
    2
  );
}

export const compositionTool = {
  name: 'get_composition',
  description:
    'Returns how a component actually nests — the parents and children the cre8 knowledge graph ' +
    'records from the library\'s own stories, render templates and authored a2ui examples, with ' +
    'the evidence for each — plus the smallest authored subtree demonstrating it, re-validated ' +
    'against the catalog before you get it. Use it before emitting any multi-level structure ' +
    '(tables above all): compound children are not optional scaffolding, and skipping a level ' +
    'produces markup that renders but is subtly wrong. Where nothing demonstrates a nesting, this ' +
    'says so rather than guessing — a name like cre8-tag-list does not tell you which way ' +
    'containment runs.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      component: {
        type: 'string',
        description:
          'Component name; the "cre8-" prefix is optional. Works from either end of a family. ' +
          'Omit for every nesting the graph records.',
      },
    },
  },
};
