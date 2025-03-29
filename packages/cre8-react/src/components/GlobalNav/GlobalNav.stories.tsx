import type { StoryObj } from '@storybook/react';
import { cre8GlobalNav, cre8GlobalNavItem } from '../..';
import { excludeRegexArray } from '../../../.storybook/preview';

export default {
  title: 'Cre8 Components/GlobalNav',
  component: cre8GlobalNav,
  subcomponents: { cre8GlobalNavItem } ,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    }
  },
};

export const Default: StoryObj<typeof cre8GlobalNav> = { args: {} };
