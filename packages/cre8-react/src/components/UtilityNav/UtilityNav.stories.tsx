import type { StoryObj } from '@storybook/react';
import { Cre8UtilityNav, Cre8UtilityNavItem } from '../..';
import { excludeRegexArray } from '../../../.storybook/preview';

export default {
  title: 'Cre8 Components/UtilityNav',
  component: Cre8UtilityNav,
  subcomponents: { Cre8UtilityNavItem },
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    }
  },
};

export const Default: StoryObj<typeof Cre8UtilityNav> = { args: {} };
