import { defineConfig } from 'vite';
import { glob } from 'glob';
import fs from 'fs';
import path from 'path';

// Get base components
const baseComponents = glob.sync('./components/*.ts').reduce((acc, baseComponentPath) => {
  const name = baseComponentPath.replace('./components/', '').replace('.ts', '');
  acc[name] = baseComponentPath;
  return acc;
}, {} as Record<string, string>);

// Only cre8-element and cre8-form-element are in the above location
// To allow extending off a web component it must be listed below
baseComponents['cre8-field'] = './components/field/field.ts';
baseComponents['cre8-element'] = './components/cre8-element.ts'
baseComponents['cre8-form-element'] = './components/cre8-form-element.ts'

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
      entry: './index.ts',
      name: 'Cre8Components',
      fileName: 'cre8-components',
      formats: ['umd', 'es']
    },
    outDir: 'lib-cdn',
    rollupOptions: {
      output: [
        {
          format: 'umd',
          name: 'Cre8Components',
          entryFileNames: 'cre8-components.umd.js',
          // Include all dependencies in the bundle for CDN use
          inlineDynamicImports: true,
        },
        {
          format: 'es',
          entryFileNames: 'cre8-components.js',
          // Include all dependencies in the bundle for CDN use
          inlineDynamicImports: true,
        }
      ],
      // Don't externalize anything for CDN build - bundle everything
      external: () => false
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
    extensions: ['.js', '.cjs', '.ts', '.jsx', '.tsx','.svg?raw', '.scss','.scss', '.css', '.otf', '.ttf', '.yml'],
    alias: {
      // Map the problematic icon imports to actual files
      '@cre8_dev/cre8-icons/lib/icons/System/Regular/Check.svg?raw': path.resolve('./node_modules/@cre8_dev/cre8-icons/icons/System/Regular/Check.svg'),
      '@cre8_dev/cre8-icons/lib/icons/System/Filled/Check.svg?raw': path.resolve('./node_modules/@cre8_dev/cre8-icons/icons/System/Filled/Check.svg'),
    }
  },
  esbuild: {
    loader: 'ts',
    include: /\.(ts|js)$/,
    exclude: [],
  },
  plugins: [
    // Custom plugin to handle SVG imports and copy assets for CDN build
    {
      name: 'svg-loader-cdn',
      load(id) {
        if (id.endsWith('.svg?raw')) {
          const svgPath = id.replace('?raw', '');
          if (fs.existsSync(svgPath)) {
            return `export default ${JSON.stringify(fs.readFileSync(svgPath, 'utf-8'))}`;
          }
        }
        return null;
      },
      generateBundle() {
        // Copy icons to consolidated SVG
        const iconFiles = glob.sync('icons/*.svg');
        if (iconFiles.length > 0) {
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