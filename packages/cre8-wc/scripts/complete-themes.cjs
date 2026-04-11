/**
 * This script reads the reference cre8 theme, then for each incomplete theme:
 * 1. Parses existing tokens from the theme file
 * 2. Identifies missing tokens
 * 3. Generates a complete theme file with existing brand tokens + missing tokens filled from cre8 defaults
 */
const fs = require("fs");
const path = require("path");

const BASE_DIR = path.resolve(__dirname, "..");

function extractDefinedTokens(content) {
  const tokens = new Map();
  const regex = /^\s*(--cre8-[\w-]+):\s*(.+?);/gm;
  let match;
  while ((match = regex.exec(content)) !== null) {
    tokens.set(match[1], match[2].trim());
  }
  return tokens;
}

function extractFontFaces(content) {
  const fontFaces = [];
  const regex = /@font-face\s*\{[^}]+\}/gs;
  let match;
  while ((match = regex.exec(content)) !== null) {
    fontFaces.push(match[0]);
  }
  return fontFaces;
}

// Read reference theme
const cre8Path = path.join(BASE_DIR, "design-tokens/brands/cre8/css/tokens_cre8.module.ts");
const cre8Content = fs.readFileSync(cre8Path, "utf8");
const cre8Tokens = extractDefinedTokens(cre8Content);

// Ordered list of token names from cre8 (preserving order)
const cre8TokenOrder = [];
const orderRegex = /^\s*(--cre8-[\w-]+):\s*(.+?);/gm;
let om;
while ((om = orderRegex.exec(cre8Content)) !== null) {
  if (!cre8TokenOrder.includes(om[1])) {
    cre8TokenOrder.push(om[1]);
  }
}

console.log("Reference cre8 tokens:", cre8TokenOrder.length);

// Theme configs
const themes = [
  {
    name: "bolt",
    path: "design-tokens/brands/bolt/tokens_bolt.theme.ts",
    varName: "bolt",
    exportStyle: "default",
    useLitCss: true,
    fontFamily: "'Open Sans', Helvetica, Arial, sans-serif",
  },
  {
    name: "netflix",
    path: "design-tokens/tokens_netflix.theme.ts",
    varName: "netflix",
    exportStyle: "default",
    useLitCss: true,
    fontFamily: "'Netflix Sans', Helvetica Neue, Segoe UI, Roboto, Ubuntu, sans-serif",
  },
  {
    name: "starbucks",
    path: "design-tokens/brands/starbucks/tokens_starbucks.module.ts",
    varName: "starbucks",
    exportStyle: "default",
    useLitCss: true,
    fontFamily: "'Inter', Open-Sans, sans-serif",
  },
  {
    name: "femmecubator",
    path: "design-tokens/brands/femmecubator/css/tokens_femmecubator2.module.ts",
    varName: "femmecubator",
    exportStyle: "default",
    useLitCss: true,
    fontFamily: "'Inter', sans-serif",
  },
  {
    name: "marketing",
    path: "design-tokens/brands/marketing/css/tokens_marketing.module.ts",
    varName: "tokens_marketing",
    exportStyle: "default",
    useLitCss: true,
    fontFamily: "'Montserrat', 'Inter', sans-serif",
  },
  {
    name: "minimalist",
    path: "design-tokens/brands/minimalist/css/tokens_minimalist.module.ts",
    varName: "minimalist",
    exportStyle: "default",
    useLitCss: true,
    fontFamily: "'Inter', sans-serif",
  },
  {
    name: "legacy",
    path: "design-tokens/brands/legacy/css/tokens_legacy.module.ts",
    varName: "legacy",
    exportStyle: "default",
    useLitCss: true,
    fontFamily: "'Inter', sans-serif",
  },
  {
    name: "blue",
    path: "design-tokens/brands/blue/css/tokens_blue.module.ts",
    varName: "blue",
    exportStyle: "default",
    useLitCss: true,
    fontFamily: "'Inter', sans-serif",
  },
  {
    name: "cre8-legacy",
    path: "design-tokens/brands/cre8-legacy/css/tokens_cre8-legacy.module.ts",
    varName: "cre8Legacy",
    exportStyle: "named",
    useLitCss: true,
    fontFamily: "'Montserrat', 'Inter', sans-serif",
  },
];

for (const theme of themes) {
  const fullPath = path.join(BASE_DIR, theme.path);
  const content = fs.readFileSync(fullPath, "utf8");
  const existingTokens = extractDefinedTokens(content);
  const fontFaces = extractFontFaces(content);

  // Count missing
  let missingCount = 0;
  for (const token of cre8TokenOrder) {
    if (!existingTokens.has(token)) {
      missingCount++;
    }
  }

  if (missingCount === 0) {
    console.log(`\n${theme.name}: Complete! No missing tokens.`);
    continue;
  }

  console.log(`\n${theme.name}: ${missingCount} missing tokens. Generating complete file...`);

  // Build the complete :root block
  let rootBlock = ":root {\n";

  for (const token of cre8TokenOrder) {
    const existingVal = existingTokens.get(token);
    const defaultVal = cre8Tokens.get(token);

    if (existingVal) {
      rootBlock += `  ${token}: ${existingVal};\n`;
    } else {
      // Use cre8 default, but replace font-family references for typography tokens
      let value = defaultVal;
      if (token.includes("font-families")) {
        value = theme.fontFamily;
      } else if (token.includes("typography-") && token.endsWith("-font-family")) {
        value = theme.fontFamily;
      }
      rootBlock += `  ${token}: ${value};\n`;
    }
  }

  rootBlock += "}";

  // Build the font-face section
  let fontFaceBlock = "";
  if (fontFaces.length > 0) {
    fontFaceBlock = fontFaces.join("\n\n") + "\n";
  }

  // Build the complete file
  let fileContent;
  if (theme.useLitCss) {
    if (theme.exportStyle === "named") {
      fileContent = `import {css} from 'lit';\n\nconst ${theme.varName} = css\`\n${fontFaceBlock}${rootBlock}\n\`;\n\nexport { ${theme.varName} };\nexport default ${theme.varName};\n`;
    } else {
      fileContent = `import {css} from 'lit';\n\nconst ${theme.varName} = css\`\n${fontFaceBlock}${rootBlock}\n\`;\n\nexport default ${theme.varName};\n`;
    }
  }

  // Write the file
  fs.writeFileSync(fullPath, fileContent, "utf8");
  console.log(`  Written to: ${theme.path}`);
}

// Handle the special case of cre8 template literal format (not css tagged)
// Also check if the cre8 module.ts export format matches for marketing/cre8-legacy
console.log("\n--- Summary ---");
for (const theme of themes) {
  const fullPath = path.join(BASE_DIR, theme.path);
  const content = fs.readFileSync(fullPath, "utf8");
  const tokens = extractDefinedTokens(content);
  const missing = cre8TokenOrder.filter(t => !tokens.has(t));
  console.log(`${theme.name}: ${tokens.size} tokens defined, ${missing.length} missing`);
}
