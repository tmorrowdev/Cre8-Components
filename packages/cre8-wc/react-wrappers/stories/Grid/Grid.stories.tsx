import type { StoryObj } from '@storybook/react-vite';
import { Cre8Grid } from '../../index';
import { excludeRegexArray } from '../../.storybook/preview';

export default {
  title: 'Cre8 Components/Grid',
  component: Cre8Grid,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    }
  },
};

export const Default: StoryObj<typeof Cre8Grid> = { args: {} };
