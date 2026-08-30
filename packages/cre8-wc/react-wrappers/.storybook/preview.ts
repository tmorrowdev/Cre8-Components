import '../../.storybook/css/styleguide-only.css';
import cre8 from '../../design-tokens/brands/cre8/css/tokens_cre8.module.ts';
import cre8Legacy from '../../design-tokens/brands/cre8-legacy/css/tokens_cre8-legacy.module.ts';
import legacy from '../../design-tokens/brands/legacy/css/tokens_legacy.module.ts';
import blue from '../../design-tokens/brands/blue/css/tokens_blue.module.ts';
import marketing from '../../design-tokens/brands/marketing/css/tokens_marketing.module.ts';
import minimalist from '../../design-tokens/brands/minimalist/css/tokens_minimalist.module.ts';
import femmecubator from '../../design-tokens/brands/femmecubator/css/tokens_femmecubator2.module.ts';
import prisma from '../../design-tokens/brands/prisma/tokens_prisma.module.ts';
import starbucks from '../../design-tokens/brands/starbucks/tokens_starbucks.module.ts';
import bolt from '../../design-tokens/brands/bolt/tokens_bolt.theme.ts';
import a2ui from '../../design-tokens/brands/cre8-a2ui/css/tokens_cre8-a2ui.module.ts';
import vivid from '../../design-tokens/brands/cre8-vivid/css/tokens_cre8-vivid.module.ts';
import whitelabel from '../../design-tokens/brands/whitelabel/css/tokens_whitelabel.module.ts';
import notion from '../../design-tokens/brands/notion/tokens_notion.module.ts';

import headStyles from '../../design-tokens/core/scss/theming/head.scss?inline';

// Inject head styles
const headStyleElement = document.createElement('style');
headStyleElement.innerHTML = headStyles;
document.head.appendChild(headStyleElement);

// Theme definitions
const themeStyles = [
  { name: 'Cre8 Default', styles: cre8 },
  { name: 'A2UI', styles: a2ui },
  { name: 'Vivid', styles: vivid },
  { name: 'Whitelabel', styles: whitelabel },
  { name: 'Notion', styles: notion },
  { name: 'Cre8 Legacy', styles: cre8Legacy },
  { name: 'Legacy', styles: legacy },
  { name: 'Blue', styles: blue },
  { name: 'Marketing', styles: marketing },
  { name: 'Minimalist', styles: minimalist },
  { name: 'Femmecubator', styles: femmecubator },
  { name: 'Prisma', styles: prisma },
  { name: 'Starbucks', styles: starbucks },
  { name: 'Bolt', styles: bolt },
];

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
  (story: any, context: any) => {
    const selectedTheme = context.globals.theme || 'Cre8 Default';

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
