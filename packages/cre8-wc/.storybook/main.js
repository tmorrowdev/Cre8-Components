import {dirname, join} from 'path';

module.exports = {
  // Use webpack 5 so we have better control over entry/output and can push Yaml/CSS
  // to the right place
  core: {
    disableTelemetry: true,
  },
  // Tell Storybook where to find the stories
  stories: [
    '../components/**/*.mdx',
    '../components/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    './components/icon-grid/icon-grid.stories.ts',
    './patterns/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    './components/system-docs/*.mdx',
  ],
  refs: (config, { configType }) => {
    if (configType === 'DEVELOPMENT') {
      return {
        'cre8-design-tokens': {
          title: 'cre8 Design Tokens',
          url: 'http://localhost:6008',
        },
      };
    }
    return {
      'cre8-design-tokens': {
        title: 'cre8 Design Tokens',
        url: '../cre8-design-tokens',
      },
    };
  },
  staticDirs: [
    './static',
  ], // Include any addons you'd like to use in Storybook
  addons: [
    getAbsolutePath('@etchteam/storybook-addon-css-variables-theme'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@etchteam/storybook-addon-status'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@whitespace/storybook-addon-html')
  ],
  // Customize our Webpack config
  webpackFinal: async (config, {configType}) => {
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

    config.module.rules.push({
      test: /\.yml$/,
      use: ['css-loader'],
    });
    // Return the modified Webpack Config
    return config;
  },
  framework: {
    name: getAbsolutePath('@storybook/web-components-webpack5'),
    options: {},
  },
  docs: {
    autodocs: true,
  },
};

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')));
}
