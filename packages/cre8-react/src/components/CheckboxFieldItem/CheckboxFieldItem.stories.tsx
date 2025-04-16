import type { StoryObj } from '@storybook/react';
import React from 'react';
import { excludeRegexArray } from '../../../.storybook/preview';
import { Cre8CheckboxFieldItem } from '../..';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Cre8 Components/CheckboxFieldItem',
  component: Cre8CheckboxFieldItem,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`),
    },
  },
  render: (args) => <Cre8CheckboxFieldItem {...args}></Cre8CheckboxFieldItem>,
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

export const Default: StoryObj<typeof Cre8CheckboxFieldItem> = {
  args: {
    label: 'Label',
  },
};

export const Preselected: StoryObj<typeof Cre8CheckboxFieldItem> = {
  args: {
    label: 'Label',
    checked: true,
  },
};

export const Disabled: StoryObj<typeof Cre8CheckboxFieldItem> = {
  args: {
    label: 'Label',
    disabled: true,
    checked: true,
  },
};

export const Required: StoryObj<typeof Cre8CheckboxFieldItem> = {
  args: {
    label: 'Label',
    required: true,
    checked: true,
  },
};

export const RequiredError: StoryObj<typeof Cre8CheckboxFieldItem> = {
  args: {
    label: 'Label',
    required: true,
    isError: true,
  },
};

export const DefaultFieldNote: StoryObj<typeof Cre8CheckboxFieldItem> = {
  args: {
    label: 'Label',
    fieldNote: 'This is a field note.',
  },
};

export const ErrorFieldNote: StoryObj<typeof Cre8CheckboxFieldItem> = {
  args: {
    label: 'Label',
    fieldNote: 'This is an error field note.',
    isError: true,
    errorNote: 'Short, clear error message',
  },
};

export const SuccessFieldNote: StoryObj<typeof Cre8CheckboxFieldItem> = {
  args: {
    label: 'Label',
    fieldNote: 'This is a success field note.',
    isSuccess: true,
    successNote: 'Short, clear success message',
  },
};

export const LongTitle: StoryObj<typeof Cre8CheckboxFieldItem> = {
  args: {
    label:
      'This could mayhaps be the longest title that has ever been put on a checkbox field ever!',
  },
};
