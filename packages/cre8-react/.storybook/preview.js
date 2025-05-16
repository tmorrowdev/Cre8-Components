import cssVariablesTheme from '@etchteam/storybook-addon-css-variables-theme';
import headStyles from '../../cre8-wc/design-tokens/core/scss/theming/head.scss';

import '!!style-loader!css-loader!../../cre8-wc/.storybook/css/styleguide-only.css';
import starbucks from '!!style-loader?injectType=lazyStyleTag!css-loader!../../cre8-wc/design-tokens/starbucks/tokens.css';
import target from '!!style-loader?injectType=lazyStyleTag!css-loader!../../cre8-wc/design-tokens/target/tokens.css';
import capitalOne from '!!style-loader?injectType=lazyStyleTag!css-loader!../../cre8-wc/design-tokens/capitalone/tokens.css';
import cre8Legacy from '!!style-loader?injectType=lazyStyleTag!css-loader!@cre8_dev/cre8-design-tokens/lib/web/brands/cre8-legacy/css/tokens_cre8-legacy.css';
import consumer from '!!style-loader?injectType=lazyStyleTag!css-loader!@cre8_dev/cre8-design-tokens/lib/web/brands/consumer/css/tokens_consumer.css';
import cre8 from '!!style-loader?injectType=lazyStyleTag!css-loader!@cre8_dev/cre8-design-tokens/lib/web/brands/cre8/css/tokens_cre8.css';
import blue from '!!style-loader?injectType=lazyStyleTag!css-loader!@cre8_dev/cre8-design-tokens/lib/web/brands/blue/css/tokens_blue.css';
import marketing from '!!style-loader?injectType=lazyStyleTag!css-loader!@cre8_dev/cre8-design-tokens/lib/web/brands/marketing/css/tokens_marketing.css';
import black from '!!style-loader?injectType=lazyStyleTag!css-loader!@cre8_dev/cre8-design-tokens/lib/web/brands/black/css/tokens_black.css';

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
      "target":target, 
      "capital one": capitalOne, 
      "starbucks": starbucks, 
      "legacy": cre8Legacy, 
      "consumer": consumer, 
      "cre8": cre8, 
      "blue": blue, 
      "marketing": marketing, 
      "black": black},
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
      order: ['Documentation', 'Cre8 Components', 'Experimental/Unreleased Components', 'Patterns'],
    },
  },
};
