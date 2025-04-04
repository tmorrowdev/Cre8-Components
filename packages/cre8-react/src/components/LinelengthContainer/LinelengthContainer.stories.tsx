import type { StoryObj } from '@storybook/react';
import { cre8LinelengthContainer } from '../..';
import { excludeRegexArray } from '../../../.storybook/preview';

export default {
  title: 'Cre8 Components/LinelengthContainer',
  component: cre8LinelengthContainer,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    }
  },
};

export const Default: StoryObj<typeof cre8LinelengthContainer> = { args: {} };
