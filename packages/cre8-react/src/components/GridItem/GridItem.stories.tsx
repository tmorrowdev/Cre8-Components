import type { StoryObj } from '@storybook/react';
import { Cre8GridItem } from '../..';
import { excludeRegexArray } from '../../../.storybook/preview';

export default {
  title: 'Cre8 Components/GridItem',
  component: Cre8GridItem,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    }
  },
};

export const Default: StoryObj<typeof Cre8GridItem> = { args: {} };
