import { defineConfig } from 'vite';
import { resolve } from 'path';

/**
 * CDN Build Configuration
 *
 * This configuration creates a bundled build suitable for CDN deployment.
 * It bundles all dependencies (lit, lit-html, classnames, design tokens)
 * into a single file that can be loaded via <script> tag.
 *
 * Usage:
 *   <script src="https://cdn.example.com/cre8-wc.min.js"></script>
 *   <!-- All cre8-* components are now available -->
 *   <cre8-button>Click me</cre8-button>
 *
 * Or as ES module:
 *   <script type="module" src="https://cdn.example.com/cre8-wc.esm.js"></script>
 */
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'cdn-entry.ts'),
      name: 'Cre8WC',
      formats: ['es', 'iife'],
      fileName: (format) => {
        if (format === 'es') return 'cre8-wc.esm.js';
        if (format === 'iife') return 'cre8-wc.min.js';
        return `cre8-wc.${format}.js`;
      },
    },
    outDir: 'cdn',
    emptyOutDir: true,
    minify: 'esbuild',
    sourcemap: true,
    rollupOptions: {
      output: {
        // Ensure all code is in one file
        inlineDynamicImports: true,
        // Global variable name for IIFE build
        name: 'Cre8WC',
        // Preserve exports for ES module build
        exports: 'named',
        assetFileNames: (assetInfo) => {
          if (/\.(css|scss)$/.test(assetInfo.name!)) {
            return 'cre8-wc.css';
          }
          if (/\.(woff|woff2|eot|ttf|otf)$/.test(assetInfo.name!)) {
            return `fonts/[name].[ext]`;
          }
          return `assets/[name].[ext]`;
        },
      },
      // Don't mark anything as external - bundle everything
      external: [],
    },
    // Increase chunk size warning limit since we're bundling everything
    chunkSizeWarningLimit: 2000,
    copyPublicDir: false,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./design-tokens/core/scss/theming/head.module.css";`,
        includePaths: [
          resolve(__dirname, 'node_modules')
        ]
      }
    }
  },
  resolve: {
    alias: {
      '@tmorrow/cre8-wc/icons': resolve(__dirname, 'icons'),
    },
    extensions: ['.js', '.cjs', '.ts', '.jsx', '.tsx', '.scss', '.css', '.otf', '.ttf', '.yml']
  },
  esbuild: {
    loader: 'ts',
    include: /\.(ts|js)$/,
    exclude: [],
  },
  define: {
    // Ensure lit doesn't try to use dev mode in production
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
});
