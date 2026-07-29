#!/usr/bin/env node
/**
 * Validates the knowledge base's internal links. Run from the repo root:
 *
 *   node docs/kb/tools/check-links.mjs
 *
 * Checks:
 *   - every relative markdown link resolves to a file that exists
 *   - every [page#anchor] resolves to a real heading on that page
 *   - no page uses [[wiki-link]] syntax, which GitHub renders as literal text
 *   - every path in reference/intents.json exists (and its anchor, if any)
 *   - every content page is reachable from at least one machine intent
 *   - every docs/kb link in the repo root README still resolves
 *   - every repo file path cited in prose actually exists
 *
 * Exits non-zero on any failure so it can gate a commit.
 */

import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { resolve, dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const KB = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** GitHub-flavored heading slug. */
const slug = (heading) =>
  heading
    .trim()
    .toLowerCase()
    .replace(/`/g, '')
    .replace(/[^\w\s-]/g, '')
    // github-slugger replaces each whitespace character individually, so runs of
    // whitespace become runs of hyphens. Collapsing them here would make this
    // checker self-consistent but wrong: it would bless an anchor that 404s on
    // GitHub. Match the real algorithm, not a tidier one.
    .replace(/\s/g, '-');

const walk = (dir) =>
  readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) return entry === 'tools' ? [] : walk(full);
    return full.endsWith('.md') ? [full] : [];
  });

const pages = walk(KB);
const anchors = new Map(); // page path (relative to KB, no extension) → Set of slugs

for (const file of pages) {
  const key = relative(KB, file).replace(/\.md$/, '');
  const headings = [...readFileSync(file, 'utf8').matchAll(/^#{1,6}\s+(.+)$/gm)].map((m) =>
    slug(m[1])
  );
  anchors.set(key, new Set(headings));
}

const failures = [];
const note = (file, msg) => failures.push(`${relative(KB, file)}: ${msg}`);

/**
 * Blank out fenced blocks and inline code so link syntax being *documented*
 * (`[[page]]` in prose about conventions) is not mistaken for a real link.
 * Replacing with spaces rather than deleting keeps offsets stable.
 */
const stripCode = (text) =>
  text
    .replace(/```[\s\S]*?```/g, (m) => ' '.repeat(m.length))
    .replace(/`[^`\n]*`/g, (m) => ' '.repeat(m.length));

/** Resolve a wiki target to a known page key, tolerating the reference/ prefix. */
const resolvePage = (target) => {
  const bare = target.replace(/\.md$/, '');
  if (anchors.has(bare)) return bare;
  const nested = [...anchors.keys()].find((k) => k.endsWith(`/${bare}`));
  return nested ?? null;
};

for (const file of pages) {
  const body = stripCode(readFileSync(file, 'utf8'));

  // [[page]], [[page#anchor]], [[page|label]], [[page#anchor|label]]
  for (const m of body.matchAll(/\[\[([^\]|#]+)(?:#([^\]|]+))?(?:\|[^\]]+)?\]\]/g)) {
    const [, rawPage, anchor] = m;
    const page = resolvePage(rawPage.trim());
    if (!page) {
      note(file, `[[${rawPage}]] → no such KB page`);
      continue;
    }
    if (anchor && !anchors.get(page).has(slug(anchor))) {
      note(file, `[[${rawPage}#${anchor}]] → no such heading on ${page}.md`);
    }
  }

  // Relative markdown links: [text](path) — skip URLs and pure anchors.
  for (const m of body.matchAll(/\[[^\]]*\]\((?!https?:|mailto:|#)([^)\s]+)\)/g)) {
    const [, href] = m;
    const [path, anchor] = href.split('#');
    const target = resolve(dirname(file), path);
    if (!existsSync(target)) {
      note(file, `[](${href}) → missing file`);
      continue;
    }
    if (anchor && target.endsWith('.md')) {
      const key = relative(KB, target).replace(/\.md$/, '');
      if (anchors.has(key) && !anchors.get(key).has(slug(anchor))) {
        note(file, `[](${href}) → no such heading`);
      }
    }
  }
}

// Intent index entries must point at real destinations.
const intentsPath = resolve(KB, 'reference/intents.json');
if (existsSync(intentsPath)) {
  const { entries } = JSON.parse(readFileSync(intentsPath, 'utf8'));
  for (const { intent, path: href } of entries) {
    const [path, anchor] = href.split('#');
    const target = resolve(KB, path);
    if (!existsSync(target)) {
      failures.push(`reference/intents.json: "${intent}" → missing ${path}`);
      continue;
    }
    const key = path.replace(/\.md$/, '');
    if (anchor && anchors.has(key) && !anchors.get(key).has(slug(anchor))) {
      failures.push(`reference/intents.json: "${intent}" → no heading #${anchor} in ${path}`);
    }
  }
}

/**
 * Repo file paths cited in prose (`packages/cre8-wc/a2ui/registry.ts`) are just
 * as load-bearing as component names — a reader follows them. Nothing else here
 * notices when a file moves, because they are code spans, not links.
 */
const REPO_ROOT = resolve(KB, '../..');
const PATH_RE =
  /`([A-Za-z0-9_.@/-]*(?:packages|website|scripts|components|agent-docs|a2ui)[A-Za-z0-9_./-]*\.[a-z]{2,5})`/g;
let pathsChecked = 0;
for (const file of pages) {
  const rel = relative(KB, file);
  for (const m of readFileSync(file, 'utf8').matchAll(PATH_RE)) {
    const cited = m[1];
    // Candidates: repo-root-relative, cre8-wc-relative (the usual shorthand),
    // or a KB-internal page such as `reference/components.md`.
    const candidates = [
      resolve(REPO_ROOT, cited),
      resolve(REPO_ROOT, 'packages/cre8-wc', cited),
      resolve(KB, cited),
    ];
    if (candidates.some((c) => existsSync(c))) {
      pathsChecked += 1;
      continue;
    }
    failures.push(`${rel}: cites \`${cited}\`, which does not exist`);
  }
}

/**
 * The repo root README is the front door: it is where anyone landing on the
 * project finds this KB at all. It lives outside the KB tree, so nothing else
 * here would notice if a page were renamed and those links broke.
 */
const rootReadme = resolve(KB, '../../README.md');
if (existsSync(rootReadme)) {
  const body = stripCode(readFileSync(rootReadme, 'utf8'));
  for (const m of body.matchAll(/\]\((docs\/kb\/[^)\s]+)\)/g)) {
    const [, href] = m;
    const [path, anchor] = href.split('#');
    const target = resolve(KB, '../..', path);
    if (!existsSync(target)) {
      failures.push(`README.md (repo root): [](${href}) → missing file`);
      continue;
    }
    const key = relative(KB, target).replace(/\.md$/, '');
    if (anchor && anchors.has(key) && !anchors.get(key).has(slug(anchor))) {
      failures.push(`README.md (repo root): [](${href}) → no such heading`);
    }
  }
}

/**
 * Wiki-link syntax renders as literal text on GitHub — it is only supported in
 * GitHub Wikis, not in repository files. This KB used `[[page]]` for most of its
 * life, which meant most of its navigation was dead text on the surface people
 * actually read it on. Standard markdown links work everywhere.
 */
for (const file of pages) {
  const rel = relative(KB, file);
  if (rel === 'README.md') continue; // documents the prohibition, quoting the syntax
  for (const m of stripCode(readFileSync(file, 'utf8')).matchAll(/\[\[[^\]]+\]\]/g)) {
    failures.push(
      `${rel}: ${m[0]} uses wiki-link syntax, which GitHub renders as literal text — use [label](path.md)`
    );
  }
}

/**
 * An intent-routed KB is only as good as its routing: a page no intent points at
 * is unreachable for any agent using intents.json, however well written it is.
 * README and INTENT-MAP are the entry points and route inward, so they are exempt.
 */
const ENTRY_POINTS = new Set(['README', 'INTENT-MAP']);
if (existsSync(intentsPath)) {
  const { entries } = JSON.parse(readFileSync(intentsPath, 'utf8'));
  const routed = new Set(entries.map(({ path: p }) => p.split('#')[0].replace(/\.md$/, '')));
  for (const page of anchors.keys()) {
    if (ENTRY_POINTS.has(page) || routed.has(page)) continue;
    failures.push(
      `reference/intents.json: nothing routes to ${page}.md — add an intent or the page is unreachable`
    );
  }
}

if (failures.length) {
  console.error(`${failures.length} broken link(s):\n${failures.map((f) => `  ${f}`).join('\n')}`);
  process.exit(1);
}

console.log(
  `ok — ${pages.length} pages, all links and intents resolve; ${pathsChecked} cited file path(s) exist; no wiki-link syntax; every page is intent-reachable`
);
