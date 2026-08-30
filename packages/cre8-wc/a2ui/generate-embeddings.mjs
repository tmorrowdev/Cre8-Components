#!/usr/bin/env node
/**
 * Generates catalog-embeddings.json — the vectors search_components ranks
 * against for semantic (query-time) search in cre8-mcp.
 *
 * Unlike the other a2ui/generate-*.mjs scripts, this one is NOT free or
 * deterministic-by-recompute: it calls OpenAI's embeddings API and spends
 * real (if tiny) money per changed component. It is therefore deliberately
 * NOT wired into `build:a2ui` or CI — run it by hand, with OPENAI_API_KEY
 * set, whenever catalog-kg.json's component text changes:
 *
 *   OPENAI_API_KEY=sk-... node a2ui/generate-embeddings.mjs
 *
 * Incremental: a component whose embedding text is unchanged since the last
 * run (by hash) is reused rather than re-embedded, so editing one
 * description costs one API call, not eighty-eight.
 *
 * check-layer-parity.mjs re-derives the same text hashes with no network
 * call and fails the build if a committed vector has gone stale against
 * catalog-kg.json — but only once this file exists at all. Until the first
 * run, search_components just falls back to lexical matching; there is
 * nothing to go stale.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { buildEmbeddingText, textHash } from './embedding-text.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const kgPath = resolve(__dirname, 'catalog-kg.json');
const outPath = resolve(__dirname, 'catalog-embeddings.json');
const pkgPath = resolve(__dirname, '..', 'package.json');

export const MODEL = 'text-embedding-3-small';
// Matryoshka-truncated from the model's native 1536 dims: keeps the committed
// artifact ~180KB for 88 components instead of ~540KB, at a small recall cost
// that doesn't matter for an 88-item catalog. OpenAI supports this via the
// `dimensions` request param on text-embedding-3-* models.
export const DIMENSIONS = 512;
const BATCH_SIZE = 50;

async function main() {
  if (!existsSync(kgPath)) {
    console.error('catalog-kg.json is missing — run `pnpm build:a2ui:kg` first.');
    process.exit(1);
  }

  const kg = JSON.parse(readFileSync(kgPath, 'utf8'));
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
  const components = kg.nodes.filter((n) => n.type === 'component');

  if (!components.length) {
    console.error('catalog-kg.json has no component nodes — run `pnpm build:a2ui:kg` first.');
    process.exit(1);
  }

  const existing = existsSync(outPath) ? JSON.parse(readFileSync(outPath, 'utf8')) : { vectors: {} };

  const wanted = components.map((c) => {
    const text = buildEmbeddingText(kg, c);
    return { id: c.id, text, hash: textHash(text) };
  });

  const reused = [];
  const toEmbed = [];
  for (const w of wanted) {
    const prior = existing.vectors[w.id];
    if (prior && prior.text_hash === w.hash && prior.model === MODEL && prior.dims === DIMENSIONS) {
      reused.push(w.id);
    } else {
      toEmbed.push(w);
    }
  }

  console.log(`${wanted.length} components: ${reused.length} unchanged (reused), ${toEmbed.length} to embed`);

  const vectors = { ...existing.vectors };
  const wantedIds = new Set(wanted.map((w) => w.id));
  for (const id of Object.keys(vectors)) {
    if (!wantedIds.has(id)) {
      delete vectors[id]; // component removed from the catalog since the last run
      console.log(`  dropped stale vector for removed component: ${id}`);
    }
  }

  if (toEmbed.length) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error(
        `OPENAI_API_KEY is not set. Cannot embed ${toEmbed.length} component(s).\n` +
          'Set it and re-run: OPENAI_API_KEY=sk-... node a2ui/generate-embeddings.mjs'
      );
      process.exit(1);
    }

    for (let i = 0; i < toEmbed.length; i += BATCH_SIZE) {
      const batch = toEmbed.slice(i, i + BATCH_SIZE);
      console.log(`  embedding ${i + 1}-${i + batch.length} of ${toEmbed.length}...`);
      const res = await fetch('https://api.openai.com/v1/embeddings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: MODEL,
          dimensions: DIMENSIONS,
          input: batch.map((b) => b.text),
        }),
      });
      if (!res.ok) {
        const body = await res.text();
        console.error(`OpenAI embeddings request failed: ${res.status} ${res.statusText}\n${body}`);
        process.exit(1);
      }
      const json = await res.json();
      json.data.forEach((row, idx) => {
        const w = batch[idx];
        vectors[w.id] = {
          text_hash: w.hash,
          model: MODEL,
          dims: DIMENSIONS,
          vector: row.embedding,
        };
      });
    }
  }

  const sortedVectors = Object.fromEntries(Object.keys(vectors).sort().map((id) => [id, vectors[id]]));

  writeFileSync(
    outPath,
    JSON.stringify(
      {
        meta: {
          generated_from: ['catalog-kg.json'],
          library: pkg.name,
          library_version: pkg.version,
          model: MODEL,
          dims: DIMENSIONS,
          component_count: wanted.length,
        },
        vectors: sortedVectors,
      },
      null,
      2
    ) + '\n'
  );

  console.log(
    `wrote ${outPath} (${wanted.length} vectors: ${reused.length} reused, ${toEmbed.length} newly embedded)`
  );
}

// Only run when executed directly (`node generate-embeddings.mjs`) — this
// module is also imported by check-layer-parity.mjs for MODEL/DIMENSIONS,
// and that import must not trigger a live embedding run as a side effect.
const isMain = import.meta.url === `file://${process.argv[1]}`;
if (isMain) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
