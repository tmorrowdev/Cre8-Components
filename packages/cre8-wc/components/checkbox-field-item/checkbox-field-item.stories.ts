import type { Meta, StoryObj } from '@storybook/web-components';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';
import '../field-note/field-note';
import './checkbox-field-item';
import type { Cre8CheckboxFieldItem } from './checkbox-field-item';

// `getStorybookHelpers` reads the Custom Elements Manifest to auto-generate
// controls for this component's attributes, properties, slots, events and the
// design tokens (CSS custom properties) it exposes — here
// `--cre8-border-radius-checkbox`. See https://wc-toolkit.com/integrations/storybook/
const { args, argTypes, template } = getStorybookHelpers('cre8-checkbox-field-item');

type Story = StoryObj<Cre8CheckboxFieldItem>;

const meta: Meta<Cre8CheckboxFieldItem> = {
  title: 'cre8 Components/Checkbox Field Item',
  component: 'cre8-checkbox-field-item',
  args,
  argTypes,
  parameters: {
    status: { type: 'inProgress' },
    actions: {
      handles: ['input', 'change', 'blur', 'click']
    }
  },
  render: (args) => template(args),
};
export default meta;

export const Default: Story = {
  args: {
    label: 'Label',
  },
};

export const Preselected: Story = {
  args: {
    label: 'Label',
    checked: true
  },
};

/**
 * As a universal form rule, remember to minimize the number of optional fields to keep forms as short as possible. Include the text `(optional)` at the end of the label for the checkbox.
 *
 */

export const Optional: Story = {
  args: {
    label: 'Label (optional)'
  },
};

export const Error: Story = {
  args: {
    label: 'Label',
    isError: true,
    required: true
  },
};

/**
 * Using disabled states is not advised. Ideally, never display unavailable actions.
 *
 */
export const Disabled: Story = {
  args: {
    label: 'Label',
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

export const DefaultWithFieldNote: Story = {
  args: {
    label: 'Label',
    fieldNote: 'This is a field note.',
    ariaDescribedBy: 'default-fieldnote-message',
  },
};

export const ErrorWithFieldNote: Story = {
  args: {
    label: 'Label',
    isError: true,
    errorNote: 'Short, clear error message',
    validationAriaDescribedBy: 'error-validation-message',
  },
};

export const SuccessWithFieldNote: Story = {
  args: {
    label: 'Label',
    isSuccess: true,
    successNote: 'Short, clear success message',
    validationAriaDescribedBy: 'success-valitation-message',
  },
};

export const LongTitle: Story = {
  args: {
    label: 'This could mayhaps be the longest title that has ever been put on a checkbox field ever!'
  },
};

/**
 * The checkbox's corner radius is driven by the `--cre8-border-radius-checkbox`
 * design token. Adjust it from the **CSS Custom Properties** controls (or the
 * example below) to see it applied live.
 */
export const CustomBorderRadius: Story = {
  args: {
    label: 'Rounded checkbox',
    '--cre8-border-radius-checkbox': '0.5rem',
  },
};
