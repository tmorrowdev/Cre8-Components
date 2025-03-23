import React from 'react';
import type { StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { cre8DatePicker } from '../..';
import { cre8TextLink } from '../TextLink/TextLink';
import { excludeRegexArray } from '../../../.storybook/preview';

export default {
  title: 'cre8 Components/DatePicker',
  component: cre8DatePicker,
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
  render: (args) => <cre8DatePicker {...args}></cre8DatePicker>,
  args: {
    placeholder: '',
    fieldNote: 'This is a field note.',
    onChange: action('input'),
    onBlur: action('blur'),
  },
};

export const Default: StoryObj<typeof cre8DatePicker> = {
  args: {
    label: 'Example Date Picker',
    children: (
      <div slot="fieldNote">
        Some optional help text or <cre8TextLink>helpful link</cre8TextLink>
      </div>
    ),
  },
};

export const DefaultWithShortcuts = {
  args: {
    hasShortcuts: "true",
  },
};

export const Disabled: StoryObj<typeof cre8DatePicker> = {
  args: {
    label: 'Disabled Example',
    value: '2024-05-15',
    disabled: true,
  },
};

export const ReadOnly: StoryObj<typeof cre8DatePicker> = {
  args: {
    label: 'Readonly Example',
    value: '2024-05-15',
    readonly: true,
  },
};

export const Fieldnote: StoryObj<typeof cre8DatePicker> = {
  args: {
    label: 'Fieldnote Example',
    fieldNote: 'This is a field note.',
  },
};

export const Error: StoryObj<typeof cre8DatePicker> = {
  args: {
    label: 'Error Fieldnote Example',
    isError: true,
    fieldNote: 'This is a field note.',
    errorNote: 'Short, clear error message',
  },
};

export const Success: StoryObj<typeof cre8DatePicker> = {
  args: {
    label: 'Success Fieldnote Example',
    isSuccess: true,
    fieldNote: 'This is a field note.',
    successNote: 'Short, clear success message',
  },
};

