#!/usr/bin/env node

import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ThemeMetadata {
  name: string;
  url?: string;
  description: string;
  generated: string;
  version: string;
  status?: 'active' | 'inactive' | 'testing';
}

interface ThemeValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

class ThemeManager {
  private designTokensPath: string;
  private previewPath: string;

  constructor() {
    this.designTokensPath = path.resolve(__dirname, '../design-tokens');
    this.previewPath = path.resolve(__dirname, '../.storybook/preview.js');
  }

  async listThemes(): Promise<ThemeMetadata[]> {
    const themes: ThemeMetadata[] = [];
    
    try {
      const entries = await fs.readdir(this.designTokensPath, { withFileTypes: true });
      
      for (const entry of entries) {
        if (entry.isDirectory()) {
          const themeDir = path.join(this.designTokensPath, entry.name);
          const metadataPath = path.join(themeDir, 'theme.json');
          
          try {
            const metadataContent = await fs.readFile(metadataPath, 'utf-8');
            const metadata: ThemeMetadata = JSON.parse(metadataContent);
            themes.push(metadata);
          } catch {
            // If no metadata file, create basic info from directory
            const cssPath = path.join(themeDir, 'tokens.css');
            try {
              await fs.access(cssPath);
              themes.push({
                name: entry.name,
                description: `Theme: ${entry.name}`,
                generated: 'Unknown',
                version: '1.0.0',
                status: 'inactive'
              });
            } catch {
              // Skip directories without CSS files
            }
          }
        }
      }
      
      return themes.sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
      console.error('❌ Error listing themes:', error);
      return [];
    }
  }

  async validateTheme(themeName: string): Promise<ThemeValidationResult> {
    const result: ThemeValidationResult = {
      isValid: true,
      errors: [],
      warnings: []
    };

    try {
      const themeDir = path.join(this.designTokensPath, themeName);
      const cssPath = path.join(themeDir, 'tokens.css');
      
      // Check if CSS file exists
      try {
        await fs.access(cssPath);
      } catch {
        result.errors.push(`Missing tokens.css file in ${themeName}`);
        result.isValid = false;
        return result;
      }

      // Read and validate CSS content
      const cssContent = await fs.readFile(cssPath, 'utf-8');
      
      if (!cssContent.includes(':root')) {
        result.errors.push('Missing :root selector in CSS');
        result.isValid = false;
      }

      // Check for required token categories
      const requiredTokens = [
        '--cds-color-',
        '--cds-font-',
        '--cds-space-',
      ];

      for (const token of requiredTokens) {
        if (!cssContent.includes(token)) {
          result.warnings.push(`Missing ${token} tokens`);
        }
      }

      // Check for CSS syntax errors (basic)
      const lines = cssContent.split('\n');
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line && !line.startsWith('/*') && !line.endsWith('*/')) {
          if (line.includes(':') && !line.endsWith(';') && !line.endsWith('{') && !line.endsWith('}')) {
            result.warnings.push(`Line ${i + 1}: Missing semicolon`);
          }
        }
      }

      // Check file size
      const stats = await fs.stat(cssPath);
      if (stats.size > 50000) { // 50KB
        result.warnings.push('CSS file is quite large (>50KB)');
      }

      if (stats.size < 100) { // 100 bytes
        result.warnings.push('CSS file seems too small');
        result.isValid = false;
      }

    } catch (error) {
      result.errors.push(`Error validating theme: ${error}`);
      result.isValid = false;
    }

    return result;
  }

  async addThemeToStorybook(themeName: string): Promise<void> {
    try {
      const previewContent = await fs.readFile(this.previewPath, 'utf-8');
      
      // Check if theme is already added
      if (previewContent.includes(`${themeName} from`)) {
        console.log(`ℹ️  Theme "${themeName}" is already in Storybook`);
        return;
      }

      // Find the import section
      
      // Add new import
      const themeImport = `import ${themeName} from '!!style-loader?injectType=lazyStyleTag!css-loader!../design-tokens/${themeName}/tokens.css';`;
      
      // Find where to insert the import (after other theme imports)
      let insertIndex = previewContent.indexOf('import theme from');
      if (insertIndex === -1) {
        insertIndex = previewContent.indexOf('export const decorators');
      }
      
      if (insertIndex === -1) {
        throw new Error('Could not find insertion point in preview.js');
      }

      // Insert the import
      const beforeImport = previewContent.substring(0, insertIndex);
      const afterImport = previewContent.substring(insertIndex);
      let newContent = beforeImport + themeImport + '\n' + afterImport;

      // Add to theme files object
      const filesRegex = /files:\s*{([^}]+)}/s;
      const filesMatch = newContent.match(filesRegex);
      
      if (filesMatch) {
        const filesContent = filesMatch[1];
        const themeEntry = `\n      '${themeName}': ${themeName},`;
        const newFilesContent = filesContent.replace(/(\n\s*})/, themeEntry + '$1');
        newContent = newContent.replace(filesRegex, `files: {${newFilesContent}}`);
      }

      await fs.writeFile(this.previewPath, newContent, 'utf-8');
      console.log(`✅ Added "${themeName}" theme to Storybook`);
      
    } catch (error) {
      console.error(`❌ Error adding theme to Storybook:`, error);
      throw error;
    }
  }

  async removeThemeFromStorybook(themeName: string): Promise<void> {
    try {
      let previewContent = await fs.readFile(this.previewPath, 'utf-8');
      
      // Remove import line
      const importRegex = new RegExp(`import ${themeName} from[^;]+;\\n?`, 'g');
      previewContent = previewContent.replace(importRegex, '');
      
      // Remove from files object
      const themeEntryRegex = new RegExp(`\\s*'${themeName}':\\s*${themeName},?\\n?`, 'g');
      previewContent = previewContent.replace(themeEntryRegex, '');
      
      await fs.writeFile(this.previewPath, previewContent, 'utf-8');
      console.log(`✅ Removed "${themeName}" theme from Storybook`);
      
    } catch (error) {
      console.error(`❌ Error removing theme from Storybook:`, error);
      throw error;
    }
  }

  async deleteTheme(themeName: string, force: boolean = false): Promise<void> {
    const themeDir = path.join(this.designTokensPath, themeName);
    
    try {
      // Check if theme exists
      await fs.access(themeDir);
      
      if (!force) {
        // In a real CLI, you'd prompt for confirmation here
        console.log(`⚠️  This will permanently delete the "${themeName}" theme.`);
        console.log(`Use --force flag to confirm deletion.`);
        return;
      }

      // Remove from Storybook first
      await this.removeThemeFromStorybook(themeName);
      
      // Delete theme directory
      await fs.rm(themeDir, { recursive: true, force: true });
      
      console.log(`🗑️  Deleted theme "${themeName}"`);
      
    } catch (error) {
      if ((error as any).code === 'ENOENT') {
        console.log(`ℹ️  Theme "${themeName}" does not exist`);
      } else {
        console.error(`❌ Error deleting theme:`, error);
        throw error;
      }
    }
  }

  async activateTheme(themeName: string): Promise<void> {
    try {
      // Validate theme first
      const validation = await this.validateTheme(themeName);
      if (!validation.isValid) {
        console.error(`❌ Cannot activate invalid theme "${themeName}":`);
        validation.errors.forEach(error => console.error(`  - ${error}`));
        return;
      }

      if (validation.warnings.length > 0) {
        console.warn(`⚠️  Theme has warnings:`);
        validation.warnings.forEach(warning => console.warn(`  - ${warning}`));
      }

      // Add to Storybook
      await this.addThemeToStorybook(themeName);
      
      // Update theme metadata
      const metadataPath = path.join(this.designTokensPath, themeName, 'theme.json');
      try {
        const metadata = JSON.parse(await fs.readFile(metadataPath, 'utf-8'));
        metadata.status = 'active';
        await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2), 'utf-8');
      } catch {
        // Metadata file doesn't exist, create it
        const metadata: ThemeMetadata = {
          name: themeName,
          description: `Theme: ${themeName}`,
          generated: new Date().toISOString(),
          version: '1.0.0',
          status: 'active'
        };
        await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2), 'utf-8');
      }

      console.log(`🎨 Activated theme "${themeName}"`);
      console.log(`🚀 Restart Storybook to see the changes`);
      
    } catch (error) {
      console.error(`❌ Error activating theme:`, error);
      throw error;
    }
  }

  async generateThemePreview(themeName: string): Promise<string> {
    try {
      const cssPath = path.join(this.designTokensPath, themeName, 'tokens.css');
      const cssContent = await fs.readFile(cssPath, 'utf-8');
      
      // Extract key colors for preview
      const colorMatches = cssContent.match(/--cds-color-[^:]+:\s*([^;]+);/g) || [];
      const colors = colorMatches.map(match => {
        const [property, value] = match.split(':');
        return {
          name: property.trim().replace('--cds-color-', ''),
          value: value.replace(';', '').trim()
        };
      }).slice(0, 6); // Show first 6 colors

      // Generate HTML preview
      const previewHtml = `
<!DOCTYPE html>
<html>
<head>
  <title>${themeName} Theme Preview</title>
  <style>
    ${cssContent}
    
    body {
      font-family: var(--cds-font-family-primary, sans-serif);
      margin: 0;
      padding: 20px;
      background: var(--cds-color-surface, #fff);
      color: var(--cds-color-text, #000);
    }
    
    .preview-container {
      max-width: 800px;
      margin: 0 auto;
    }
    
    .color-palette {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 16px;
      margin: 20px 0;
    }
    
    .color-swatch {
      height: 80px;
      border-radius: var(--cds-radius-md, 8px);
      display: flex;
      align-items: end;
      padding: 8px;
      color: white;
      text-shadow: 0 1px 2px rgba(0,0,0,0.5);
      font-size: 12px;
    }
    
    .component-examples {
      display: grid;
      gap: 20px;
      margin-top: 40px;
    }
    
    .btn {
      padding: var(--cds-space-md, 12px) var(--cds-space-lg, 24px);
      border: none;
      border-radius: var(--cds-radius-md, 8px);
      font-size: var(--cds-font-size-md, 16px);
      cursor: pointer;
      margin-right: 10px;
    }
    
    .btn-primary {
      background: var(--cds-color-primary, #007bff);
      color: white;
    }
    
    .btn-secondary {
      background: var(--cds-color-secondary, #6c757d);
      color: white;
    }
    
    .card {
      background: var(--cds-color-surface, white);
      border-radius: var(--cds-radius-lg, 12px);
      padding: var(--cds-space-lg, 24px);
      box-shadow: var(--cds-shadow-md, 0 4px 12px rgba(0,0,0,0.1));
    }
  </style>
</head>
<body>
  <div class="preview-container">
    <h1>${themeName} Theme Preview</h1>
    
    <h2>Color Palette</h2>
    <div class="color-palette">
      ${colors.map(color => `
        <div class="color-swatch" style="background-color: ${color.value}">
          <div>
            <div>${color.name}</div>
            <div style="opacity: 0.8">${color.value}</div>
          </div>
        </div>
      `).join('')}
    </div>
    
    <h2>Component Examples</h2>
    <div class="component-examples">
      <div class="card">
        <h3>Typography</h3>
        <p>This is a paragraph showing the default text styling for the ${themeName} theme.</p>
        <small>Small text example</small>
      </div>
      
      <div class="card">
        <h3>Buttons</h3>
        <button class="btn btn-primary">Primary Button</button>
        <button class="btn btn-secondary">Secondary Button</button>
      </div>
      
      <div class="card">
        <h3>Spacing & Layout</h3>
        <p>This card demonstrates the spacing and border radius tokens in action.</p>
      </div>
    </div>
  </div>
</body>
</html>`;

      const previewPath = path.join(this.designTokensPath, themeName, 'preview.html');
      await fs.writeFile(previewPath, previewHtml, 'utf-8');
      
      console.log(`📄 Generated preview: ${previewPath}`);
      return previewPath;
      
    } catch (error) {
      console.error(`❌ Error generating preview:`, error);
      throw error;
    }
  }

  async printThemeInfo(themeName: string): Promise<void> {
    try {
      const themes = await this.listThemes();
      const theme = themes.find(t => t.name === themeName);
      
      if (!theme) {
        console.log(`❌ Theme "${themeName}" not found`);
        return;
      }

      console.log(`\n🎨 Theme: ${theme.name}`);
      console.log(`📝 Description: ${theme.description}`);
      console.log(`📅 Generated: ${theme.generated}`);
      console.log(`🔢 Version: ${theme.version}`);
      if (theme.url) console.log(`🌐 Source URL: ${theme.url}`);
      console.log(`📊 Status: ${theme.status || 'unknown'}`);

      // Validation
      const validation = await this.validateTheme(themeName);
      console.log(`\n✅ Valid: ${validation.isValid ? 'Yes' : 'No'}`);
      
      if (validation.errors.length > 0) {
        console.log(`❌ Errors:`);
        validation.errors.forEach(error => console.log(`  - ${error}`));
      }
      
      if (validation.warnings.length > 0) {
        console.log(`⚠️  Warnings:`);
        validation.warnings.forEach(warning => console.log(`  - ${warning}`));
      }

      // File info
      const cssPath = path.join(this.designTokensPath, themeName, 'tokens.css');
      try {
        const stats = await fs.stat(cssPath);
        console.log(`📁 File size: ${(stats.size / 1024).toFixed(1)}KB`);
      } catch {
        console.log(`📁 File size: Unknown`);
      }

    } catch (error) {
      console.error(`❌ Error getting theme info:`, error);
    }
  }
}

// CLI Interface
if (import.meta.url === `file://${process.argv[1]}`) {
  const manager = new ThemeManager();
  const [, , command, ...args] = process.argv;

  const commands = {
    list: async () => {
      console.log('🎨 Available Themes:\n');
      const themes = await manager.listThemes();
      if (themes.length === 0) {
        console.log('No themes found.');
        return;
      }
      
      themes.forEach(theme => {
        const status = theme.status ? `[${theme.status}]` : '[unknown]';
        console.log(`  ${theme.name} ${status} - ${theme.description}`);
      });
    },

    validate: async (themeName: string) => {
      if (!themeName) {
        console.log('Usage: npm run theme-manager validate <theme-name>');
        return;
      }
      
      const result = await manager.validateTheme(themeName);
      console.log(`\n🔍 Validation Results for "${themeName}":"`);
      console.log(`Valid: ${result.isValid ? '✅' : '❌'}`);
      
      if (result.errors.length > 0) {
        console.log('\n❌ Errors:');
        result.errors.forEach(error => console.log(`  - ${error}`));
      }
      
      if (result.warnings.length > 0) {
        console.log('\n⚠️  Warnings:');
        result.warnings.forEach(warning => console.log(`  - ${warning}`));
      }
    },

    activate: async (themeName: string) => {
      if (!themeName) {
        console.log('Usage: npm run theme-manager activate <theme-name>');
        return;
      }
      await manager.activateTheme(themeName);
    },

    deactivate: async (themeName: string) => {
      if (!themeName) {
        console.log('Usage: npm run theme-manager deactivate <theme-name>');
        return;
      }
      await manager.removeThemeFromStorybook(themeName);
      console.log(`🔄 Deactivated theme "${themeName}"`);
    },

    delete: async (themeName: string, forceFlag?: string) => {
      if (!themeName) {
        console.log('Usage: npm run theme-manager delete <theme-name> [--force]');
        return;
      }
      const force = forceFlag === '--force';
      await manager.deleteTheme(themeName, force);
    },

    info: async (themeName: string) => {
      if (!themeName) {
        console.log('Usage: npm run theme-manager info <theme-name>');
        return;
      }
      await manager.printThemeInfo(themeName);
    },

    preview: async (themeName: string) => {
      if (!themeName) {
        console.log('Usage: npm run theme-manager preview <theme-name>');
        return;
      }
      await manager.generateThemePreview(themeName);
    }
  };

  if (!command || !commands[command as keyof typeof commands]) {
    console.log(`
🎨 Theme Manager CLI

Usage: npm run theme-manager <command> [arguments]

Commands:
  list                    - List all available themes
  validate <theme>        - Validate a theme
  activate <theme>        - Add theme to Storybook
  deactivate <theme>      - Remove theme from Storybook  
  delete <theme> [--force] - Delete a theme
  info <theme>            - Show detailed theme information
  preview <theme>         - Generate HTML preview file

Examples:
  npm run theme-manager list
  npm run theme-manager activate nike
  npm run theme-manager info starbucks
  npm run theme-manager delete old-theme --force
    `);
    process.exit(1);
  }

  const commandFn = commands[command as keyof typeof commands];
  (commandFn as any)(...args).catch((error: any) => {
    console.error('❌ Command failed:', error);
    process.exit(1);
  });
}

export { ThemeManager };
export type { ThemeMetadata, ThemeValidationResult };