import { defineConfig, build } from 'vite';
import fs from 'fs';
import path from 'path';

// Simple test to build just the card component
async function buildCard() {
  console.log('Building card component specifically...');
  
  const config = defineConfig({
    build: {
      lib: {
        entry: './components/card/card.ts',
        formats: ['es', 'umd'],
        name: 'Cre8Card',
        fileName: (format) => `card.${format === 'es' ? 'js' : 'umd.js'}`
      },
      outDir: 'lib-test-card',
      emptyOutDir: true,
      rollupOptions: {
        // Bundle all dependencies
        external: () => false,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          // Include design tokens for all SCSS processing
          additionalData: `@import "./design-tokens/core/scss/theming/component.scss";`
        }
      }
    },
    resolve: {
      extensions: ['.js', '.cjs', '.ts', '.jsx', '.tsx', '.svg?raw', '.scss', '.css', '.otf', '.ttf', '.yml'],
    },
    esbuild: {
      loader: 'ts',
      include: /\.(ts|js)$/,
    },
    plugins: [
      // Custom plugin to handle style imports
      {
        name: 'style-resolver',
        resolveId(id, importer) {
          // Handle .styles.js imports by mapping them to .styles.ts
          if (id.endsWith('.styles.js') && importer) {
            const stylesPath = path.resolve(path.dirname(importer), id.replace('.styles.js', '.styles.ts'));
            console.log(`Resolving ${id} to ${stylesPath}`);
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
    console.log('✅ Card component built successfully');
    
    // Check if the output file contains styles
    const outputFile = './lib-test-card/card.js';
    if (fs.existsSync(outputFile)) {
      const content = fs.readFileSync(outputFile, 'utf-8');
      console.log('Checking if styles are bundled...');
      
      if (content.includes('.cre8-c-card') || content.includes('display: block')) {
        console.log('✅ Styles are bundled in the component');
      } else {
        console.log('❌ Styles are NOT bundled in the component');
      }
      
      console.log('File size:', (content.length / 1024).toFixed(2), 'KB');
    }
    
  } catch (error) {
    console.log('❌ Failed to build card:', error.message);
  }
}

buildCard().catch(console.error);