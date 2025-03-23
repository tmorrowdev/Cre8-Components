import { html } from 'lit';
import { spread } from '../../directives/spread';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { sanitizeInput } from '../../utilities/story-helpers';
import { withActions } from '@storybook/addon-actions/decorator';
import '../link/link';
import './select';

const baseItems = [
  { label: 'Option Item 1', value: 'option-item-1' },
  { label: 'Option Item 2', value: 'option-item-2' },
  { label: 'Option Item 3', value: 'option-item-3' },
  { label: 'Option Item 4', value: 'option-item-4' },
  { label: 'Option Item 5', value: 'option-item-5' },
  { label: 'Option Item 6', value: 'option-item-6' },
];

const optionGroupItems = [
  {
    optGroupLabel: 'Option Group 1',
    options: [
      { label: 'Option Group Item 1', value: 'option-group-item-1', },
      { label: 'Option Group Item 2', value: 'option-group-item-2', },
      { label: 'Option Group Item 3', value: 'option-group-item-3', },
    ],
  },
  {
    optGroupLabel: 'Option Group 2',
    options: [
      { label: 'Option Group Item 4', value: 'option-group-item-4', },
      { label: 'Option Group Item 5', value: 'option-group-item-5', },
      { label: 'Option Group Item 6', value: 'option-group-item-6', },
    ],
  },
  {
    optGroupLabel: 'Option Group 3',
    options: [
      { label: 'Option Group Item 7', value: 'option-group-item-7', },
      { label: 'Option Group Item 8', value: 'option-group-item-8', },
      { label: 'Option Group Item 9', value: 'option-group-item-9', },
    ],
  },
];

export default {
  title: 'cre8 Components/Select',
  component: 'cre8-select',
  parameters: {
    status: { type: 'inProgress' },
    actions: {
      handles: ['change']
    }
  },
  render: ({ fieldNoteSlot, ...args }) => html`
    <cre8-select ${spread(args)} .items=${args.items}>
      ${unsafeHTML(sanitizeInput(fieldNoteSlot, 'cre8-link'))}
    </cre8-select>`,
  decorators: [withActions],
  argTypes: {
    change: { table: { disable: true } },
    selectOptions: { table: { disable: true } },
    type: { table: { disable: true } },
    value: { table: { disable: true } },
    name: { table: { disable: true } },
    id: { table: { disable: true } }

  },
  args: {
    id: 'selectId',
    name: 'selectName',
    items: baseItems,
  }
};

export const Default = {};

export const Disabled = {
  args: {
    disabled: true,
  }
};
export const Preselected = {
  args: {
    value: 'option-item-1'
  }
}

export const FieldNote = {
  args: {
    fieldNoteSlot: `<div slot="fieldNote">
      Some optional help text or <cre8-link href="#">helpful link</cre8-link>
    </div>`,
  }
};

export const Error = {
  args: {
    errorNote: "Short, clear error message.",
    isError: true,
  }
};

export const Success = {
  args: {
    isSuccess: true,
    successNote: "Short, clear success message",
  }
};

export const FieldNoteAndError = {
  args: {
    errorNote: "Short, clear error message.",
    fieldNote: "This is a field note.",
    isError: true,
  }
};

export const FieldNoteAndSuccess = {
  args: {
    fieldNote: "This is a field note.",
    isSuccess: true,
    successNote: "Short, clear success message",
  }
};

/** If you have a longer list of options, group related options together.
 * Grouping by type allows users to select their preference more quickly.
 *
 * To create an option group, create a new item object within your `items` array
 * which contains an `optGrouplabel` for the group name and an `options` array of items for the group.
 *
 * ```
 * {
 *   optGroupLabel: 'Option Group',
 *   options: [
 *     { label: 'Option Group Item 1', value: 'option-group-item-1', },
 *     { label: 'Option Group Item 2', value: 'option-group-item-2', },
 *     { label: 'Option Group Item 3', value: 'option-group-item-3', },
 *   ],
 * }
 * ```
*/

export const OptionGroup = {
  args: {
    items: optionGroupItems,
  }
};
