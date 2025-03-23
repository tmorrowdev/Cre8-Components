import { html } from 'lit';
import './radio-field';
import '../radio-field-item/radio-field-item';
import { spread } from '../../directives/spread';

export default {
  title: 'cre8 Components/Radio Field',
  component: 'cre8-radio-field',
  parameters: { status: { type: 'inProgress' } },
  render: (args) => html`
  <cre8-radio-field ${spread(args)}>
   ${args.content}
  </cre8-radio-field>
`,
  args: {
    ariaDescribedBy: undefined,
    fieldNote: undefined,
    fieldNoteIconName: undefined,
    fieldNoteKnockout: undefined,
    isError: undefined,
    isSuccess: undefined,
    label: 'Legend',
  },
  argTypes: {
    ariaDescribedBy: { control: 'text' },
    fieldNote: { control: 'text' },
    fieldNoteIconName: { control: 'text' },
    fieldNoteKnockout: { control: 'boolean', table: { disable: true } },
    isError: { control: 'boolean' },
    isSuccess: { control: 'boolean' },
    label: { control: 'text' },
  }
};
const content = html` <cre8-radio-field-item label="Default"></cre8-radio-field-item>
<cre8-radio-field-item label="Error" ?isError=${true}></cre8-radio-field-item>
<cre8-radio-field-item label="Disabled" ?disabled=${true}></cre8-radio-field-item>`;

export const Default = {
  args: {
    fieldNote: 'This is a field note.',
    disabled: false,
    content,
  }
}

export const WithFieldNote = {
  args: {
    ariaDescribedBy: 'radio-field-message',
    fieldNote: 'This is a Field Note on the fieldset!',
    content,
  }
};
export const WithErrorFieldNote = {
  args: {
    ariaDescribedBy: 'radio-field-error-message',
    fieldNote: 'This is an error note on the fieldset!',
    fieldNoteIconName: 'error',
    isError: true,
    content,
  }
};
export const WithSuccessFieldNote = {
  args: {
    ariaDescribedBy: 'radio-field-success-message',
    fieldNote: 'This is a success note on the fieldset!',
    fieldNoteIconName: 'success',
    isSuccess: true,
    content,
  }
};
export const WithSuccessFieldNoteDefaultChecked = {
  args: {
    ariaDescribedBy: 'radio-field-success-message',
    fieldNote: 'This is a success note on the fieldset!',
    fieldNoteIconName: 'success',
    isSuccess: true,
    content: html` <cre8-radio-field-item name='defaultNote' label="Default"></cre8-radio-field-item>
    <cre8-radio-field-item name='defaultNote' label="Error" ?isError=${true}></cre8-radio-field-item>
    <cre8-radio-field-item name='successNote' checked={true} label="Success" ></cre8-radio-field-item>`
  }
};
