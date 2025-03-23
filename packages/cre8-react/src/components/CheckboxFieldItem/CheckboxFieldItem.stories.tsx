import type { StoryObj } from '@storybook/react';
import React from 'react';
import { excludeRegexArray } from '../../../.storybook/preview';
import { cre8CheckboxFieldItem } from '../..';
import { action } from '@storybook/addon-actions';

export default {
  title: 'cre8 Components/CheckboxFieldItem',
  component: cre8CheckboxFieldItem,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`),
    },
  },
  render: (args) => <cre8CheckboxFieldItem {...args}></cre8CheckboxFieldItem>,
  args: {
    name: 'checkbox-name',
    value: 'checkbox-value',
    onChange: action('input'),
    onBlur: action('blur'),
  },
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    errorNote: { control: 'text' },
    label: { control: 'text' },
    successNote: { control: 'text' },
  },
};

export const Default: StoryObj<typeof cre8CheckboxFieldItem> = {
  args: {
    label: 'Label',
  },
};

export const Preselected: StoryObj<typeof cre8CheckboxFieldItem> = {
  args: {
    label: 'Label',
    checked: true,
  },
};

export const Disabled: StoryObj<typeof cre8CheckboxFieldItem> = {
  args: {
    label: 'Label',
    disabled: true,
    checked: true,
  },
};

export const Required: StoryObj<typeof cre8CheckboxFieldItem> = {
  args: {
    label: 'Label',
    required: true,
    checked: true,
  },
};

export const RequiredError: StoryObj<typeof cre8CheckboxFieldItem> = {
  args: {
    label: 'Label',
    required: true,
    isError: true,
  },
};

export const DefaultFieldNote: StoryObj<typeof cre8CheckboxFieldItem> = {
  args: {
    label: 'Label',
    fieldNote: 'This is a field note.',
  },
};

export const ErrorFieldNote: StoryObj<typeof cre8CheckboxFieldItem> = {
  args: {
    label: 'Label',
    fieldNote: 'This is an error field note.',
    isError: true,
    errorNote: 'Short, clear error message',
  },
};

export const SuccessFieldNote: StoryObj<typeof cre8CheckboxFieldItem> = {
  args: {
    label: 'Label',
    fieldNote: 'This is a success field note.',
    isSuccess: true,
    successNote: 'Short, clear success message',
  },
};

export const LongTitle: StoryObj<typeof cre8CheckboxFieldItem> = {
  args: {
    label:
      'This could mayhaps be the longest title that has ever been put on a checkbox field ever!',
  },
};
