import cssVariablesTheme from '@etchteam/storybook-addon-css-variables-theme';
import {setCustomElementsManifest} from '@storybook/web-components';

import '!!style-loader!css-loader!./css/styleguide-only.css';

import headStyles from '!!style-loader!css-loader!sass-loader!../design-tokens/core/scss/theming/head.scss';

import cignaLegacy from '!!style-loader?injectType=lazyStyleTag!css-loader!@cre8/cre8-design-tokens/lib/web/brands/cigna-legacy/css/tokens_cigna-legacy.css';
import chc from '!!style-loader?injectType=lazyStyleTag!css-loader!@cre8/cre8-design-tokens/lib/web/brands/chc/css/tokens_chc.css';
import evernorth from '!!style-loader?injectType=lazyStyleTag!css-loader!@cre8/cre8-design-tokens/lib/web/brands/evernorth/css/tokens_evernorth.css';
import pbm from '!!style-loader?injectType=lazyStyleTag!css-loader!@cre8/cre8-design-tokens/lib/web/brands/pbm/css/tokens_pbm.css';
import tcg from '!!style-loader?injectType=lazyStyleTag!css-loader!@cre8/cre8-design-tokens/lib/web/brands/tcg/css/tokens_tcg.css';

import DocumentationTemplate from './documentation-template.mdx';

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
      'Consumer': chc,
      'Marketing': tcg,
      'Legacy': cignaLegacy,
      'Cre8': evernorth,
      'Cre8-Legacy': pbm,
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
  docs: {
    page: DocumentationTemplate,
    argTypes: {
      exclude: excludeArray,
    },
  },
  options: {
    storySort: {
      order: ['Documentation', 'cre8 Components', ' Patterns', 'Experimental Components'],
    },
  },
};
