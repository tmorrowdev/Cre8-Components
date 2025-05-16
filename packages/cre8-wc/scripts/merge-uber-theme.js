const fs = require('fs');
const path = require('path');

// Helper: parse CSS variables from a file
function parseCssVars(cssText) {
  const varRegex = /--([\w-]+):\s*([^;]+);/g;
  const vars = {};
  let match;
  while ((match = varRegex.exec(cssText))) {
    vars[match[1]] = match[2].trim();
  }
  return vars;
}

// Helper: get logical value for a property from Uber tokens
function getUberValue(prop, uberVars) {
  // Direct match
  if (uberVars[prop]) return uberVars[prop];

  // Heuristics for mapping
  const name = prop.toLowerCase();
  // Color
  if (name.includes('black')) return uberVars['color-black'] || '#000000';
  if (name.includes('white')) return uberVars['color-white'] || '#ffffff';
  if (name.includes('gray') || name.includes('grey')) return uberVars['color-gray-500'] || '#5E5E5E';
  if (name.includes('primary')) return uberVars['color-primary'] || '#1a73e8';
  if (name.includes('shadow')) return uberVars['color-shadow'] || 'rgba(0,0,0,0.5)';
  if (name.includes('background') || name.includes('bg')) return uberVars['background-white'] || '#ffffff';
  if (name.includes('border')) return uberVars['color-gray-300'] || '#AFAFAF';
  if (name.includes('error')) return '#e14c4c';
  if (name.includes('success')) return '#0e8d69';
  if (name.includes('warning')) return '#f6a623';
  if (name.includes('info')) return '#5b6af9';
  if (name.includes('brand')) return uberVars['color-primary'] || '#1a73e8';

  // Spacing
  if (name.includes('spacing') || name.includes('padding') || name.includes('margin')) {
    if (name.includes('0')) return '0';
    if (name.includes('2')) return '0.125rem';
    if (name.includes('4')) return '0.25rem';
    if (name.includes('8')) return '0.5rem';
    if (name.includes('16')) return '1rem';
    if (name.includes('24')) return '1.5rem';
    if (name.includes('32')) return '2rem';
    if (name.includes('40')) return '2.5rem';
    if (name.includes('48')) return '3rem';
    if (name.includes('64')) return '4rem';
    if (name.includes('80')) return '5rem';
    if (name.includes('96')) return '6rem';
    if (name.includes('120')) return '7.5rem';
    if (name.includes('160')) return '10rem';
    return '1rem';
  }

  // Font size
  if (name.includes('font-size')) {
    if (name.endsWith('0')) return '0.75rem';
    if (name.endsWith('1')) return '0.875rem';
    if (name.endsWith('2')) return '1rem';
    if (name.endsWith('3')) return '1.125rem';
    if (name.endsWith('4')) return '1.25rem';
    if (name.endsWith('5')) return '1.5rem';
    if (name.endsWith('6')) return '1.75rem';
    if (name.endsWith('7')) return '2rem';
    if (name.endsWith('8')) return '2.5rem';
    if (name.endsWith('9')) return '3rem';
    if (name.endsWith('10')) return '3.5rem';
    if (name.endsWith('11')) return '4rem';
    if (name.endsWith('12')) return '4.5rem';
    return '1rem';
  }

  // Line height
  if (name.includes('line-height')) return '1.5';

  // Letter spacing
  if (name.includes('letter-spacing')) return '0';

  // Border radius
  if (name.includes('border-radius')) {
    if (name.includes('small')) return '4px';
    if (name.includes('default')) return '8px';
    if (name.includes('large')) return '16px';
    if (name.includes('round')) return '900px';
    return '8px';
  }

  // Shadow
  if (name.includes('shadow')) return uberVars['shadow-default'] || '0 4px 16px hsla(0, 0%, 0%, 0.16)';

  // Fallback
  return '#cccccc';
}

// Read files
const figmaCssPath = path.resolve(__dirname, '../../../figma.css');
const uberCssPath = path.resolve(__dirname, '../../../tokens.css');
const figmaCss = fs.readFileSync(figmaCssPath, 'utf-8');
const uberCss = fs.readFileSync(uberCssPath, 'utf-8');

// Extract @import and pre-:root lines
const preRootLines = [];
const figmaLines = figmaCss.split(/\r?\n/);
let rootStartIdx = figmaLines.findIndex(line => line.trim().startsWith(':root'));
if (rootStartIdx === -1) rootStartIdx = 0;
for (let i = 0; i < rootStartIdx; i++) {
  if (figmaLines[i].trim() !== '') preRootLines.push(figmaLines[i]);
}

const figmaVars = parseCssVars(figmaCss);
const uberVars = parseCssVars(uberCss);

// Merge
let output = '';
if (preRootLines.length > 0) {
  output += preRootLines.join('\n') + '\n\n';
}
output += ':root {\n';
for (const prop of Object.keys(figmaVars)) {
  const value = getUberValue(prop, uberVars);
  output += `    --${prop}: ${value};\n`;
}
output += '}\n';

fs.writeFileSync(path.resolve(__dirname, '../../theme-uber-merged.css'), output, 'utf-8');
console.log('Merged Uber theme written to theme-uber-merged.css'); 