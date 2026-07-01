import type { StorybookConfig } from '@storybook/web-components-vite';
import path from 'path';
import { fileURLToPath } from 'url';
                                                                                                                                                 
const __dirname = path.dirname(fileURLToPath(import.meta.url));  
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
    '@storybook/addon-docs',
    '@storybook/addon-themes',
    '@storybook/addon-a11y'
  ],
  // Customize Vite config
  async viteFinal(config, options) {
    const { mergeConfig } = await import('vite');
    const { storybookHelpersReloader } = await import('@wc-toolkit/storybook-helpers');

    const merged = mergeConfig(config, {
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: (content: string, filePath: string) => {
              // Only add the import if we're not already in the theming directory
              // to avoid circular dependencies
              if (filePath.includes('design-tokens/core/scss/theming')) {
                return content;
              }
              return `@import "../design-tokens/core/scss/theming/head.scss";\n${content}`;
            },
            includePaths: [
              path.resolve(__dirname, '../node_modules')
            ]
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

    // Watch the Custom Elements Manifest so WC Toolkit Storybook helper
    // controls (including design tokens) hot-reload when it is regenerated.
    return storybookHelpersReloader({ path: 'custom-elements.json' }).viteFinal(
      merged,
      options,
    );
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