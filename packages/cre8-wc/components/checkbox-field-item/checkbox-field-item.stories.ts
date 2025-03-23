import { html } from 'lit';
import '../field-note/field-note';
import './checkbox-field-item';
import { spread } from '../../directives/spread';
import { withActions } from '@storybook/addon-actions/decorator';

export default {
  title: 'cre8 Components/Checkbox Field Item',
  component: 'cre8-checkbox-field-item',
  parameters: {
    status: { type: 'inProgress' },
    actions: {
      handles: ['input', 'change', 'blur', 'click']
    }
  },
  render: (args) => html`<cre8-checkbox-field-item ${spread(args)}></cre8-checkbox-field-item>`,
  args: {
    checked: undefined,
    disabled: undefined,
    errorNote: undefined,
    fieldNote: undefined,
    isError: undefined,
    isSuccess: undefined,
    label: 'Label',
    required: undefined,
    successNote: undefined,
  },
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    errorNote: { control: 'text' },
    fieldNote: { control: 'text' },
    fieldNoteIconName: { control: 'text' },
    label: { control: 'text' },
    successNote: { control: 'text' },
    validationAriaDescribedBy: { control: 'text' },
  },
  decorators: [withActions],
};

export const Default = {};

export const Preselected = {
  args: {
    checked: true
  },
};

/**
 * As a universal form rule, remember to minimize the number of optional fields to keep forms as short as possible. Include the text `(optional)` at the end of the label for the checkbox.
 *
 */

export const Optional = {
  args: {
    label: 'Label (optional)'
  },
};

export const Error = {
  args: {
    isError: true,
    required: true
  },
};

/**
 * Using disabled states is not advised. Ideally, never display unavailable actions.
 *
 */
export const Disabled = {
  args: {
    disabled: true
  },
};

/**
 * Optional guidance messaging can be passed via the `fieldNote` property or by using the `fieldNote` slot.
 * Messages included in this manner must also include an associated `ariaDescribedBy` id property.
 *
 * Error and success field note messaging are passed via their respective `errorNote` and `successNote` properties,
 * and must include an associated `validationAriaDescribedBy` property.
 */

export const DefaultWithFieldNote = {
  args: {
    fieldNote: 'This is a field note.',
    ariaDescribedBy: 'default-fieldnote-message',
  },
};

export const ErrorWithFieldNote = {
  args: {
    isError: true,
    errorNote: 'Short, clear error message',
    validationAriaDescribedBy: 'error-validation-message',
  },
};

export const SuccessWithFieldNote = {
  args: {
    isSuccess: true,
    successNote: 'Short, clear success message',
    validationAriaDescribedBy: 'success-valitation-message',
  },
};

export const LongTitle = {
  args: {
    label: 'This could mayhaps be the longest title that has ever been put on a checkbox field ever!'
  },
};
