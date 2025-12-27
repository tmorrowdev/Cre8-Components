#!/usr/bin/env node
/**
 * Script to generate Claude-readable component documentation
 * Run: node scripts/generate-component-docs.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COMPONENTS_DIR = path.join(__dirname, '../components');
const OUTPUT_FILE = path.join(__dirname, '../components.json');

// Parse a TypeScript component file
function parseComponent(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const fileName = path.basename(filePath, '.ts');
  const dirName = path.basename(path.dirname(filePath));

  // Skip non-component files
  if (fileName.endsWith('.styles') || fileName.endsWith('.stories') || fileName.endsWith('.test')) {
    return null;
  }

  // Extract tag name
  const tagMatch = content.match(/customElements\.define\(['"]([^'"]+)['"]/);
  if (!tagMatch) return null;
  const tagName = tagMatch[1];

  // Extract class name
  const classMatch = content.match(/export class (\w+)/);
  const className = classMatch ? classMatch[1] : null;

  // Extract class-level JSDoc (component description)
  const classDocMatch = content.match(/\/\*\*[\s\S]*?\*\/\s*export class/);
  let description = '';
  let howToUse = '';
  if (classDocMatch) {
    const docBlock = classDocMatch[0];
    // Clean up the doc block
    const cleaned = docBlock
      .replace(/\/\*\*|\*\/|export class/g, '')
      .replace(/^\s*\*\s?/gm, '')
      .trim();

    // Split into description and how to use
    const howToUseMatch = cleaned.match(/##\s*How to Use[\s\S]*/i);
    if (howToUseMatch) {
      howToUse = howToUseMatch[0].trim();
      description = cleaned.replace(howToUseMatch[0], '').trim();
    } else {
      description = cleaned;
    }
  }

  // Extract properties
  const properties = [];
  const propertyRegex = /\/\*\*[\s\S]*?\*\/\s*@property\([^)]*\)\s*(\w+)\??(?::\s*([^=;]+))?(?:\s*=\s*([^;]+))?/g;
  let propMatch;

  while ((propMatch = propertyRegex.exec(content)) !== null) {
    const fullMatch = propMatch[0];
    const propName = propMatch[1];
    let propType = propMatch[2] ? propMatch[2].trim() : 'any';
    const defaultValue = propMatch[3] ? propMatch[3].trim().replace(/['"]/g, '') : undefined;

    // Extract JSDoc for this property
    const docMatch = fullMatch.match(/\/\*\*([\s\S]*?)\*\//);
    let propDescription = '';
    if (docMatch) {
      propDescription = docMatch[1]
        .replace(/^\s*\*\s?/gm, '')
        .replace(/@\w+[^\n]*/g, '')
        .trim();
    }

    // Check if required (no ? after property name)
    const required = !fullMatch.includes(propName + '?');

    // Check if reflected to attribute
    const reflected = fullMatch.includes('reflect: true');

    properties.push({
      name: propName,
      type: propType,
      default: defaultValue,
      description: propDescription,
      required,
      reflected
    });
  }

  // Extract slots from JSDoc @slot tags or render method
  const slots = [];
  const slotTagRegex = /@slot\s+(\w*)\s*-?\s*(.*)/g;
  let slotMatch;
  while ((slotMatch = slotTagRegex.exec(content)) !== null) {
    slots.push({
      name: slotMatch[1] || 'default',
      description: slotMatch[2].trim()
    });
  }

  // Also find slots in render method
  const slotRenderRegex = /<slot(?:\s+name="([^"]+)")?/g;
  while ((slotMatch = slotRenderRegex.exec(content)) !== null) {
    const slotName = slotMatch[1] || 'default';
    if (!slots.find(s => s.name === slotName)) {
      slots.push({ name: slotName, description: '' });
    }
  }

  // Extract events (dispatch calls)
  const events = [];
  const eventRegex = /this\.dispatch\(\s*\{[\s\S]*?eventName:\s*['"]([^'"]+)['"]/g;
  let eventMatch;
  while ((eventMatch = eventRegex.exec(content)) !== null) {
    events.push({
      name: eventMatch[1],
      description: ''
    });
  }

  // Also check for exported event interfaces
  const eventInterfaceRegex = /export interface (\w+Event) extends CustomEvent<\{([^}]+)\}>/g;
  while ((eventMatch = eventInterfaceRegex.exec(content)) !== null) {
    const existingEvent = events.find(e => content.includes(`type: '${e.name}'`));
    if (existingEvent) {
      existingEvent.detail = eventMatch[2].trim();
    }
  }

  // Extract CSS custom properties from styles file
  const cssVars = [];
  const stylesPath = filePath.replace('.ts', '.styles.ts');
  if (fs.existsSync(stylesPath)) {
    const stylesContent = fs.readFileSync(stylesPath, 'utf-8');
    const cssVarRegex = /--cre8-[\w-]+/g;
    const matches = stylesContent.match(cssVarRegex) || [];
    // Get unique vars
    [...new Set(matches)].forEach(v => cssVars.push(v));
  }

  // Determine base class
  const extendsMatch = content.match(/extends\s+(Cre8\w+)/);
  const baseClass = extendsMatch ? extendsMatch[1] : null;

  // Check for dependencies (other cre8 components used)
  const dependencies = [];
  const importRegex = /import\s+['"]\.\.\/([^/]+)\//g;
  let importMatch;
  while ((importMatch = importRegex.exec(content)) !== null) {
    const dep = `cre8-${importMatch[1]}`;
    if (!dependencies.includes(dep)) {
      dependencies.push(dep);
    }
  }

  return {
    tagName,
    className,
    description,
    howToUse,
    baseClass,
    properties,
    slots,
    events,
    cssCustomProperties: cssVars.slice(0, 20), // Limit to avoid bloat
    dependencies,
    sourcePath: `components/${dirName}/${fileName}.ts`
  };
}

// Generate basic usage example
function generateExample(component) {
  let example = `<${component.tagName}`;

  // Add common props
  const textProp = component.properties.find(p => p.name === 'text');
  if (textProp) {
    example += ` text="Example"`;
  }

  const variantProp = component.properties.find(p => p.name === 'variant');
  if (variantProp && variantProp.default) {
    example += ` variant="${variantProp.default}"`;
  }

  // Check if it has slots
  const hasDefaultSlot = component.slots.some(s => s.name === 'default');
  if (hasDefaultSlot || component.slots.length > 0) {
    example += `>\n  <!-- content -->\n</${component.tagName}>`;
  } else {
    example += `></${component.tagName}>`;
  }

  return example;
}

// Main execution
function main() {
  console.log('Scanning components directory...');

  const components = [];
  const componentDirs = fs.readdirSync(COMPONENTS_DIR);

  for (const dir of componentDirs) {
    const dirPath = path.join(COMPONENTS_DIR, dir);

    // Skip files, only process directories
    if (!fs.statSync(dirPath).isDirectory()) continue;

    // Find the main component file
    const mainFile = path.join(dirPath, `${dir}.ts`);
    if (fs.existsSync(mainFile)) {
      const component = parseComponent(mainFile);
      if (component) {
        component.example = generateExample(component);
        components.push(component);
        console.log(`  ✓ ${component.tagName}`);
      }
    }
  }

  // Sort alphabetically
  components.sort((a, b) => a.tagName.localeCompare(b.tagName));

  // Create the final structure
  const output = {
    $schema: './components.schema.json',
    version: '1.0.0',
    generatedAt: new Date().toISOString(),
    totalComponents: components.length,

    // Quick lookup index for fast queries
    index: {
      byTag: Object.fromEntries(components.map((c, i) => [c.tagName, i])),
      byCategory: categorizeComponents(components),
      keywords: buildKeywordIndex(components)
    },

    components
  };

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));
  console.log(`\n✅ Generated ${OUTPUT_FILE} with ${components.length} components`);
}

// Categorize components for quick lookup
function categorizeComponents(components) {
  const categories = {
    form: [],
    layout: [],
    navigation: [],
    feedback: [],
    dataDisplay: [],
    overlay: [],
    typography: [],
    utility: []
  };

  for (const c of components) {
    const tag = c.tagName;
    const desc = c.description.toLowerCase();

    if (['button', 'field', 'select', 'checkbox', 'radio', 'date-picker', 'multi-select'].some(k => tag.includes(k))) {
      categories.form.push(tag);
    } else if (['layout', 'grid', 'section', 'container', 'main', 'band'].some(k => tag.includes(k))) {
      categories.layout.push(tag);
    } else if (['nav', 'breadcrumb', 'tabs', 'menu', 'link', 'pagination'].some(k => tag.includes(k))) {
      categories.navigation.push(tag);
    } else if (['alert', 'modal', 'toast', 'notification', 'progress', 'loading', 'skeleton'].some(k => tag.includes(k))) {
      categories.feedback.push(tag);
    } else if (['card', 'table', 'list', 'badge', 'tag', 'icon', 'chart', 'percent'].some(k => tag.includes(k))) {
      categories.dataDisplay.push(tag);
    } else if (['modal', 'popover', 'tooltip', 'dropdown'].some(k => tag.includes(k))) {
      categories.overlay.push(tag);
    } else if (['heading', 'text-passage', 'text-link'].some(k => tag.includes(k))) {
      categories.typography.push(tag);
    } else {
      categories.utility.push(tag);
    }
  }

  return categories;
}

// Build keyword search index
function buildKeywordIndex(components) {
  const index = {};

  for (const c of components) {
    // Extract keywords from tag name
    const words = c.tagName.replace('cre8-', '').split('-');

    // Add description words
    const descWords = c.description
      .toLowerCase()
      .replace(/[^a-z\s]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 3);

    const allWords = [...new Set([...words, ...descWords])];

    for (const word of allWords) {
      if (!index[word]) {
        index[word] = [];
      }
      if (!index[word].includes(c.tagName)) {
        index[word].push(c.tagName);
      }
    }
  }

  return index;
}

main();
