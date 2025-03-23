import type { StoryObj } from '@storybook/react';
import { excludeRegexArray } from '../../../.storybook/preview';
import { cre8ProgressMeter } from '../..';

export default {
  title: 'cre8 Components/Progress Meter',
  component: cre8ProgressMeter,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`),
    },
  },
};

export const Default: StoryObj<typeof cre8ProgressMeter> = {
  args: {
    label: 'Default progress label',
    value: 50,
  },
};

export const Empty: StoryObj<typeof cre8ProgressMeter> = {
  args: {
    label: 'Empty progress label',
    value: 0,
  },
};

export const NotStrong: StoryObj<typeof cre8ProgressMeter> = {
  args: {
    label: 'Default progress label',
    value: 25,
    status: 'error',
  },
};

export const Weak: StoryObj<typeof cre8ProgressMeter> = {
  args: {
    label: 'Weak progress label',
    value: 50,
    status: 'warning',
  },
};

export const Good: StoryObj<typeof cre8ProgressMeter> = {
  args: {
    label: 'Default progress label',
    value: 75,
    status: 'success',
  },
};

export const Excellent: StoryObj<typeof cre8ProgressMeter> = {
  args: {
    label: 'Default progress label',
    value: 100,
    status: 'success',
  },
};
