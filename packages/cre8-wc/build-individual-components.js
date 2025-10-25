import { defineConfig, build } from 'vite';
import { glob } from 'glob';
import fs from 'fs';
import path from 'path';

// Get base components
const baseComponents = {
  'cre8-field': './components/field/field.ts',
  'cre8-element': './components/cre8-element.ts',
  'cre8-form-element': './components/cre8-form-element.ts'
};

// Get all component files
const allComponents = glob.sync('./components/*/*.ts').reduce((acc, componentPath) => {
  // Exclude stories files
  if (componentPath.includes('.stories.')) {
    return acc;
  }

  const name = componentPath.replace('./components/', '').replace('.ts', '').split('/').pop();
  acc[name] = componentPath;
  return acc;
}, {});

const allEntries = { ...baseComponents, ...allComponents };

// Create build config for each component
async function buildComponent(name, entryPath) {
  console.log(`Building ${name}...`);
  
  const config = defineConfig({
    build: {
      lib: {
        entry: entryPath,
        formats: ['es', 'umd'],
        name: name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(''),
        fileName: (format) => `${name}.${format === 'es' ? 'js' : 'umd.js'}`
      },
      outDir: `lib-components/${name}`,
      emptyOutDir: true,
      rollupOptions: {
        // Bundle all dependencies - nothing should be external
        external: () => false,
        output: {
          // Ensure everything is inlined, no dynamic imports
          inlineDynamicImports: true,
        }
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./design-tokens/core/scss/theming/head.module.css";`
        }
      }
    },
    resolve: {
      extensions: ['.js', '.cjs', '.ts', '.jsx', '.tsx','.svg?raw', '.scss', '.css', '.otf', '.ttf', '.yml'],
      alias: {
        // Map the problematic icon imports to actual files
        '@cre8_dev/cre8-icons/lib/icons/System/Regular/Check.svg?raw': path.resolve('./node_modules/@cre8_dev/cre8-icons/icons/System/Regular/Check.svg'),
        '@cre8_dev/cre8-icons/lib/icons/System/Filled/Check.svg?raw': path.resolve('./node_modules/@cre8_dev/cre8-icons/icons/System/Filled/Check.svg'),
      }
    },
    esbuild: {
      loader: 'ts',
      include: /\.(ts|js)$/,
    },
    plugins: [
      // Custom plugin to handle SVG imports and style resolution
      {
        name: 'asset-loader',
        load(id) {
          // Handle SVG imports
          if (id.endsWith('.svg?raw')) {
            const svgPath = id.replace('?raw', '');
            if (fs.existsSync(svgPath)) {
              return `export default ${JSON.stringify(fs.readFileSync(svgPath, 'utf-8'))}`;
            }
          }
          return null;
        },
        resolveId(id, importer) {
          // Handle .styles.js imports by mapping them to .styles.ts
          if (id.endsWith('.styles.js') && importer) {
            const stylesPath = path.resolve(path.dirname(importer), id.replace('.styles.js', '.styles.ts'));
            if (fs.existsSync(stylesPath)) {
              return stylesPath;
            }
          }
          return null;
        }
      }
    ]
  });

  try {
    await build(config);
    console.log(`✅ Built ${name} successfully`);
    return true;
  } catch (error) {
    console.log(`❌ Failed to build ${name}:`, error.message);
    return false;
  }
}

// Build all components
async function buildAll() {
  console.log('Building individual components with bundled dependencies...');
  
  const results = [];
  for (const [name, entryPath] of Object.entries(allEntries)) {
    const success = await buildComponent(name, entryPath);
    results.push({ name, success });
  }
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`\n📊 Build Summary:`);
  console.log(`✅ Successful: ${successful.length}`);
  console.log(`❌ Failed: ${failed.length}`);
  
  if (failed.length > 0) {
    console.log(`\nFailed components: ${failed.map(f => f.name).join(', ')}`);
  }
  
  // Create an index file with successful components
  const indexContent = successful
    .map(({ name }) => `export { default as ${name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')} } from './lib-components/${name}/${name}.js';`)
    .join('\n');
    
  fs.writeFileSync('./lib-components/index.js', indexContent);
  console.log(`\n📄 Created lib-components/index.js with ${successful.length} components`);
}

buildAll().catch(console.error);