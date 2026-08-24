#!/usr/bin/env node
/**
 * Pre-computes an embedding vector per component for semantic search.
 *
 *   node a2ui/generate-catalog-vectors.mjs [--check]
 *
 * Reads catalog-kg.json + intent-phrases.json, writes catalog-vectors.json.
 * Runs after generate-catalog-kg.mjs in build:a2ui, so the vectors are
 * regenerated whenever the catalog is - the same freshness contract as every
 * other derived layer.
 *
 * Why this exists: search_components was a literal substring match, so any
 * intent-shaped query ("show progress toward a goal", "warn the user")
 * returned nothing, and eval transcripts showed agents skipping the MCP and
 * grepping node_modules instead. With these vectors the MCP embeds only the
 * *query* at runtime and ranks by cosine + a small lexical boost - measured
 * at 10/10 top-1 on an intent-query gold set that scored 0/10 under
 * substring matching.
 *
 * The model arrives as an npm dependency (@energetic-ai/model-embeddings-en,
 * Universal Sentence Encoder lite, 512 dims) - deliberately NOT downloaded
 * from huggingface or any model hub at install or run time, and requiring no
 * API key. npm is the one host every environment that installs this package
 * can reach by definition; sandboxes that block model hubs (this repo's own
 * eval containers do) still work.
 *
 * Intent phrases are keyed by component id and validated here: a key naming
 * a component the catalog does not ship fails the build. That is what keeps
 * this file from becoming another hand-written skill that drifts - the
 * cre8-a2ui skill reached 46% phantom components before anything noticed.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const KG_PATH = join(HERE, 'catalog-kg.json');
const PHRASES_PATH = join(HERE, 'intent-phrases.json');
const OUT_PATH = join(HERE, 'catalog-vectors.json');
const CHECK = process.argv.includes('--check');

const kg = JSON.parse(readFileSync(KG_PATH, 'utf8'));
const phrases = JSON.parse(readFileSync(PHRASES_PATH, 'utf8'));
const components = kg.nodes.filter((n) => n.type === 'component');
const ids = new Set(components.map((c) => c.id));

// Drift gate first, so a stale phrase file fails fast even in --check.
const phantom = Object.keys(phrases).filter((k) => !k.startsWith('$') && !ids.has(k));
if (phantom.length) {
  console.error(
    `intent-phrases.json names ${phantom.length} component(s) the catalog does not ship:\n` +
    `  ${phantom.join(', ')}\n` +
    'Remove them or fix the id. Refusing to embed phantom components.',
  );
  process.exit(1);
}

const slotsOf = (id) =>
  kg.edges
    .filter((e) => e.from === id && e.rel === 'HAS_SLOT')
    .map((e) => e.to.replace(/^slot:/, ''));

// What gets embedded per component. Name and category anchor the literal
// matches; intent phrases carry the purpose vocabulary the descriptions
// often lack; the description and slot names round it out.
const textOf = (c) =>
  [
    c.id.replace(/^cre8-/, '').replace(/-/g, ' '),
    c.category ?? '',
    phrases[c.id] ?? '',
    c.description ?? '',
    slotsOf(c.id).length ? `slots: ${slotsOf(c.id).join(' ')}` : '',
  ]
    .filter(Boolean)
    .join('. ');

if (CHECK) {
  if (!existsSync(OUT_PATH)) {
    console.error('catalog-vectors.json is missing - run generate-catalog-vectors.mjs');
    process.exit(1);
  }
  const existing = JSON.parse(readFileSync(OUT_PATH, 'utf8'));
  const stale =
    existing.meta?.library_version !== kg.meta?.library_version ||
    components.some((c) => existing.meta?.texts?.[c.id] !== textOf(c)) ||
    Object.keys(existing.vectors ?? {}).some((id) => !ids.has(id));
  if (stale) {
    console.error('catalog-vectors.json is stale relative to the catalog/phrases - regenerate');
    process.exit(1);
  }
  console.log(`catalog-vectors.json in sync (${components.length} components, model ${existing.meta?.model})`);
  process.exit(0);
}

const { initModel } = await import('@energetic-ai/embeddings');
const { modelSource } = await import('@energetic-ai/model-embeddings-en');
const model = await initModel(modelSource);

const vectors = {};
const texts = {};
for (const c of components) {
  const text = textOf(c);
  texts[c.id] = text;
  const v = await model.embed(text);
  // 5 decimals keeps the file ~5x smaller than full doubles; cosine rankings
  // are unaffected at this precision.
  vectors[c.id] = Array.from(v, (x) => Math.round(x * 1e5) / 1e5);
}

const dims = vectors[components[0].id].length;
writeFileSync(
  OUT_PATH,
  JSON.stringify({
    meta: {
      model: 'energetic-ai/model-embeddings-en (universal-sentence-encoder-lite)',
      dims,
      library_version: kg.meta?.library_version,
      generated_from: ['catalog-kg.json', 'intent-phrases.json'],
      // Stored so --check can prove the embedded text still matches the
      // catalog without re-running the model.
      texts,
    },
    vectors,
  }),
);
console.log(`catalog-vectors.json: ${components.length} components x ${dims} dims (lib ${kg.meta?.library_version})`);
