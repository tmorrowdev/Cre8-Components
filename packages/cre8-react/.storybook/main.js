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
  webpackFinal: (config) => {
    // Loop over each of module rules in our config. Module rules define the loaders
    // that Webpack will use. We're, specifically, looking for the CSS rule
    config.module.rules.map((rule) => {
      // As we loop over the rules if the rule doesn't have a RegExp test or the
      // RegExp test doesn't match `.css` then we'll return the rule as-is with no
      // modifications being made.
      if (!rule.test || !rule.test.test || !rule.test.test('.css')) {
        return rule;
      }

      // If we're here then we're working with the CSS rule so we'll shift off the
      // first loader, which is the style-loader, since we want to manage styles
      // in lit-element, not via storybook/head injection
      rule.use.shift();

      // Return the modified CSS Webpack rule
      return rule;
    });
    // Add SCSS support
    config.module.rules.push({
      test: /\.scss/,
      use: [
        'css-loader',
        {
          loader: 'sass-loader',
        },
      ],
    });
    return config;
  },

  framework: {
    name: getAbsolutePath('@storybook/react-webpack5'),
    options: {},
  },
  docs: {
    autodocs: true,
  },
};

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')));
}
