// remap-docs-tokens.cjs
// Batch-replace code-based token references in starbucks-docs with semantic names
// Usage: node remap-docs-tokens.cjs

const fs = require('fs');
const path = require('path');

// Load Figma variable collections
const collections = [
  'starbucks-docs/Equity-Semantic Tokens.json',
  'starbucks-docs/Equity-Global Tokens.json',
  'starbucks-docs/Equity-Component Tokens.json',
  'starbucks-docs/Typography.json',
].map(f => JSON.parse(fs.readFileSync(path.join(__dirname, f), 'utf8')));

// Build codeID-to-semantic-name map
const codeToSemantic = {};
for (const collection of collections) {
  if (Array.isArray(collection.variables)) {
    for (const v of collection.variables) {
      if (v.id && v.name) codeToSemantic[v.id.replace('VariableID:', '')] = v.name;
    }
  }
}

// Build regex for code-based token references (e.g., fill-hgcx9l, text-hlhc4fp)
const codeIdPattern = /\b(?:fill|text|border|effect|font|color|shadow|radius|spacing|opacity|size|weight|family|line)-(\w{6,})\b/g;

// Build a value+type to semantic name map for fallback matching (not used for docs, but could be added)
// ...

// Find all files in starbucks-docs with .md, .mdx, .markdown, .html, .json
function getAllFiles(dir, exts, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, exts, fileList);
    } else if (exts.includes(path.extname(file).toLowerCase())) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const docsDir = path.join(__dirname, 'starbucks-docs');
const fileExts = ['.md', '.mdx', '.markdown', '.html', '.json'];
const files = getAllFiles(docsDir, fileExts);

function replaceCodeRefsWithSemantic(content) {
  return content.replace(codeIdPattern, (match, idPart) => {
    // Try to find a semantic name for this code-based reference
    for (const [codeId, name] of Object.entries(codeToSemantic)) {
      if (codeId.endsWith(idPart)) return name;
    }
    return match; // fallback: leave unchanged
  });
}

for (const file of files) {
  const orig = fs.readFileSync(file, 'utf8');
  const updated = replaceCodeRefsWithSemantic(orig);
  if (orig !== updated) {
    fs.writeFileSync(file, updated, 'utf8');
    console.log(`Updated: ${file}`);
  }
}

console.log('All documentation files remapped to semantic token names.');
