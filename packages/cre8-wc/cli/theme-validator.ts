#!/usr/bin/env node

import * as fs from 'fs/promises';
import * as path from 'path';


interface ValidationRule {
  name: string;
  description: string;
  severity: 'error' | 'warning' | 'info';
  test: (css: string, metadata?: any) => ValidationResult;
}

interface ValidationResult {
  passed: boolean;
  message?: string;
  details?: string[];
  suggestions?: string[];
}

interface ContrastResult {
  ratio: number;
  passes: {
    aa: boolean;
    aaa: boolean;
  };
}

class ThemeValidator {
  private rules: ValidationRule[] = [];

  constructor() {
    this.initializeRules();
  }

  private initializeRules(): void {
    this.rules = [
      {
        name: 'css-syntax',
        description: 'Check for basic CSS syntax errors',
        severity: 'error',
        test: (css) => this.validateCssSyntax(css)
      },
      {
        name: 'naming-convention',
        description: 'Verify CSS custom property naming follows conventions',
        severity: 'error',
        test: (css) => this.validateNamingConvention(css)
      },
      {
        name: 'required-tokens',
        description: 'Check for required design token categories',
        severity: 'warning',
        test: (css) => this.validateRequiredTokens(css)
      },
      {
        name: 'color-accessibility',
        description: 'Validate color contrast ratios for accessibility',
        severity: 'error',
        test: (css) => this.validateColorAccessibility(css)
      },
      {
        name: 'token-completeness',
        description: 'Check for complete token sets in each category',
        severity: 'warning',
        test: (css) => this.validateTokenCompleteness(css)
      },
      {
        name: 'value-validity',
        description: 'Validate that all CSS values are valid',
        severity: 'error',
        test: (css) => this.validateValueValidity(css)
      },
      {
        name: 'semantic-consistency',
        description: 'Check for semantic consistency in token naming',
        severity: 'warning',
        test: (css) => this.validateSemanticConsistency(css)
      },
      {
        name: 'scale-relationships',
        description: 'Validate mathematical relationships in scales',
        severity: 'info',
        test: (css) => this.validateScaleRelationships(css)
      }
    ];
  }

  async validateTheme(themePath: string): Promise<{
    isValid: boolean;
    errors: string[];
    warnings: string[];
    info: string[];
    details: any;
  }> {
    try {
      const cssContent = await fs.readFile(themePath, 'utf-8');
      const metadataPath = themePath.replace('tokens.css', 'theme.json');
      
      let metadata = null;
      try {
        const metadataContent = await fs.readFile(metadataPath, 'utf-8');
        metadata = JSON.parse(metadataContent);
      } catch {
        // Metadata is optional
      }

      const results = {
        isValid: true,
        errors: [] as string[],
        warnings: [] as string[],
        info: [] as string[],
        details: {} as any
      };

      console.log(`🔍 Validating theme: ${path.basename(themePath)}`);

      for (const rule of this.rules) {
        try {
          const result = rule.test(cssContent, metadata);
          results.details[rule.name] = result;

          if (!result.passed) {
            const message = `${rule.description}: ${result.message}`;
            
            switch (rule.severity) {
              case 'error':
                results.errors.push(message);
                results.isValid = false;
                break;
              case 'warning':
                results.warnings.push(message);
                break;
              case 'info':
                results.info.push(message);
                break;
            }

            if (result.details) {
              result.details.forEach(_detail => {
                results.details[`${rule.name}_details`] = result.details;
              });
            }
          }
        } catch (error) {
          results.errors.push(`Rule '${rule.name}' failed to execute: ${error}`);
          results.isValid = false;
        }
      }

      return results;
    } catch (error) {
      return {
        isValid: false,
        errors: [`Failed to validate theme: ${error}`],
        warnings: [],
        info: [],
        details: {}
      };
    }
  }

  private validateCssSyntax(css: string): ValidationResult {
    const issues: string[] = [];
    const lines = css.split('\n');

    // Check for basic syntax issues
    let inRoot = false;
    let braceCount = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      const lineNum = i + 1;

      if (line === ':root {') {
        inRoot = true;
        braceCount++;
      } else if (line === '}') {
        braceCount--;
        if (braceCount === 0) inRoot = false;
      } else if (line.includes('{')) {
        braceCount++;
      }

      // Check for property syntax
      if (inRoot && line.startsWith('--') && line.includes(':')) {
        if (!line.endsWith(';') && !line.endsWith('{')) {
          issues.push(`Line ${lineNum}: Missing semicolon`);
        }
        
        const colonIndex = line.indexOf(':');
        const value = line.substring(colonIndex + 1).trim().replace(';', '');
        
        if (!value) {
          issues.push(`Line ${lineNum}: Empty value`);
        }
      }
    }

    if (braceCount !== 0) {
      issues.push('Mismatched braces in CSS');
    }

    return {
      passed: issues.length === 0,
      message: issues.length > 0 ? `${issues.length} syntax issues found` : undefined,
      details: issues
    };
  }

  private validateNamingConvention(css: string): ValidationResult {
    const issues: string[] = [];
    const propertyPattern = /--([a-z0-9-]+):/g;
    const validPrefixes = ['cds-color-', 'cds-font-', 'cds-space-', 'cds-radius-', 'cds-shadow-', 'cds-breakpoint-'];
    
    let match;
    while ((match = propertyPattern.exec(css)) !== null) {
      const property = match[1];
      
      const hasValidPrefix = validPrefixes.some(prefix => property.startsWith(prefix));
      
      if (!hasValidPrefix) {
        issues.push(`Property '--${property}' doesn't follow naming convention`);
      }
      
      // Check for camelCase (should be kebab-case)
      if (/[A-Z]/.test(property)) {
        issues.push(`Property '--${property}' uses camelCase instead of kebab-case`);
      }
    }

    return {
      passed: issues.length === 0,
      message: issues.length > 0 ? `${issues.length} naming convention violations` : undefined,
      details: issues
    };
  }

  private validateRequiredTokens(css: string): ValidationResult {
    const requiredCategories = [
      { prefix: '--cds-color-', name: 'Colors', required: ['primary', 'secondary', 'text', 'background'] },
      { prefix: '--cds-font-', name: 'Typography', required: ['size-md', 'family-primary'] },
      { prefix: '--cds-space-', name: 'Spacing', required: ['sm', 'md', 'lg'] },
      { prefix: '--cds-radius-', name: 'Border Radius', required: ['sm', 'md'] }
    ];

    const missing: string[] = [];

    for (const category of requiredCategories) {
      for (const token of category.required) {
        const fullToken = `${category.prefix}${token}`;
        if (!css.includes(fullToken)) {
          missing.push(`${category.name}: ${fullToken}`);
        }
      }
    }

    return {
      passed: missing.length === 0,
      message: missing.length > 0 ? `Missing ${missing.length} required tokens` : undefined,
      details: missing
    };
  }

  private validateColorAccessibility(css: string): ValidationResult {
    const colorTokens = this.extractColorTokens(css);
    const issues: string[] = [];
    
    // Find text and background color pairs
    const textColors = colorTokens.filter(t => t.name.includes('text') || t.name.includes('foreground'));
    const bgColors = colorTokens.filter(t => t.name.includes('background') || t.name.includes('surface'));

    for (const textColor of textColors) {
      for (const bgColor of bgColors) {
        const contrast = this.calculateContrastRatio(textColor.value, bgColor.value);
        
        if (contrast.ratio < 4.5) {
          issues.push(`Low contrast between ${textColor.name} and ${bgColor.name}: ${contrast.ratio.toFixed(2)}`);
        }
      }
    }

    return {
      passed: issues.length === 0,
      message: issues.length > 0 ? `${issues.length} contrast issues found` : undefined,
      details: issues
    };
  }

  private validateTokenCompleteness(css: string): ValidationResult {
    const expectedScales = {
      'space': ['xs', 'sm', 'md', 'lg', 'xl'],
      'radius': ['none', 'sm', 'md', 'lg', 'full'],
      'shadow': ['sm', 'md', 'lg'],
      'font-size': ['xs', 'sm', 'md', 'lg', 'xl']
    };

    const missing: string[] = [];

    for (const [category, scales] of Object.entries(expectedScales)) {
      for (const scale of scales) {
        const token = `--cds-${category}-${scale}`;
        if (!css.includes(token)) {
          missing.push(token);
        }
      }
    }

    return {
      passed: missing.length === 0,
      message: missing.length > 0 ? `Incomplete token scales, missing ${missing.length} tokens` : undefined,
      details: missing
    };
  }

  private validateValueValidity(css: string): ValidationResult {
    const issues: string[] = [];
    const propertyPattern = /--([a-z0-9-]+):\s*([^;]+);/g;
    
    let match;
    while ((match = propertyPattern.exec(css)) !== null) {
      const property = match[1];
      const value = match[2].trim();
      
      // Check for common invalid values
      if (value === '') {
        issues.push(`Empty value for --${property}`);
      } else if (value.includes('undefined') || value.includes('null')) {
        issues.push(`Invalid value for --${property}: ${value}`);
      } else if (property.includes('color') && !this.isValidColor(value)) {
        issues.push(`Invalid color value for --${property}: ${value}`);
      } else if (property.includes('size') && !this.isValidsize(value)) {
        issues.push(`Invalid size value for --${property}: ${value}`);
      }
    }

    return {
      passed: issues.length === 0,
      message: issues.length > 0 ? `${issues.length} invalid values found` : undefined,
      details: issues
    };
  }

  private validateSemanticConsistency(css: string): ValidationResult {
    const issues: string[] = [];
    
    // Check for semantic inconsistencies
    const semanticRules = [
      { pattern: /--cds-color-primary.*:\s*([^;]+);/g, name: 'primary colors' },
      { pattern: /--cds-color-secondary.*:\s*([^;]+);/g, name: 'secondary colors' },
      { pattern: /--cds-font-size.*:\s*([^;]+);/g, name: 'font sizes' }
    ];

    for (const rule of semanticRules) {
      const matches = Array.from(css.matchAll(rule.pattern));
      const values = matches.map(m => m[1].trim());
      const uniqueValues = new Set(values);

      if (values.length > 0 && uniqueValues.size === 1) {
        issues.push(`All ${rule.name} have the same value - consider consolidating`);
      }
    }

    return {
      passed: issues.length === 0,
      message: issues.length > 0 ? `${issues.length} semantic consistency issues` : undefined,
      details: issues
    };
  }

  private validateScaleRelationships(css: string): ValidationResult {
    const issues: string[] = [];
    
    // Extract font size scale
    const fontSizes = this.extractSizeScale(css, 'font-size');
    if (fontSizes.length > 2) {
      const ratios = this.calculateScaleRatios(fontSizes);
      const avgRatio = ratios.reduce((a, b) => a + b, 0) / ratios.length;
      
      if (avgRatio < 1.1 || avgRatio > 1.8) {
        issues.push(`Font size scale ratio (${avgRatio.toFixed(2)}) is outside recommended range (1.1-1.8)`);
      }
    }

    // Extract spacing scale
    const spacings = this.extractSizeScale(css, 'space');
    if (spacings.length > 2) {
      const ratios = this.calculateScaleRatios(spacings);
      const inconsistentRatios = ratios.filter(r => Math.abs(r - ratios[0]) > 0.3);
      
      if (inconsistentRatios.length > ratios.length * 0.5) {
        issues.push('Spacing scale has inconsistent ratios - consider using mathematical progression');
      }
    }

    return {
      passed: issues.length === 0,
      message: issues.length > 0 ? 'Scale relationships could be improved' : undefined,
      details: issues
    };
  }

  private extractColorTokens(css: string): { name: string; value: string }[] {
    const colorPattern = /--cds-color-([a-z0-9-]+):\s*([^;]+);/g;
    const tokens: { name: string; value: string }[] = [];
    
    let match;
    while ((match = colorPattern.exec(css)) !== null) {
      tokens.push({
        name: match[1],
        value: match[2].trim()
      });
    }
    
    return tokens;
  }

  private extractSizeScale(css: string, category: string): number[] {
    const pattern = new RegExp(`--cds-${category}-[a-z0-9-]+:\\s*([0-9.]+)(rem|px|em)`, 'g');
    const sizes: number[] = [];
    
    let match;
    while ((match = pattern.exec(css)) !== null) {
      const value = parseFloat(match[1]);
      if (!isNaN(value)) {
        sizes.push(value);
      }
    }
    
    return sizes.sort((a, b) => a - b);
  }

  private calculateScaleRatios(sizes: number[]): number[] {
    const ratios: number[] = [];
    for (let i = 1; i < sizes.length; i++) {
      ratios.push(sizes[i] / sizes[i - 1]);
    }
    return ratios;
  }

  private calculateContrastRatio(color1: string, color2: string): ContrastResult {
    // Simplified contrast calculation - in production, use a proper color library
    const getLuminance = (color: string): number => {
      // This is a simplified implementation
      // In reality, you'd want to use a proper color parsing library
      const hex = color.replace('#', '');
      if (hex.length === 3) {
        const r = parseInt(hex[0] + hex[0], 16);
        const g = parseInt(hex[1] + hex[1], 16);
        const b = parseInt(hex[2] + hex[2], 16);
        return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      } else if (hex.length === 6) {
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      }
      return 0.5; // Default for non-hex colors
    };

    const l1 = getLuminance(color1);
    const l2 = getLuminance(color2);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    const ratio = (lighter + 0.05) / (darker + 0.05);

    return {
      ratio,
      passes: {
        aa: ratio >= 4.5,
        aaa: ratio >= 7.0
      }
    };
  }

  private isValidColor(value: string): boolean {
    // Basic color validation
    return /^(#[0-9a-f]{3,8}|rgb|hsl|transparent|inherit|currentColor|var\()/i.test(value);
  }

  private isValidsize(value: string): boolean {
    return /^\d+(\.\d+)?(px|rem|em|%|vh|vw|ch|ex)$/.test(value) || value === '0';
  }

  async generateValidationReport(themePath: string): Promise<string> {
    const validation = await this.validateTheme(themePath);
    const themeName = path.basename(path.dirname(themePath));
    
    let report = `# Theme Validation Report: ${themeName}\n\n`;
    report += `**Generated:** ${new Date().toISOString()}\n\n`;
    
    report += `## Summary\n`;
    report += `- **Status:** ${validation.isValid ? '✅ Valid' : '❌ Invalid'}\n`;
    report += `- **Errors:** ${validation.errors.length}\n`;
    report += `- **Warnings:** ${validation.warnings.length}\n`;
    report += `- **Info:** ${validation.info.length}\n\n`;

    if (validation.errors.length > 0) {
      report += `## ❌ Errors\n`;
      validation.errors.forEach(error => {
        report += `- ${error}\n`;
      });
      report += '\n';
    }

    if (validation.warnings.length > 0) {
      report += `## ⚠️ Warnings\n`;
      validation.warnings.forEach(warning => {
        report += `- ${warning}\n`;
      });
      report += '\n';
    }

    if (validation.info.length > 0) {
      report += `## ℹ️ Information\n`;
      validation.info.forEach(info => {
        report += `- ${info}\n`;
      });
      report += '\n';
    }

    report += `## Detailed Results\n`;
    for (const [ruleName, result] of Object.entries(validation.details)) {
      if (typeof result === 'object' && (result as any).passed !== undefined) {
        const rule = this.rules.find(r => r.name === ruleName);
        const typedResult = result as any;
        if (rule) {
          report += `### ${rule.description}\n`;
          report += `**Status:** ${typedResult.passed ? '✅ Passed' : '❌ Failed'}\n`;
          if (typedResult.message) {
            report += `**Message:** ${typedResult.message}\n`;
          }
          if (typedResult.details && typedResult.details.length > 0) {
            report += `**Details:**\n`;
            typedResult.details.forEach((detail: string) => {
              report += `  - ${detail}\n`;
            });
          }
          report += '\n';
        }
      }
    }

    return report;
  }
}

// CLI Interface
if (import.meta.url === `file://${process.argv[1]}`) {
  const validator = new ThemeValidator();
  const [, , command, themePath] = process.argv;

  if (command === 'validate' && themePath) {
    validator.validateTheme(themePath)
      .then(result => {
        console.log('🔍 Validation Results:');
        console.log(`Status: ${result.isValid ? '✅ Valid' : '❌ Invalid'}`);
        
        if (result.errors.length > 0) {
          console.log('\n❌ Errors:');
          result.errors.forEach(error => console.log(`  - ${error}`));
        }
        
        if (result.warnings.length > 0) {
          console.log('\n⚠️ Warnings:');
          result.warnings.forEach(warning => console.log(`  - ${warning}`));
        }
        
        process.exit(result.isValid ? 0 : 1);
      })
      .catch(error => {
        console.error('❌ Validation failed:', error);
        process.exit(1);
      });
  } else if (command === 'report' && themePath) {
    validator.generateValidationReport(themePath)
      .then(report => {
        const reportPath = themePath.replace('tokens.css', 'validation-report.md');
        return fs.writeFile(reportPath, report, 'utf-8').then(() => reportPath);
      })
      .then(reportPath => {
        console.log(`📋 Validation report generated: ${reportPath}`);
      })
      .catch(error => {
        console.error('❌ Report generation failed:', error);
        process.exit(1);
      });
  } else {
    console.log(`
🔍 Theme Validator CLI

Usage:
  npm run theme-validator validate <theme-tokens.css>
  npm run theme-validator report <theme-tokens.css>

Examples:
  npm run theme-validator validate ./design-tokens/nike/tokens.css
  npm run theme-validator report ./design-tokens/starbucks/tokens.css
    `);
  }
}

export { ThemeValidator };
export type { ValidationRule, ValidationResult };