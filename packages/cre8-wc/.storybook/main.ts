import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  core: {
    disableTelemetry: true,
  },
  // Tell Storybook where to find the stories
  stories: [
    '../components/**/*.mdx',
    '../components/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    './components/icon-grid/icon-grid.stories.ts',
    './patterns/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    './components/system-docs/*.mdx'
  ],
  staticDirs: [
    './static'
  ], // Include any addons you'd like to use in Storybook
  addons: [
    '@storybook/addon-themes',
    '@storybook/addon-a11y',
    '@storybook/addon-essentials',
    '@whitespace/storybook-addon-html'
  ],
  // Customize Vite config
  async viteFinal(config) {
    const { mergeConfig } = await import('vite');
    
    return mergeConfig(config, {
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: `@import "../design-tokens/core/scss/theming/head.scss";`
          }
        }
      },
      optimizeDeps: {
        include: ['lit', 'lit-html', 'lit/decorators.js']
      },
      define: {
        global: 'globalThis',
      },
      server: {
        fs: {
          allow: ['..']
        }
      },
      resolve: {
        extensions: ['.ts', '.js', '.svg']
      }
    });
  },
  framework: {
    name: '@storybook/web-components-vite',
    options: {},
  },
  typescript: {
    check: false,
  },
   
};

export default config;