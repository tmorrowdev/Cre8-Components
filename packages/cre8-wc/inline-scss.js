import fs from 'fs';
import path from 'path';
import * as sass from 'sass';

// Simple inline SCSS approach - read the component.scss and inline it
async function inlineComponentSCSS() {
  console.log('🔄 Testing inline SCSS approach...');
  
  // Read the component.scss content directly
  const componentScssPath = './design-tokens/core/scss/theming/component.scss';
  const componentScssContent = fs.readFileSync(componentScssPath, 'utf-8');
  
  console.log('📄 Component SCSS content:', componentScssContent);
  
  // Create SCSS content that includes the component imports inline
  const cardCssContent = `
// #CARD

:host {
  display: block;
}

/**
 * 1) A card is an organized block that typically contains a title, image,
 * text, and/or calls to action. It is made up of an optional header slot, required
 * body slot, and optional footer slot to place other Components and content within.
 */
.cre8-c-card {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: calc(var(--size-base-unit) * 3);
  gap: calc(var(--size-base-unit) * 2);
  border-color: var(--cre8-color-border-default);
  border-style: var(--cre8-border-style-default);
  border-width: var(--cre8-border-width-default);
  border-radius: var(--cre8-border-radius-default);
  background: var(--cre8-color-bg-default);
}
`;
  
  // Combine the component SCSS with card CSS
  const fullScssContent = componentScssContent + '\n' + cardCssContent;
  
  console.log('📝 Full SCSS to compile (length):', fullScssContent.length);
  
  try {
    // Compile the combined SCSS
    const result = sass.compileString(fullScssContent, {
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
    
    console.log('✅ SCSS compiled successfully!');
    console.log('📊 Compiled CSS length:', result.css.length);
    console.log('📄 Compiled CSS preview:', result.css.substring(0, 300));
    
  } catch (error) {
    console.log('❌ SCSS compilation error:', error.message);
    console.log('📍 Error details:', error);
  }
}

inlineComponentSCSS().catch(console.error);