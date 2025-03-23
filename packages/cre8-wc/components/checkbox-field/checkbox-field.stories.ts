import { html } from 'lit-html';
import '../field-note/field-note';
import './checkbox-field';
import '../checkbox-field-item/checkbox-field-item';
import { spread } from '../../directives/spread';

export default {
  title: 'cre8 Components/Checkbox Field',
  component: 'cre8-checkbox-field',
  parameters: { status: { type: 'inProgress' } },
  render: (args) => html`
    <cre8-checkbox-field ${spread(args)}>
      <cre8-checkbox-field-item label="Default"></cre8-checkbox-field-item>
      <cre8-checkbox-field-item label="Error" ?isError=${true}></cre8-checkbox-field-item>
      <cre8-checkbox-field-item label="Disabled" ?disabled=${true} ?checked=${true}></cre8-checkbox-field-item>
    </cre8-checkbox-field>
  `,
  args: {
    label: 'Legend',
  },
  argTypes: {
    ariaDescribedBy: { control: 'text' },
    fieldNote: { control: 'text' },
    fieldNoteIconName: { control: 'text' },
    label: { control: 'text' },
    fieldNoteKnockout: { table: { disable: true }}
  },
};

export const Default = {};
export const WithFieldNote = {
  args: {
    ariaDescribedBy: 'checkbox-field-message',
    fieldNote: 'This is a field note of the fieldset',
  }
};
export const WithErrorFieldNote = {
  args: {
    ariaDescribedBy: 'checkbox-field-error-message',
    fieldNote: 'This is an error note on the fieldset!',
    fieldNoteIsError: true,
    fieldNoteIconName: 'error',
  }
};
export const WithSuccessFieldNote = {
  args: {
    ariaDescribedBy: 'checkbox-field-success-message',
    fieldNote: 'This is a success note on the fieldset!',
    fieldNoteIsSuccess: true,
    fieldNoteIconName: 'success',
  }
};
