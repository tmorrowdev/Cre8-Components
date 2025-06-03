import { setCustomElementsManifest } from '@storybook/web-components';
import type { Preview } from '@storybook/web-components';

import './css/styleguide-only.css';

// import starbucksStyles from '../design-tokens/starbucks/tokens.module';
// import target from '../design-tokens/target/tokens.module.css';
import * as cre8Legacy from '../design-tokens/brands/cre8-legacy/css/tokens_cre8-legacy.module.js';
import consumer from '../design-tokens/brands/consumer/css/tokens_consumer.module.js';
import cre8 from '../design-tokens/brands/cre8/css/tokens_cre8.module.js';
import blue from '../design-tokens/brands/blue/css/tokens_blue.module.js';
import marketing from '../design-tokens/brands/marketing/css/tokens_marketing.module.js';
import black from '../design-tokens/brands/black/css/tokens_black.module.js';
import femmecubator from '../design-tokens/brands/femmecubator/css/tokens_femmecubator2.module.js';
import prisma from '../design-tokens/brands/prisma/tokens_prisma.module.js';
// Prism styles (Storybook only for docs)
import prismcss from './components/system-docs/prism.module.js';
const prismStyleElement = document.createElement('style');
prismStyleElement.innerHTML = prismcss as unknown as string;
document.head.appendChild(prismStyleElement);

// Otherwise we can use a Webpack loader to catch all `.ts` components and
// dynamically generate the custom elements at build time.
// import customElements from '!!json-loader!../loaders/wca-loader!../package.json';
import customElements from './custom-elements.json';
setCustomElementsManifest(customElements);

import headStyles from '../design-tokens/core/scss/theming/head.module.js';

const headStyleElement = document.createElement('style') as HTMLStyleElement;
headStyleElement.innerHTML = headStyles as unknown as string;
document.head.appendChild(headStyleElement);
const excludeArray = ['shadowRootOptions', 'formAssociated', 'field'];

// Apply theme styles to document head
const themeStyles = [
  { name: 'Cre8 Default', styles: cre8 },
  { name: 'Cre8 Legacy', styles: cre8Legacy },
  { name: 'Consumer', styles: consumer },
  { name: 'Blue', styles: blue },
  { name: 'Marketing', styles: marketing },
  { name: 'Black', styles: black },
  { name: 'Femmecubator', styles: femmecubator },
  { name: 'Prisma', styles: prisma }
];

// Inject all theme styles with unique IDs
themeStyles.forEach(theme => {
  const styleElement = document.createElement('style');
  styleElement.id = `theme-${theme.name.toLowerCase().replace(/\s+/g, '-')}`;
  styleElement.innerHTML = (theme.styles as any).default || theme.styles.toString();
  document.head.appendChild(styleElement);
});

// Define the preview configuration
const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'Cre8 Default',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'Cre8 Default', title: 'Cre8 Default' },
          { value: 'Cre8 Legacy', title: 'Cre8 Legacy' },
          { value: 'Consumer', title: 'Consumer' },
          { value: 'Blue', title: 'Blue' },
          { value: 'Marketing', title: 'Marketing' },
          { value: 'Black', title: 'Black' },
          { value: 'Femmecubator', title: 'Femmecubator' },
          { value: 'Prisma', title: 'Prisma' }
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (story, context) => {
      const selectedTheme = context.globals.theme;
      
      // Enable/disable theme stylesheets
      themeStyles.forEach(theme => {
        const styleElement = document.getElementById(`theme-${theme.name.toLowerCase().replace(/\s+/g, '-')}`) as HTMLStyleElement;
        if (styleElement) {
          styleElement.disabled = theme.name !== selectedTheme;
        }
      });
      
      return story();
    }
  ],
  parameters: {
    layout: 'padded', 
  html: {
    root: '#root-inner',
    prettier: {
      tabWidth: 4,
      useTabs: true,
    },
    removeComments: true,
  },
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'light',
        value: '#fff',
      },
      {
        name: 'dark',
        value: '#000',
      },
    ],
  },
  status: {
    statuses: {
      notStarted: {
        background: '#FF0000',
        color: '#ffffff',
        description: 'This component has not been started from a development standpoint.',
      },
      inProgress: {
        background: '#EC942C',
        color: '#ffffff',
        description: 'This component is running through slight adjustments and testing. Proceed with caution',
      },
      tested: {
        background: '#2da44e',
        color: '#ffffff',
        description: 'This component is stable and released',
      },
    },
  },
  actions: {argTypesRegex: '^on[A-Z].*'},
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    expanded: true,
    exclude: excludeArray,
    sort: 'requiredFirst',
  },
  options: {
    storySort: {
      order: ['Documentation', 'cre8 Components', ' Patterns'],
    },
  },
  },
};

export default preview;
