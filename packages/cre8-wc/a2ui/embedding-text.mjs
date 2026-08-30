/**
 * Builds the text embedded for semantic component search (search_components).
 *
 * Component descriptions in the catalog are thin (mean ~70 chars) — not enough
 * on their own to separate "shows a running count" from "confirms a
 * destructive action" in embedding space. This fattens each component's text
 * with its category, prop names/enums/descriptions, and slot descriptions
 * pulled from the knowledge graph, so retrieval has real signal to match on.
 *
 * Shared by generate-embeddings.mjs (which calls the embedding API) and
 * check-layer-parity.mjs (which re-derives this text with NO network call, to
 * detect when committed vectors have gone stale against catalog-kg.json).
 * Both must build byte-identical text for the same component, or the parity
 * check's hash comparison is meaningless — that's why this lives in one file.
 */
import { createHash } from 'node:crypto';

const clip = (text, max) => {
  if (!text) return '';
  const flat = String(text).replace(/\s+/g, ' ').trim();
  return flat.length > max ? `${flat.slice(0, max - 1)}…` : flat;
};

/**
 * @param {{nodes: Array<Record<string, unknown>>}} kg - parsed catalog-kg.json
 * @param {Record<string, unknown>} component - a KG node with type 'component'
 * @returns {string}
 */
export function buildEmbeddingText(kg, component) {
  const slotNodeById = new Map(
    kg.nodes.filter((n) => n.type === 'slot').map((n) => [n.id, n])
  );

  const propLines = Object.entries(component.props ?? {}).map(([name, spec]) => {
    const enumPart = spec?.enum ? ` (${spec.enum.join('/')})` : '';
    const descPart = spec?.description ? ` — ${clip(spec.description, 90)}` : '';
    return `${name}${enumPart}${descPart}`;
  });

  const slotLines = (component.slots ?? []).map((name) => {
    const node = slotNodeById.get(`slot:${component.id}:${name}`);
    const descPart = node?.description ? ` — ${clip(node.description, 90)}` : '';
    return `${name}${descPart}`;
  });

  const parts = [
    `${component.id} (${component.category ?? 'Uncategorized'})`,
    clip(component.description, 300),
  ];
  if (propLines.length) parts.push(`Props: ${propLines.join('; ')}`);
  if (slotLines.length) parts.push(`Slots: ${slotLines.join('; ')}`);

  return parts.filter(Boolean).join('. ');
}

export function textHash(text) {
  return createHash('sha256').update(text, 'utf8').digest('hex');
}
