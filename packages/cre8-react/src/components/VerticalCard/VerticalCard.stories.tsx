import type { StoryObj } from '@storybook/react';
import { Cre8VerticalCard } from '../..';
import { excludeRegexArray } from '../../../.storybook/preview';

export default {
  title: 'Cre8 Components/VerticalCard',
  component: Cre8VerticalCard,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    }
  },
};

export const Default: StoryObj<typeof Cre8VerticalCard> = { args: {} };
