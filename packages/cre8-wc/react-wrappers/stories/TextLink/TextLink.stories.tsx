import type { StoryObj } from '@storybook/react-vite';
import { Cre8TextLink } from '../../index';
import { excludeRegexArray } from '../../.storybook/preview';

export default {
  title: 'Cre8 Components/TextLink',
  component: Cre8TextLink,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    }
  },
};

export const Default: StoryObj<typeof Cre8TextLink> = { args: {} };
