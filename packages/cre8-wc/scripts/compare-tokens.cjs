const fs = require("fs");

function extractDefinedTokens(content) {
  const tokens = new Map();
  const regex = /^\s*(--cre8-[\w-]+):\s*(.+?);/gm;
  let match;
  while ((match = regex.exec(content)) !== null) {
    tokens.set(match[1], match[2].trim());
  }
  return tokens;
}

const cre8Content = fs.readFileSync("design-tokens/brands/cre8/css/tokens_cre8.module.ts", "utf8");
const cre8Tokens = extractDefinedTokens(cre8Content);
console.log("Reference theme (cre8) token count:", cre8Tokens.size);

const themes = [
  { name: "bolt", path: "design-tokens/brands/bolt/tokens_bolt.theme.ts" },
  { name: "prisma", path: "design-tokens/brands/prisma/tokens_prisma.module.ts" },
  { name: "starbucks", path: "design-tokens/brands/starbucks/tokens_starbucks.module.ts" },
  { name: "femmecubator", path: "design-tokens/brands/femmecubator/css/tokens_femmecubator2.module.ts" },
  { name: "marketing", path: "design-tokens/brands/marketing/css/tokens_marketing.module.ts" },
  { name: "minimalist", path: "design-tokens/brands/minimalist/css/tokens_minimalist.module.ts" },
  { name: "legacy", path: "design-tokens/brands/legacy/css/tokens_legacy.module.ts" },
  { name: "blue", path: "design-tokens/brands/blue/css/tokens_blue.module.ts" },
  { name: "cre8-legacy", path: "design-tokens/brands/cre8-legacy/css/tokens_cre8-legacy.module.ts" },
];

const results = {};

for (const theme of themes) {
  try {
    const content = fs.readFileSync(theme.path, "utf8");
    const themeTokens = extractDefinedTokens(content);
    const missing = [];
    const missingWithValues = [];
    for (const [token, value] of cre8Tokens) {
      if (!themeTokens.has(token)) {
        missing.push(token);
        missingWithValues.push({ token, defaultValue: value });
      }
    }
    console.log("\n--- " + theme.name + " ---");
    console.log("Defined: " + themeTokens.size + " | Missing: " + missing.length);

    if (missing.length > 0) {
      const categories = {};
      for (const t of missing) {
        const parts = t.replace("--cre8-", "").split("-");
        const cat = parts.slice(0, 2).join("-");
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(t);
      }
      for (const [cat, tokens] of Object.entries(categories)) {
        console.log("  " + cat + ": " + tokens.length + " missing");
      }
    }

    results[theme.name] = { missing: missingWithValues, path: theme.path, definedCount: themeTokens.size };
  } catch (e) {
    console.log("\n--- " + theme.name + " --- ERROR: " + e.message);
  }
}

// Write detailed results
fs.writeFileSync("/tmp/token-comparison.json", JSON.stringify(results, null, 2));
console.log("\nDetailed results written to /tmp/token-comparison.json");
