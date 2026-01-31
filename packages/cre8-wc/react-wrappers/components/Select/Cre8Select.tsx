import { createComponent } from '@lit/react';
import { Cre8Select as Cre8SelectElement } from '@tmorrow/cre8-wc/lib/components/select/select';
import React from 'react';

export interface Cre8SelectProps {
  /** A mix of Cre8SelectOption and Cre8SelectOptionGroup definitions: - Cre8SelectOption   - label: option label text - `string`   - value: option value - `number | string` - Cre8SelectOptionGroup  - optGroupLabel: optgroup label text - `string`  - options: Array of multiple Cre8SelectOption items - `Cre8SelectOption[]` */
  items?: any;
  /** The required label that appears above the select */
  label?: string;
  /** The name property on the select */
  name?: string;
  /** The unique id of the select */
  fieldId?: string;
  /** Optional field note text can be added to provide additional field guidance. */
  fieldNote?: string;
  /** Used to connect the field note in text field to the text menu for accessibility */
  ariaDescribedBy?: string;
  /** Additional aria-describedby connection to id for additional success and error notes to be accessible */
  validationAriaDescribedBy?: string;
  /** The required attribute on the select */
  required?: boolean;
  /** The disabled attribute on the select */
  disabled?: boolean;
  /** Changes the component's treatment to represent an error state */
  isError?: boolean;
  /** The error field note that appears below the default field note */
  errorNote?: string;
  /** Changes the component's treatment to represent a success state */
  isSuccess?: boolean;
  /** The success field note that appears below the default field note */
  successNote?: string;
  /** The value of the form field. */
  value?: string;
  children?: React.ReactNode;
  onChange?: (event: CustomEvent) => void;
}

/**
 * The Select control is designed and built to be used for selecting between choices in a form.
 */
export const Cre8Select = createComponent({
  react: React,
  tagName: 'cre8-select',
  elementClass: Cre8SelectElement,
  events: {
    onChange: 'change'
  }
});

export default Cre8Select;
