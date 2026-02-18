const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..');

// Reference theme
const cre8Content = fs.readFileSync(path.join(baseDir, 'design-tokens/brands/cre8/css/tokens_cre8.module.ts'), 'utf8');

// Extract all token definitions from the reference
const tokenRegex = /(--cre8-[a-zA-Z0-9-]+):\s*([^;]+);/g;
const refTokens = new Map();
let match;
while ((match = tokenRegex.exec(cre8Content)) !== null) {
  refTokens.set(match[1], match[2].trim());
}
console.log(`Reference (cre8): ${refTokens.size} tokens`);

// Theme files to complete
const themes = [
  { name: 'cre8-a2ui', file: 'design-tokens/brands/cre8-a2ui/css/tokens_cre8-a2ui.module.ts' },
  { name: 'blue', file: 'design-tokens/brands/blue/css/tokens_blue.module.ts' },
  { name: 'cre8-legacy', file: 'design-tokens/brands/cre8-legacy/css/tokens_cre8-legacy.module.ts' },
  { name: 'femmecubator', file: 'design-tokens/brands/femmecubator/css/tokens_femmecubator2.module.ts' },
  { name: 'legacy', file: 'design-tokens/brands/legacy/css/tokens_legacy.module.ts' },
  { name: 'marketing', file: 'design-tokens/brands/marketing/css/tokens_marketing.module.ts' },
  { name: 'minimalist', file: 'design-tokens/brands/minimalist/css/tokens_minimalist.module.ts' },
  { name: 'prisma', file: 'design-tokens/brands/prisma/tokens_prisma.module.ts' },
  { name: 'starbucks', file: 'design-tokens/brands/starbucks/tokens_starbucks.module.ts' },
  { name: 'bolt', file: 'design-tokens/brands/bolt/tokens_bolt.theme.ts' },
  { name: 'netflix', file: 'design-tokens/tokens_netflix.theme.ts' },
];

for (const theme of themes) {
  const filePath = path.join(baseDir, theme.file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Extract existing tokens
  const existingTokens = new Map();
  const existingRegex = /(--cre8-[a-zA-Z0-9-]+):\s*([^;]+);/g;
  let m;
  while ((m = existingRegex.exec(content)) !== null) {
    existingTokens.set(m[1], m[2].trim());
  }

  const missing = [];
  for (const [token, value] of refTokens) {
    if (!existingTokens.has(token)) {
      missing.push(`  ${token}: ${value};`);
    }
  }

  if (missing.length === 0) {
    console.log(`${theme.name}: already complete (${existingTokens.size} tokens)`);
    continue;
  }

  // Insert missing tokens before the closing }
  const closingBrace = content.lastIndexOf('}');
  if (closingBrace === -1) {
    console.log(`${theme.name}: ERROR - no closing brace found`);
    continue;
  }

  // Find the last token line before the closing brace
  const beforeBrace = content.substring(0, closingBrace);
  const lastSemicolon = beforeBrace.lastIndexOf(';');

  if (lastSemicolon === -1) {
    // No existing tokens, insert after :root {
    const rootOpen = content.indexOf('{');
    const insertPoint = content.indexOf('\n', rootOpen) + 1;
    content = content.substring(0, insertPoint) + missing.join('\n') + '\n' + content.substring(insertPoint);
  } else {
    // Insert after last existing token
    const insertPoint = lastSemicolon + 1;
    content = content.substring(0, insertPoint) + '\n' + missing.join('\n') + content.substring(insertPoint);
  }

  fs.writeFileSync(filePath, content, 'utf8');

  // Verify
  const newContent = fs.readFileSync(filePath, 'utf8');
  const newCount = (newContent.match(/--cre8-/g) || []).length;
  console.log(`${theme.name}: ${existingTokens.size} → ${newCount} tokens (+${missing.length} added)`);
}

console.log('\nDone!');
