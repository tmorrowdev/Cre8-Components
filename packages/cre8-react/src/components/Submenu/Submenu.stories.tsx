import type { StoryObj } from '@storybook/react';
import { cre8Submenu, cre8SubmenuItem } from '../..';
import { excludeRegexArray } from '../../../.storybook/preview';

export default {
  title: 'Cre8 Components/Submenu',
  component: cre8Submenu,
  subcomponents: { cre8SubmenuItem },
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    }
  },
};

export const Default: StoryObj<typeof cre8Submenu> = { args: {} };
