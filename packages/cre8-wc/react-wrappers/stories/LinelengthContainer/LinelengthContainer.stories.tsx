import type { StoryObj } from '@storybook/react-vite';
import { Cre8LinelengthContainer } from '../../index';
import { excludeRegexArray } from '../../.storybook/preview';

export default {
  title: 'Cre8 Components/LinelengthContainer',
  component: Cre8LinelengthContainer,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    }
  },
};

export const Default: StoryObj<typeof Cre8LinelengthContainer> = { args: {} };
