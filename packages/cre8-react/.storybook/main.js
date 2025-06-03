import { dirname, join } from 'path';
const path = require('path');
const fs = require('fs');

/* Orginal Code */
module.exports = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
    'patterns/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  staticDirs: ['./static'],
  addons: [
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@etchteam/storybook-addon-status'),
    getAbsolutePath('@etchteam/storybook-addon-css-variables-theme'),
  ],
  core: {
    disableTelemetry: true,
  },
  async viteFinal(config) {
    const { mergeConfig } = await import('vite');
    
    return mergeConfig(config, {
      css: {
        preprocessorOptions: {
          scss: {}
        }
      }
    });
  },

  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  docs: {
    autodocs: true,
  },
};

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')));
}
