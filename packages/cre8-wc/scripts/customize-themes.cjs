const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..');

const themes = {
  minimalist: {
    file: path.join(baseDir, 'design-tokens/brands/minimalist/css/tokens_minimalist.module.ts'),
    replacements: {
      '#0c8599': '#333333',
      '#05333A': '#1a1a1a',
      '#042D34': '#111111',
      '#0B7285': '#444444',
      '#22B8CF': '#666666',
      '#66D9E8': '#999999',
      '#E3FAFC': '#f5f5f5',
      '#C5F6FA': '#eeeeee',
      '#F3D9FA': '#e0e0e0',
      '#EEBEFA': '#cccccc',
      '#E599F7': '#b3b3b3',
      '#F5EAFB': '#f0f0f0',
      '#CC5DE8': '#555555',
      '#DA77F2': '#888888',
      '#9C36B5': '#333333',
    },
    extraReplacements: [
      [/--cre8-border-radius-small: 4px/g, '--cre8-border-radius-small: 0px'],
      [/--cre8-border-radius-default: 8px/g, '--cre8-border-radius-default: 0px'],
      [/--cre8-border-radius-large: 16px/g, '--cre8-border-radius-large: 0px'],
      [/--cre8-border-radius-button: 8px/g, '--cre8-border-radius-button: 0px'],
      [/--cre8-border-radius-badge: 4px/g, '--cre8-border-radius-badge: 0px'],
      [/--cre8-border-radius-tabs: 8px/g, '--cre8-border-radius-tabs: 0px'],
      [/--cre8-border-radius-container: 16px/g, '--cre8-border-radius-container: 0px'],
      [/--cre8-border-radius-field: 8px/g, '--cre8-border-radius-field: 0px'],
      [/--cre8-border-radius-field-brand: 8px/g, '--cre8-border-radius-field-brand: 0px'],
      [/--cre8-border-radius-brand: 8px/g, '--cre8-border-radius-brand: 0px'],
      [/--cre8-shadow-default: [^;]+/g, '--cre8-shadow-default: none'],
      [/--cre8-shadow-large: [^;]+/g, '--cre8-shadow-large: none'],
      [/--cre8-shadow-small: [^;]+/g, '--cre8-shadow-small: none'],
      [/'Inter', sans-serif/g, "system-ui, -apple-system, sans-serif"],
    ],
  },
  legacy: {
    file: path.join(baseDir, 'design-tokens/brands/legacy/css/tokens_legacy.module.ts'),
    replacements: {
      '#0c8599': '#003366',
      '#05333A': '#001a33',
      '#042D34': '#001122',
      '#0B7285': '#004488',
      '#22B8CF': '#336699',
      '#66D9E8': '#6699cc',
      '#E3FAFC': '#e6eef7',
      '#C5F6FA': '#ccddef',
      '#F3D9FA': '#b3ccdd',
      '#EEBEFA': '#99bbcc',
      '#E599F7': '#7faabb',
      '#F5EAFB': '#eef3f7',
      '#CC5DE8': '#2c5f8a',
      '#DA77F2': '#4488aa',
      '#9C36B5': '#003366',
    },
    extraReplacements: [
      [/'Inter', sans-serif/g, "'Georgia', 'Times New Roman', serif"],
      [/--cre8-border-radius-small: 4px/g, '--cre8-border-radius-small: 3px'],
      [/--cre8-border-radius-default: 8px/g, '--cre8-border-radius-default: 4px'],
      [/--cre8-border-radius-large: 16px/g, '--cre8-border-radius-large: 8px'],
      [/--cre8-border-radius-button: 8px/g, '--cre8-border-radius-button: 4px'],
      [/--cre8-border-radius-badge: 4px/g, '--cre8-border-radius-badge: 3px'],
      [/--cre8-border-radius-tabs: 8px/g, '--cre8-border-radius-tabs: 4px'],
      [/--cre8-border-radius-container: 16px/g, '--cre8-border-radius-container: 8px'],
      [/--cre8-border-radius-field: 8px/g, '--cre8-border-radius-field: 4px'],
      [/--cre8-border-radius-field-brand: 8px/g, '--cre8-border-radius-field-brand: 4px'],
      [/--cre8-border-radius-brand: 8px/g, '--cre8-border-radius-brand: 4px'],
    ],
  },
  blue: {
    file: path.join(baseDir, 'design-tokens/brands/blue/css/tokens_blue.module.ts'),
    replacements: {
      '#0c8599': '#1a73e8',
      '#05333A': '#0d47a1',
      '#042D34': '#0a3d8f',
      '#0B7285': '#1565c0',
      '#22B8CF': '#42a5f5',
      '#66D9E8': '#90caf9',
      '#E3FAFC': '#e3f2fd',
      '#C5F6FA': '#bbdefb',
      '#F3D9FA': '#e8eaf6',
      '#EEBEFA': '#c5cae9',
      '#E599F7': '#9fa8da',
      '#F5EAFB': '#e8eaf6',
      '#CC5DE8': '#3949ab',
      '#DA77F2': '#5c6bc0',
      '#9C36B5': '#1a73e8',
    },
    extraReplacements: [
      [/'Inter', sans-serif/g, "'Roboto', 'Helvetica Neue', sans-serif"],
    ],
  },
};

for (const [name, config] of Object.entries(themes)) {
  let content = fs.readFileSync(config.file, 'utf8');
  for (const [from, to] of Object.entries(config.replacements)) {
    const regex = new RegExp(from.replace('#', '#'), 'gi');
    content = content.replace(regex, to);
  }
  if (config.extraReplacements) {
    for (const [pattern, replacement] of config.extraReplacements) {
      content = content.replace(pattern, replacement);
    }
  }
  fs.writeFileSync(config.file, content, 'utf8');
  console.log(`✓ Customized ${name} theme`);
}
console.log('Done!');
