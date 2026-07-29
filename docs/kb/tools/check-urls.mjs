#!/usr/bin/env node
/**
 * Checks that the external sources cited in the knowledge base are still live.
 *
 *   node docs/kb/tools/check-urls.mjs        (or: pnpm kb:check-urls)
 *
 * Deliberately NOT part of `pnpm kb:check`: it needs network, it is slow, and a
 * transient outage should never block a docs commit. Run it when touching
 * 07-research.md, or periodically.
 *
 * A bibliography whose links have rotted is worse than no bibliography — it
 * looks sourced while being unverifiable.
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const KB = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/**
 * Hosts that reject automated requests regardless of the URL being valid.
 * A non-200 from these is not evidence of rot, so it is reported separately
 * rather than failing the run.
 */
const BOT_HOSTILE = [/(^|\.)medium\.com$/, /(^|\.)linkedin\.com$/, /(^|\.)x\.com$/];

const walk = (dir) =>
  readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) return entry === 'tools' ? [] : walk(full);
    return full.endsWith('.md') ? [full] : [];
  });

const urls = new Map(); // url → Set of files citing it
for (const file of walk(KB)) {
  const rel = relative(KB, file);
  // Stop at whitespace and at markdown/HTML delimiters — URLs are quoted in
  // href attributes and parenthesised in markdown links, and a captured closing
  // quote turns a live URL into a phantom 404.
  for (const m of readFileSync(file, 'utf8').matchAll(/https?:\/\/[^\s<>)\]"'`]+/g)) {
    const url = m[0].replace(/[.,;:]+$/, '');
    if (!urls.has(url)) urls.set(url, new Set());
    urls.get(url).add(rel);
  }
}

const check = async (url) => {
  const attempt = (method) =>
    fetch(url, {
      method,
      redirect: 'follow',
      headers: { 'user-agent': 'Mozilla/5.0 (compatible; cre8-kb-linkcheck/1.0)' },
      signal: AbortSignal.timeout(15000),
    });
  try {
    // Some hosts reject HEAD but serve GET; try HEAD first for speed.
    let res = await attempt('HEAD');
    if (res.status === 405 || res.status === 403 || res.status === 404) res = await attempt('GET');
    return res.status;
  } catch (e) {
    // Every URL is fetched concurrently, so a slow host can time out purely from
    // the burst. Retrying once serially turns a false alarm into a real signal —
    // a link checker that cries wolf gets ignored, which is worse than not having
    // one.
    if (e.name === 'TimeoutError' || e.name === 'AbortError') {
      try {
        return (await attempt('GET')).status;
      } catch (retry) {
        return retry.name === 'TimeoutError' ? 'timeout' : 'error';
      }
    }
    return 'error';
  }
};

const list = [...urls.keys()].sort();
const results = await Promise.all(list.map((u) => check(u).then((status) => ({ u, status }))));

const dead = [];
const tolerated = [];
for (const { u, status } of results) {
  if (status === 200) continue;
  const host = (() => {
    try {
      return new URL(u).hostname;
    } catch {
      return '';
    }
  })();
  (BOT_HOSTILE.some((re) => re.test(host)) ? tolerated : dead).push({ u, status });
}

for (const { u, status } of tolerated) {
  console.log(`note  ${status}  ${u} (host blocks automated requests — verify by hand)`);
}

if (dead.length) {
  console.error(`\n${dead.length} unreachable URL(s):`);
  for (const { u, status } of dead) {
    console.error(`  ${status}  ${u}\n        cited in: ${[...urls.get(u)].join(', ')}`);
  }
  process.exit(1);
}

console.log(`ok — ${list.length} external URL(s) reachable (${tolerated.length} unverifiable by bot)`);
