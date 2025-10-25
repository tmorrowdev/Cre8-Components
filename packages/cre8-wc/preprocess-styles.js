import fs from 'fs';
import path from 'path';
import * as sass from 'sass';
import { glob } from 'glob';

// Preprocess all .styles.ts files to compile SCSS imports
async function preprocessStyles() {
  console.log('🔄 Preprocessing SCSS in .styles.ts files...');
  
  const styleFiles = glob.sync('./components/**/*.styles.ts');
  let processedCount = 0;
  let errorCount = 0;
  
  for (const filePath of styleFiles) {
    try {
      console.log(`\n📝 Processing: ${filePath}`);
      
      const originalContent = fs.readFileSync(filePath, 'utf-8');
      let modifiedContent = originalContent;
      let hasChanges = false;
      
      // Find CSS template literals with @import statements
      const cssTemplateRegex = /css`([^`]*@import[^`]*)`/gs;
      
      let match;
      while ((match = cssTemplateRegex.exec(originalContent)) !== null) {
        const originalCSS = match[1];
        console.log(`  🎯 Found @import in CSS template`);
        
        try {
          // Create a temporary SCSS file to process
          const tempScssPath = `${filePath}.temp.scss`;
          
          // Extract the SCSS content and resolve relative paths
          let scssContent = originalCSS;
          
          // Convert relative imports to absolute paths from project root
          const componentDir = path.dirname(filePath);
          const projectRoot = process.cwd();
          
          // Replace @import statements with resolved paths
          scssContent = scssContent.replace(
            /@import\s+['"]([^'"]+)['"]\s*;/g,
            (match, importPath) => {
              let resolvedPath;
              
              if (importPath.startsWith('./') || importPath.startsWith('../')) {
                // Resolve relative path from component directory
                resolvedPath = path.resolve(componentDir, importPath);
                // Convert back to relative from project root
                resolvedPath = path.relative(projectRoot, resolvedPath);
                
                // Ensure .scss extension
                if (!resolvedPath.endsWith('.scss') && !resolvedPath.includes('.scss')) {
                  resolvedPath += '.scss';
                }
              } else {
                resolvedPath = importPath;
              }
              
              return `@import '${resolvedPath}';`;
            }
          );
          
          console.log(`  📄 SCSS content preview:`, scssContent.substring(0, 200));
          
          // Write temporary SCSS file
          fs.writeFileSync(tempScssPath, scssContent);
          
          // Compile SCSS
          const result = sass.compile(tempScssPath, {
            includePaths: [
              path.resolve('.'),
              path.resolve('./design-tokens/core/scss/theming/'),
              path.resolve('./design-tokens/core/scss/'),
              path.resolve('./node_modules/.pnpm/@cre8_dev+cre8-design-tokens@1.0.3/node_modules/'),
              path.resolve('./node_modules/@cre8_dev/'),
              path.resolve('./node_modules')
            ],
            style: 'compressed'
          });
          
          const compiledCSS = result.css;
          console.log(`  ✅ SCSS compiled successfully (${compiledCSS.length} chars)`);
          
          // Replace the original CSS template with compiled CSS
          const newTemplate = `css\`${compiledCSS}\``;
          modifiedContent = modifiedContent.replace(match[0], newTemplate);
          hasChanges = true;
          
          // Clean up temp file
          fs.unlinkSync(tempScssPath);
          
        } catch (scssError) {
          console.log(`  ❌ SCSS compilation failed:`, scssError.message);
          errorCount++;
        }
      }
      
      // Write the modified file if changes were made
      if (hasChanges) {
        // Create a backup
        fs.writeFileSync(`${filePath}.backup`, originalContent);
        
        // Write the processed file
        fs.writeFileSync(filePath, modifiedContent);
        console.log(`  💾 Updated file with compiled CSS`);
        processedCount++;
      } else {
        console.log(`  ⏭️  No @import statements found, skipping`);
      }
      
    } catch (error) {
      console.log(`❌ Error processing ${filePath}:`, error.message);
      errorCount++;
    }
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`   Files processed: ${processedCount}`);
  console.log(`   Errors: ${errorCount}`);
  console.log(`   Total files checked: ${styleFiles.length}`);
  
  if (processedCount > 0) {
    console.log(`\n✅ SCSS preprocessing complete!`);
    console.log(`💡 To restore original files: find . -name "*.styles.ts.backup" -exec sh -c 'mv "$1" "${'${1%.backup}'}"' _ {} \\;`);
  }
}

// Function to restore original files from backups
function restoreOriginalFiles() {
  console.log('🔄 Restoring original .styles.ts files from backups...');
  
  const backupFiles = glob.sync('./components/**/*.styles.ts.backup');
  
  for (const backupPath of backupFiles) {
    const originalPath = backupPath.replace('.backup', '');
    fs.copyFileSync(backupPath, originalPath);
    fs.unlinkSync(backupPath);
    console.log(`✅ Restored: ${originalPath}`);
  }
  
  console.log(`📊 Restored ${backupFiles.length} files`);
}

// Command line interface
const command = process.argv[2];

if (command === 'preprocess') {
  preprocessStyles().catch(console.error);
} else if (command === 'restore') {
  restoreOriginalFiles();
} else {
  console.log('Usage:');
  console.log('  node preprocess-styles.js preprocess  # Process SCSS imports');
  console.log('  node preprocess-styles.js restore     # Restore original files');
}