import { defineConfig, build } from 'vite';
import fs from 'fs';
import path from 'path';
import * as sass from 'sass';

// Create a more comprehensive build with proper SCSS processing
async function buildCardWithSCSS() {
  console.log('Building card component with SCSS processing...');
  
  const config = defineConfig({
    build: {
      lib: {
        entry: './components/card/card.ts',
        formats: ['es', 'umd'],
        name: 'Cre8Card',
        fileName: (format) => `card.${format === 'es' ? 'js' : 'umd.js'}`
      },
      outDir: 'lib-card-scss',
      emptyOutDir: true,
      rollupOptions: {
        // Bundle all dependencies
        external: () => false,
        output: {
          inlineDynamicImports: true,
        }
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          // Make design tokens available to all SCSS
          includePaths: ['./design-tokens/core/scss/theming/'],
          additionalData: `
            @import "./design-tokens/core/scss/theming/component.scss";
          `
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
      // Custom plugin to inline SCSS content into .styles.ts files
      {
        name: 'scss-in-lit-styles',
        async transform(code, id) {
          // Only process .styles.ts files
          if (!id.endsWith('.styles.ts')) {
            return null;
          }
          
          console.log(`Processing SCSS in: ${id}`);
          
          // Extract CSS template literals with @import statements
          const cssTemplateRegex = /css`([^`]*@import[^`]*)`/gs;
          
          let transformedCode = code;
          let match;
          
          while ((match = cssTemplateRegex.exec(code)) !== null) {
            const originalCSS = match[1];
            console.log('Found CSS with @import:', originalCSS.substring(0, 100) + '...');
            
            try {
              // Read and inline the component.scss content
              const componentScssPath = path.resolve('./design-tokens/core/scss/theming/component.scss');
              let componentContent = '';
              
              if (fs.existsSync(componentScssPath)) {
                // Read all the SCSS files that component.scss imports
                const resetContent = fs.readFileSync('./design-tokens/core/scss/theming/reset.scss', 'utf-8');
                const breakpointsContent = fs.readFileSync('./design-tokens/core/scss/theming/breakpoints.scss', 'utf-8');
                const animationContent = fs.readFileSync('./design-tokens/core/scss/theming/animation.scss', 'utf-8');
                const functionsContent = fs.readFileSync('./design-tokens/core/scss/theming/functions.scss', 'utf-8');
                const variablesContent = fs.readFileSync('./design-tokens/core/scss/theming/variables.scss', 'utf-8');
                
                // Read typography-usage from node_modules
                const typographyPath = './node_modules/.pnpm/@cre8_dev+cre8-design-tokens@1.0.3/node_modules/@cre8_dev/cre8-design-tokens/lib/web/mixins/typography-usage.scss';
                let typographyContent = '';
                if (fs.existsSync(typographyPath)) {
                  typographyContent = fs.readFileSync(typographyPath, 'utf-8');
                }
                
                // Combine all the SCSS content in proper order
                componentContent = [
                  typographyContent,
                  resetContent,
                  breakpointsContent, 
                  animationContent,
                  functionsContent,
                  variablesContent
                ].join('\n\n');
                
                console.log(`✅ Inlined SCSS content (${componentContent.length} chars)`);
              }
              
              // Remove the @import and replace with inlined content + component styles
              const componentStyles = originalCSS.replace(/@import\s+['"][^'"]*['"]\s*;/g, '');
              const fullCSS = componentContent + '\n\n' + componentStyles;
              
              // Replace the original CSS template with the full inlined CSS
              const newTemplate = `css\`${fullCSS}\``;
              transformedCode = transformedCode.replace(match[0], newTemplate);
              
            } catch (error) {
              console.error('❌ SCSS inlining failed:', error.message);
              console.log('Skipping SCSS processing for this template');
            }
          }
          
          return transformedCode !== code ? { code: transformedCode, map: null } : null;
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
    console.log('✅ Card component built successfully with SCSS processing');
    
    // Verify the output includes compiled CSS
    const outputFile = './lib-card-scss/card.js';
    if (fs.existsSync(outputFile)) {
      const content = fs.readFileSync(outputFile, 'utf-8');
      console.log('📊 File size:', (content.length / 1024).toFixed(2), 'KB');
      
      // Check for design token CSS (should be compiled and included)
      const hasCompiledCSS = content.includes('display:') && content.includes('flex');
      const hasDesignTokens = content.includes('--cre8') || content.includes('rem') || content.includes('px');
      
      if (hasCompiledCSS) {
        console.log('✅ Compiled CSS found in bundle');
      } else {
        console.log('⚠️ Compiled CSS not detected');
      }
      
      if (hasDesignTokens) {
        console.log('✅ Design tokens appear to be included');
      } else {
        console.log('⚠️ Design tokens may not be fully included');
      }
    }
    
  } catch (error) {
    console.log('❌ Build failed:', error.message);
    console.log('Stack:', error.stack);
  }
}

buildCardWithSCSS().catch(console.error);