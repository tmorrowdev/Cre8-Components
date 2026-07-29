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
  version?: string;
  schemaVersion?: string;
  tags?: Tag[];
  modules?: CemModule[];
}

interface CemModule {
  kind: string;
  path: string;
  declarations?: CemDeclaration[];
}

interface CemDeclaration {
  kind: string;
  name: string;
  tagName?: string;
  customElement?: boolean;
  description?: string;
  attributes?: Attribute[];
  events?: Event[];
  slots?: Slot[];
}

/**
 * Convert CEM v1 (modules/declarations) to the Tag[] format used by the generator.
 */
function cemToTags(manifest: CustomElementsManifest): Tag[] {
  if (manifest.tags) return manifest.tags;
  if (!manifest.modules) return [];

  const tags: Tag[] = [];
  for (const mod of manifest.modules) {
    if (!mod.declarations) continue;
    for (const decl of mod.declarations) {
      if (decl.kind === 'class' && decl.tagName && decl.customElement) {
        tags.push({
          name: decl.tagName,
          path: './' + mod.path,
          description: decl.description,
          attributes: decl.attributes?.map(a => ({
            ...a,
            type: typeof a.type === 'object' && a.type !== null ? (a.type as any).text : a.type,
          })),
          events: decl.events,
          slots: decl.slots,
        });
      }
    }
  }
  return tags;
}

function toPascalCase(str: string): string {
  return str
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

/**
 * Types the wrapper re-exports rather than flattening to `any`.
 *
 * The flattened compound APIs (`columns`, `rows`, `items`, `steps`, `tags`) are
 * the whole reason a React consumer would reach for them, and a prop typed
 * `any` gives no autocomplete and catches no mistakes — which for a data-driven
 * table is most of the value. These interfaces are exported from the component
 * module the element class already comes from, so importing them is free.
 */
const FLATTENED_DATA_TYPES = new Set([
  'Cre8TableColumn', 'Cre8TableRowData', 'Cre8TabItemData', 'Cre8AccordionItemData',
  'Cre8ListItemData', 'Cre8LinkData', 'Cre8BreadcrumbData', 'Cre8TagData',
  'Cre8CheckboxItemData', 'Cre8RadioItemData', 'Cre8ProgressStepData', 'Cre8DropdownItemData',
]);

/**
 * The flattened data type a prop refers to, if any — `Cre8TagData[]` → `Cre8TagData`.
 *
 * The manifest writes an optional property's type as `Cre8TagData[] | undefined`,
 * so the `| undefined` has to come off before matching. Missing that is why the
 * first cut of this silently produced `any` for every one of them.
 */
export function flattenedTypeOf(type: string | undefined): string | null {
  if (!type) return null;
  const bare = type
    .split('|')
    .map((part) => part.trim())
    .find((part) => part !== 'undefined' && part !== 'null');
  const match = bare ? /^(Cre8[A-Za-z]+)\[\]$/.exec(bare) : null;
  return match && FLATTENED_DATA_TYPES.has(match[1]) ? match[1] : null;
}

function getReactPropType(type: string | undefined): string {
  if (!type) return 'any';

  // Keep the flattened data types intact; they are the point of the React layer.
  const flattened = flattenedTypeOf(type);
  if (flattened) return `${flattened}[]`;

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

  const dataTypes = [
    ...new Set(
      (tag.attributes ?? [])
        .map((attr) => flattenedTypeOf(attr.type))
        .filter((name): name is string => Boolean(name))
    ),
  ];
  const dataTypeImport = dataTypes.length
    ? `\nexport type { ${dataTypes.join(', ')} } from '@tmorrow/cre8-wc/lib/components/${importPath}';`
    : '';

  // Generate the component
  return `import { createComponent } from '@lit/react';
import { ${elementClassName} as ${elementClassName}Element } from '@tmorrow/cre8-wc/lib/components/${importPath}';
import type { ${dataTypes.join(', ')} } from '@tmorrow/cre8-wc/lib/components/${importPath}';
import React from 'react';${dataTypeImport}`.replace(
    dataTypes.length ? '' : `import type {  } from '@tmorrow/cre8-wc/lib/components/${importPath}';\n`,
    ''
  ) + `

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

  // Convert manifest to tags format
  const tags = cemToTags(manifest);

  // Generate wrapper for each tag
  const generatedComponents: string[] = [];

  for (const tag of tags) {
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
  const indexContent = generateIndexFile(tags);
  fs.writeFileSync(path.join(outputDir, 'index.ts'), indexContent);

  // Read parent package version for syncing
  const parentPkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'));
  const version = parentPkg.version;

  // Generate package.json
  const packageJson = {
    name: '@tmorrow/cre8-react',
    version,
    description: 'React wrappers for cre8 Web Components (@tmorrow/cre8-wc)',
    license: parentPkg.license || 'MIT',
    type: 'module',
    main: 'dist/index.js',
    types: 'dist/index.d.ts',
    module: 'dist/index.js',
    exports: {
      '.': {
        import: './dist/index.js',
        types: './dist/index.d.ts',
      },
      './components/*': {
        import: './dist/components/*',
        types: './dist/components/*',
      },
    },
    files: ['dist'],
    repository: {
      type: 'git',
      url: 'https://github.com/tmorrowdev/Cre8-Components.git',
      directory: 'packages/cre8-wc/react-wrappers',
    },
    keywords: ['react', 'web-components', 'lit', 'cre8', 'design-system'],
    peerDependencies: {
      react: '>=18',
      'react-dom': '>=18',
    },
    dependencies: {
      '@lit/react': parentPkg.dependencies?.['@lit/react'] || '^1.0.8',
      '@tmorrow/cre8-wc': `^${version}`,
    },
  };
  fs.writeFileSync(
    path.join(outputDir, 'package.json'),
    JSON.stringify(packageJson, null, 2) + '\n'
  );

  // Generate tsconfig.json
  const tsconfig = {
    compilerOptions: {
      target: 'ES2021',
      module: 'ESNext',
      moduleResolution: 'bundler',
      declaration: true,
      declarationMap: true,
      outDir: 'dist',
      rootDir: '.',
      strict: true,
      esModuleInterop: true,
      skipLibCheck: true,
      jsx: 'react-jsx',
      paths: {
        '@tmorrow/cre8-wc': ['../lib'],
        '@tmorrow/cre8-wc/*': ['../*'],
      },
    },
    include: ['index.ts', 'components/**/*.tsx'],
    exclude: ['dist', 'node_modules'],
  };
  fs.writeFileSync(
    path.join(outputDir, 'tsconfig.json'),
    JSON.stringify(tsconfig, null, 2) + '\n'
  );

  console.log(`\nGenerated ${generatedComponents.length} React wrappers in ${outputDir}`);
}

main().catch(console.error);
