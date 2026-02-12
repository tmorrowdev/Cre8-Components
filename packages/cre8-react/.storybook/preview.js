import '../../cre8-wc/.storybook/css/styleguide-only.css';
import cre8A2ui from '../../cre8-design-tokens/lib/web/brands/cre8-a2ui/css/tokens_cre8-a2ui.js';
import cre8 from '../../cre8-wc/design-tokens/brands/cre8/css/tokens_cre8.module.ts';
import cre8Legacy from '../../cre8-wc/design-tokens/brands/cre8-legacy/css/tokens_cre8-legacy.module.ts';
import legacy from '../../cre8-wc/design-tokens/brands/legacy/css/tokens_legacy.module.ts';
import blue from '../../cre8-wc/design-tokens/brands/blue/css/tokens_blue.module.ts';
import marketing from '../../cre8-wc/design-tokens/brands/marketing/css/tokens_marketing.module.ts';
import minimalist from '../../cre8-wc/design-tokens/brands/minimalist/css/tokens_minimalist.module.ts';
import femmecubator from '../../cre8-wc/design-tokens/brands/femmecubator/css/tokens_femmecubator2.module.ts';

import headStyles from '../../cre8-wc/design-tokens/core/scss/theming/head.scss?inline';

window.cre8_ICON_URL = './icons/cre8-icons.svg';

// Inject head styles
const headStyleElement = document.createElement('style');
headStyleElement.innerHTML = headStyles;
document.head.appendChild(headStyleElement);

// Theme definitions
const themeStyles = [
  { name: 'Cre8 A2UI', styles: cre8A2ui },
  { name: 'Cre8 Default', styles: cre8 },
  { name: 'Cre8 Legacy', styles: cre8Legacy },
  { name: 'Legacy', styles: legacy },
  { name: 'Blue', styles: blue },
  { name: 'Marketing', styles: marketing },
  { name: 'Minimalist', styles: minimalist },
  { name: 'Femmecubator', styles: femmecubator },
];

// Inject all theme styles with unique IDs
themeStyles.forEach(theme => {
  const styleElement = document.createElement('style');
  styleElement.id = `theme-${theme.name.toLowerCase().replace(/\s+/g, '-')}`;
  styleElement.innerHTML = theme.styles?.default || theme.styles?.toString() || theme.styles;
  document.head.appendChild(styleElement);
});

export const globalTypes = {
  theme: {
    description: 'Global theme for components',
    defaultValue: 'Cre8 Default',
    toolbar: {
      title: 'Theme',
      icon: 'paintbrush',
      items: themeStyles.map(t => ({ value: t.name, title: t.name })),
      dynamicTitle: true,
    },
  },
};

export const decorators = [
  (story, context) => {
    const selectedTheme = context.globals.theme;

    themeStyles.forEach(theme => {
      const el = document.getElementById(`theme-${theme.name.toLowerCase().replace(/\s+/g, '-')}`);
      if (el) {
        el.disabled = theme.name !== selectedTheme;
      }
    });

    return story();
  },
];

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

export const parameters = {
  layout: 'padded',
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
  backgrounds: {
    options: {
      light: { name: 'light', value: '#fff' },
      dark: { name: 'dark', value: '#000' },
    },
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    exclude: excludeRegexArray,
  },
  options: {
    storySort: {
      order: ['Documentation', 'Cre8 Components', 'Experimental/Unreleased Components', 'Patterns'],
    },
  },
};

export const initialGlobals = {
  backgrounds: { value: 'light' },
};

export const tags = ['autodocs'];
