const path = require('path');
const glob = require('glob');
const fs = require('fs');
const CopyPlugin = require('copy-webpack-plugin');

const baseComponents = glob.sync('./components/*.ts').reduce((acc, baseComponentPath) => {
  acc[path.parse(baseComponentPath).name] = baseComponentPath;
  return acc;
}, {});
// Only cre8-element and cre8-form-element are in the above location
// To allow extending off a web component it must be listed below
baseComponents['cre8-field'] = './components/field/field.ts';

// TODO: clean up the Base Component logic here

const components = glob.sync('./components/*/*.ts').reduce((acc, componentPath) => {
  // Exclude icon because there are some specific things that need to happen based on the URL inclusion of `icon.js`
  // in order for routing to work correctly
  if (componentPath.match(/icon\.ts$/)) {
    return acc;
  }

  // Excludes any components that are not extending the base components.
  const contents = fs.readFileSync(componentPath);
  const baseComponentNames = Object.keys(baseComponents).map((baseComponent) => ( // convert dash-case to UpperCamelCase
    baseComponent
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('')
  ));
  const extendsBaseComponent = baseComponentNames.some((baseComponentName) => contents.includes(`extends ${baseComponentName}`));
  if (extendsBaseComponent) {
    acc[path.parse(componentPath).name] = componentPath;
  } else {
    console.warn(`${componentPath} doesn't extend any base components: ${baseComponentNames.join(', ')}`);
  }

  return acc;
}, {});

const entry = {
  ...components,
  ...baseComponents,
  theme: {
    import: path.resolve(__dirname, `./design-tokens/core/scss/theming/head.scss`),
    filename: 'theme.js'
  },
  icon: './components/icon/icon.ts',
  index: {
    import: './index.ts',
    filename: './index.js',
  },
};

/**
 * The wbepack config is a callback so that we may pass in `env` and set the theme (which defaults
 * to the `vanilla` theme). Setting a theme affects the compilation in two ways. First, it replaces out
 * any JS imports with the proper theme path. So `import THEME/foo.scss` will try to import the passed
 * env theme's `foo.scss`. Secondly, we adjust the Sass importers so you can `@import THEME/foo.scss`.
 * The Sass adjustment works the same way and allows you to import theme overrides during compilation.
 */

module.exports = {
  entry,
  output: {
    publicPath: '',
    path: path.resolve(__dirname, 'lib'),
    filename: 'components/[name]/[name].js',
    library: {
      type: 'module'
    }
  },
  experiments: {
    outputModule: true
  },
  mode: 'production',
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: `icons/*.svg`, to: path.resolve(__dirname, 'lib', 'icons', 'cre8-icons.svg') },
        { from: `design-tokens`, to: path.resolve(__dirname, 'lib', 'design-tokens') }
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|ts|md)x?$/,
          use: {
            loader: 'babel-loader',
          },
          exclude: {
            and: [/node_modules/], // Exclude libraries in node_modules ...
            not: [
              // Except for a few of them that needs to be transpiled because they use modern syntax
              /lit-html/,
              /lit-element/,
              /lit/,
              /@cre8[\\/]cre8-icons/
            ]
        }
      },
      {
        test: /\.css$/,
        use: ['css-loader']
      },
      {
        test: /variables\.scss$/,
        use: [
          'sass-loader',
          {
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ],
        generator: {
          filename: `variables.css`
        }
      },
      {
        test: /\.scss$/,
        use: ['css-loader', 'sass-loader']
      },
      {
        test: /\.json$/,
        use: ['json-loader']
      },
      {
        // import file contents as a string
        resourceQuery: /raw/,
        type: 'asset/source',
      },
      {
        test: /\.svg$/,
        resourceQuery: { not: [/raw/] }, // don't output files when imported as a string
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'svgs/'
            }
          }
        ]
      },
      {
        test: /\.(otf|ttf|woff(2)?|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.scss', '.css', '.otf', '.ttf', '.yml']
  }
};
