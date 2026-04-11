import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';
import * as sass from 'sass';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.join(__dirname, '..');

// Read the pre-compiled head.css to prepend as additionalData (matches Vite config behavior)
const headCssPath = path.join(packageRoot, 'design-tokens/core/scss/theming/head.css');
const headCss = fs.readFileSync(headCssPath, 'utf8');

// Find all component SCSS modules
const scssFiles = glob.sync('components/**/*.module.scss', { cwd: packageRoot });

let successCount = 0;
let errorCount = 0;
let fatalErrors = 0;

/**
 * Pre-process SCSS source to fix syntax issues before compilation:
 * 1. Convert @use to @import (avoid @use ordering issues with head.css prepend)
 * 2. De-namespace `component.$var` → `$var` and `@include component.mixin()` → `@include mixin()`
 * 3. Remove `@import ... as X` (invalid @import syntax, convert to plain @import)
 * 4. Remap old package name @cre8_dev → @tmorrow
 */
function preprocessScss(source: string): string {
  const lines = source.split('\n');

  return lines.map((line) => {
    // Remap old package name
    line = line.replace(/@cre8_dev\/cre8-design-tokens/g, '@tmorrow/cre8-design-tokens');

    // Convert @use '...' as X → @import '...'
    line = line.replace(/^(\s*)@use\s+(['"])(.+?)\2\s+as\s+\w+\s*;/, '$1@import $2$3$2;');

    // Remove invalid `as X` from @import
    line = line.replace(/^(\s*@import\s+['"].+?['"])\s+as\s+\w+\s*;/, '$1;');

    // De-namespace component.$var → $var
    line = line.replace(/component\.\$/g, '$');

    // De-namespace @include component.mixin → @include mixin
    line = line.replace(/@include\s+component\./g, '@include ');

    return line;
  }).join('\n');
}

for (const relPath of scssFiles) {
  const scssPath = path.join(packageRoot, relPath);
  const tsPath = scssPath.replace(/\.module\.scss$/, '.styles.ts');
  const fileDir = path.dirname(scssPath);

  try {
    let scssContent = fs.readFileSync(scssPath, 'utf8');

    // Pre-process to fix @use/@import and namespace issues
    scssContent = preprocessScss(scssContent);

    // Prepend head.css content (already compiled CSS, passes through SCSS compiler)
    const fullSource = headCss + '\n' + scssContent;

    const result = sass.compileString(fullSource, {
      style: 'expanded',
      url: new URL(`file://${scssPath}`),
      loadPaths: [
        fileDir,
        packageRoot,
        path.join(packageRoot, 'node_modules/@tmorrow/cre8-design-tokens'),
        path.join(packageRoot, 'node_modules'),
      ],
      importers: [
        {
          findFileUrl(url: string) {
            // Handle absolute-style paths like /design-tokens/...
            if (url.startsWith('/design-tokens/')) {
              const cleaned = url.substring(1);
              const resolved = path.join(packageRoot, cleaned);
              return new URL(`file://${resolved}`);
            }
            // Handle bare design-tokens/ paths
            if (url.startsWith('design-tokens/')) {
              const resolved = path.join(packageRoot, url);
              return new URL(`file://${resolved}`);
            }
            return null;
          },
        },
      ],
      silenceDeprecations: ['import' as any],
    });

    // Escape backticks and template literal expressions in the compiled CSS
    const escapedCss = result.css
      .replace(/\\/g, '\\\\')
      .replace(/`/g, '\\`')
      .replace(/\$\{/g, '\\${');

    const tsContent = `import { css } from 'lit';\nconst styles = css\`${escapedCss}\`;\nexport default styles;\n`;

    fs.writeFileSync(tsPath, tsContent, 'utf8');
    console.log(`Compiled: ${relPath} -> ${path.basename(tsPath)}`);
    successCount++;
  } catch (err: any) {
    // Check if an existing .styles.ts exists (from prior compilation)
    const hasExisting = fs.existsSync(tsPath);
    const label = hasExisting ? 'WARN' : 'ERROR';
    console.error(`${label} compiling ${relPath}: ${err.message}${hasExisting ? ' (keeping existing .styles.ts)' : ''}`);
    errorCount++;
    if (!hasExisting) {
      fatalErrors++;
    }
  }
}

console.log(`\nDone: ${successCount} compiled, ${errorCount} warnings/errors`);

if (fatalErrors > 0) {
  console.error(`${fatalErrors} file(s) failed with no existing .styles.ts fallback`);
  process.exit(1);
}
