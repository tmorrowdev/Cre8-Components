export interface PromptContext {
  brandName: string;
  sourceUrl: string;
  designTokensExample: string;
  extractedTokens: any;
  brandContext?: string;
}

export class AIPromptEngine {
  
  getSystemPrompt(): string {
    return `You are an expert **Brand Theming Assistant AI** for the cre8 Design System. 

Your expertise includes:
- Brand analysis and color theory
- Design system token mapping
- CSS custom property architecture
- Accessibility and contrast requirements
- Modern design trends

Your task is to create professional, branded CSS themes that accurately represent the source brand while adhering to our design system architecture.

CRITICAL REQUIREMENTS:
1. Output ONLY valid CSS with :root selector
2. Use our exact naming conventions for CSS custom properties
3. Ensure accessibility standards (WCAG 2.1 AA)
4. Create semantic color mappings, not just direct copies
5. Provide appropriate fallbacks for missing values
6. Maintain consistency across all token categories
7. Consider brand personality in color choices

NAMING CONVENTIONS:
- Colors: --cds-color-{semantic-name} (primary, secondary, accent, success, warning, danger, info, surface, background, text, etc.)
- Typography: --cds-font-{property}-{size/weight} 
- Spacing: --cds-space-{size} (xs, sm, md, lg, xl, 2xl, 3xl)
- Border radius: --cds-radius-{size} (none, sm, md, lg, xl, full)
- Shadows: --cds-shadow-{size} (sm, md, lg, xl, inner)
- Breakpoints: --cds-breakpoint-{size} (sm, md, lg, xl, 2xl)

ACCESSIBILITY REQUIREMENTS:
- Ensure color contrast ratios meet WCAG AA standards
- Primary/secondary colors must have sufficient contrast with text colors
- Provide both light and dark variants where appropriate`;
  }

  getUserPrompt(context: PromptContext): string {
    const { brandName, sourceUrl, extractedTokens, brandContext } = context;
    
    const brandAnalysis = brandContext || this.generateBrandContext(brandName, sourceUrl);
    
    return `Create a comprehensive CSS theme for "${brandName}" based on analysis of ${sourceUrl}.

BRAND CONTEXT:
${brandAnalysis}

EXTRACTED VALUES:
Colors: ${extractedTokens.colors?.join(', ') || 'None found'}
Background Colors: ${extractedTokens.backgrounds?.join(', ') || 'None found'}
Font Sizes: ${extractedTokens.fontSizes?.join(', ') || 'None found'}
Line Heights: ${extractedTokens.lineHeights?.join(', ') || 'None found'}
Font Families: ${extractedTokens.fontFamilies?.join(', ') || 'None found'}
Spacings: ${extractedTokens.spacings?.join(', ') || 'None found'}
Border Radiuses: ${extractedTokens.borderRadiuses?.join(', ') || 'None found'}
Shadows: ${extractedTokens.shadows?.join(', ') || 'None found'}
Breakpoints: ${extractedTokens.breakpoints?.join(', ') || 'None found'}

INSTRUCTIONS:
1. Analyze the extracted values to understand the brand's visual identity
2. Create semantic color mappings that reflect the brand personality
3. Establish a logical typography scale using the found font sizes
4. Map spacing values to our design system scale
5. Ensure all colors have appropriate contrast ratios
6. Include comprehensive shadow and radius tokens
7. Add any missing essential tokens with brand-appropriate values

DELIVERABLE:
Provide a complete CSS file with :root block containing all necessary design tokens for a full-featured theme.`;
  }

  getEnhancedSystemPrompt(): string {
    return `${this.getSystemPrompt()}

ADVANCED CAPABILITIES:
- Semantic color analysis: Understand color psychology and brand meaning
- Adaptive token generation: Fill gaps intelligently based on brand context
- Cross-category relationships: Ensure harmonious token relationships
- Future-proofing: Include tokens for common use cases even if not found

TOKEN GENERATION STRATEGY:
1. SEMANTIC MAPPING: Map colors to semantic meanings (primary = brand color, not just first color found)
2. MATHEMATICAL RELATIONSHIPS: Create logical progressions (spacing scale, typography scale)
3. ACCESSIBILITY FIRST: All color combinations must meet contrast requirements
4. BRAND CONSISTENCY: Maintain brand personality throughout all token choices
5. COMPLETENESS: Provide complete token sets even if source is incomplete

QUALITY STANDARDS:
- All colors must be valid CSS color values
- Font sizes should follow a logical scale (1.2-1.618 ratio recommended)
- Spacing should use consistent units (rem preferred)
- Border radius should progress logically
- Shadows should have consistent color relationships`;
  }

  getValidationPrompt(cssContent: string, brandName: string): string {
    return `Review and improve this CSS theme for "${brandName}":

${cssContent}

VALIDATION CHECKLIST:
1. ✅ All CSS custom properties follow our naming conventions
2. ✅ Colors meet WCAG AA contrast requirements
3. ✅ Typography scale is logical and complete
4. ✅ Spacing values follow a consistent scale
5. ✅ All token categories are represented
6. ✅ Values are valid CSS
7. ✅ Theme reflects brand personality
8. ✅ No duplicate or conflicting tokens

IMPROVEMENTS NEEDED:
- Fix any naming convention violations
- Improve color accessibility if needed
- Fill missing token categories
- Adjust values for better brand representation
- Add comments for complex decisions

Provide the corrected CSS theme with improvements.`;
  }

  getOptimizationPrompt(cssContent: string, brandName: string): string {
    return `Optimize this CSS theme for "${brandName}" for production use:

${cssContent}

OPTIMIZATION GOALS:
1. Reduce redundancy and consolidate similar values
2. Ensure semantic consistency across related tokens
3. Add missing tokens that would commonly be needed
4. Improve organization and documentation
5. Validate all mathematical relationships

SPECIFIC IMPROVEMENTS:
- Consolidate colors that are too similar
- Ensure typography scale follows golden ratio or major scale
- Verify spacing scale is mathematical progression
- Add semantic aliases for common use cases
- Include hover/focus states for interactive colors
- Add semantic color variants (light/dark/contrast)

Provide the optimized CSS theme with clear organization and comprehensive coverage.`;
  }

  private generateBrandContext(brandName: string, sourceUrl: string): string {
    const domain = new URL(sourceUrl).hostname.replace('www.', '');
    
    // Simple brand context inference - in a real system, this could be enhanced with a brand database
    const brandContexts: Record<string, string> = {
      'nike.com': 'Athletic performance brand. Bold, energetic, motivational. Primary color: Black with orange accents. Modern, athletic aesthetic.',
      'apple.com': 'Premium technology brand. Minimalist, clean, sophisticated. Neutral colors with subtle accents. Focus on white space and simplicity.',
      'starbucks.com': 'Premium coffee experience. Warm, welcoming, community-focused. Green primary color. Natural, organic feel.',
      'mcdonalds.com': 'Fast food, family-friendly. Bright, energetic, approachable. Red and yellow primary colors. Playful and accessible.',
      'spotify.com': 'Music streaming platform. Young, vibrant, creative. Green primary color. Dark themes with bright accents.',
      'airbnb.com': 'Travel and hospitality. Friendly, trustworthy, adventurous. Red-pink primary color. Warm and inviting.',
      'uber.com': 'Transportation technology. Modern, reliable, efficient. Black with strategic color accents. Clean and professional.',
      'netflix.com': 'Entertainment streaming. Bold, cinematic, engaging. Red primary color. Dark themes with dramatic contrast.',
    };

    return brandContexts[domain] || 
      `${brandName} brand from ${domain}. Analyze the extracted colors and design elements to understand the brand personality. Consider the industry, target audience, and brand positioning when creating semantic color mappings.`;
  }

  getIterativeImprovementPrompt(
    currentCss: string, 
    feedback: string, 
    brandName: string
  ): string {
    return `Improve this CSS theme for "${brandName}" based on the following feedback:

CURRENT THEME:
${currentCss}

FEEDBACK:
${feedback}

IMPROVEMENT INSTRUCTIONS:
1. Address all specific feedback points
2. Maintain brand consistency while making improvements
3. Ensure any changes don't break existing token relationships
4. Add explanatory comments for significant changes
5. Validate that improvements maintain accessibility standards

Provide the improved CSS theme with clear indication of what was changed and why.`;
  }

  getComparisonPrompt(theme1: string, theme2: string, brandName: string): string {
    return `Compare these two CSS theme variations for "${brandName}" and recommend the best option:

THEME A:
${theme1}

THEME B:
${theme2}

EVALUATION CRITERIA:
1. Brand accuracy and personality representation
2. Accessibility and contrast compliance
3. Completeness and token coverage
4. Semantic clarity and naming consistency
5. Scalability and maintainability

Provide:
1. Detailed comparison analysis
2. Recommendation with reasoning
3. Suggested improvements for the chosen theme
4. Hybrid approach if elements from both themes should be combined`;
  }
}

export const aiPrompts = new AIPromptEngine();