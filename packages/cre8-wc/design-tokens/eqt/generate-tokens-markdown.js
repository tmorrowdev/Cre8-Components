#!/usr/bin/env node
// Script: generate-tokens-markdown.js
// Description: Generate Markdown tables for all token categories in eqt.tokens.json using semantic names.

const fs = require('fs');
const path = require('path');

const TOKENS_PATH = path.resolve(__dirname, 'eqt.tokens.json');
const OUTPUT_DIR = path.resolve(__dirname, 'docs-md');

function toMarkdownTable(category, tokens) {
  let rows = Object.entries(tokens).map(([name, obj]) => {
    const value = obj.value || '';
    const type = obj.type || '';
    return `| ${name} | ${value} | \`${value}\` | ${type} |`;
  });
  return [
    `## ${category.charAt(0).toUpperCase() + category.slice(1)}`,
    '',
    '| Token Name | Value | Preview | Type |',
    '|------------|-------|---------|------|',
    ...rows,
    ''
  ].join('\n');
}

function main() {
  if (!fs.existsSync(TOKENS_PATH)) {
    console.error('eqt.tokens.json not found!');
    process.exit(1);
  }
  const json = JSON.parse(fs.readFileSync(TOKENS_PATH, 'utf8'));
  const tokens = json.designTokens || json;
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR);

  Object.entries(tokens).forEach(([category, values]) => {
    const md = toMarkdownTable(category, values);
    const outPath = path.join(OUTPUT_DIR, `${category}.md`);
    fs.writeFileSync(outPath, md, 'utf8');
    console.log(`Generated: ${outPath}`);
  });
  console.log('All token markdown files generated in', OUTPUT_DIR);
}

main();
