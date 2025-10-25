import { defineConfig } from 'vite';
import { glob } from 'glob';
import fs from 'fs';

// Get base components
const baseComponents: Record<string, string> = {}
baseComponents['cre8-field'] = './components/field/field.ts';
baseComponents['cre8-element'] = './components/cre8-element.ts'
baseComponents['cre8-form-element'] = './components/cre8-form-element.ts'

// Get all component files that don't use problematic icon imports
const components = glob.sync('./components/*/*.ts').reduce((acc, componentPath) => {
  // Exclude stories files
  if (componentPath.includes('.stories.')) {
    return acc;
  }
  
  // Skip icon component for now due to dependency issues
  if (componentPath.match(/icon\.ts$/)) {
    return acc;
  }

  // Skip components that import icons with missing paths
  const contents = fs.readFileSync(componentPath, 'utf-8');
  const hasProblematicIconImport = contents.includes('@cre8_dev/cre8-icons/lib/icons/') || 
                                  contents.includes('../../icons/System/');
  
  if (hasProblematicIconImport) {
    console.warn(`Skipping ${componentPath} due to problematic icon imports`);
    return acc;
  }

  // Check if component extends base components
  const baseComponentNames = Object.keys(baseComponents).map((baseComponent) => (
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
  }

  return acc;
}, {} as Record<string, string>);

const entry = {
  ...components,
  ...baseComponents,
};

export default defineConfig({
  build: {
    lib: {
      entry,
      formats: ['es'],
    },
    outDir: 'lib-standalone',
    rollupOptions: {
      output: {
        entryFileNames: (chunkInfo) => {
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
      // Bundle all dependencies for standalone use
      external: () => false,
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
    loader: 'ts',
    include: /\.(ts|js)$/,
    exclude: [],
  },
  plugins: [
    // Custom plugin to copy assets for standalone builds
    {
      name: 'copy-assets-standalone',
      generateBundle() {
        // Copy icons
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