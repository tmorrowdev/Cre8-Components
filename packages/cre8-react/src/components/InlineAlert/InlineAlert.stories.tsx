import type { StoryObj } from '@storybook/react';
import React from 'react';
import { cre8InlineAlert, cre8Heading } from '../..';
import { excludeRegexArray } from '../../../.storybook/preview';

export default {
  title: 'cre8 Components/Inline Alert',
  component: cre8InlineAlert,
  parameters: {
    status: { variant: 'beta' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    }
  },
  args: {
    children: 'In-line alert lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.'
  }
};

export const Default: StoryObj<typeof cre8InlineAlert> = { args: {
  status: 'info',
} };

export const FullWidthTitleSmall: StoryObj<typeof cre8InlineAlert> = { args: {
  fullWidth: true,
  status: 'info',
  children: (
    <cre8Heading type="title-small">Full Width Title Small</cre8Heading>
  )
} };

export const Error: StoryObj<typeof cre8InlineAlert> = { args: {
  status: 'error',
  iconTitle: 'Error Message'
} };

export const Warning: StoryObj<typeof cre8InlineAlert> = { args: {
  status: 'warning',
  iconTitle: 'Warning Alert'
} };

export const Success: StoryObj<typeof cre8InlineAlert> = { args: {
  status: 'success',
  iconTitle: 'Confirmation Message'
} };

export const Help: StoryObj<typeof cre8InlineAlert> = { args: {
  iconName: 'help',
  iconTitle: 'Helpful Message'
} };

export const Info: StoryObj<typeof cre8InlineAlert> = { args: {
  iconName: 'info',
  iconTitle: 'Important Information'
} };

/**
* **Note** Certain brands don't currently use the `Attention` status
* 
*/

export const Attention: StoryObj<typeof cre8InlineAlert> = { args: {
  status: 'attention',
  iconTitle: 'Attention Notice'
} };

export const Neutral: StoryObj<typeof cre8InlineAlert> = { args: {
  status: 'neutral'
} };

export const TransparentError: StoryObj<typeof cre8InlineAlert> = { args: {
  variant: 'transparent',
  status: 'error',
  iconTitle: 'Transparent Alert Error Message'
} };

export const TransparentWarning: StoryObj<typeof cre8InlineAlert> = { args: {
  variant: 'transparent',
  status: 'warning',
  iconTitle: 'Transparent Alert Warning Message'
} };

export const TransparentSuccess: StoryObj<typeof cre8InlineAlert> = { args: {
  variant: 'transparent',
  status: 'success',
  iconTitle: 'Transparent Alert Confirmation Message'
} };

export const TransparentHelp: StoryObj<typeof cre8InlineAlert> = { args: {
  variant: 'transparent',
  iconTitle: 'Transparent Alert Helpful Message'
} };

export const TransparentInfo: StoryObj<typeof cre8InlineAlert> = { args: {
  variant: 'transparent',
  iconTitle: 'Transparent Alert Important Information'
} };

/**
* **Note** Certain brands don't currently use the `Attention` status
* 
*/

export const TransparentAttention: StoryObj<typeof cre8InlineAlert> = { args: {
  variant: 'transparent',
  status: 'attention',
  iconTitle: 'Transparent Alert Attention Notice'
} };

export const TransparentNeutral: StoryObj<typeof cre8InlineAlert> = { args: {
  variant: 'transparent',
  status: 'neutral'
} };
