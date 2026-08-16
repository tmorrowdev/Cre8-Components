/**
 * Generate MCP Manifest from Web Component Analyzer output.
 *
 * Reads WCA JSON output and transforms it into the MCP manifest format
 * used by the cre8-mcp server for component intelligence.
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');

/**
 * Custom elements that register but are not part of the public API.
 *
 * These are sub-components: they call `customElements.define` as a side effect
 * of their parent being imported, but nothing exports them from `index.ts` or
 * `cdn-entry.ts`, so a consumer cannot use them on their own.
 *
 * The list is explicit because the exclusion used to be accidental — the
 * analyzer glob was `components/*​/*.ts`, one level too shallow to see anything
 * nested, so all five vanished from the manifest, the catalog, the compact
 * projection, the React manifest and custom-elements.json without anyone
 * choosing that. Now the glob reaches everything and the omission is a
 * decision, pinned here and asserted by `check-layer-parity.mjs`. Adding a
 * component can no longer silently skip the pipeline.
 *
 * To publish one: delete it here and export it from `index.ts`/`cdn-entry.ts`.
 */
const INTERNAL_ELEMENTS = [
  'cre8-calendar',
  'cre8-calendar-month-modal',
  'cre8-calendar-navigation',
  'cre8-calendar-year-modal',
  'cre8-page-counter',
];

// ─── Category Mapping ────────────────────────────────────────────────
const CATEGORY_MAP: Record<string, string> = {
  'button': 'Actions',
  'danger-button': 'Actions',
  'button-group': 'Actions',
  'split-button': 'Actions',
  'form': 'Forms',
  'field': 'Forms',
  'field-note': 'Forms',
  'select': 'Forms',
  'multi-select': 'Forms',
  'checkbox-field': 'Forms',
  'checkbox-field-group': 'Forms',
  'checkbox-field-item': 'Forms',
  'radio-field': 'Forms',
  'radio-field-group': 'Forms',
  'radio-field-item': 'Forms',
  'date-picker': 'Forms',
  'select-tile': 'Forms',
  'select-tile-group': 'Forms',
  'select-tile-list': 'Forms',
  'toggle-field': 'Forms',
  'text-area': 'Forms',
  'form-fieldset': 'Forms',
  'card': 'Layout',
  'grid': 'Layout',
  'grid-item': 'Layout',
  'layout': 'Layout',
  'layout-container': 'Layout',
  'layout-section': 'Layout',
  'linelength-container': 'Layout',
  'section': 'Layout',
  'hero': 'Layout',
  'band': 'Layout',
  'divider': 'Layout',
  'main': 'Layout',
  'heading': 'Typography',
  'text-passage': 'Typography',
  'text-link': 'Typography',
  'link': 'Navigation',
  'link-list': 'Navigation',
  'link-list-item': 'Navigation',
  'breadcrumbs': 'Navigation',
  'breadcrumbs-item': 'Navigation',
  'pagination': 'Navigation',
  'header': 'Navigation',
  'footer': 'Navigation',
  'footer-nav': 'Navigation',
  'tabs': 'Navigation',
  'tab': 'Navigation',
  'tab-panel': 'Navigation',
  'global-nav': 'Navigation',
  'global-nav-item': 'Navigation',
  'primary-nav': 'Navigation',
  'primary-nav-item': 'Navigation',
  'tertiary-nav': 'Navigation',
  'tertiary-nav-item': 'Navigation',
  'utility-nav': 'Navigation',
  'utility-nav-item': 'Navigation',
  'nav-container': 'Navigation',
  'skip-nav': 'Navigation',
  'accordion': 'Disclosure',
  'accordion-item': 'Disclosure',
  'accordion-panel': 'Disclosure',
  'dropdown': 'Disclosure',
  'dropdown-item': 'Disclosure',
  'modal': 'Disclosure',
  'popover': 'Disclosure',
  'tooltip': 'Disclosure',
  'submenu': 'Disclosure',
  'submenu-item': 'Disclosure',
  'alert': 'Feedback',
  'inline-alert': 'Feedback',
  'badge': 'Feedback',
  'loading-spinner': 'Feedback',
  'skeleton-loader': 'Feedback',
  'progress-meter': 'Feedback',
  'percent-bar': 'Feedback',
  'progress-steps-item': 'Feedback',
  'table': 'Data',
  'table-header': 'Data',
  'table-header-cell': 'Data',
  'table-body': 'Data',
  'table-row': 'Data',
  'table-cell': 'Data',
  'table-object': 'Data',
  'list': 'Data',
  'list-item': 'Data',
  'tag': 'Data',
  'tag-list': 'Data',
  'remove-tag': 'Data',
  'chart': 'Data',
  'icon': 'Media',
  'logo': 'Media',
  'feature': 'Marketing',
  'page-header': 'Marketing',
};

// ─── WCA Types ───────────────────────────────────────────────────────
interface WcaTag {
  name: string;
  path: string;
  description?: string;
  attributes?: WcaAttribute[];
  properties?: WcaProperty[];
  slots?: WcaSlot[];
  events?: WcaEvent[];
  cssParts?: WcaCssPart[];
  cssProperties?: WcaCssProperty[];
}

interface WcaAttribute {
  name: string;
  type?: string;
  default?: string;
  description?: string;
}

interface WcaProperty {
  name: string;
  type?: string;
  default?: string;
  attribute?: string;
  description?: string;
}

interface WcaSlot {
  name: string;
  description?: string;
}

interface WcaEvent {
  name: string;
  description?: string;
}

interface WcaCssPart {
  name: string;
  description?: string;
}

interface WcaCssProperty {
  name: string;
  description?: string;
}

interface WcaOutput {
  tags: WcaTag[];
}

// ─── MCP Manifest Types ─────────────────────────────────────────────
interface McpAttribute {
  type: string;
  values?: string[];
  default?: string | boolean | number;
  description?: string;
}

interface McpSlot {
  description?: string;
}

interface McpEvent {
  detail?: Record<string, unknown>;
  description?: string;
}

interface McpCssProperty {
  description?: string;
}

interface McpComponent {
  name: string;
  category: string;
  description: string;
  attributes: Record<string, McpAttribute>;
  properties: Record<string, { type: string; description?: string }>;
  slots: Record<string, McpSlot>;
  events: Record<string, McpEvent>;
  cssProperties: Record<string, McpCssProperty>;
  examples: Array<{ description: string; html: string }>;
}

// ─── Transform Helpers ──────────────────────────────────────────────


/**
 * Parse a WCA type string into a base type and optional values array.
 * e.g. '"primary" | "secondary" | "tertiary"' → { type: 'string', values: ['primary', 'secondary', 'tertiary'] }
 */
function parseType(typeStr?: string): { type: string; values?: string[] } {
  if (!typeStr) return { type: 'string' };

  // Check for union of string literals: "a" | "b" | "c"
  const unionMatch = typeStr.match(/^"[^"]*"(\s*\|\s*"[^"]*")+$/);
  if (unionMatch) {
    const values = [...typeStr.matchAll(/"([^"]*)"/g)].map(m => m[1]);
    return { type: 'string', values };
  }

  // Check for union with undefined: "a" | "b" | undefined
  const unionWithUndefined = typeStr.replace(/\s*\|\s*undefined/g, '').trim();
  if (unionWithUndefined !== typeStr) {
    return parseType(unionWithUndefined);
  }

  // Map common types
  const lower = typeStr.toLowerCase().trim();
  if (lower === 'boolean' || lower === 'true | false' || lower === 'false | true') return { type: 'boolean' };
  if (lower === 'number') return { type: 'number' };
  if (lower === 'string') return { type: 'string' };

  return { type: typeStr };
}

/**
 * Parse a default value string into the appropriate JS type.
 */
function parseDefault(defaultStr?: string, type?: string): string | boolean | number | undefined {
  if (defaultStr === undefined || defaultStr === 'undefined' || defaultStr === '""' || defaultStr === "''") {
    return undefined;
  }

  // Boolean
  if (defaultStr === 'false') return false;
  if (defaultStr === 'true') return true;

  // Number
  if (type === 'number' && !isNaN(Number(defaultStr))) {
    return Number(defaultStr);
  }

  // Strip quotes
  const unquoted = defaultStr.replace(/^["']|["']$/g, '');
  return unquoted || undefined;
}

/**
 * Get the component short name (without cre8- prefix) for category lookup.
 */
function getShortName(tagName: string): string {
  return tagName.replace(/^cre8-/, '');
}

/**
 * Determine category from component name.
 */
function getCategory(tagName: string): string {
  const short = getShortName(tagName);
  return CATEGORY_MAP[short] || 'Other';
}

/**
 * Generate basic examples for a component based on its attributes.
 */
function generateExamples(tag: WcaTag): Array<{ description: string; html: string }> {
  const examples: Array<{ description: string; html: string }> = [];
  const name = tag.name;

  // Find variant attribute
  const variantAttr = tag.attributes?.find(a => a.name === 'variant');
  const textAttr = tag.attributes?.find(a => a.name === 'text');

  if (variantAttr) {
    const { values } = parseType(variantAttr.type);
    if (values && values.length > 0) {
      const primaryVariant = values[0];
      let attrs = `variant="${primaryVariant}"`;
      if (textAttr) attrs += ` text="${capitalize(getShortName(name))}"`;
      examples.push({
        description: `${capitalize(primaryVariant)} ${getShortName(name)}`,
        html: `<${name} ${attrs}></${name}>`,
      });
    }
  } else if (textAttr) {
    examples.push({
      description: `Basic ${getShortName(name)}`,
      html: `<${name} text="${capitalize(getShortName(name))}"></${name}>`,
    });
  }

  return examples;
}

function capitalize(s: string): string {
  return s.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// ─── Main Transform ─────────────────────────────────────────────────

function transformTag(tag: WcaTag): McpComponent {
  // Separate WCA attributes into true HTML attributes vs JS-only properties.
  // In Lit, @property() without an explicit `attribute:` option auto-creates
  // a lowercased attribute. But camelCase names (e.g. iconRotateDegree →
  // "iconrotatedegree") are awkward and rarely used as HTML attributes in
  // practice. We treat those as properties instead.
  const attributes: Record<string, McpAttribute> = {};
  const properties: Record<string, { type: string; values?: string[]; default?: string | boolean | number; description?: string }> = {};

  // Build a set of property names that WCA links to attributes


  for (const attr of tag.attributes || []) {
    const { type, values } = parseType(attr.type);
    const defaultValue = parseDefault(attr.default, type);
    const isCamelCase = /[A-Z]/.test(attr.name);

    const entry: McpAttribute = { type };
    if (values) entry.values = values;
    if (defaultValue !== undefined) entry.default = defaultValue;
    if (attr.description) entry.description = attr.description;

    if (isCamelCase) {
      // CamelCase → treat as a JS property (set via .prop or Lit binding)
      properties[attr.name] = entry;
    } else {
      // Simple lowercase name → genuine HTML attribute
      attributes[attr.name] = entry;
    }
  }

  // Add properties that WCA lists with no attribute linkage (true prop-only),
  // but skip inherited Lit/DOM internals that aren't useful for consumers
  const SKIP_PROPERTIES = new Set([
    'styles', 'formAssociated', 'field', 'form', 'validationMessage',
    'validity', 'willValidate', 'shadowRoot', 'renderRoot',
    'isUpdatePending', 'hasUpdated', 'updateComplete',
  ]);
  for (const prop of tag.properties || []) {
    if (prop.attribute) continue; // Already handled above
    if (SKIP_PROPERTIES.has(prop.name)) continue;
    const { type } = parseType(prop.type);
    const entry: { type: string; description?: string } = { type };
    if (prop.description) entry.description = prop.description;
    properties[prop.name] = entry;
  }

  // Transform slots
  const slots: Record<string, McpSlot> = {};
  for (const slot of tag.slots || []) {
    const slotName = slot.name || 'default';
    slots[slotName] = {};
    if (slot.description) slots[slotName].description = slot.description;
  }

  // Transform events
  const events: Record<string, McpEvent> = {};
  for (const event of tag.events || []) {
    events[event.name] = { detail: {} };
    if (event.description) events[event.name].description = event.description;
  }

  // Transform CSS properties
  const cssProperties: Record<string, McpCssProperty> = {};
  for (const cssProp of tag.cssProperties || []) {
    cssProperties[cssProp.name] = {};
    if (cssProp.description) cssProperties[cssProp.name].description = cssProp.description;
  }

  return {
    name: tag.name,
    category: getCategory(tag.name),
    description: tag.description || `${capitalize(getShortName(tag.name))} component.`,
    attributes,
    properties,
    slots,
    events,
    cssProperties,
    examples: generateExamples(tag),
  };
}

function main() {
  // Read WCA output
  const wcaPath = process.argv[2] || '/tmp/wca-raw.json';
  console.log(`Reading WCA output from: ${wcaPath}`);

  let wcaData: WcaOutput;
  try {
    wcaData = JSON.parse(readFileSync(wcaPath, 'utf-8'));
  } catch (err) {
    console.error(`Failed to read WCA output: ${err}`);
    process.exit(1);
  }

  console.log(`Found ${wcaData.tags.length} tags in WCA output`);

  // Read static data
  const staticData = JSON.parse(
    readFileSync(join(__dirname, 'mcp-static-data.json'), 'utf-8')
  );

  // Read package.json for version and dependencies
  const pkgJson = JSON.parse(
    readFileSync(join(ROOT, 'package.json'), 'utf-8')
  );

  // Transform components
  const seen = new Set(wcaData.tags.map(t => t.name).filter(n => n.startsWith('cre8-')));
  const missingInternals = INTERNAL_ELEMENTS.filter(n => !seen.has(n));
  if (missingInternals.length) {
    throw new Error(
      `INTERNAL_ELEMENTS lists element(s) the analyzer no longer sees: ${missingInternals.join(', ')}. ` +
        `Remove them from the list, or fix the analyzer glob.`
    );
  }

  const components = wcaData.tags
    .filter(tag => tag.name.startsWith('cre8-'))
    .filter(tag => !INTERNAL_ELEMENTS.includes(tag.name))
    .map(transformTag)
    .sort((a, b) => {
      // Sort by category, then name
      const catCompare = a.category.localeCompare(b.category);
      if (catCompare !== 0) return catCompare;
      return a.name.localeCompare(b.name);
    });

  console.log(`Transformed ${components.length} components`);

  // Log category distribution
  const categories: Record<string, number> = {};
  for (const comp of components) {
    categories[comp.category] = (categories[comp.category] || 0) + 1;
  }
  console.log('Categories:', JSON.stringify(categories, null, 2));

  // Build dependencies from package.json
  const dependencies: Record<string, string> = {};
  const depKeys = ['lit', '@lit/context', '@lit/react', '@a11y/focus-trap', 'chart.js', 'classnames', 'nanoid', 'zod'];
  for (const key of depKeys) {
    if (pkgJson.dependencies?.[key]) {
      dependencies[key] = pkgJson.dependencies[key];
    }
  }

  // Build manifest
  const manifest = {
    version: pkgJson.version,
    library: pkgJson.name,
    tagPrefix: 'cre8',
    description: pkgJson.description,
    framework: `Lit ${pkgJson.dependencies?.lit || '3.x'}`,
    /**
     * Elements that register but are intentionally absent from `components`.
     * Recorded here so `check-layer-parity.mjs` can tell a deliberate omission
     * from a component that silently fell out of the pipeline, without keeping
     * a second copy of the list.
     */
    internalElements: INTERNAL_ELEMENTS,
    components,
    baseClasses: staticData.baseClasses,
    patterns: staticData.patterns,
    designTokens: staticData.designTokens,
    accessibility: staticData.accessibility,
    dependencies,
  };

  // Write output
  const outputPath = join(ROOT, 'mcp-manifest.json');
  writeFileSync(outputPath, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`Wrote manifest to: ${outputPath}`);
  console.log(`Total components: ${components.length}`);
}

main();
