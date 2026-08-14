/**
 * Materialise `@tmorrow/cre8-wc` into this package's `node_modules` as real
 * files, for the Vercel build.
 *
 * Two things force this. pnpm installs the workspace dependency as a symlink,
 * and Vercel's `includeFiles` globs do not walk symlinked directories — so the
 * data files would be silently absent from the lambda. And the server reads
 * most of them through paths it computes at runtime (`readdirSync` over the
 * brand token directories, `join(wcRoot(), 'cdn', ...)`), which no static
 * dependency tracer can follow, so `includeFiles` is the only thing that ships
 * them at all.
 *
 * Only the payload directories are copied. `dist/` and `lib/` are the component
 * source the browser loads from `cdn/`, and nothing on the server imports them.
 * Sourcemaps are skipped too: 6.8 MB of the 21 MB, for something no lambda
 * reads.
 *
 * Idempotent, and a no-op outside a build that needs it — running it against an
 * already-materialised copy just refreshes the files.
 */

import { cpSync, existsSync, lstatSync, mkdirSync, rmSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const PKG = '@tmorrow/cre8-wc';

/** Everything the server reads at runtime, and nothing else. */
const PAYLOAD = [
  'package.json',
  'mcp-manifest.json',
  'react-manifest.json',
  'a2ui',
  'cdn',
  // Not in the package's own `files`, so an npm-installed copy lacks it and
  // every streamed surface renders unstyled. Copied here for the same reason
  // the Dockerfile copies it.
  'design-tokens',
];

const here = dirname(fileURLToPath(import.meta.url));
const packageRoot = dirname(here);
const require = createRequire(import.meta.url);

const source = dirname(require.resolve(`${PKG}/package.json`));
const target = join(packageRoot, 'node_modules', PKG);

if (source === target) {
  // Already materialised by an earlier run. `cpSync` refuses a copy onto
  // itself, and there would be nothing to copy anyway.
  console.log(`[vendor-cre8-wc] ${PKG} is already materialised at ${target}; nothing to do.`);
  process.exit(0);
}

console.log(`[vendor-cre8-wc] copying ${source} -> ${target}`);

// A symlink has to go before the copy, or `cpSync` writes through it and
// mutates the workspace package instead of replacing the link.
if (existsSync(target) && lstatSync(target).isSymbolicLink()) {
  rmSync(target);
}
mkdirSync(target, { recursive: true });

for (const entry of PAYLOAD) {
  const from = join(source, entry);
  if (!existsSync(from)) {
    // Not fatal on its own — a missing `design-tokens` only costs styling, and
    // the server already reports that at `GET /themes`. Loud enough to notice
    // in a build log.
    console.warn(`[vendor-cre8-wc] missing: ${entry}`);
    continue;
  }
  cpSync(from, join(target, entry), {
    recursive: true,
    dereference: true,
    filter: (path) => !path.endsWith('.map'),
  });
}

console.log(`[vendor-cre8-wc] done`);
