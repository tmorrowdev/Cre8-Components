/**
 * Copy the cre8 runtime into `www/vendor/`.
 *
 * An App Store build has to work on a plane. Everything the page loads must
 * ship inside the bundle, so nothing here may point at a CDN — and Apple's
 * review guidelines treat an app that is inert without a network round trip as
 * a thin client, which is a rejection.
 *
 * Kept out of git (see .gitignore) because it is 3 MB of build output that
 * already lives in `@tmorrow/cre8-wc`. Run `pnpm sync-assets` after install,
 * which `pnpm dev` and both `ios:*` scripts do for you.
 */

import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const vendor = join(dirname(here), 'www', 'vendor');
const require = createRequire(import.meta.url);
const wc = dirname(require.resolve('@tmorrow/cre8-wc/package.json'));

/** The brand whose token sheet the app loads. */
const BRAND = 'cre8-a2ui';

/**
 * A published cre8-wc keeps tokens under `lib/design-tokens/`; a workspace
 * checkout has them at `design-tokens/`. Both layouts are real depending on how
 * this package was installed, and picking the wrong one costs you every
 * `--cre8-*` value on the page with no error anywhere.
 */
function tokensDir() {
  for (const candidate of [
    join(wc, 'lib', 'design-tokens', 'brands', BRAND, 'css'),
    join(wc, 'design-tokens', 'brands', BRAND, 'css'),
  ]) {
    if (existsSync(candidate)) return candidate;
  }
  throw new Error(
    `No token sheets for brand "${BRAND}" under ${wc}. ` +
      'Build @tmorrow/cre8-wc, or check that design-tokens/ shipped with it.'
  );
}

rmSync(vendor, { recursive: true, force: true });
mkdirSync(vendor, { recursive: true });

// The component bundle. `.map` files are 3.4 MB of no use to a shipped app.
cpSync(join(wc, 'cdn', 'cre8-wc.esm.js'), join(vendor, 'cre8-wc.esm.js'));

// Token sheets, kept as a directory because a brand sheet `@import`s its
// siblings — drop tokens_brand.css and the page renders entirely unstyled.
cpSync(tokensDir(), join(vendor, 'tokens'), {
  recursive: true,
  dereference: true,
  filter: (path) => !path.endsWith('.map'),
});

console.log(`[sync-assets] cre8-wc runtime + "${BRAND}" tokens -> www/vendor/`);
