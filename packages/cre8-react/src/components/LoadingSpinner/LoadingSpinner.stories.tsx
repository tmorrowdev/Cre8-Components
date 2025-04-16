import type { StoryObj } from '@storybook/react';
import React from 'react';
import { excludeRegexArray } from '../../../.storybook/preview';
import { Cre8LoadingSpinner } from '../..';

export default {
  title: 'Cre8 Components/Loading Spinner',
  component: Cre8LoadingSpinner,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`),
    },
  },
};

export const LargeIndeterminate: StoryObj<typeof Cre8LoadingSpinner> = {
  args: {
    size: 'large',
    label: 'Loading...',
  },
};
export const SmallIndeterminate: StoryObj<typeof Cre8LoadingSpinner> = {
  args: {
    size: 'small',
    label: 'Loading...',
  },
};
export const Neutral: StoryObj<typeof Cre8LoadingSpinner> = {
  args: {
    neutral: true,
    label: 'Loading...',
  },
};
export const primaryButtonInverseVariant: StoryObj<typeof Cre8LoadingSpinner> = {
  args: {
    buttonVariant: 'primary',
    label: 'Loading...',
  },
};
export const secondaryButtonInverseVariant: StoryObj<typeof Cre8LoadingSpinner> = {
  args: {
    buttonVariant: 'secondary',
    label: 'Loading...',
  },
};
export const tertiaryButtonInverseVariant: StoryObj<typeof Cre8LoadingSpinner> = {
  args: {
    buttonVariant: 'tertiary',
    label: 'Loading...',
  },
};
export const Determinate: StoryObj<typeof Cre8LoadingSpinner> = {
  args: {
    size: 'large',
    determinate: true,
    progress: 35,
    label: 'Loading...',
  },
};
