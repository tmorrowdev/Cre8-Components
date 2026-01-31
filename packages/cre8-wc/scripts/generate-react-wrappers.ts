import * as fs from 'fs';
import * as path from 'path';

interface Attribute {
  name: string;
  description?: string;
  type?: string;
  default?: string;
}

interface Event {
  name: string;
  description?: string;
}

interface Slot {
  name: string;
  description?: string;
}

interface Tag {
  name: string;
  path: string;
  description?: string;
  attributes?: Attribute[];
  events?: Event[];
  slots?: Slot[];
}

interface CustomElementsManifest {
  version: string;
  tags: Tag[];
}

function toPascalCase(str: string): string {
  return str
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

function getReactPropType(type: string | undefined): string {
  if (!type) return 'any';

  // Handle truncated types (e.g., "... 5 more ...")
  if (type.includes('...') && type.includes('more')) {
    return 'string';
  }

  // Handle unknown/custom types that aren't standard
  const unknownTypes = [
    'ChartTypeRegistry', 'CalendarModal', 'status', 'Color', 'Shape',
    'Cre8SelectOption', 'Cre8SelectOptionGroup', 'Chart'
  ];
  for (const unknownType of unknownTypes) {
    if (type.includes(unknownType)) {
      return 'any';
    }
  }

  // Handle union types with only quoted strings
  if (type.includes('|')) {
    // Check if it's a valid union type (only strings, numbers, booleans, undefined, or quoted values)
    const parts = type.split('|').map(p => p.trim());
    const isValidUnion = parts.every(p =>
      p === 'undefined' ||
      p === 'string' ||
      p === 'number' ||
      p === 'boolean' ||
      p.startsWith('"') ||
      p === 'string | undefined' ||
      p === 'number | undefined' ||
      p === 'boolean | undefined'
    );
    if (isValidUnion) {
      return type;
    }
    return 'any';
  }

  // Handle common types
  switch (type.toLowerCase()) {
    case 'string':
      return 'string';
    case 'number':
      return 'number';
    case 'boolean':
    case 'boolean | undefined':
      return 'boolean';
    default:
      // If it looks like a custom type (starts with capital letter), use any
      if (/^[A-Z]/.test(type)) {
        return 'any';
      }
      return type;
  }
}

function toValidEventName(eventName: string): string {
  // Convert dots and dashes to camelCase
  return eventName
    .split(/[.-]/)
    .map((part, index) =>
      index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)
    )
    .join('');
}

function generateReactWrapper(tag: Tag): string {
  const componentName = toPascalCase(tag.name);
  const elementClassName = componentName;
  const tagName = tag.name;

  // Get the import path from the tag path
  const importPath = tag.path
    .replace('./components/', '')
    .replace('.ts', '');

  // Generate props interface
  const propsLines: string[] = [];

  if (tag.attributes) {
    for (const attr of tag.attributes) {
      const propName = attr.name.includes('-')
        ? attr.name.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
        : attr.name;
      const propType = getReactPropType(attr.type);
      const description = attr.description ? `  /** ${attr.description.trim().replace(/\n/g, ' ')} */\n` : '';
      propsLines.push(`${description}  ${propName}?: ${propType};`);
    }
  }

  // Add children prop for slots
  if (tag.slots && tag.slots.length > 0) {
    propsLines.push('  children?: React.ReactNode;');
  }

  // Generate event props
  const eventProps: string[] = [];
  if (tag.events) {
    for (const event of tag.events) {
      const validEventName = toValidEventName(event.name);
      const eventPropName = 'on' + validEventName.charAt(0).toUpperCase() + validEventName.slice(1);
      eventProps.push(`  ${eventPropName}?: (event: CustomEvent) => void;`);
    }
  }

  const allProps = [...propsLines, ...eventProps].join('\n');

  // Generate the component
  return `import { createComponent } from '@lit/react';
import { ${elementClassName} as ${elementClassName}Element } from '@tmorrow/cre8-wc/lib/components/${importPath}';
import React from 'react';

export interface ${componentName}Props {
${allProps}
}

/**
 * ${tag.description?.trim().split('\n')[0] || componentName + ' component'}
 */
export const ${componentName} = createComponent({
  react: React,
  tagName: '${tagName}',
  elementClass: ${elementClassName}Element,
${tag.events && tag.events.length > 0 ? `  events: {
${tag.events.map(e => {
    const validEventName = toValidEventName(e.name);
    const eventPropName = 'on' + validEventName.charAt(0).toUpperCase() + validEventName.slice(1);
    return `    ${eventPropName}: '${e.name}'`;
  }).join(',\n')}
  }` : ''}
});

export default ${componentName};
`;
}

function generateIndexFile(tags: Tag[]): string {
  // Track which components are exported from which folder
  const folderExports = new Map<string, string[]>();

  for (const tag of tags) {
    if (!tag.name.startsWith('cre8-')) continue;

    const componentName = toPascalCase(tag.name);
    const importPath = tag.path
      .replace('./components/', '')
      .replace('.ts', '');
    const folderName = toPascalCase(importPath.split('/')[0]);

    if (!folderExports.has(folderName)) {
      folderExports.set(folderName, []);
    }
    folderExports.get(folderName)!.push(componentName);
  }

  const exports: string[] = [];
  for (const [folderName, components] of folderExports) {
    // Only export the main component (one matching folder name with Cre8 prefix)
    const expectedName = 'Cre8' + folderName;
    const mainComponent = components.find(c => c === expectedName) || components[0];
    exports.push(`export { ${mainComponent} } from './components/${folderName}';`);
  }

  return `// Auto-generated React wrappers
${exports.join('\n')}
`;
}

async function main() {
  const manifestPath = path.join(process.cwd(), 'custom-elements.json');
  const outputDir = path.join(process.cwd(), 'react-wrappers');

  // Read manifest
  const manifest: CustomElementsManifest = JSON.parse(
    fs.readFileSync(manifestPath, 'utf-8')
  );

  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const componentsDir = path.join(outputDir, 'components');
  if (!fs.existsSync(componentsDir)) {
    fs.mkdirSync(componentsDir, { recursive: true });
  }

  // Generate wrapper for each tag
  const generatedComponents: string[] = [];

  for (const tag of manifest.tags) {
    if (!tag.name.startsWith('cre8-')) continue;

    const componentName = toPascalCase(tag.name);
    const folderName = tag.path
      .replace('./components/', '')
      .replace('.ts', '')
      .split('/')[0];

    const componentDir = path.join(componentsDir, toPascalCase(folderName));
    if (!fs.existsSync(componentDir)) {
      fs.mkdirSync(componentDir, { recursive: true });
    }

    const wrapperCode = generateReactWrapper(tag);
    const outputPath = path.join(componentDir, `${componentName}.tsx`);

    fs.writeFileSync(outputPath, wrapperCode);

    // Also create index.tsx
    fs.writeFileSync(
      path.join(componentDir, 'index.tsx'),
      `export * from './${componentName}';\n`
    );

    generatedComponents.push(componentName);
    console.log(`Generated: ${componentName}`);
  }

  // Generate main index file
  const indexContent = generateIndexFile(manifest.tags);
  fs.writeFileSync(path.join(outputDir, 'index.ts'), indexContent);

  console.log(`\nGenerated ${generatedComponents.length} React wrappers in ${outputDir}`);
}

main().catch(console.error);
