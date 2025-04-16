import type { StoryObj } from '@storybook/react';
import React from 'react';
import { action } from '@storybook/addon-actions';
import { Cre8Tag } from '../..';
import { excludeRegexArray } from '../../../.storybook/preview';

export default {
  title: 'IN DEVELOPMENT/Tag',
  component: Cre8Tag,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    },
    render: (args) => (
      <Cre8Tag { ...args } >
      </Cre8Tag>
  ),
  args: {
      onChange: action('input')
  },
  },
};

export const DefaultRadio: StoryObj<typeof Cre8Tag> = { 
  args: {
    text: "Default",
    type: 'radio'
} };

export const NeutralRadio: StoryObj<typeof Cre8Tag> = {
  args: {
  text: "Neutral",
  variant: 'neutral',
  type: 'radio'
  },
};

export const NeutralRadioSelected: StoryObj<typeof Cre8Tag> = {
  args: {
    isSelected: true,
    text: "Neutral",
    variant: 'neutral',
    type: 'radio'
  },
};

export const NeutralHybridRadio: StoryObj<typeof Cre8Tag> = { args: {
  text: "Neutral Hybrid",
  variant: 'neutral-hybrid',
  type: 'radio',
} };

export const NeutralHybridRadioSelected: StoryObj<typeof Cre8Tag> = { args: {
  isSelected: true,
  text: "Neutral Hybrid",
  variant: 'neutral-hybrid',
  type: 'radio',
} };

export const BrandedRadio: StoryObj<typeof Cre8Tag> = { args: {
  text: "Branded",
  variant: 'branded',
  type: 'radio',
} };

export const BrandedRadioSelected: StoryObj<typeof Cre8Tag> = { args: {
  isSelected: true,
  text: "Branded",
  variant: 'branded',
  type: 'radio',
} };


export const DisableRadio: StoryObj<typeof Cre8Tag> = { args: {
  text: "Disabled",
  isDisabled: true,
  type: 'radio'
} };

export const NeutralCheckbox: StoryObj<typeof Cre8Tag> = {
  args: {
  text: "Neutral",
  variant: 'neutral',
  type: 'checkbox'
  },
};

export const NeutralCheckboxSelected: StoryObj<typeof Cre8Tag> = {
  args: {
    isSelected: true,
    text: "Neutral",
    variant: 'neutral',
    type: 'checkbox'
  },
};

export const NeutralCheckboxShapeRound: StoryObj<typeof Cre8Tag> = {
  args: {
    shape: 'round',
    text: "Round",
    variant: 'neutral',
    type: 'checkbox'
  },
};

export const NeutralHybridCheckbox: StoryObj<typeof Cre8Tag> = { args: {
  text: "Neutral Hybrid",
  variant: 'neutral-hybrid',
  type: 'checkbox',
} };

export const NeutralHybridCheckboxSelected: StoryObj<typeof Cre8Tag> = { args: {
  isSelected: true,
  text: "Neutral Hybrid",
  variant: 'neutral-hybrid',
  type: 'checkbox',
} };

export const BrandedCheckbox: StoryObj<typeof Cre8Tag> = { args: {
  text: "Branded",
  variant: 'branded',
  type: 'checkbox',
} };

export const BrandedCheckboxSelected: StoryObj<typeof Cre8Tag> = { args: {
  isSelected: true,
  text: "Branded",
  variant: 'branded',
  type: 'checkbox',
} };

export const DisableCheckbox: StoryObj<typeof Cre8Tag> = { args: {
  text: "Disabled",
  isDisabled: true,
  type: 'checkbox'
} };