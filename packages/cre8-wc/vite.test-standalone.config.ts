import { defineConfig } from 'vite';
import { glob } from 'glob';
import fs from 'fs';

// Test with just a simple component first
const entry = {
  'cre8-element': './components/cre8-element.ts',
  'card': './components/card/card.ts',
};

export default defineConfig({
  build: {
    lib: {
      entry,
      formats: ['es'],
    },
    outDir: 'lib-test-standalone',
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