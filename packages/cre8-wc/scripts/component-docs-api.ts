/**
 * Component Documentation API
 *
 * Programmatic interface for querying component documentation.
 * Optimized for fast Claude/AI agent lookups.
 *
 * Usage:
 *   import { ComponentDocsAPI } from './scripts/component-docs-api';
 *   const api = new ComponentDocsAPI();
 *   const button = api.getComponent('button');
 *   const formComponents = api.getByCategory('form');
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Types
export interface ComponentProperty {
  name: string;
  type: string;
  default?: string;
  description: string;
  required: boolean;
  reflected: boolean;
}

export interface ComponentSlot {
  name: string;
  description: string;
}

export interface ComponentEvent {
  name: string;
  description: string;
  detail?: string;
}

export interface Component {
  tagName: string;
  className: string;
  description: string;
  howToUse: string;
  baseClass: string | null;
  properties: ComponentProperty[];
  slots: ComponentSlot[];
  events: ComponentEvent[];
  cssCustomProperties: string[];
  dependencies: string[];
  sourcePath: string;
  example: string;
}

export interface ComponentDocs {
  version: string;
  generatedAt: string;
  totalComponents: number;
  index: {
    byTag: Record<string, number>;
    byCategory: Record<string, string[]>;
    keywords: Record<string, string[]>;
  };
  components: Component[];
}

export type Category = 'form' | 'layout' | 'navigation' | 'feedback' | 'dataDisplay' | 'overlay' | 'typography' | 'utility';

export class ComponentDocsAPI {
  private docs: ComponentDocs;

  constructor(docsPath?: string) {
    const filePath = docsPath || path.join(__dirname, '../components.json');
    this.docs = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }

  /**
   * Get total component count
   */
  get count(): number {
    return this.docs.totalComponents;
  }

  /**
   * Get all available categories
   */
  get categories(): string[] {
    return Object.keys(this.docs.index.byCategory);
  }

  /**
   * Get all component tag names
   */
  get allTags(): string[] {
    return Object.keys(this.docs.index.byTag);
  }

  /**
   * Get a component by tag name
   * @param tagName - Component tag (with or without 'cre8-' prefix)
   */
  getComponent(tagName: string): Component | null {
    const normalized = tagName.startsWith('cre8-') ? tagName : `cre8-${tagName}`;
    const idx = this.docs.index.byTag[normalized];
    return idx !== undefined ? this.docs.components[idx] : null;
  }

  /**
   * Get components by category
   */
  getByCategory(category: Category): Component[] {
    const tags = this.docs.index.byCategory[category] || [];
    return tags.map(tag => this.getComponent(tag)!).filter(Boolean);
  }

  /**
   * Search components by keyword
   */
  search(query: string): Component[] {
    const q = query.toLowerCase();
    const keywords = q.split(/\s+/);
    const matches = new Set<string>();

    // Search in keyword index
    for (const kw of keywords) {
      for (const [indexKw, tags] of Object.entries(this.docs.index.keywords)) {
        if (indexKw.includes(kw) || kw.includes(indexKw)) {
          tags.forEach(t => matches.add(t));
        }
      }
    }

    // Search in descriptions
    for (const c of this.docs.components) {
      if (c.tagName.includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.properties.some(p =>
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q)
          )) {
        matches.add(c.tagName);
      }
    }

    return [...matches].map(tag => this.getComponent(tag)!).filter(Boolean);
  }

  /**
   * Get component properties
   */
  getProperties(tagName: string): ComponentProperty[] {
    return this.getComponent(tagName)?.properties || [];
  }

  /**
   * Get component slots
   */
  getSlots(tagName: string): ComponentSlot[] {
    return this.getComponent(tagName)?.slots || [];
  }

  /**
   * Get component events
   */
  getEvents(tagName: string): ComponentEvent[] {
    return this.getComponent(tagName)?.events || [];
  }

  /**
   * Get component dependencies
   */
  getDependencies(tagName: string): string[] {
    return this.getComponent(tagName)?.dependencies || [];
  }

  /**
   * Get usage example
   */
  getExample(tagName: string): string {
    return this.getComponent(tagName)?.example || '';
  }

  /**
   * Find components that use a specific property type
   */
  findByPropertyType(type: string): Component[] {
    return this.docs.components.filter(c =>
      c.properties.some(p => p.type.includes(type))
    );
  }

  /**
   * Find components that emit a specific event
   */
  findByEvent(eventName: string): Component[] {
    return this.docs.components.filter(c =>
      c.events.some(e => e.name === eventName)
    );
  }

  /**
   * Get a summary suitable for AI context
   */
  getSummary(tagName: string): string {
    const c = this.getComponent(tagName);
    if (!c) return `Component not found: ${tagName}`;

    return `
## ${c.tagName}

${c.description}

### Properties
${c.properties.map(p => `- \`${p.name}\`: ${p.type}${p.default ? ` = ${p.default}` : ''} - ${p.description.split('\n')[0]}`).join('\n')}

### Slots
${c.slots.length ? c.slots.map(s => `- \`${s.name}\`: ${s.description}`).join('\n') : 'None'}

### Events
${c.events.length ? c.events.map(e => `- \`${e.name}\``).join('\n') : 'None'}

### Example
\`\`\`html
${c.example}
\`\`\`
`.trim();
  }

  /**
   * Export all documentation as markdown (for AI context)
   */
  toMarkdown(): string {
    let md = `# CRE8 Web Components Documentation\n\n`;
    md += `Total: ${this.count} components\n\n`;

    for (const category of this.categories) {
      md += `## ${category.charAt(0).toUpperCase() + category.slice(1)}\n\n`;
      const components = this.getByCategory(category as Category);
      for (const c of components) {
        md += `### ${c.tagName}\n`;
        md += `${c.description.split('\n')[0]}\n\n`;
        md += `**Properties:** ${c.properties.map(p => `\`${p.name}\``).join(', ') || 'none'}\n\n`;
      }
    }

    return md;
  }
}

// CLI entrypoint
if (import.meta.url === `file://${process.argv[1]}`) {
  const api = new ComponentDocsAPI();
  const [, , cmd, arg] = process.argv;

  switch (cmd) {
    case 'get':
      console.log(api.getSummary(arg));
      break;
    case 'search':
      api.search(arg).forEach(c => console.log(c.tagName));
      break;
    case 'category':
      api.getByCategory(arg as Category).forEach(c => console.log(c.tagName));
      break;
    case 'markdown':
      console.log(api.toMarkdown());
      break;
    default:
      console.log('Usage: component-docs-api.ts [get|search|category|markdown] <arg>');
  }
}

export default ComponentDocsAPI;
