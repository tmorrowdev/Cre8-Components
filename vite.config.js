import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createRequire } from 'module';
import { readFileSync, existsSync } from 'fs';
import path from 'path';

const require = createRequire(import.meta.url);

/**
 * Handles `?raw` SVG imports from within @tmorrow/cre8-wc.
 *
 * @tmorrow/cre8-wc uses Vite's `?raw` suffix convention to inline icon SVGs
 * as strings (e.g. `import svg from "@tmorrow/cre8-wc/icons/…/foo.svg?raw"`).
 * Esbuild — used by Vite for dependency pre-bundling — does not understand the
 * `?raw` query parameter, producing 76 "Could not resolve" errors at build time.
 *
 * This plugin handles the gap:
 *   resolveId — converts "pkg/path.svg?raw" into a virtual module ID
 *   load      — reads the SVG file from disk and exports it as a JS string
 *
 * Combined with `optimizeDeps.exclude`, cre8 packages bypass esbuild entirely
 * and flow through Vite's own Rollup pipeline where this plugin is active.
 */
function cre8RawSvgPlugin() {
  return {
    name: 'cre8-raw-svg',
    enforce: 'pre',

    resolveId(source, importer) {
      if (!source.includes('.svg?raw')) return null;

      const cleanPath = source.replace('?raw', '');
      const importerDir = importer
        ? path.dirname(importer.replace(/\?raw$/, '').replace(/^\0cre8-svg:/, ''))
        : process.cwd();

      let resolvedPath;

      if (cleanPath.startsWith('.')) {
        // Relative import from within node_modules source
        resolvedPath = path.resolve(importerDir, cleanPath);
      } else {
        // Package-style import: @tmorrow/cre8-wc/icons/System/…/Foo.svg
        try {
          resolvedPath = require.resolve(cleanPath, { paths: [importerDir] });
        } catch {
          // Fallback: manually walk from the package root
          try {
            const segments = cleanPath.split('/');
            const scope = segments[0].startsWith('@')
              ? segments.slice(0, 2).join('/')
              : segments[0];
            const rest = segments[0].startsWith('@')
              ? segments.slice(2)
              : segments.slice(1);
            const pkgRoot = path.dirname(
              require.resolve(`${scope}/package.json`, { paths: [importerDir] })
            );
            resolvedPath = path.join(pkgRoot, ...rest);
          } catch {
            return null; // Let Vite's default resolution handle it
          }
        }
      }

      return `\0cre8-svg:${resolvedPath}`;
    },

    load(id) {
      if (!id.startsWith('\0cre8-svg:')) return null;

      const filePath = id.slice('\0cre8-svg:'.length);

      try {
        if (existsSync(filePath)) {
          return `export default ${JSON.stringify(readFileSync(filePath, 'utf-8'))};`;
        }
      } catch {
        // Swallow — SVG not found, return empty string so the component renders
      }

      return `export default '';`;
    },
  };
}

export default defineConfig({
  plugins: [cre8RawSvgPlugin(), react()],

  optimizeDeps: {
    // Prevent esbuild from pre-bundling these packages.
    // They use Vite's `?raw` SVG convention internally; esbuild can't handle it.
    // Excluding them routes their imports through Vite's Rollup pipeline instead,
    // where cre8RawSvgPlugin() can intercept and resolve the ?raw SVG imports.
    exclude: ['@tmorrow/cre8-react', '@tmorrow/cre8-wc'],
  },

  server: {
    port: 3000,
    open: true,
  },

  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
