import React from 'react';
import type { StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Cre8DatePicker } from '../..';
import { Cre8TextLink } from '../TextLink/TextLink';
import { excludeRegexArray } from '../../../.storybook/preview';

export default {
  title: 'Cre8 Components/DatePicker',
  component: Cre8DatePicker,
  parameters: {
    status: { type: 'inProgress' },
    actions: {
      handles: ['input', 'change', 'blur'],
    },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`),
    },
    docs: {
      story: {
        height: '600px',
      },
    },
  },
  render: (args) => <Cre8DatePicker {...args}></Cre8DatePicker>,
  args: {
    placeholder: '',
    fieldNote: 'This is a field note.',
    onChange: action('input'),
    onBlur: action('blur'),
  },
};

export const Default: StoryObj<typeof Cre8DatePicker> = {
  args: {
    label: 'Example Date Picker',
    children: (
      <div slot="fieldNote">
        Some optional help text or <Cre8TextLink>helpful link</Cre8TextLink>
      </div>
    ),
  },
};

export const DefaultWithShortcuts = {
  args: {
    hasShortcuts: "true",
  },
};

export const Disabled: StoryObj<typeof Cre8DatePicker> = {
  args: {
    label: 'Disabled Example',
    value: '2024-05-15',
    disabled: true,
  },
};

export const ReadOnly: StoryObj<typeof Cre8DatePicker> = {
  args: {
    label: 'Readonly Example',
    value: '2024-05-15',
    readonly: true,
  },
};

export const Fieldnote: StoryObj<typeof Cre8DatePicker> = {
  args: {
    label: 'Fieldnote Example',
    fieldNote: 'This is a field note.',
  },
};

export const Error: StoryObj<typeof Cre8DatePicker> = {
  args: {
    label: 'Error Fieldnote Example',
    isError: true,
    fieldNote: 'This is a field note.',
    errorNote: 'Short, clear error message',
  },
};

export const Success: StoryObj<typeof Cre8DatePicker> = {
  args: {
    label: 'Success Fieldnote Example',
    isSuccess: true,
    fieldNote: 'This is a field note.',
    successNote: 'Short, clear success message',
  },
};

