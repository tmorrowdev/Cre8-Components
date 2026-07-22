import { addons } from 'storybook/manager-api';
import cre8Theme from './cre8Theme';

// Wire the custom Cre8-branded theme into the Storybook manager UI.
addons.setConfig({
  theme: cre8Theme,
  sidebar: {
    showRoots: true,
  },
});
