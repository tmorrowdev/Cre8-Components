import type { StoryObj } from '@storybook/react-vite';
import { Cre8LayoutContainer, Cre8LayoutSection } from '../../index';
import { excludeRegexArray } from '../../.storybook/preview';

export default {
  title: 'Cre8 Components/LayoutContainer',
  component: Cre8LayoutContainer,
  parameters: {
    subcomponents: { Cre8LayoutSection },
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    }
  },
};

export const Default: StoryObj<typeof Cre8LayoutContainer> = { args: {} };
