import type { StoryObj } from '@storybook/react';
import { Cre8GlobalNav, Cre8GlobalNavItem } from '../..';
import { excludeRegexArray } from '../../../.storybook/preview';

export default {
  title: 'Cre8 Components/GlobalNav',
  component: Cre8GlobalNav,
  subcomponents: { Cre8GlobalNavItem } ,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    }
  },
};

export const Default: StoryObj<typeof Cre8GlobalNav> = { args: {} };
