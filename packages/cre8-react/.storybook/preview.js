import cssVariablesTheme from '@etchteam/storybook-addon-css-variables-theme';
import headStyles from '../../cre8-wc/design-tokens/core/scss/theming/head.scss';

import '!!style-loader!css-loader!../../cre8-wc/.storybook/css/styleguide-only.css';

import cignaLegacy from '!!style-loader?injectType=lazyStyleTag!css-loader!@cre8/cre8-design-tokens/lib/web/brands/cigna-legacy/css/tokens_cigna-legacy.css';
import chc from '!!style-loader?injectType=lazyStyleTag!css-loader!@cre8/cre8-design-tokens/lib/web/brands/chc/css/tokens_chc.css';
import evernorth from '!!style-loader?injectType=lazyStyleTag!css-loader!@cre8/cre8-design-tokens/lib/web/brands/evernorth/css/tokens_evernorth.css';
import pbm from '!!style-loader?injectType=lazyStyleTag!css-loader!@cre8/cre8-design-tokens/lib/web/brands/pbm/css/tokens_pbm.css';
import tcg from '!!style-loader?injectType=lazyStyleTag!css-loader!@cre8/cre8-design-tokens/lib/web/brands/tcg/css/tokens_tcg.css';

window.cre8_ICON_URL = './icons/cre8-icons.svg';

export const decorators = [cssVariablesTheme];

export const excludeRegexArray = [
  '^children$',
  '^render$',
  '^firstUpdated$',
  '^openAll$',
  '^closeAll$',
  '^componentClassNames$',
  '^slotEmpty$',
  '^slotNotEmpty$',
  '^dispatch$',
  '^renderOptions$',
  '^connectedCallback$',
  '^disconnectedCallback$',
  '^renderRoot$',
  '^isUpdatePending$',
  '^hasUpdated$',
  '^updated$',
  '^addController$',
  '^removeController$',
  '^attributeChangedCallback$',
  '^requestUpdate$',
  '^updateComplete$',
  '^handle[A-Z].*',
  '^_.*',
  '^internalValue$',
  '^field$',
  '^internals$',
];

const headStyleElement = document.createElement('style');
headStyleElement.innerHTML = headStyles;
document.head.appendChild(headStyleElement);

export const parameters = {
  cssVariables: {
    files: {
      'Cigna Healthcare': chc,
      'The Cigna Group': tcg,
      'Cigna Legacy': cignaLegacy,
      'Evernorth': evernorth,
      'PBM': pbm,
    },
    defaultTheme: 'Evernorth',
  },
  status: {
    statuses: {
      notStarted: {
        background: '#FF0000',
        color: '#ffffff',
        description:
          'This component has not been started from a development standpoint.',
      },
      inProgress: {
        background: '#EC942C',
        color: '#ffffff',
        description:
          'This component is running through slight adjustments and testing. Proceed with caution',
      },
      tested: {
        background: '#2da44e',
        color: '#ffffff',
        description: 'This component is stable and released',
      },
    },
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
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: ['Documentation', 'cre8 Components', 'Experimental/Unreleased Components', 'Patterns'],
    },
  },
};
