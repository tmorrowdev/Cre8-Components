import type { StoryObj } from '@storybook/react';
import { cre8UtilityNav, cre8UtilityNavItem } from '../..';
import { excludeRegexArray } from '../../../.storybook/preview';

export default {
  title: 'Cre8 Components/UtilityNav',
  component: cre8UtilityNav,
  subcomponents: { cre8UtilityNavItem },
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    }
  },
};

export const Default: StoryObj<typeof cre8UtilityNav> = { args: {} };
