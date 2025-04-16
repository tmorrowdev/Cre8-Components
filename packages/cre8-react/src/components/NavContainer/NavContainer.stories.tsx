import type { StoryObj } from '@storybook/react';
import { Cre8NavContainer } from '../..';
import { excludeRegexArray } from '../../../.storybook/preview';

export default {
  title: 'Cre8 Components/NavContainer',
  component: Cre8NavContainer,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    }
  },
};

export const Default: StoryObj<typeof Cre8NavContainer> = { args: {} };
