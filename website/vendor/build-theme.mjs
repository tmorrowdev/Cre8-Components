/**
 * Regenerates cre8-theme.css from the canonical cre8-vivid token sources.
 *
 * The website vendors its theme so the landing page loads zero external
 * resources. This script is the sync point: run it after any change to
 * the cre8-vivid brand tokens.
 *
 *   node website/vendor/build-theme.mjs
 *
 * cre8-vivid is an overlay brand: it redefines the color layer but not the
 * structural tokens (font families/weights, line heights, icon sizes), so the
 * complete base `cre8` brand is layered underneath it, then vivid's brand
 * colors, then vivid's typography tier. The vivid brand ships Plus Jakarta
 * Sans font files while its typography tokens reference the historically
 * named --cre8-font-families-inter, so that seed is re-pointed at Plus
 * Jakarta Sans last.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const BRANDS = join(HERE, '..', '..', 'packages', 'cre8-wc', 'design-tokens', 'brands');

const FONT_FACES = [400, 500, 600, 700]
    .map((weight) => {
        const file = { 400: 'Regular', 500: 'Medium', 600: 'SemiBold', 700: 'Bold' }[weight];
        return `@font-face{font-family:'Plus Jakarta Sans';font-style:normal;font-weight:${weight};src:url('/vendor/fonts/PlusJakartaSans-${file}.woff2') format('woff2');font-display:swap;}`;
    })
    .join('\n');

// @import lines reference files relative to the brand directory, which does
// not exist under /vendor — every layer is concatenated here instead.
const read = (...segments) => readFileSync(join(BRANDS, ...segments), 'utf8')
    .replace(/^\s*@import[^;]*;\s*$/gm, '')
    .trim();

const base = read('cre8', 'css', 'tokens_brand.css');
const vividBrand = read('cre8-vivid', 'css', 'tokens_brand.css');
const vividTypography = read('cre8-vivid', 'css', 'tokens_cre8-vivid.css');

const FONT_OVERRIDE = `:root{
  /* cre8-vivid ships Plus Jakarta Sans; the token name is historical. */
  --cre8-font-families-inter: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}`;

writeFileSync(
    join(HERE, 'cre8-theme.css'),
    `${FONT_FACES}\n\n${base}\n\n${vividBrand}\n\n${vividTypography}\n\n${FONT_OVERRIDE}\n`,
    'utf8',
);
console.log('cre8-theme.css regenerated from cre8-vivid token sources');
