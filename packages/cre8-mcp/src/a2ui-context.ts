/**
 * Context retrieval for the A2UI catalog.
 *
 * The full catalog is ~43k tokens, which is more than a small-context model can
 * hold and more than a cloud model should pay for on every request. The compact
 * projection — prop names, enum choices, required lists, slot names, containment
 * — is ~7.5x smaller and carries the whole decoding constraint. Prose is what
 * gets dropped.
 *
 * This is what lets one endpoint serve three very different callers: a cloud
 * model taking the whole compact catalog, an on-device model taking a few hundred
 * tokens of it, and an MCP host taking full prose for a narrow selection.
 */

import { readFileSync } from 'fs';
import { createRequire } from 'module';
import { loadA2uiCatalog } from './handlers.js';

export interface CompactPropSpec {
  type?: string | string[];
  enum?: string[];
}

export interface CompactComponent {
  name: string;
  category: string;
  props?: Record<string, CompactPropSpec>;
  required?: string[];
  acceptsChildren?: boolean;
  slots?: string[];
}

interface CompactCatalog {
  contractVersion: number;
  sourceCatalog: string;
  libraryVersion: string;
  componentCount: number;
  components: CompactComponent[];
}

let compactCache: CompactCatalog | null = null;

export function loadCompactCatalog(): CompactCatalog {
  if (compactCache) return compactCache;
  const require = createRequire(import.meta.url);
  const path = require.resolve('@tmorrow/cre8-wc/a2ui/catalog.compact.json');
  compactCache = JSON.parse(readFileSync(path, 'utf-8')) as CompactCatalog;
  return compactCache;
}

export interface GetA2uiContextInput {
  /** Explicit component names. Takes precedence over `categories`. */
  names?: string[];
  categories?: string[];
  projection?: 'compact' | 'full';
  /** Token ceiling. Whole components are dropped to fit; none is ever truncated. */
  budget?: number;
  /**
   * Always admitted before the budget is spent elsewhere.
   *
   * Without this, filling smallest-first starves exactly the components worth
   * keeping — definition size tracks prop count, so the most capable component in
   * a category is the first casualty. Measured: a 1200-token budget over
   * Forms/Actions/Typography dropped `cre8-button` and `cre8-field`, and the model
   * substituted a checkbox for a password input.
   */
  pinned?: string[];
}

export interface A2uiContextResult {
  contractVersion: number;
  libraryVersion: string;
  projection: 'compact' | 'full';
  components: unknown[];
  /** True when the budget forced components out. Callers must surface this. */
  truncated: boolean;
  droppedCount: number;
  estimatedTokens: number;
}

/**
 * Bytes/4. Deliberately provider-agnostic: the plane cannot know which tokenizer
 * the caller's model uses, so it offers a consistent, slightly conservative
 * estimate and lets clients with a real tokenizer do their own accounting.
 */
function estimateTokens(value: unknown): number {
  return Math.max(1, Math.ceil(JSON.stringify(value).length / 4));
}

function normalize(name: string): string {
  return name.startsWith('cre8-') ? name : `cre8-${name}`;
}

export function handleGetA2uiContext(input: GetA2uiContextInput): A2uiContextResult {
  const compact = loadCompactCatalog();
  const projection = input.projection ?? 'compact';

  const byName = new Map(compact.components.map((c) => [c.name, c]));

  let candidates: CompactComponent[];
  if (input.names?.length) {
    candidates = input.names.map((raw) => {
      const name = normalize(raw);
      const found = byName.get(name);
      if (!found) {
        throw new Error(`Component "${name}" not found in A2UI catalog.`);
      }
      return found;
    });
  } else if (input.categories?.length) {
    const wanted = new Set(input.categories);
    candidates = compact.components.filter((c) => wanted.has(c.category));
    if (candidates.length === 0) {
      const available = [...new Set(compact.components.map((c) => c.category))].sort().join(', ');
      throw new Error(
        `No components in categories [${input.categories.join(', ')}]. Available: ${available}`
      );
    }
  } else {
    candidates = compact.components;
  }

  // `full` reaches back into the real catalog for the prose-bearing definitions.
  const materialize = (component: CompactComponent): unknown => {
    if (projection === 'compact') return component;
    const definition = loadA2uiCatalog().components.get(component.name);
    return { name: component.name, definition };
  };

  if (input.budget === undefined) {
    const components = candidates.map(materialize);
    return {
      contractVersion: compact.contractVersion,
      libraryVersion: compact.libraryVersion,
      projection,
      components,
      truncated: false,
      droppedCount: 0,
      estimatedTokens: estimateTokens(components),
    };
  }

  const pinned = new Set((input.pinned ?? []).map(normalize));
  const ordered = [
    ...candidates.filter((c) => pinned.has(c.name)),
    ...candidates
      .filter((c) => !pinned.has(c.name))
      .sort((a, b) => JSON.stringify(a).length - JSON.stringify(b).length),
  ];

  const kept: CompactComponent[] = [];
  let used = 0;
  for (const component of ordered) {
    const cost = estimateTokens(materialize(component));
    if (used + cost > input.budget) continue;
    kept.push(component);
    used += cost;
  }

  kept.sort((a, b) => a.name.localeCompare(b.name));
  const components = kept.map(materialize);

  return {
    contractVersion: compact.contractVersion,
    libraryVersion: compact.libraryVersion,
    projection,
    components,
    truncated: kept.length < candidates.length,
    droppedCount: candidates.length - kept.length,
    estimatedTokens: used,
  };
}
