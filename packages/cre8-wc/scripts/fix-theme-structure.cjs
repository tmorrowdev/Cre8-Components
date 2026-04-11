const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..');

const themes = [
  { name: 'blue', varName: 'blue', file: 'design-tokens/brands/blue/css/tokens_blue.module.ts' },
  { name: 'legacy', varName: 'legacy', file: 'design-tokens/brands/legacy/css/tokens_legacy.module.ts' },
  { name: 'minimalist', varName: 'minimalist', file: 'design-tokens/brands/minimalist/css/tokens_minimalist.module.ts' },
];

for (const theme of themes) {
  const filePath = path.join(baseDir, theme.file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Extract all token lines (--cre8-*)
  const tokenLines = [];
  const tokenRegex = /^\s*(--cre8-[a-zA-Z0-9-]+:\s*[^;]+;)/gm;
  let match;
  while ((match = tokenRegex.exec(content)) !== null) {
    tokenLines.push('  ' + match[1].trim());
  }

  // Build proper file structure
  const output = `import {css} from 'lit';

const ${theme.varName} = css\`
:root {
${tokenLines.join('\n')}
}
\`;

export default ${theme.varName};
`;

  fs.writeFileSync(filePath, output, 'utf8');
  console.log(`✓ Fixed ${theme.name}: ${tokenLines.length} tokens in proper css\` template`);
}

console.log('Done!');
