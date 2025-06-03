import { defineConfig } from 'vite';
import { glob } from 'glob';
import fs from 'fs';

// Get base components
const baseComponents = glob.sync('./components/*.ts').reduce((acc, baseComponentPath) => {
  const name = baseComponentPath.replace('./components/', '').replace('.ts', '');
  acc[name] = baseComponentPath;
  return acc;
}, {} as Record<string, string>);

// Only cre8-element and cre8-form-element are in the above location
// To allow extending off a web component it must be listed below
baseComponents['cre8-field'] = './components/field/field.ts';

// Get all component files
const components = glob.sync('./components/*/*.ts').reduce((acc, componentPath) => {
  // Exclude stories files
  if (componentPath.includes('.stories.')) {
    return acc;
  }
  
  // Exclude icon because there are some specific things that need to happen based on the URL inclusion of `icon.js`
  // in order for routing to work correctly
  if (componentPath.match(/icon\.ts$/)) {
    return acc;
  }

  // Excludes any components that are not extending the base components.
  const contents = fs.readFileSync(componentPath, 'utf-8');
  const baseComponentNames = Object.keys(baseComponents).map((baseComponent) => (
    // convert dash-case to UpperCamelCase
    baseComponent
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('')
  ));
  
  const extendsBaseComponent = baseComponentNames.some((baseComponentName) => 
    contents.includes(`extends ${baseComponentName}`)
  );
  
  if (extendsBaseComponent) {
    const name = componentPath.replace('./components/', '').replace('.ts', '').split('/').pop()!;
    acc[name] = componentPath;
  } else {
    console.warn(`${componentPath} doesn't extend any base components: ${baseComponentNames.join(', ')}`);
  }

  return acc;
}, {} as Record<string, string>);

const entry = {
  ...components,
  ...baseComponents,
  icon: './components/icon/icon.ts',
  index: './index.ts',
};

export default defineConfig({
  build: {
    lib: {
      entry,
      formats: ['es'],
    },
    outDir: 'lib',
    rollupOptions: {
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'index') {
            return 'index.js';
          }
          return `components/${chunkInfo.name}/${chunkInfo.name}.js`;
        },
        assetFileNames: (assetInfo) => {
          if (/\.(css|scss)$/.test(assetInfo.name!)) {
            return `components/[name]/[name].[ext]`;
          }
          if (/\.(svg\?raw|svg)$/.test(assetInfo.name!)) {
            return `svgs/[name].[ext]`;
          }
          if (/\.(woff|woff2|eot|ttf|otf)$/.test(assetInfo.name!)) {
            return `fonts/[name].[ext]`;
          }
          return `assets/[name].[ext]`;
        },
      },
      external: (id, parent) => {
        // Don't make entry modules external
        if (!parent) return false;
        // Don't bundle lit or other external dependencies
        if (id.includes('lit') || id.includes('node_modules')) return true;
        // Handle SVG imports with ?raw or ?.raw suffix from @cre8_dev/cre8-icons
        return false;
      }
    },
    copyPublicDir: false,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./design-tokens/core/scss/theming/head.module.css";`
      }
    }
  },
  resolve: {
    extensions: ['.js', '.cjs', '.ts', '.jsx', '.tsx','.svg?raw', '.scss','.scss', '.css', '.otf', '.ttf', '.yml']
  },
  esbuild: {
    // Use a custom loader to preprocess TypeScript files
    loader: 'ts',
    include: /\.(ts|js)$/,
    exclude: [],
  },
  plugins: [
    // Custom plugin to copy assets
    {
      name: 'copy-assets',
      generateBundle() {
        // Copy icons to consolidated SVG
        const iconFiles = glob.sync('icons/*.svg');
        if (iconFiles.length > 0) {
          // For now, just copy individual icons - you may want to consolidate them
          iconFiles.forEach(file => {
            const content = fs.readFileSync(file, 'utf-8');
            this.emitFile({
              type: 'asset',
              fileName: `icons/${file.replace('icons/', '')}`,
              source: content
            });
          });
        }

        // Copy design tokens
        const tokenFiles = glob.sync('design-tokens/**/*.scss', { nodir: false });
        tokenFiles.forEach(file => {
          const content = fs.readFileSync(file);
          this.emitFile({
            type: 'asset',
            fileName: file,
            source: content
          });
        });
      }
    }
  ]
});