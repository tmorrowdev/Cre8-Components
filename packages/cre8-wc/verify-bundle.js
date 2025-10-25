import fs from 'fs';

// Function to check if dependencies are properly bundled
function verifyBundledComponent(componentPath, componentName) {
  console.log(`\n🔍 Analyzing ${componentName} bundle...`);
  
  if (!fs.existsSync(componentPath)) {
    console.log(`❌ Component file not found: ${componentPath}`);
    return false;
  }
  
  const content = fs.readFileSync(componentPath, 'utf-8');
  const size = content.length;
  
  console.log(`📊 File size: ${(size / 1024).toFixed(2)} KB`);
  
  // Check for Lit bundling indicators
  const litIndicators = [
    'extends HTMLElement',  // ReactiveElement
    'extends.*{',           // LitElement and other classes
    'css`',
    'customElements.define',
    'shadowRoot',
    '_$cssResult$',
    'adoptedStyleSheets',
    'createRenderRoot',     // LitElement method
    'render()'              // Component render method
  ];
  
  const foundIndicators = [];
  const missingIndicators = [];
  
  litIndicators.forEach(indicator => {
    if (content.includes(indicator)) {
      foundIndicators.push(indicator);
    } else {
      missingIndicators.push(indicator);
    }
  });
  
  console.log(`✅ Found Lit indicators: ${foundIndicators.join(', ')}`);
  if (missingIndicators.length > 0) {
    console.log(`⚠️ Missing Lit indicators: ${missingIndicators.join(', ')}`);
  }
  
  // Check for external imports/requires
  const importMatches = content.match(/import\s+.*\s+from\s+['"][^'"]*['"]/g);
  const requireMatches = content.match(/require\(['"][^'"]*['"]\)/g);
  
  if (importMatches) {
    console.log(`❌ Found ${importMatches.length} import statements:`);
    importMatches.forEach(match => console.log(`   ${match}`));
  } else {
    console.log(`✅ No import statements found - fully bundled`);
  }
  
  if (requireMatches) {
    console.log(`❌ Found ${requireMatches.length} require statements:`);
    requireMatches.forEach(match => console.log(`   ${match}`));
  } else {
    console.log(`✅ No require statements found`);
  }
  
  // Check for CSS bundling
  const cssIndicators = [
    '.cre8-c-',  // Component CSS classes
    'display:',
    'flex',
    ':host'
  ];
  
  const foundCSS = cssIndicators.filter(indicator => content.includes(indicator));
  console.log(`✅ Found CSS indicators: ${foundCSS.length}/${cssIndicators.length} (${foundCSS.join(', ')})`);
  
  // Check for component registration
  const registrationPattern = /customElements\.define\(['"]([^'"]*)['"]/;
  const registrationMatch = content.match(registrationPattern);
  
  if (registrationMatch) {
    console.log(`✅ Component registered as: ${registrationMatch[1]}`);
  } else {
    console.log(`❌ No component registration found`);
  }
  
  // Overall assessment
  const isFullyBundled = !importMatches && !requireMatches && foundIndicators.length >= 4 && foundCSS.length >= 2 && registrationMatch;
  
  if (isFullyBundled) {
    console.log(`🎉 ${componentName} is fully bundled and standalone!`);
  } else {
    console.log(`⚠️ ${componentName} may have bundling issues`);
  }
  
  return isFullyBundled;
}

// Test the card component
console.log('='.repeat(60));
console.log('🧪 COMPONENT BUNDLE VERIFICATION');
console.log('='.repeat(60));

verifyBundledComponent('./lib-test-card/components/card/card.js', 'Card');

// Also check one from the main build if it exists
if (fs.existsSync('./lib-components/card/components/card/card.js')) {
  verifyBundledComponent('./lib-components/card/components/card/card.js', 'Card (main build)');
}

console.log('\n' + '='.repeat(60));