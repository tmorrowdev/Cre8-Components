import type { StoryObj } from '@storybook/react';
import React from 'react';
import { action } from '@storybook/addon-actions';
import { cre8Tag } from '../..';
import { excludeRegexArray } from '../../../.storybook/preview';

export default {
  title: 'IN DEVELOPMENT/Tag',
  component: cre8Tag,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    },
    render: (args) => (
      <cre8Tag { ...args } >
      </cre8Tag>
  ),
  args: {
      onChange: action('input')
  },
  },
};

export const DefaultRadio: StoryObj<typeof cre8Tag> = { 
  args: {
    text: "Default",
    type: 'radio'
} };

export const NeutralRadio: StoryObj<typeof cre8Tag> = {
  args: {
  text: "Neutral",
  variant: 'neutral',
  type: 'radio'
  },
};

export const NeutralRadioSelected: StoryObj<typeof cre8Tag> = {
  args: {
    isSelected: true,
    text: "Neutral",
    variant: 'neutral',
    type: 'radio'
  },
};

export const NeutralHybridRadio: StoryObj<typeof cre8Tag> = { args: {
  text: "Neutral Hybrid",
  variant: 'neutral-hybrid',
  type: 'radio',
} };

export const NeutralHybridRadioSelected: StoryObj<typeof cre8Tag> = { args: {
  isSelected: true,
  text: "Neutral Hybrid",
  variant: 'neutral-hybrid',
  type: 'radio',
} };

export const BrandedRadio: StoryObj<typeof cre8Tag> = { args: {
  text: "Branded",
  variant: 'branded',
  type: 'radio',
} };

export const BrandedRadioSelected: StoryObj<typeof cre8Tag> = { args: {
  isSelected: true,
  text: "Branded",
  variant: 'branded',
  type: 'radio',
} };


export const DisableRadio: StoryObj<typeof cre8Tag> = { args: {
  text: "Disabled",
  isDisabled: true,
  type: 'radio'
} };

export const NeutralCheckbox: StoryObj<typeof cre8Tag> = {
  args: {
  text: "Neutral",
  variant: 'neutral',
  type: 'checkbox'
  },
};

export const NeutralCheckboxSelected: StoryObj<typeof cre8Tag> = {
  args: {
    isSelected: true,
    text: "Neutral",
    variant: 'neutral',
    type: 'checkbox'
  },
};

export const NeutralCheckboxShapeRound: StoryObj<typeof cre8Tag> = {
  args: {
    shape: 'round',
    text: "Round",
    variant: 'neutral',
    type: 'checkbox'
  },
};

export const NeutralHybridCheckbox: StoryObj<typeof cre8Tag> = { args: {
  text: "Neutral Hybrid",
  variant: 'neutral-hybrid',
  type: 'checkbox',
} };

export const NeutralHybridCheckboxSelected: StoryObj<typeof cre8Tag> = { args: {
  isSelected: true,
  text: "Neutral Hybrid",
  variant: 'neutral-hybrid',
  type: 'checkbox',
} };

export const BrandedCheckbox: StoryObj<typeof cre8Tag> = { args: {
  text: "Branded",
  variant: 'branded',
  type: 'checkbox',
} };

export const BrandedCheckboxSelected: StoryObj<typeof cre8Tag> = { args: {
  isSelected: true,
  text: "Branded",
  variant: 'branded',
  type: 'checkbox',
} };

export const DisableCheckbox: StoryObj<typeof cre8Tag> = { args: {
  text: "Disabled",
  isDisabled: true,
  type: 'checkbox'
} };