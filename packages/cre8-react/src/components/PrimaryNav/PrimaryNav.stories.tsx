import type { StoryObj } from '@storybook/react';
import { cre8PrimaryNav, cre8PrimaryNavItem } from '../..';
import { excludeRegexArray } from '../../../.storybook/preview';

export default {
  title: 'DEPRECATED/DO NOT USE/PrimaryNav',
  component: cre8PrimaryNav,
  subcomponents: { cre8PrimaryNavItem },
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    }
  },
};

export const Default: StoryObj<typeof cre8PrimaryNav> = { args: {} };
