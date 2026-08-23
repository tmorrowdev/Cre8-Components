import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';
import * as sass from 'sass';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.join(__dirname, '..');

const themingDir = path.join(packageRoot, 'design-tokens/core/scss/theming');

// Resolves the absolute-style `/design-tokens/...` specifiers used by the SCSS sources.
const designTokenImporter = {
  findFileUrl(url: string) {
    if (url.startsWith('/design-tokens/')) {
      return new URL(`file://${path.join(packageRoot, url.substring(1))}`);
    }
    if (url.startsWith('design-tokens/')) {
      return new URL(`file://${path.join(packageRoot, url)}`);
    }
    return null;
  },
};

/**
 * Compile head.scss -> head.css + head.module.ts.
 *
 * These two are prepended into every component's styles (head.css here,
 * head.module.ts in the Storybook preview), so they have to be derived from
 * head.scss rather than hand-maintained - otherwise a fix in the SCSS never
 * reaches the components.
 */
function compileHead(): string {
  const css = sass.compile(path.join(themingDir, 'head.scss'), {
    style: 'compressed',
    loadPaths: [themingDir, packageRoot, path.join(packageRoot, 'node_modules')],
    importers: [designTokenImporter],
    silenceDeprecations: ['import' as any],
  }).css;

  fs.writeFileSync(path.join(themingDir, 'head.css'), css, 'utf8');

  const escaped = css
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${');
  fs.writeFileSync(
    path.join(themingDir, 'head.module.ts'),
    `import {css} from 'lit';\nexport const headModule = css\`\n${escaped}\n\`;\n\nexport default headModule;\n`,
    'utf8',
  );

  return css;
}

// Prepended into every component's compiled styles (matches Vite config behavior)
const headCss = compileHead();
console.log('Compiled: design-tokens/core/scss/theming/head.scss -> head.css, head.module.ts');

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
 */
function preprocessScss(source: string): string {
  const lines = source.split('\n');

  // Collect every namespace the @use -> @import rewrite is about to drop, so
  // the de-namespacing below stays in step with it. Hard-coding `component`
  // meant any other namespace survived into the compile, failed, and left the
  // previous .styles.ts in place as a stale artifact.
  const namespaces = new Set<string>(['component']);
  for (const line of lines) {
    const match = line.match(/^\s*@use\s+['"].+?['"]\s+as\s+(\w+)\s*;/)
      || line.match(/^\s*@import\s+['"].+?['"]\s+as\s+(\w+)\s*;/);
    if (match) {
      namespaces.add(match[1]);
    }
  }

  return lines.map((line) => {
    // Convert @use '...' as X → @import '...'
    line = line.replace(/^(\s*)@use\s+(['"])(.+?)\2\s+as\s+\w+\s*;/, '$1@import $2$3$2;');

    // Remove invalid `as X` from @import
    line = line.replace(/^(\s*@import\s+['"].+?['"])\s+as\s+\w+\s*;/, '$1;');

    for (const ns of namespaces) {
      // De-namespace ns.$var → $var
      line = line.replace(new RegExp(`\\b${ns}\\.\\$`, 'g'), '$');

      // De-namespace @include ns.mixin → @include mixin
      line = line.replace(new RegExp(`@include\\s+${ns}\\.`, 'g'), '@include ');
    }

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
        path.join(packageRoot, 'node_modules'),
      ],
      importers: [designTokenImporter],
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
