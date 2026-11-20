import { setCustomElementsManifest } from '@storybook/web-components';
import type { Preview } from '@storybook/web-components';
import { setStorybookHelpersConfig } from '@wc-toolkit/storybook-helpers';

import './css/styleguide-only.ts';

// import starbucksStyles from '../design-tokens/starbucks/tokens.module';
// import target from '../design-tokens/target/tokens.module.css';
import cre8 from '../design-tokens/brands/cre8/css/tokens_cre8.module.ts';
import vivid from '../design-tokens/brands/cre8-vivid/css/tokens_cre8-vivid.module.ts';
import blank from '../design-tokens/brands/blank/css/tokens_blank.module.ts';
import cre8A2ui from '../design-tokens/brands/cre8-a2ui/css/tokens_cre8-a2ui.module.ts';

// Prism styles (Storybook only for docs)
import prismcss from './components/system-docs/prism.module.ts';
const prismStyleElement = document.createElement('style');
prismStyleElement.innerHTML = prismcss as unknown as string;
document.head.appendChild(prismStyleElement);

// Otherwise we can use a Webpack loader to catch all `.ts` components and
// dynamically generate the custom elements at build time.
// import customElements from '!!json-loader!../loaders/wca-loader!../package.json';
import customElements from './custom-elements.json';
setCustomElementsManifest(customElements);

// Configure the WC Toolkit Storybook helpers. These read the Custom Elements
// Manifest set above to auto-generate controls for attributes, properties,
// slots, events, CSS shadow parts, and — importantly — the design tokens
// (CSS custom properties) each component exposes via `@cssproperty`.
// See https://wc-toolkit.com/integrations/storybook/
setStorybookHelpersConfig({
  // Keep the "arg ref" hint visible so consumers can see which binding
  // (attr/prop/css) each control maps to.
  hideArgRef: false,
  // Order controls so design tokens sit alongside the component API.
  categoryOrder: [
    'attributes',
    'properties',
    'slots',
    'events',
    'cssProps',
    'cssParts',
    'cssStates',
    'methods',
  ],
});

import headStyles from '../design-tokens/core/scss/theming/head.module.ts';

/*
 * Core global custom properties: `--size-base-unit`, the RTL vars, and the
 * layout widths `--cre8-l-max-width` / `--cre8-l-linelength-width`.
 *
 * `head.scss` carries only abstracts — mixins and functions — so it emits no
 * `:root` block. Without this the preview defined none of these properties, so
 * `cre8-layout-container` and `cre8-linelength-container` computed
 * `max-width: none` and their stories demonstrated nothing at all. Consumers
 * pick these up through `component.css`; the preview should match.
 */
import '../design-tokens/core/scss/theming/variables.css';

const headStyleElement = document.createElement('style') as HTMLStyleElement;
headStyleElement.innerHTML = headStyles as unknown as string;
document.head.appendChild(headStyleElement);
const excludeArray = ['shadowRootOptions', 'formAssociated', 'field'];

// Apply theme styles to document head
const themeStyles = [
  { name: 'Cre8', styles: cre8 },
  { name: 'Cre8 Vivid', styles: vivid },
  { name: 'Blank', styles: blank },
  { name: 'A2UI (Mira)', styles: cre8A2ui },
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
      defaultValue: 'Cre8',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        // Values must match the `name` of an entry in `themeStyles` above;
        // the decorator enables the stylesheet whose name equals the value.
        items: themeStyles.map(({ name }) => ({ value: name, title: name })),
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (story, context) => {
      // Fall back to the first brand when the global is unset or stale (an old
      // URL or saved toolbar value naming a theme that no longer exists).
      // Otherwise every brand stylesheet is disabled and components render
      // with no tokens at all.
      const requested = context.globals.theme;
      const selectedTheme = themeStyles.some(({ name }) => name === requested)
        ? requested
        : themeStyles[0].name;

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
    actions: { argTypesRegex: '^on[A-Z].*' },
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
