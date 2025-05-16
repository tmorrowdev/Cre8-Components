#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import postcss from 'postcss';

// A map of CSS custom properties to their values
type Vars = Record<string, string>;

// Helper to parse CSS variables into an object
function parseVars(css: string): Vars {
  const root = postcss.parse(css);
  const vars: Vars = {};
  root.walkDecls(function(decl: { prop: string; value: string; }) {
    const prop = decl.prop.trim();
    const val = decl.value.trim();
    if (prop.startsWith('--')) {
      vars[prop] = val;
    }
  });
  return vars;
}

// Generate theme CSS by merging templateVars and overrideVars
function generateTheme(templateVars: Vars, overrideVars: Vars, themeName: string): string {
  const themeVars: Vars = {};
  Object.keys(templateVars).forEach((prop) => {
    // Map override key by stripping the "--cre8-" prefix
    const overrideKey = prop.replace(/^--cre8-/, '--');
    themeVars[prop] = overrideVars[overrideKey] ?? templateVars[prop];
  });

  let out = `/**\n * Generated ${themeName} Theme\n */\n\n:root {\n`;
  Object.entries(themeVars).forEach(([prop, val]) => {
    out += `  ${prop}: ${val};\n`;
  });
  out += `}\n`;
  return out;
}

// Paths
const baseDir = path.resolve(__dirname, '..');
const templatePath = path.join(baseDir, 'tokens_brand.css');
const lightPath = path.join(baseDir, 'css-tokens', 'wesparkle-light-theme.css');
const darkPath = path.join(baseDir, 'css-tokens', 'wesparkle-dark-theme.css');

// Read source files
const templateCss = fs.readFileSync(templatePath, 'utf8');
const lightCss    = fs.readFileSync(lightPath, 'utf8');
const darkCss     = fs.readFileSync(darkPath, 'utf8');

const templateVars = parseVars(templateCss);
const lightOverride = parseVars(lightCss);
const darkOverride  = parseVars(darkCss);

// Build new theme CSS
const newLightCss = generateTheme(templateVars, lightOverride, 'Wesparkle Light');
const newDarkCss  = generateTheme(templateVars, darkOverride,  'Wesparkle Dark');

// Write back
fs.writeFileSync(lightPath, newLightCss, 'utf8');
fs.writeFileSync(darkPath,  newDarkCss,  'utf8');

console.log('Wesparkle themes regenerated with all tokens.'); 