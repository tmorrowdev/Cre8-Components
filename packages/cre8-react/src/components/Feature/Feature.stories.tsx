import type { StoryObj } from '@storybook/react';
import { Cre8Feature } from '../..';
import { excludeRegexArray } from '../../../.storybook/preview';

export default {
  title: 'Cre8 Components/Feature',
  component: Cre8Feature,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    }
  },
};

export const Default: StoryObj<typeof Cre8Feature> = { args: {} };
