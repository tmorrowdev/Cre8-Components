import type { StoryObj } from '@storybook/react-vite';
import { Cre8Submenu, Cre8SubmenuItem } from '../../index';
import { excludeRegexArray } from '../../.storybook/preview';

export default {
  title: 'Cre8 Components/Submenu',
  component: Cre8Submenu,
  subcomponents: { Cre8SubmenuItem },
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    }
  },
};

export const Default: StoryObj<typeof Cre8Submenu> = { args: {} };
