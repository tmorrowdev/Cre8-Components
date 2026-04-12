import type { StoryObj } from '@storybook/react-vite';
import { Cre8PrimaryNav, Cre8PrimaryNavItem } from '../../index';
import { excludeRegexArray } from '../../.storybook/preview';

export default {
  title: 'Cre8 Components/PrimaryNav',
  component: Cre8PrimaryNav,
  subcomponents: { Cre8PrimaryNavItem },
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    }
  },
};

export const Default: StoryObj<typeof Cre8PrimaryNav> = { args: {} };
