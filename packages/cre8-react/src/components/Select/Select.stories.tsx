import React from 'react';
import type { StoryObj } from '@storybook/react';
import { withActions } from '@storybook/addon-actions/decorator';
import { Cre8Select } from '../..';
import { Cre8Link } from '../Link/Link';
import { excludeRegexArray } from '../../../.storybook/preview';

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
      { label: 'Option Group Item 1', value: 'option-group-item-1' },
      { label: 'Option Group Item 2', value: 'option-group-item-2' },
      { label: 'Option Group Item 3', value: 'option-group-item-3' },
    ],
  },
  {
    optGroupLabel: 'Option Group 2',
    options: [
      { label: 'Option Group Item 4', value: 'option-group-item-4' },
      { label: 'Option Group Item 5', value: 'option-group-item-5' },
      { label: 'Option Group Item 6', value: 'option-group-item-6' },
    ],
  },
  {
    optGroupLabel: 'Option Group 3',
    options: [
      { label: 'Option Group Item 7', value: 'option-group-item-7' },
      { label: 'Option Group Item 8', value: 'option-group-item-8' },
      { label: 'Option Group Item 9', value: 'option-group-item-9' },
    ],
  },
];

export default {
  title: 'Cre8 Components/Select',
  component: Cre8Select,
  parameters: {
    status: { type: 'inProgress' },
    actions: {
      handles: ['change']
    },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}|^formResetCallback$|^onChange$|^type$|^value$`)
    }
  },
  decorators: [withActions],
  args: {
    id: 'selectId',
    name: 'selectName',
    items: baseItems,
  }
};

export const Default: StoryObj<typeof Cre8Select> = {};

export const Disabled: StoryObj<typeof Cre8Select> = { args: {
  disabled: true,
} };

export const Preselected: StoryObj<typeof Cre8Select> = { args: {
  value: 'option-item-1',
} };

export const FieldNote: StoryObj<typeof Cre8Select> = { args: {
  children: (
    <div slot="fieldNote">Some optional help text or <Cre8Link href="#">helpful link</Cre8Link></div>
  )
} };

export const Error: StoryObj<typeof Cre8Select> = { args: {
  isError: true,
  errorNote: 'Short, clear error message'
} };

export const Success: StoryObj<typeof Cre8Select> = { args: {
  isSuccess: true,
  successNote: 'Short, clear success message'
} };

export const FieldnoteAndError: StoryObj<typeof Cre8Select> = { args: {
  fieldNote: "This is a field note.",
  isError: true,
  errorNote: 'Short, clear error message'
} };

export const FieldNoteAndSuccess: StoryObj<typeof Cre8Select> = { args: {
  fieldNote: "This is a field note.",
  isSuccess: true,
  successNote: 'Short, clear success message'
} };

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
 *     { label: 'Option Group Item 1', value: 'option-group-item-1' },
 *     { label: 'Option Group Item 2', value: 'option-group-item-2' },
 *     { label: 'Option Group Item 3', value: 'option-group-item-3' },
 *   ],
 * }
 * ```
*/

export const OptionGroup: StoryObj<typeof Cre8Select> = { args: {
  items: optionGroupItems,
} };
