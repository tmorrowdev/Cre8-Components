import '../../.storybook/css/styleguide-only.css';
import cre8 from '../../design-tokens/brands/cre8/css/tokens_cre8.module.ts';
import vivid from '../../design-tokens/brands/cre8-vivid/css/tokens_cre8-vivid.module.ts';
import blank from '../../design-tokens/brands/blank/css/tokens_blank.module.ts';

import headStyles from '../../design-tokens/core/scss/theming/head.scss?inline';

// Inject head styles
const headStyleElement = document.createElement('style');
headStyleElement.innerHTML = headStyles;
document.head.appendChild(headStyleElement);

// Theme definitions
// The three shipped brands. `name` is the toolbar value and the source of the
// <style> id, so the toolbar and the stylesheets can never drift apart.
const themeStyles = [
  { name: 'A2UI', styles: cre8 },
  { name: 'Vivid', styles: vivid },
  { name: 'Blank', styles: blank },
];
const DEFAULT_THEME = 'A2UI';

// Inject all theme styles with unique IDs
themeStyles.forEach(theme => {
  const styleElement = document.createElement('style');
  styleElement.id = `theme-${theme.name.toLowerCase().replace(/\s+/g, '-')}`;
  styleElement.innerHTML = (theme.styles as any)?.default || theme.styles?.toString() || theme.styles;
  document.head.appendChild(styleElement);
});

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

export const globalTypes = {
  theme: {
    description: 'Global theme for components',
    defaultValue: DEFAULT_THEME,
    toolbar: {
      title: 'Theme',
      icon: 'paintbrush',
      items: themeStyles.map(t => ({ value: t.name, title: t.name })),
      dynamicTitle: true,
    },
  },
};

export const decorators = [
  (story: any, context: any) => {
    const selectedTheme = context.globals.theme || DEFAULT_THEME;

    themeStyles.forEach(theme => {
      const el = document.getElementById(`theme-${theme.name.toLowerCase().replace(/\s+/g, '-')}`);
      if (el) {
        (el as HTMLStyleElement).disabled = theme.name !== selectedTheme;
      }
    });

    return story();
  },
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
