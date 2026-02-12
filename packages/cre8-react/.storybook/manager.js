import { addons } from 'storybook/manager-api';
import cre8Theme from './cre8Theme.js';

addons.setConfig({
  enableShortcuts: false,
  theme: cre8Theme,
});
