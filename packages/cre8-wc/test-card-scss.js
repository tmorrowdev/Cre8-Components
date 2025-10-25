import fs from 'fs';
import path from 'path';
import * as sass from 'sass';

async function testCardSCSS() {
  console.log('🔄 Testing SCSS compilation for card component...');
  
  const filePath = './components/card/card.styles.ts';
  const originalContent = fs.readFileSync(filePath, 'utf-8');
  
  console.log('📄 Original content preview:', originalContent.substring(0, 200));
  
  // Find CSS template literals with @import statements
  const cssTemplateRegex = /css`([^`]*@import[^`]*)`/gs;
  
  let match;
  while ((match = cssTemplateRegex.exec(originalContent)) !== null) {
    const originalCSS = match[1];
    console.log('🎯 Found CSS with @import:', originalCSS.substring(0, 100));
    
    // Convert relative imports to absolute paths from project root
    const componentDir = path.dirname(filePath);
    const projectRoot = process.cwd();
    
    console.log('📁 Component dir:', componentDir);
    console.log('📁 Project root:', projectRoot);
    
    // Replace @import statements with resolved paths
    let scssContent = originalCSS.replace(
      /@import\s+['"]([^'"]+)['"]\s*;/g,
      (match, importPath) => {
        console.log('🔍 Processing import:', importPath);
        
        let resolvedPath;
        
        if (importPath.startsWith('./') || importPath.startsWith('../')) {
          // Resolve relative path from component directory
          resolvedPath = path.resolve(componentDir, importPath);
          console.log('📍 Absolute resolved path:', resolvedPath);
          
          // Convert back to relative from project root
          resolvedPath = path.relative(projectRoot, resolvedPath);
          console.log('📍 Relative from project root:', resolvedPath);
          
          // Ensure .scss extension
          if (!resolvedPath.endsWith('.scss') && !resolvedPath.includes('.scss')) {
            resolvedPath += '.scss';
          }
        } else {
          resolvedPath = importPath;
        }
        
        console.log('✅ Final import path:', resolvedPath);
        return `@import '${resolvedPath}';`;
      }
    );
    
    console.log('📝 SCSS content to compile:', scssContent.substring(0, 200));
    
    try {
      const includePaths = [
        path.resolve('.'),
        path.resolve('./design-tokens/core/scss/theming/'),
        path.resolve('./design-tokens/core/scss/'),
        path.resolve('./node_modules/.pnpm/@cre8_dev+cre8-design-tokens@1.0.3/node_modules/'),
        path.resolve('./node_modules/@cre8_dev/'),
        path.resolve('./node_modules')
      ];
      
      console.log('📍 Include paths:');
      includePaths.forEach((p, i) => {
        console.log(`   ${i}: ${p} (exists: ${fs.existsSync(p)})`);
      });
      
      // Use compileString instead to avoid file path issues
      const result = sass.compileString(scssContent, {
        includePaths: includePaths,
        style: 'compressed'
      });
      
      console.log('✅ SCSS compiled successfully!');
      console.log('📊 Compiled CSS length:', result.css.length);
      console.log('📄 Compiled CSS preview:', result.css.substring(0, 200));
      
    } catch (error) {
      console.log('❌ SCSS compilation error:', error.message);
      console.log('📍 Error details:', error);
    }
  }
}

testCardSCSS().catch(console.error);