import type { StoryObj } from '@storybook/react';
import { cre8LayoutContainer, cre8LayoutSection } from '../..';
import { excludeRegexArray } from '../../../.storybook/preview';

export default {
  title: 'DEPRECATED/DO NOT USE/LayoutContainer',
  component: cre8LayoutContainer,
  parameters: {
    subcomponents: { cre8LayoutSection },
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    }
  },
};

export const Default: StoryObj<typeof cre8LayoutContainer> = { args: {} };
