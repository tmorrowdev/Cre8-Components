#!/usr/bin/env node
/**
 * AIDSS Token Generator
 * Generates framework-specific token files from the AIDSS schema
 *
 * Usage: node generate-tokens.js [framework]
 * Frameworks: css, tailwind, react, vue, scss
 */

const fs = require('fs');
const path = require('path');

const schema = require('./aidss-schema.json');

const generators = {
  /**
   * Generate CSS custom properties
   */
  css: () => {
    const lines = [':root {'];

    // Spacing
    Object.entries(schema.designTokens.spacing).forEach(([key, value]) => {
      lines.push(`  --cre8-spacing-${key}: ${value};`);
    });

    // Colors - Background
    Object.entries(schema.designTokens.colors.background).forEach(([key, token]) => {
      lines.push(`  /* ${token} - define your value */`);
    });

    // Colors - Border
    Object.entries(schema.designTokens.colors.border).forEach(([key, token]) => {
      lines.push(`  /* ${token} - define your value */`);
    });

    // Colors - Content
    Object.entries(schema.designTokens.colors.content).forEach(([key, token]) => {
      lines.push(`  /* ${token} - define your value */`);
    });

    // Borders
    Object.entries(schema.designTokens.borders.width).forEach(([key, token]) => {
      lines.push(`  /* ${token} - define your value */`);
    });
    Object.entries(schema.designTokens.borders.radius).forEach(([key, token]) => {
      lines.push(`  /* ${token} - define your value */`);
    });

    // Shadows
    Object.entries(schema.designTokens.shadows).forEach(([key, token]) => {
      lines.push(`  /* ${token} - define your value */`);
    });

    // Animation
    Object.entries(schema.designTokens.animation).forEach(([key, token]) => {
      lines.push(`  /* ${token} - define your value */`);
    });

    // Sizing
    Object.entries(schema.designTokens.sizing.icon).forEach(([key, token]) => {
      lines.push(`  /* ${token} - define your value */`);
    });
    Object.entries(schema.designTokens.sizing.layout).forEach(([key, token]) => {
      lines.push(`  /* ${token} - define your value */`);
    });

    lines.push('}');
    return lines.join('\n');
  },

  /**
   * Generate Tailwind config extension
   */
  tailwind: () => {
    const config = {
      theme: {
        extend: {
          colors: {},
          spacing: {},
          borderRadius: {},
          boxShadow: {}
        }
      }
    };

    // Map background colors
    Object.entries(schema.designTokens.colors.background).forEach(([key, token]) => {
      const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      config.theme.extend.colors[`bg-${kebabKey}`] = `var(${token})`;
    });

    // Map content colors
    Object.entries(schema.designTokens.colors.content).forEach(([key, token]) => {
      const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      config.theme.extend.colors[`content-${kebabKey}`] = `var(${token})`;
    });

    // Map border colors
    Object.entries(schema.designTokens.colors.border).forEach(([key, token]) => {
      const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      config.theme.extend.colors[`border-${kebabKey}`] = `var(${token})`;
    });

    // Map spacing
    Object.entries(schema.designTokens.spacing).forEach(([key, value]) => {
      config.theme.extend.spacing[`cre8-${key}`] = value;
    });

    // Map border radius
    Object.entries(schema.designTokens.borders.radius).forEach(([key, token]) => {
      config.theme.extend.borderRadius[`cre8-${key}`] = `var(${token})`;
    });

    // Map shadows
    Object.entries(schema.designTokens.shadows).forEach(([key, token]) => {
      config.theme.extend.boxShadow[`cre8-${key}`] = `var(${token})`;
    });

    return `// Tailwind CSS Configuration Extension for AIDSS
// Add this to your tailwind.config.js

module.exports = ${JSON.stringify(config, null, 2)};`;
  },

  /**
   * Generate React/TypeScript theme object
   */
  react: () => {
    const theme = {
      colors: {
        background: {},
        content: {},
        border: {},
        button: schema.designTokens.colors.button
      },
      spacing: schema.designTokens.spacing,
      borders: schema.designTokens.borders,
      shadows: schema.designTokens.shadows,
      animation: schema.designTokens.animation,
      sizing: schema.designTokens.sizing,
      status: schema.statusValues,
      sizes: schema.sizeValues
    };

    // Map colors
    Object.entries(schema.designTokens.colors.background).forEach(([key, token]) => {
      theme.colors.background[key] = `var(${token})`;
    });
    Object.entries(schema.designTokens.colors.content).forEach(([key, token]) => {
      theme.colors.content[key] = `var(${token})`;
    });
    Object.entries(schema.designTokens.colors.border).forEach(([key, token]) => {
      theme.colors.border[key] = `var(${token})`;
    });

    return `// AIDSS Theme for React
// Use with styled-components, emotion, or CSS-in-JS

export const aidssTheme = ${JSON.stringify(theme, null, 2)} as const;

export type AidssTheme = typeof aidssTheme;

// Status type
export type Status = ${schema.statusValues.map(s => `'${s}'`).join(' | ')};

// Size type
export type Size = ${schema.sizeValues.map(s => `'${s}'`).join(' | ')};

// Component categories
export const componentCategories = ${JSON.stringify(schema.categories, null, 2)};
`;
  },

  /**
   * Generate Vue composable
   */
  vue: () => {
    return `// AIDSS Design Tokens Composable for Vue
// Usage: const { colors, spacing } = useAidssTokens()

export const useAidssTokens = () => {
  const colors = {
    background: ${JSON.stringify(
      Object.fromEntries(
        Object.entries(schema.designTokens.colors.background).map(([k, v]) => [k, `var(${v})`])
      ), null, 4).replace(/\n/g, '\n    ')},
    content: ${JSON.stringify(
      Object.fromEntries(
        Object.entries(schema.designTokens.colors.content).map(([k, v]) => [k, `var(${v})`])
      ), null, 4).replace(/\n/g, '\n    ')},
    border: ${JSON.stringify(
      Object.fromEntries(
        Object.entries(schema.designTokens.colors.border).map(([k, v]) => [k, `var(${v})`])
      ), null, 4).replace(/\n/g, '\n    ')}
  };

  const spacing = ${JSON.stringify(schema.designTokens.spacing, null, 2)};

  const borders = {
    width: ${JSON.stringify(
      Object.fromEntries(
        Object.entries(schema.designTokens.borders.width).map(([k, v]) => [k, `var(${v})`])
      ), null, 4).replace(/\n/g, '\n    ')},
    radius: ${JSON.stringify(
      Object.fromEntries(
        Object.entries(schema.designTokens.borders.radius).map(([k, v]) => [k, `var(${v})`])
      ), null, 4).replace(/\n/g, '\n    ')}
  };

  const shadows = ${JSON.stringify(
    Object.fromEntries(
      Object.entries(schema.designTokens.shadows).map(([k, v]) => [k, `var(${v})`])
    ), null, 2)};

  const statusValues = ${JSON.stringify(schema.statusValues)};
  const sizeValues = ${JSON.stringify(schema.sizeValues)};

  return { colors, spacing, borders, shadows, statusValues, sizeValues };
};
`;
  },

  /**
   * Generate SCSS variables
   */
  scss: () => {
    const lines = ['// AIDSS Design Tokens - SCSS Variables', ''];

    // Spacing
    lines.push('// Spacing');
    Object.entries(schema.designTokens.spacing).forEach(([key, value]) => {
      lines.push(`$cre8-spacing-${key}: ${value};`);
    });
    lines.push('');

    // Colors as CSS var references
    lines.push('// Background Colors (CSS custom property references)');
    Object.entries(schema.designTokens.colors.background).forEach(([key, token]) => {
      const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      lines.push(`$cre8-bg-${kebabKey}: var(${token});`);
    });
    lines.push('');

    lines.push('// Content Colors');
    Object.entries(schema.designTokens.colors.content).forEach(([key, token]) => {
      const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      lines.push(`$cre8-content-${kebabKey}: var(${token});`);
    });
    lines.push('');

    lines.push('// Border Colors');
    Object.entries(schema.designTokens.colors.border).forEach(([key, token]) => {
      const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      lines.push(`$cre8-border-${kebabKey}: var(${token});`);
    });
    lines.push('');

    lines.push('// Border Radius');
    Object.entries(schema.designTokens.borders.radius).forEach(([key, token]) => {
      lines.push(`$cre8-radius-${key}: var(${token});`);
    });
    lines.push('');

    lines.push('// Shadows');
    Object.entries(schema.designTokens.shadows).forEach(([key, token]) => {
      lines.push(`$cre8-shadow-${key}: var(${token});`);
    });
    lines.push('');

    lines.push('// Status Values');
    lines.push(`$cre8-status-values: (${schema.statusValues.map(s => `"${s}"`).join(', ')});`);
    lines.push('');

    lines.push('// Size Values');
    lines.push(`$cre8-size-values: (${schema.sizeValues.map(s => `"${s}"`).join(', ')});`);

    return lines.join('\n');
  }
};

// Main
const framework = process.argv[2] || 'css';

if (!generators[framework]) {
  console.error(`Unknown framework: ${framework}`);
  console.error(`Available: ${Object.keys(generators).join(', ')}`);
  process.exit(1);
}

const output = generators[framework]();
console.log(output);

// Also write to file
const extensions = { css: 'css', tailwind: 'js', react: 'ts', vue: 'ts', scss: 'scss' };
const outFile = path.join(__dirname, `tokens.${extensions[framework]}`);
fs.writeFileSync(outFile, output);
console.error(`\nWritten to: ${outFile}`);
