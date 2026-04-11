import { defineConfig } from 'vite';
import { glob } from 'glob';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Get base components - these are .ts files directly in ./components/
const baseComponents = glob.sync('./components/*.ts').reduce((acc, baseComponentPath) => {
  // Extract just the filename without path or extension
  const name = path.basename(baseComponentPath, '.ts');
  acc[name] = baseComponentPath;
  return acc;
}, {} as Record<string, string>);

// Only cre8-element and cre8-form-element are in the above location
// To allow extending off a web component it must be listed below
baseComponents['cre8-field'] = './components/field/field.ts';

// List of base component names for checking extends
const baseComponentNames = Object.keys(baseComponents).map((baseComponent) => (
  // convert dash-case to UpperCamelCase
  baseComponent
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
));

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

  const extendsBaseComponent = baseComponentNames.some((baseComponentName) =>
    contents.includes(`extends ${baseComponentName}`)
  );

  if (extendsBaseComponent) {
    const name = path.basename(componentPath, '.ts');
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
          if (Object.keys(baseComponents).includes(chunkInfo.name)) {
            return `components/${chunkInfo.name}.js`;
          }
          else if (chunkInfo.name === 'index') {
            return "index.js"
          }
          return `components/${chunkInfo.name}/${chunkInfo.name}.js`;
        },
        assetFileNames: (assetInfo) => {
          if (/\.(css|scss)$/.test(assetInfo.name!)) {
            return `components/[name]/[name].[ext]`;
          }
          if (/\.(svg)$/.test(assetInfo.name!)) {
            return `svgs/[name].[ext]`;
          }
          if (/\.(woff|woff2|eot|ttf|otf)$/.test(assetInfo.name!)) {
            return `fonts/[name].[ext]`;
          }
          return `assets/[name].[ext]`;
        },
      },
      external: [
        // External Lit dependencies - keep as external with proper package names
        'lit',
        'lit/decorators.js',
        'lit/directives/if-defined.js',
        'lit/directives/class-map.js',
        'lit/directives/style-map.js',
        'lit/directives/repeat.js',
        'lit/directives/unsafe-html.js',
        'lit-html',
        'lit-html/directives/if-defined.js',
        // External utility dependencies
        'classnames',
        'nanoid',
        '@a11y/focus-trap',
        'chart.js',
      ]
    },
    copyPublicDir: false,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./design-tokens/core/scss/theming/head.module.css";`,
        includePaths: [
          path.resolve(__dirname, 'node_modules')
        ]
      }
    }
  },
  resolve: {
    extensions: ['.js', '.cjs', '.ts', '.jsx', '.tsx', '.scss', '.css', '.otf', '.ttf', '.yml']
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
        const tokenFiles = glob.sync(['design-tokens/**/*.scss', 'design-tokens/**/*.css'], { nodir: false });
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