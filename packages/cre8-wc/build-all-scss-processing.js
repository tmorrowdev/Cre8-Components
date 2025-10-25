import { defineConfig, build } from 'vite';
import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

// Build all components with SCSS processing
async function buildAllWithSCSS() {
  console.log('🚀 Building all components with SCSS processing...');
  
  // Get all component directories (exclude ones that are problematic)
  const componentDirs = glob.sync('./components/*').filter(dir => {
    const componentName = path.basename(dir);
    // Skip these problematic components for now
    const skip = ['chart', 'logo', 'icon'];
    return !skip.includes(componentName);
  });
  
  const buildResults = [];
  
  for (const componentDir of componentDirs) {
    const componentName = path.basename(componentDir);
    const entryFile = `${componentDir}/${componentName}.ts`;
    
    // Check if the component entry file exists
    if (!fs.existsSync(entryFile)) {
      console.log(`⏭️ Skipping ${componentName} - no entry file found`);
      continue;
    }
    
    console.log(`\n📦 Building ${componentName}...`);
    
    const config = defineConfig({
      build: {
        lib: {
          entry: entryFile,
          formats: ['es', 'umd'],
          name: `Cre8${componentName.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join('')}`,
          fileName: (format) => `${componentName}.${format === 'es' ? 'js' : 'umd.js'}`
        },
        outDir: `lib-components-scss/${componentName}`,
        emptyOutDir: true,
        rollupOptions: {
          external: () => false,
          output: {
            inlineDynamicImports: true,
          }
        },
      },
      css: {
        preprocessorOptions: {
          scss: {
            includePaths: ['./design-tokens/core/scss/theming/'],
          }
        }
      },
      resolve: {
        extensions: ['.js', '.cjs', '.ts', '.jsx', '.tsx', '.svg?raw', '.scss', '.css'],
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
            
            // Extract CSS template literals with @import statements
            const cssTemplateRegex = /css\`([^\`]*@import[^\`]*)\`/gs;
            
            let transformedCode = code;
            let match;
            
            while ((match = cssTemplateRegex.exec(code)) !== null) {
              const originalCSS = match[1];
              
              try {
                // Read and inline the component.scss content
                let componentContent = '';
                
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
                
                // Remove the @import and replace with inlined content + component styles
                const componentStyles = originalCSS.replace(/@import\s+['"][^'"]*['"]\s*;/g, '');
                const fullCSS = componentContent + '\n\n' + componentStyles;
                
                // Replace the original CSS template with the full inlined CSS
                const newTemplate = `css\`${fullCSS}\``;
                transformedCode = transformedCode.replace(match[0], newTemplate);
                
              } catch (error) {
                console.error(`❌ SCSS inlining failed for ${componentName}:`, error.message);
              }
            }
            
            return transformedCode !== code ? { code: transformedCode, map: null } : null;
          }
        }
      ]
    });

    try {
      await build(config);
      console.log(`✅ ${componentName} built successfully`);
      
      // Verify the output
      const outputFile = `lib-components-scss/${componentName}/${componentName}.js`;
      if (fs.existsSync(outputFile)) {
        const content = fs.readFileSync(outputFile, 'utf-8');
        const sizeKB = (content.length / 1024).toFixed(2);
        buildResults.push({
          name: componentName,
          success: true,
          sizeKB: sizeKB,
          hasDesignTokens: content.includes('--cre8') || content.includes('var(--size-base-unit)')
        });
      }
      
    } catch (error) {
      console.log(`❌ ${componentName} build failed:`, error.message);
      buildResults.push({
        name: componentName,
        success: false,
        error: error.message
      });
    }
  }
  
  // Summary
  console.log('\n📊 Build Summary:');
  const successful = buildResults.filter(r => r.success);
  const failed = buildResults.filter(r => !r.success);
  
  console.log(`✅ Successful builds: ${successful.length}`);
  console.log(`❌ Failed builds: ${failed.length}`);
  
  if (successful.length > 0) {
    console.log('\n🎉 Successfully built components:');
    successful.forEach(result => {
      const tokensStatus = result.hasDesignTokens ? '🎨 with design tokens' : '⚠️ no design tokens detected';
      console.log(`   ${result.name} (${result.sizeKB}KB) - ${tokensStatus}`);
    });
  }
  
  if (failed.length > 0) {
    console.log('\n💥 Failed components:');
    failed.forEach(result => {
      console.log(`   ${result.name}: ${result.error}`);
    });
  }
  
  console.log(`\n🏁 Build complete! Output directory: lib-components-scss/`);
}

buildAllWithSCSS().catch(console.error);