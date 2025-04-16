import React from 'react';
import type { StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Cre8Field } from '../..';
import { Cre8TextLink } from '../TextLink/TextLink';
import { excludeRegexArray } from '../../../.storybook/preview';

export default {
  title: 'Cre8 Components/Field',
  component: Cre8Field,
  parameters: {
    status: { type: 'inProgress' },
    actions: {
      handles: ['input', 'change', 'blur'],
    },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`),
    },
  },
  render: (args) => <Cre8Field {...args}></Cre8Field>,
  args: {
    placeholder: '',
    fieldNote: 'This is a field note.',
    onChange: action('input'),
    onBlur: action('blur'),
  },
};

export const Default: StoryObj<typeof Cre8Field> = {
  args: {
    children: (
      <div slot="fieldNote">
        Some optional help text or <Cre8TextLink>helpful link</Cre8TextLink>
      </div>
    ),
  },
};

export const Email: StoryObj<typeof Cre8Field> = {
  args: {
    label: 'Email Field',
    type: 'email',
  },
};

export const Number: StoryObj<typeof Cre8Field> = {
  args: {
    label: 'Number Field',
    type: 'number',
  },
};

export const Url: StoryObj<typeof Cre8Field> = {
  args: {
    label: 'Url Field',
    type: 'url',
  },
};

export const Tel: StoryObj<typeof Cre8Field> = {
  args: {
    label: 'Telephone Field',
    type: 'tel',
  },
};

export const Password: StoryObj<typeof Cre8Field> = {
  args: {
    label: 'Password Field',
    type: 'password',
  },
};

export const Date: StoryObj<typeof Cre8Field> = {
  args: {
    label: 'Date Field',
    type: 'date',
    value: '1969-06-28',
  },
};

export const MaxDate: StoryObj<typeof Cre8Field> = {
  args: {
    type: 'date',
    label: 'Max date should not be 2025-01-01',
    max: '2025-01-01',
    value: '2024-01-01',
  },
};

export const Required: StoryObj<typeof Cre8Field> = {
  args: {
    label: 'Required Field',
    required: true,
  },
};

export const RequiredMaxlength: StoryObj<typeof Cre8Field> = {
  args: {
    label: 'Required Field with Max Length',
    maxlength: '10',
    required: true,
  },
};

export const Disabled: StoryObj<typeof Cre8Field> = {
  args: {
    label: 'Disabled Field',
    value: 'Field value',
    disabled: true,
  },
};

export const ReadOnly: StoryObj<typeof Cre8Field> = {
  args: {
    label: 'Readonly Field',
    value: 'Field value',
    readonly: true,
  },
};

export const Fieldnote: StoryObj<typeof Cre8Field> = {
  args: {
    label: 'Field with a Field Note',
    fieldNote: 'This is a field note.',
  },
};

export const Error: StoryObj<typeof Cre8Field> = {
  args: {
    label: 'Field with Error Message and Field Note',
    isError: true,
    fieldNote: 'This is a field note.',
    errorNote: 'Short, clear error message',
  },
};

export const Success: StoryObj<typeof Cre8Field> = {
  args: {
    label: 'Field with Success Message',
    isSuccess: true,
    fieldNote: 'This is a field note.',
    successNote: 'Short, clear success message',
  },
};

export const SingleMessage: StoryObj<typeof Cre8Field> = {
  args: {
    label: 'Field with Error Message',
    isError: 'true',
    errorNote: 'Short, clear error message',
  },
};
