import type { StoryObj } from '@storybook/react-vite';
import { Cre8Layout } from '../../index';
import { excludeRegexArray } from '../../.storybook/preview';

export default {
  title: 'Cre8 Components/Layout',
  component: Cre8Layout,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    }
  },
};

export const Default: StoryObj<typeof Cre8Layout> = { args: {} };
