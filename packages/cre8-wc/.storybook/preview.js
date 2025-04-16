import cssVariablesTheme from '@etchteam/storybook-addon-css-variables-theme';
import {setCustomElementsManifest} from '@storybook/web-components';

import '!!style-loader!css-loader!./css/styleguide-only.css';

import headStyles from '!!style-loader!css-loader!sass-loader!../design-tokens/core/scss/theming/head.scss';

import cre8Legacy from '!!style-loader?injectType=lazyStyleTag!css-loader!@cre8_dev/cre8-design-tokens/lib/web/brands/cre8-legacy/css/tokens_cre8-legacy.css';
import consumer from '!!style-loader?injectType=lazyStyleTag!css-loader!@cre8_dev/cre8-design-tokens/lib/web/brands/consumer/css/tokens_consumer.css';
import cre8 from '!!style-loader?injectType=lazyStyleTag!css-loader!@cre8_dev/cre8-design-tokens/lib/web/brands/cre8/css/tokens_cre8.css';
import blue from '!!style-loader?injectType=lazyStyleTag!css-loader!@cre8_dev/cre8-design-tokens/lib/web/brands/blue/css/tokens_blue.css';
import marketing from '!!style-loader?injectType=lazyStyleTag!css-loader!@cre8_dev/cre8-design-tokens/lib/web/brands/marketing/css/tokens_marketing.css';
import femmecubator from '!!style-loader?injectType=lazyStyleTag!css-loader!@cre8_dev/cre8-design-tokens/lib/web/brands/femmecubator/css/tokens_femmecubator.css';
import black from '!!style-loader?injectType=lazyStyleTag!css-loader!@cre8_dev/cre8-design-tokens/lib/web/brands/black/css/tokens_black.css';

export const decorators = [cssVariablesTheme];

// Prism styles (Storybook only for docs)
import prismCSS from './components/system-docs/prism.css';
const prismStyleElement = document.createElement('style');
prismStyleElement.innerHTML = prismCSS;
document.head.appendChild(prismStyleElement);

// Otherwise we can use a Webpack loader to catch all `.ts` components and
// dynamically generate the custom elements at build time.
// import customElements from '!!json-loader!../loaders/wca-loader!../package.json';
import customElements from './custom-elements.json';
import SyntaxHighlighter from '@whitespace/storybook-addon-html/dist/cjs/components/SyntaxHighlighter';
setCustomElementsManifest(customElements);

const headStyleElement = document.createElement('style');
headStyleElement.innerHTML = headStyles;
document.head.appendChild(headStyleElement);

const excludeArray = ['shadowRootOptions', 'formAssociated', 'field'];

// Parameters for storybook addons
export const parameters = {
  layout: 'padded',
  cssVariables: {
    files: {
      'Consumer': consumer,
      'Marketing': marketing,
      'Legacy': cre8Legacy,
      'Cre8': cre8,
      'Blue': blue,
      'Femmecubator': femmecubator,
      'Black': black

    },
    defaultTheme: 'Cre8',
  },
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
};
