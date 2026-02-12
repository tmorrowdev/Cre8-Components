import { dirname, join } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
    '!../src/components/VerticalCard/**',
    '!../src/components/ProgressSteps/**',
    '!../src/components/ProgressStepsItem/**',
    'patterns/**/*.stories.@(js|jsx|ts|tsx)',
  ],

  staticDirs: ['./static'],

  addons: [
    getAbsolutePath('@storybook/addon-a11y'),
  ],

  core: {
    disableTelemetry: true,
  },

  async viteFinal(config) {
    const { mergeConfig } = await import('vite');

    const headScssPath = path.resolve(__dirname, '../../cre8-wc/design-tokens/core/scss/theming/head.scss').replace(/\\/g, '/');

    return mergeConfig(config, {
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: (content, filePath) => {
              if (filePath.includes('design-tokens/core/scss/theming')) {
                return content;
              }
              return `@import "${headScssPath}";\n${content}`;
            },
            includePaths: [
              path.resolve(__dirname, '../../cre8-wc/design-tokens'),
              path.resolve(__dirname, '../../cre8-wc/node_modules/@tmorrow/cre8-design-tokens'),
              path.resolve(__dirname, '../../cre8-wc/node_modules')
            ]
          }
        }
      },
      resolve: {
        alias: {
          '@tmorrow/cre8-wc/icons': path.resolve(__dirname, '../../cre8-wc/icons'),
        }
      },
      server: {
        fs: {
          allow: ['..']
        }
      }
    });
  },

  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
};

export default config;

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')));
}
