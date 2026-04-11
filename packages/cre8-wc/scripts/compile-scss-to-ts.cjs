const fs = require('fs');
const path = require('path');
const sass = require('sass');

const baseDir = path.join(__dirname, '../components');
const projectRoot = path.join(__dirname, '..');

function walk(dir, callback) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(dirent => {
    const fullPath = path.join(dir, dirent.name);
    if (dirent.isDirectory()) {
      walk(fullPath, callback);
    } else if (dirent.isFile() && dirent.name.endsWith('.module.scss')) {
      callback(fullPath);
    }
  });
}

// Custom importer to resolve leading-/ paths relative to project root
const rootImporter = {
  findFileUrl(url) {
    if (url.startsWith('/')) {
      const resolved = path.join(projectRoot, url);
      for (const candidate of [
        resolved,
        resolved + '.scss',
        path.join(path.dirname(resolved), '_' + path.basename(resolved) + '.scss'),
      ]) {
        if (fs.existsSync(candidate)) {
          return new URL('file://' + candidate);
        }
      }
    }
    // Handle @cre8_dev/cre8-design-tokens paths -> @tmorrow/cre8-design-tokens
    if (url.startsWith('@cre8_dev/cre8-design-tokens')) {
      const remapped = url.replace('@cre8_dev/cre8-design-tokens', '@tmorrow/cre8-design-tokens');
      const resolved = path.join(projectRoot, 'node_modules', remapped);
      for (const candidate of [resolved, resolved + '.scss']) {
        if (fs.existsSync(candidate)) {
          return new URL('file://' + candidate);
        }
      }
    }
    return null;
  }
};

function preprocessScss(content, filePath) {
  let processed = content;

  // Convert "@import '...' as X;" -> "@import '...';" (strip namespace)
  processed = processed.replace(/@import\s+(['"][^'"]+['"])\s+as\s+\w+\s*;/g, '@import $1;');

  // Convert "@use '...' as X;" -> "@import '...';" (convert to @import for global scope)
  processed = processed.replace(/@use\s+(['"][^'"]+['"])\s+as\s+\w+\s*;/g, '@import $1;');

  // Strip any remaining bare @use -> @import (without namespace)
  processed = processed.replace(/@use\s+(['"][^'"]+['"])\s*;/g, '@import $1;');

  // De-namespace all X.$var, X.fn(), @include X.mixin() patterns
  // Handles component., technology., or any other namespace
  processed = processed.replace(/(\w+)\.\$/g, '$');
  processed = processed.replace(/(\w+)\.size\(/g, 'size(');
  processed = processed.replace(/@include\s+(\w+)\./g, '@include ');

  // Remove duplicate @import lines
  const lines = processed.split('\n');
  const seen = new Set();
  const deduped = lines.filter(line => {
    const trimmed = line.trim();
    if (trimmed.startsWith('@import')) {
      if (seen.has(trimmed)) return false;
      seen.add(trimmed);
    }
    return true;
  });
  processed = deduped.join('\n');

  // Remove imports for files that don't exist (e.g. utilities/visibility)
  processed = processed.replace(/@import\s+["']design-tokens\/core\/scss\/utilities\/visibility["']\s*;/g, '');

  return processed;
}

let success = 0;
let failed = 0;
const errors = [];

walk(baseDir, (scssPath) => {
  const tsPath = scssPath.replace(/\.module\.scss$/, '.styles.ts');
  let scssContent = fs.readFileSync(scssPath, 'utf8');

  // Preprocess to remove component namespace usage
  scssContent = preprocessScss(scssContent, scssPath);

  // Prepend head.scss import if file doesn't already import component.scss or head.scss
  const hasOwnImport = /@import|@use/.test(scssContent.split('\n')[0]);
  const fullScss = hasOwnImport
    ? scssContent
    : `@import "${projectRoot}/design-tokens/core/scss/theming/head.scss";\n${scssContent}`;

  try {
    const result = sass.compileString(fullScss, {
      url: new URL('file://' + scssPath),
      loadPaths: [
        path.dirname(scssPath),
        projectRoot,
        path.join(projectRoot, 'node_modules/@tmorrow/cre8-design-tokens'),
        path.join(projectRoot, 'node_modules'),
      ],
      importers: [rootImporter],
      style: 'compressed',
      silenceDeprecations: ['import'],
    });

    // Escape backticks and backslashes in the compiled CSS
    const escapedCss = result.css
      .replace(/\\/g, '\\\\')
      .replace(/`/g, '\\`');

    const tsContent = `import { css } from 'lit';\nconst styles = css\`${escapedCss}\`;\nexport default styles;\n`;
    fs.writeFileSync(tsPath, tsContent, 'utf8');
    success++;
    console.log(`✓ ${path.relative(projectRoot, scssPath)}`);
  } catch (err) {
    failed++;
    const shortName = path.relative(projectRoot, scssPath);
    const firstLine = err.message.split('\n')[0];
    console.error(`✗ ${shortName}: ${firstLine}`);
    errors.push({ file: shortName, error: firstLine });
  }
});

console.log(`\nDone: ${success} compiled, ${failed} failed`);
if (errors.length > 0) {
  console.log('\nFailed files:');
  errors.forEach(e => console.log(`  ${e.file}: ${e.error}`));
}
