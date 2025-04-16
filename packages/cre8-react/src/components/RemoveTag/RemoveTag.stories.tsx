import type { StoryObj } from '@storybook/react';
import { excludeRegexArray } from '../../../.storybook/preview';
import {withActions} from '@storybook/addon-actions/decorator';
import { Cre8RemoveTag } from '../..';

export default {
  title: 'In Development/Remove Tag',
  component: Cre8RemoveTag,
  parameters: { 
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    },
    actions: {
      handles: ['click'],
    },
  },
  decorators: [withActions],
  argTypes: {
    text: {
      control: 'text'
    },
    color: {
      options: ['neutral', 'branded', 'neutral-hybrid'],
      control: { type: 'radio' }
    },
    shape: {
      options: ['round', 'square'],
      control: { type: 'radio' }
    },
    removed: {
      control: 'boolean'
    },
  },
};

export const Default: StoryObj<typeof Cre8RemoveTag> = { 
  args: {
    text: 'Tag text',
    color: 'neutral',
    shape: 'round',
  },
};

export const NeutralSquare: StoryObj<typeof Cre8RemoveTag> = { 
  args: {
    text: 'Tag text',
    color: 'neutral',
    shape: 'square',
  },
};

export const NeutralHybridRound: StoryObj<typeof Cre8RemoveTag> = { 
  args: {
    text: 'Tag text',
    color: 'neutral-hybrid',
    shape: 'round',
  },
};

export const NeutralHybridSquare: StoryObj<typeof Cre8RemoveTag> = { 
  args: {
    text: 'Tag text',
    color: 'neutral-hybrid',
    shape: 'square',
  },
};

export const BrandedRound: StoryObj<typeof Cre8RemoveTag> = { 
  args: {
    text: 'Tag text',
    color: 'branded',
    shape: 'round',
  },
};

export const BrandedSquare: StoryObj<typeof Cre8RemoveTag> = { 
  args: {
    text: 'Tag text',
    color: 'branded',
    shape: 'square',
  },
};
