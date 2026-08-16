/**
 * Regenerates cre8-theme.css from the canonical a2ui token sources.
 *
 * The website vendors its theme so the landing page loads zero external
 * resources. This script is the sync point: run it after any change to
 * the cre8-a2ui brand tokens.
 *
 *   node website/vendor/build-theme.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const BRAND = join(HERE, '..', '..', 'packages', 'cre8-wc', 'design-tokens', 'brands', 'cre8-a2ui', 'css');

const FONT_FACES = [400, 500, 600, 700]
    .map((weight) => {
        const file = { 400: 'Regular', 500: 'Medium', 600: 'SemiBold', 700: 'Bold' }[weight];
        return `@font-face{font-family:'Plus Jakarta Sans';font-style:normal;font-weight:${weight};src:url('/vendor/fonts/PlusJakartaSans-${file}.woff2') format('woff2');font-display:swap;}`;
    })
    .join('\n');

const brand = readFileSync(join(BRAND, 'tokens_brand.css'), 'utf8');
const typography = readFileSync(join(BRAND, 'tokens_cre8-a2ui.css'), 'utf8');

writeFileSync(
    join(HERE, 'cre8-theme.css'),
    `${FONT_FACES}\n\n${brand.trim()}\n\n${typography.trim()}\n`,
    'utf8',
);
console.log('cre8-theme.css regenerated from cre8-a2ui token sources');
