import type { StoryObj } from '@storybook/react';
import { cre8Switch } from '../..';
import { excludeRegexArray } from '../../../.storybook/preview';

export default {
  title: 'cre8 Components/Switch',
  component: cre8Switch,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    },
    actions: {
      handles: ['input']
    },
  },
};

export const Default: StoryObj<typeof cre8Switch> = { args: {} };
export const Preselected: StoryObj<typeof cre8Switch> = { args: {
  checked: true,
} };
export const Disabled: StoryObj<typeof cre8Switch> = { args: {
  disabled: true,
} };
export const WithLabel: StoryObj<typeof cre8Switch> = { args: {
  label: 'Switch label',
} };
