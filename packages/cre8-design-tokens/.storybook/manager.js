import { addons } from '@storybook/manager-api';
import uiTheme from './uiTheme';

addons.setConfig({
  theme: uiTheme,
});