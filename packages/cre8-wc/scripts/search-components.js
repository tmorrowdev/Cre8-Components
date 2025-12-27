#!/usr/bin/env node
/**
 * Fast component search utility
 *
 * Usage:
 *   node scripts/search-components.js <query>           # Search by keyword
 *   node scripts/search-components.js --tag <name>     # Get full component info by tag name
 *   node scripts/search-components.js --category <cat> # List components in category
 *   node scripts/search-components.js --list           # List all components
 *   node scripts/search-components.js --props <tag>    # Show component properties
 *   node scripts/search-components.js --example <tag>  # Show usage example
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOCS_FILE = path.join(__dirname, '../components.json');

// Load documentation
let docs;
try {
  docs = JSON.parse(fs.readFileSync(DOCS_FILE, 'utf-8'));
} catch (e) {
  console.error('Error: components.json not found. Run: node scripts/generate-component-docs.js');
  process.exit(1);
}

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(`
CRE8 Component Search (${docs.totalComponents} components)

Usage:
  node scripts/search-components.js <keyword>          Search by keyword
  node scripts/search-components.js --tag <name>       Full component details
  node scripts/search-components.js --category <cat>   List by category
  node scripts/search-components.js --list             List all components
  node scripts/search-components.js --props <tag>      Show properties
  node scripts/search-components.js --example <tag>    Show usage example

Categories: ${Object.keys(docs.index.byCategory).join(', ')}
`);
  process.exit(0);
}

// Helper: get component by tag
function getComponent(tagName) {
  const normalizedTag = tagName.startsWith('cre8-') ? tagName : `cre8-${tagName}`;
  const idx = docs.index.byTag[normalizedTag];
  return idx !== undefined ? docs.components[idx] : null;
}

// Helper: format component for output
function formatComponent(c, verbose = false) {
  let output = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📦 ${c.tagName}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${c.description}
`;

  if (verbose) {
    output += `
📍 Source: ${c.sourcePath}
🔧 Base: ${c.baseClass || 'Cre8Element'}

📋 Properties:
${c.properties.map(p => `  • ${p.name}${p.required ? '*' : ''}: ${p.type}${p.default ? ` = ${p.default}` : ''}
    ${p.description.split('\n')[0]}`).join('\n')}

🔌 Slots:
${c.slots.length ? c.slots.map(s => `  • ${s.name}: ${s.description}`).join('\n') : '  (none)'}

⚡ Events:
${c.events.length ? c.events.map(e => `  • ${e.name}`).join('\n') : '  (none)'}

💡 Example:
\`\`\`html
${c.example}
\`\`\`
`;

    if (c.dependencies.length) {
      output += `\n🔗 Dependencies: ${c.dependencies.join(', ')}\n`;
    }
  }

  return output;
}

// Commands
const command = args[0];

if (command === '--list') {
  console.log(`\n📚 All ${docs.totalComponents} Components:\n`);
  for (const c of docs.components) {
    console.log(`  ${c.tagName.padEnd(30)} ${c.description.split('\n')[0].substring(0, 50)}...`);
  }
}
else if (command === '--category') {
  const cat = args[1];
  if (!cat || !docs.index.byCategory[cat]) {
    console.log(`\nAvailable categories: ${Object.keys(docs.index.byCategory).join(', ')}\n`);
  } else {
    console.log(`\n📁 ${cat.toUpperCase()} Components:\n`);
    for (const tag of docs.index.byCategory[cat]) {
      const c = getComponent(tag);
      if (c) {
        console.log(`  ${tag.padEnd(30)} ${c.description.split('\n')[0].substring(0, 50)}...`);
      }
    }
  }
}
else if (command === '--tag') {
  const tag = args[1];
  const c = getComponent(tag);
  if (c) {
    console.log(formatComponent(c, true));
  } else {
    console.log(`Component not found: ${tag}`);
    // Suggest similar
    const similar = docs.components.filter(comp =>
      comp.tagName.includes(tag) || tag.split('-').some(w => comp.tagName.includes(w))
    ).slice(0, 5);
    if (similar.length) {
      console.log(`\nDid you mean: ${similar.map(s => s.tagName).join(', ')}?`);
    }
  }
}
else if (command === '--props') {
  const tag = args[1];
  const c = getComponent(tag);
  if (c) {
    console.log(`\n📋 Properties for ${c.tagName}:\n`);
    for (const p of c.properties) {
      console.log(`  ${p.name}${p.required ? '*' : ''}: ${p.type}${p.default ? ` = ${p.default}` : ''}`);
      console.log(`    ${p.description.replace(/\n/g, '\n    ')}\n`);
    }
  } else {
    console.log(`Component not found: ${tag}`);
  }
}
else if (command === '--example') {
  const tag = args[1];
  const c = getComponent(tag);
  if (c) {
    console.log(`\n💡 Example for ${c.tagName}:\n`);
    console.log('```html');
    console.log(c.example);
    console.log('```');
    console.log(`\n${c.howToUse || ''}`);
  } else {
    console.log(`Component not found: ${tag}`);
  }
}
else {
  // Keyword search
  const query = args.join(' ').toLowerCase();
  const keywords = query.split(/\s+/);

  // Search in keyword index
  const matches = new Set();
  for (const kw of keywords) {
    for (const [indexKw, tags] of Object.entries(docs.index.keywords)) {
      if (indexKw.includes(kw) || kw.includes(indexKw)) {
        tags.forEach(t => matches.add(t));
      }
    }
  }

  // Also search in component descriptions
  for (const c of docs.components) {
    if (c.tagName.includes(query) ||
        c.description.toLowerCase().includes(query) ||
        c.properties.some(p => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query))) {
      matches.add(c.tagName);
    }
  }

  if (matches.size === 0) {
    console.log(`No components found for: "${query}"`);
  } else {
    console.log(`\n🔍 Found ${matches.size} components matching "${query}":\n`);
    for (const tag of [...matches].slice(0, 10)) {
      const c = getComponent(tag);
      if (c) {
        console.log(`  ${c.tagName}`);
        console.log(`    ${c.description.split('\n')[0].substring(0, 70)}...\n`);
      }
    }
    if (matches.size > 10) {
      console.log(`  ... and ${matches.size - 10} more. Use --tag <name> for details.`);
    }
  }
}
