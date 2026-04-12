import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  core: {
    disableTelemetry: true,
  },
  stories: [
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
    './patterns/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  staticDirs: ['./static'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-mcp'],
  async viteFinal(config) {
    const { mergeConfig } = await import('vite');

    const headScssPath = path.resolve(__dirname, '../../design-tokens/core/scss/theming/head.scss').replace(/\\/g, '/');

    return mergeConfig(config, {
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: (content: string, filePath: string) => {
              if (filePath.includes('design-tokens/core/scss/theming')) {
                return content;
              }
              return `@import "${headScssPath}";\n${content}`;
            },
            includePaths: [
              path.resolve(__dirname, '../../design-tokens'),
              path.resolve(__dirname, '../../node_modules'),
            ],
          },
        },
      },
      optimizeDeps: {
        include: ['react', 'react-dom', 'react/jsx-runtime', '@lit/react'],
      },
      resolve: {
        alias: [
          // Point @tmorrow/cre8-wc/lib/components to source .ts files
          // so Vite resolves SVG imports correctly via the source tree
          { find: /^@tmorrow\/cre8-wc\/lib\/components\/(.*)$/, replacement: path.resolve(__dirname, '../../components/$1') },
          { find: '@tmorrow/cre8-wc/icons', replacement: path.resolve(__dirname, '../../icons') },
          { find: '@tmorrow/cre8-wc', replacement: path.resolve(__dirname, '../..') },
        ],
      },
      server: {
        fs: {
          allow: ['../..'],
        },
      },
    });
  },
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    check: false,
  },
};

export default config;
