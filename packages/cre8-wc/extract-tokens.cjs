#!/usr/bin/env node

const puppeteer = require('puppeteer');
const css = require('css');
const fs = require('fs');
const path = require('path');
const process = require('process');
const { OpenAI } = require('openai');
// We'll dynamically import OpenAI in the function to handle ESM-only package

// Launch headless browser, navigate to URL, and collect all CSS text (external + inline)
async function extractCssFromUrl(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle0' });
  const cssText = await page.evaluate(async () => {
    const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(l => l.href);
    const styles = Array.from(document.querySelectorAll('style')).map(s => s.innerHTML || '');
    const fetched = await Promise.all(
      links.map(u => fetch(u).then(r => r.text()).catch(() => ''))
    );
    return [...styles, ...fetched].join('\n');
  });
  await browser.close();
  return cssText;
}

// Parse CSS text and collect unique values by property category
function parseCss(cssText) {
  const ast = css.parse(cssText);
  const categories = {
    colors: new Set(),
    backgrounds: new Set(),
    fontSizes: new Set(),
    lineHeights: new Set(),
    spacings: new Set(),
    borderRadiuses: new Set(),
    shadows: new Set(),
  };

  if (ast.stylesheet && ast.stylesheet.rules) {
    for (const rule of ast.stylesheet.rules) {
      if (rule.type !== 'rule' || !rule.declarations) continue;
      for (const decl of rule.declarations) {
        if (decl.type !== 'declaration' || !decl.property || !decl.value) continue;
        const prop = decl.property;
        const val = decl.value;
        if (/^font-size$/.test(prop)) categories.fontSizes.add(val);
        else if (/^line-height$/.test(prop)) categories.lineHeights.add(val);
        else if (/margin|padding/.test(prop)) categories.spacings.add(val);
        else if (/border-radius/.test(prop)) categories.borderRadiuses.add(val);
        else if (/box-shadow/.test(prop)) categories.shadows.add(val);
        else if (/^background(-color)?/.test(prop)) categories.backgrounds.add(val);
        else if (/color/.test(prop)) categories.colors.add(val);
      }
    }
  }

  // Convert Sets to Arrays
  return Object.fromEntries(
    Object.entries(categories).map(([k, set]) => [k, Array.from(set)])
  );
}

// Use OpenAI to map grouped values into CSS custom properties
async function generateTokensWithAI(groups) {
  const systemMessage = `You are a **Brand Theming Assistant AI**. Your role is to generate a theme configuration for a web component library based on the design tokens provided in \`@cre8_dev/cre8-design-tokens\`. You will be given groups of raw CSS values (colors, font sizes, spacings, etc.) and you must output a CSS file containing a :root block with CSS custom properties using these tokens and ONLY these tokens.`;

  const userPrompt = `Extracted values:\n` +
    `Colors: ${groups.colors.join(', ')}\n` +
    `Backgrounds: ${groups.backgrounds.join(', ')}\n` +
    `Font sizes: ${groups.fontSizes.join(', ')}\n` +
    `Line heights: ${groups.lineHeights.join(', ')}\n` +
    `Spacings: ${groups.spacings.join(', ')}\n` +
    `Border radiuses: ${groups.borderRadiuses.join(', ')}\n` +
    `Shadows: ${groups.shadows.join(', ')}\n\n` +
    `Please map each category to the appropriate CSS custom properties as defined in \`@cre8_dev/cre8-design-tokens\` and return a complete CSS snippet.`;

  if (!process.env.OPENAI_API_KEY) {
    console.error('Error: OPENAI_API_KEY environment variable is not set.');
    process.exit(1);
  }
  const client = new OpenAI({apiKey: process.env.OPENAI_API_KEY});
  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: systemMessage },
      { role: 'user', content: userPrompt }
    ]
  });
  return response.choices[0].message.content;
};

// Main execution
(async () => {
  const url = process.argv[2];
  if (!url) {
    console.error('Usage: node extract-tokens.js <url>');
    process.exit(1);
  }

  console.log(`Extracting CSS from: ${url}`);
  const cssText = await extractCssFromUrl(url);

  console.log('Parsing and categorizing CSS values...');
  const groups = parseCss(cssText);

  console.log('Generating token file via AI...');
  const tokensCss = await generateTokensWithAI(groups);

  const outputPath = path.resolve(process.cwd(), 'tokens.css');
  fs.writeFileSync(outputPath, tokensCss, 'utf-8');
  console.log(`Tokens file written to ${outputPath}`);
})(); 