#!/usr/bin/env node

import { config } from 'dotenv';
import puppeteer from 'puppeteer';
import * as fs from 'fs/promises';
import css from 'css';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from .env file
config();

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface CssTokenGroups {
  colors: string[];
  backgrounds: string[];
  fontSizes: string[];
  lineHeights: string[];
  spacings: string[];
  borderRadiuses: string[];
  shadows: string[];
  breakpoints: string[];
  fontFamilies: string[];
  zIndexes: string[];
}

interface ThemeConfig {
  name: string;
  url: string;
  description?: string;
  outputPath?: string;
}

class ThemeGenerator {
  private designTokensPath: string;

  constructor() {
    this.designTokensPath = path.resolve(__dirname, '../design-tokens');
  }

  async extractCssFromUrl(url: string): Promise<string> {
    console.log(`🔍 Extracting CSS from: ${url}`);
    
    const browser = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    try {
      const page = await browser.newPage();
      
      // Set user agent and viewport for better compatibility
      await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36');
      await page.setViewport({ width: 1200, height: 800 });
      
      await page.goto(url, { 
        waitUntil: 'networkidle0', 
        timeout: 30000 
      });
      
      const cssText = await page.evaluate(async () => {
        // Get external stylesheets
        const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
          .map(l => (l as HTMLLinkElement).href)
          .filter(href => href && !href.includes('fonts.googleapis.com')); // Skip Google Fonts
        
        // Get inline styles
        const styles = Array.from(document.querySelectorAll('style'))
          .map(s => (s as HTMLStyleElement).innerHTML || '');
        
        // Fetch external stylesheets
        const fetched = await Promise.all(
          links.map(async (url) => {
            try {
              const response = await fetch(url);
              return response.ok ? await response.text() : '';
            } catch {
              return '';
            }
          })
        );
        
        return [...styles, ...fetched].join('\n');
      });
      
      console.log(`✅ Extracted ${cssText.length} characters of CSS`);
      return cssText;
    } finally {
      await browser.close();
    }
  }

  private sanitizeCss(cssText: string): string {
    // Remove RTL comments and other problematic patterns
    return cssText
      // Remove RTL comments like /*!rtl:ignore;*/
      .replace(/\/\*!rtl:[^*]*\*\//g, '')
      // Remove malformed RTL comments that don't close properly
      .replace(/\/\*!rtl:[^}]*/g, '')
      // Remove any remaining unclosed comments
      .replace(/\/\*[^*]*(?:\*(?!\/))[^*]*\*+\//g, '')
      // Fix missing semicolons before closing braces
      .replace(/([^;{}])\s*}/g, '$1;}')
      // Remove empty rules
      .replace(/[^{}]+{\s*}/g, '')
      // Clean up multiple whitespace
      .replace(/\s+/g, ' ')
      .trim();
  }

  parseCss(cssText: string): CssTokenGroups {
    console.log('🔍 Parsing and categorizing CSS values...');
    
    try {
      // Sanitize CSS before parsing
      const sanitizedCss = this.sanitizeCss(cssText);
      const ast = css.parse(sanitizedCss);
      const categories = {
        colors: new Set<string>(),
        backgrounds: new Set<string>(),
        fontSizes: new Set<string>(),
        lineHeights: new Set<string>(),
        spacings: new Set<string>(),
        borderRadiuses: new Set<string>(),
        shadows: new Set<string>(),
        breakpoints: new Set<string>(),
        fontFamilies: new Set<string>(),
        zIndexes: new Set<string>(),
      };

      if (ast.stylesheet?.rules) {
        for (const rule of ast.stylesheet.rules) {
          if (rule.type !== 'rule' || !rule.declarations) continue;
          
          for (const decl of rule.declarations) {
            if (decl.type !== 'declaration' || !decl.property || !decl.value) continue;
            
            const prop = decl.property;
            const val = decl.value;
            
            // Skip CSS variables and complex values
            if (val.includes('var(') || val.includes('calc(')) continue;
            
            // Categorize properties
            if (/^font-size$/.test(prop)) {
              categories.fontSizes.add(val);
            } else if (/^line-height$/.test(prop)) {
              categories.lineHeights.add(val);
            } else if (/^font-family$/.test(prop)) {
              categories.fontFamilies.add(val);
            } else if (/margin|padding|gap|width|height/.test(prop) && /\d+(px|rem|em|%)/.test(val)) {
              categories.spacings.add(val);
            } else if (/border-radius/.test(prop)) {
              categories.borderRadiuses.add(val);
            } else if (/box-shadow|text-shadow/.test(prop)) {
              categories.shadows.add(val);
            } else if (/^background(-color)?$/.test(prop)) {
              categories.backgrounds.add(val);
            } else if (/^color$/.test(prop) || prop.includes('color')) {
              categories.colors.add(val);
            } else if (/z-index/.test(prop)) {
              categories.zIndexes.add(val);
            }
          }
        }
        
        // Extract media query breakpoints
        for (const rule of ast.stylesheet.rules) {
          if (rule.type === 'media' && rule.media) {
            const mediaText = rule.media;
            const breakpointMatch = mediaText.match(/min-width:\s*(\d+(?:\.\d+)?(?:px|rem|em))/);
            if (breakpointMatch) {
              categories.breakpoints.add(breakpointMatch[1]);
            }
          }
        }
      }

      // Convert Sets to Arrays and filter common values
      const result: CssTokenGroups = {
        colors: this.filterAndSortValues(categories.colors, this.isValidColor),
        backgrounds: this.filterAndSortValues(categories.backgrounds, this.isValidColor),
        fontSizes: this.filterAndSortValues(categories.fontSizes, this.isValidSize),
        lineHeights: this.filterAndSortValues(categories.lineHeights, this.isValidLineHeight),
        spacings: this.filterAndSortValues(categories.spacings, this.isValidSize),
        borderRadiuses: this.filterAndSortValues(categories.borderRadiuses, this.isValidSize),
        shadows: Array.from(categories.shadows).slice(0, 10), // Limit shadows
        breakpoints: this.filterAndSortValues(categories.breakpoints, this.isValidSize),
        fontFamilies: Array.from(categories.fontFamilies).slice(0, 5), // Limit font families
        zIndexes: this.filterAndSortValues(categories.zIndexes, this.isValidZIndex),
      };

      console.log('📊 Extracted tokens:', {
        colors: result.colors.length,
        backgrounds: result.backgrounds.length,
        fontSizes: result.fontSizes.length,
        lineHeights: result.lineHeights.length,
        spacings: result.spacings.length,
        borderRadiuses: result.borderRadiuses.length,
        shadows: result.shadows.length,
        breakpoints: result.breakpoints.length,
        fontFamilies: result.fontFamilies.length,
        zIndexes: result.zIndexes.length,
      });

      return result;
    } catch (error) {
      console.error('❌ Error parsing CSS, falling back to regex extraction:', error);
      
      // Fallback: Use regex to extract basic design tokens
      return this.extractTokensWithRegex(cssText);
    }
  }

  private extractTokensWithRegex(cssText: string): CssTokenGroups {
    console.log('🔧 Using regex fallback for token extraction...');
    
    const categories = {
      colors: new Set<string>(),
      backgrounds: new Set<string>(),
      fontSizes: new Set<string>(),
      lineHeights: new Set<string>(),
      spacings: new Set<string>(),
      borderRadiuses: new Set<string>(),
      shadows: new Set<string>(),
      breakpoints: new Set<string>(),
      fontFamilies: new Set<string>(),
      zIndexes: new Set<string>(),
    };

    // Extract colors (hex, rgb, rgba, named colors)
    const colorMatches = cssText.match(/(color|background-color|border-color|background):\s*([^;]+)/g);
    if (colorMatches) {
      colorMatches.forEach(match => {
        const value = match.split(':')[1]?.trim();
        if (value && this.isValidColor(value)) {
          if (match.includes('background')) {
            categories.backgrounds.add(value);
          } else {
            categories.colors.add(value);
          }
        }
      });
    }

    // Extract font sizes
    const fontSizeMatches = cssText.match(/font-size:\s*([^;]+)/g);
    if (fontSizeMatches) {
      fontSizeMatches.forEach(match => {
        const value = match.split(':')[1]?.trim();
        if (value && this.isValidsize(value)) {
          categories.fontSizes.add(value);
        }
      });
    }

    // Extract breakpoints from media queries
    const breakpointMatches = cssText.match(/@media[^{]*min-width:\s*(\d+(?:\.\d+)?(?:px|rem|em))/g);
    if (breakpointMatches) {
      breakpointMatches.forEach(match => {
        const breakpointMatch = match.match(/min-width:\s*(\d+(?:\.\d+)?(?:px|rem|em))/);
        if (breakpointMatch && breakpointMatch[1]) {
          categories.breakpoints.add(breakpointMatch[1]);
        }
      });
    }

    // Return filtered results
    return {
      colors: this.filterAndSortValues(categories.colors, this.isValidColor),
      backgrounds: this.filterAndSortValues(categories.backgrounds, this.isValidColor),
      fontSizes: this.filterAndSortValues(categories.fontSizes, this.isValidSize),
      lineHeights: ['1.2', '1.4', '1.5', '1.6'], // Common defaults
      spacings: ['4px', '8px', '12px', '16px', '24px', '32px', '48px', '64px'], // Common defaults
      borderRadiuses: ['4px', '8px', '12px', '16px'], // Common defaults
      shadows: [], // Empty for fallback
      breakpoints: this.filterAndSortValues(categories.breakpoints, this.isValidSize),
      fontFamilies: ['"Helvetica Neue", Arial, sans-serif'], // Default fallback
      zIndexes: ['1', '10', '100', '1000'], // Common defaults
    };
  }

  private filterAndSortValues(set: Set<string>, validator: (val: string) => boolean): string[] {
    return Array.from(set)
      .filter(validator)
      .filter((val, index, arr) => arr.indexOf(val) === index) // Remove duplicates
      .slice(0, 20) // Limit to 20 most common values
      .sort();
  }

  private isValidColor = (val: string): boolean => {
    return /^(#[0-9a-f]{3,8}|rgb|hsl|transparent|inherit|currentColor)/.test(val.toLowerCase());
  };

  private isValidSize = (val: string): boolean => {
    return /^\d+(\.\d+)?(px|rem|em|%)$/.test(val) && !val.startsWith('0.');
  };

  private isValidLineHeight = (val: string): boolean => {
    return /^\d+(\.\d+)?$/.test(val) || this.isValidsize(val);
  };

  private isValidZIndex = (val: string): boolean => {
    const num = parseInt(val);
    return !isNaN(num) && num >= -1 && num <= 9999;
  };

  async generateTokensWithAI(
    groups: CssTokenGroups, 
    themeName: string, 
    sourceUrl: string,
    options: { enhance?: boolean; validate?: boolean } = {}
  ): Promise<string> {
    console.log('🤖 Generating tokens with AI...');
    
    if (!process.env.OPENAI_API_KEY) {
      console.error('❌ Error: OPENAI_API_KEY environment variable is not set.');
      process.exit(1);
    }

    // Load AI prompt engine
    const { aiPrompts } = await import('./ai-prompts');
    
    // Load existing design tokens for reference
    const designTokensExample = await this.getDesignTokensReference();

    const systemMessage = options.enhance 
      ? aiPrompts.getEnhancedSystemPrompt()
      : aiPrompts.getSystemPrompt();

    const userPrompt = aiPrompts.getUserPrompt({
      brandName: themeName,
      sourceUrl,
      designTokensExample,
      extractedTokens: groups
    });

    try {
      const { OpenAI } = await import('openai');
      const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      
      console.log('🔮 Calling OpenAI with enhanced prompts...');
      
      const response = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.2, // Lower temperature for more consistent output
        max_tokens: 3000, // More tokens for comprehensive themes
      });

      let result = response.choices[0].message.content;
      if (!result) {
        throw new Error('AI did not return any content');
      }

      // Validation and improvement pass
      if (options.validate) {
        console.log('🔍 Validating and improving theme...');
        
        const validationPrompt = aiPrompts.getValidationPrompt(result, themeName);
        const validationResponse = await client.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'You are a CSS theme validator and improver.' },
            { role: 'user', content: validationPrompt }
          ],
          temperature: 0.1,
          max_tokens: 3000,
        });

        if (validationResponse.choices[0].message.content) {
          result = validationResponse.choices[0].message.content;
          console.log('✅ Theme validated and improved');
        }
      }

      console.log('✅ AI theme generation completed');
      return result;
    } catch (error) {
      console.error('❌ Error calling OpenAI:', error);
      throw error;
    }
  }

  private async getDesignTokensReference(): Promise<string> {
    try {
      // Try to read an existing theme file as reference
      const examplePath = path.join(this.designTokensPath, 'starbucks/tokens.css');
      const example = await fs.readFile(examplePath, 'utf-8');
      return example.substring(0, 1000) + '\n/* ... */';
    } catch {
      // Fallback example structure
      return `:root {
  /* Colors */
  --cds-color-primary: #007bff;
  --cds-color-secondary: #6c757d;
  --cds-color-success: #28a745;
  --cds-color-danger: #dc3545;
  --cds-color-warning: #ffc107;
  --cds-color-info: #17a2b8;
  --cds-color-light: #f8f9fa;
  --cds-color-dark: #343a40;
  
  /* Typography */
  --cds-font-size-xs: 0.75rem;
  --cds-font-size-sm: 0.875rem;
  --cds-font-size-md: 1rem;
  --cds-font-size-lg: 1.25rem;
  --cds-font-size-xl: 1.5rem;
  
  /* Spacing */
  --cds-space-xs: 0.25rem;
  --cds-space-sm: 0.5rem;
  --cds-space-md: 1rem;
  --cds-space-lg: 1.5rem;
  --cds-space-xl: 3rem;
}`;
    }
  }

  async saveTheme(themeConfig: ThemeConfig, tokensCss: string): Promise<string> {
    const themeName = themeConfig.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const themeDir = path.join(this.designTokensPath, themeName);
    
    // Create theme directory
    await fs.mkdir(themeDir, { recursive: true });
    
    // Save theme CSS
    const cssPath = path.join(themeDir, 'tokens.css');
    await fs.writeFile(cssPath, tokensCss, 'utf-8');
    
    // Save theme metadata
    const metadataPath = path.join(themeDir, 'theme.json');
    const metadata = {
      name: themeConfig.name,
      url: themeConfig.url,
      description: themeConfig.description || `Theme generated from ${themeConfig.url}`,
      generated: new Date().toISOString(),
      version: '1.0.0',
    };
    await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2), 'utf-8');
    
    console.log(`💾 Theme saved to: ${themeDir}`);
    return cssPath;
  }

  async generateTheme(
    config: ThemeConfig, 
    options: { enhance?: boolean; validate?: boolean } = { enhance: true, validate: true }
  ): Promise<string> {
    try {
      console.log(`🚀 Starting theme generation for: ${config.name}`);
      
      // Extract CSS from URL
      const cssText = await this.extractCssFromUrl(config.url);
      
      // Parse CSS into token groups
      const groups = this.parseCss(cssText);
      
      // Generate tokens with AI
      const tokensCss = await this.generateTokensWithAI(
        groups, 
        config.name, 
        config.url, 
        options
      );
      
      // Save theme
      const savedPath = await this.saveTheme(config, tokensCss);
      
      console.log(`🎉 Theme "${config.name}" generated successfully!`);
      console.log(`📁 Saved to: ${savedPath}`);
      
      return savedPath;
    } catch (error) {
      console.error(`❌ Failed to generate theme "${config.name}":`, error);
      throw error;
    }
  }
}

// CLI Interface
if (import.meta.url === `file://${process.argv[1]}`) {
  const generator = new ThemeGenerator();
  
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.log(`
🎨 Theme Generator CLI

Usage: 
  npm run generate-theme <theme-name> <url> [description]

Examples:
  npm run generate-theme "Nike" "https://nike.com" "Athletic brand theme"
  npm run generate-theme "Spotify" "https://spotify.com"

Environment Setup:
  1. Get your OpenAI API key from: https://platform.openai.com/api-keys
  2. Set the environment variable:
     export OPENAI_API_KEY="your-api-key-here"
     
  Or create a .env file in this directory with:
     OPENAI_API_KEY=your-api-key-here
     
  See .env.example for reference.
    `);
    process.exit(1);
  }
  
  const [themeName, url, description] = args;
  
  generator.generateTheme({
    name: themeName,
    url,
    description
  }).catch(error => {
    console.error('❌ Theme generation failed:', error);
    process.exit(1);
  });
}

export { ThemeGenerator };
export type { ThemeConfig, CssTokenGroups };