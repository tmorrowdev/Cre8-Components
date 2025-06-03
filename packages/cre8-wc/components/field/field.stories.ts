import {html} from 'lit';
import {spread} from '../../directives/spread';
import {withActions} from '@storybook/addon-actions/decorator';
import './field';

export default {
  title: 'cre8 Components/Field',
  component: 'cre8-field',
  render: (args: any) => html`<cre8-field ${spread(args)}></cre8-field>`,
  parameters: {
    status: {type: 'inProgress'},
    actions: {
      handles: ['input', 'change', 'blur'],
    },
  },
  decorators: [withActions],
  argTypes: {
    ariaDescribedBy: {
      control: 'text',
    },
    autocomplete: {
      control: 'text',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'number', 'url', 'tel', 'password', 'date'],
    }
  },
  args: {
    label: 'Label',
  },
};

export const Default = {};

export const Email = {
  args: {
    label: 'Email Field',
    type: 'email',
  },
};

export const Number = {
  args: {
    label: 'Number Field',
    type: 'number',
  },
};

export const Url = {
  args: {
    label: 'Url Field',
    type: 'url',
  },
};

export const Tel = {
  args: {
    label: 'Telephone Field',
    type: 'tel',
  },
};

export const Password = {
  args: {
    label: 'Password Field',
    type: 'password'
  },
};

export const Date = {
  args: {
    label: 'Date Field',
    type: 'date',
    value: '1969-06-28',
  },
};

export const MaxDate = {
  args: {
    type: 'date',
    label: 'Max date should not be 2025-01-01',
    max: '2025-01-01',
    value: '2024-01-01',
  },
};
export const Required = {
  args: {
    label: 'Required Field',
    required: 'true',
  },
};

export const RequiredMaxlength = {
  args: {
    label: 'Required Field with Max Length',
    maxlength: '10',
    required: 'true'
  },
};

export const Disabled = {
  args: {
    label: 'Disabled Field',
    disabled: 'true',
  },
};

export const Readonly = {
  args: {
    label: 'Readonly Field',
    readonly: 'true',
    value: 'value',
  },
};

export const Fieldnote = {
  args: {
    label: 'Field with a Field Note',
    fieldNote: 'This is a field note.',
  },
};

export const Error = {
  args: {
    label: 'Field with Error Message and Field Note',
    errorNote: 'Short, clear error message',
    isError: 'true',
    fieldNote: 'This is a field note.',
  },
};

export const Success = {
  args: {
    label: 'Field with Success Message',
    isSuccess: 'true',
    fieldNote: 'This is a field note.',
    successNote: 'Short, clear success message',
  },
};

export const SingleMessage = {
  args: {
    label: 'Field with Error Message',
    isError: 'true',
    errorNote: 'Short, clear error message',
  },
};
