import type { StoryObj } from '@storybook/react';
import { cre8NavContainer } from '../..';
import { excludeRegexArray } from '../../../.storybook/preview';

export default {
  title: 'DEPRECATED/DO NOT USE/NavContainer',
  component: cre8NavContainer,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    }
  },
};

export const Default: StoryObj<typeof cre8NavContainer> = { args: {} };
