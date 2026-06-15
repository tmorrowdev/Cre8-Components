import { createComponent } from '@lit/react';
import { Cre8CheckboxFieldItem as Cre8CheckboxFieldItemElement } from '@tmorrow/cre8-wc/lib/components/checkbox-field-item/checkbox-field-item';
import React from 'react';

export interface Cre8CheckboxFieldItemProps {
  /** Changes the component's treatment to represent an error state */
  isError?: boolean | undefined;
  /** Visually hidden text that always signifies that this is an error for screen reader usage */
  errorText?: string;
  /** Changes the component's treatment to represent a success state */
  isSuccess?: boolean | undefined;
  /** Disabled State */
  disabled?: boolean | undefined;
  /** Checked State */
  checked?: boolean | undefined;
  /** Checkbox FieldId */
  fieldId?: string | undefined;
  /** Checkbox fieldnote ariaDescribeBy */
  ariaDescribedBy?: string | undefined;
  /** Required property */
  required?: boolean | undefined;
  /** The checkbox label */
  label?: string | undefined;
  /** The error field note that appears below the default field note */
  errorNote?: string | undefined;
  /** Visually hidden text that always signifies that this is successful for screen reader usage */
  successText?: string;
  /** The success field note that appears below the default field note */
  successNote?: string | undefined;
  /** Checkbox FieldNote */
  fieldNote?: string | undefined;
  /** Additional aria-describedby connection to id for additional success and error notes to be accessible */
  validationAriaDescribedBy?: string | undefined;
  /** Checkbox fieldnote icon name */
  fieldNoteIconName?: string | undefined;
  children?: React.ReactNode;
  onChange?: (event: CustomEvent) => void;
}

/**
 * Checkbox Field Item is the combination of a checkbox input, label and field note.
 */
export const Cre8CheckboxFieldItem = createComponent({
  react: React,
  tagName: 'cre8-checkbox-field-item',
  elementClass: Cre8CheckboxFieldItemElement,
  events: {
    onChange: 'change'
  }
});

export default Cre8CheckboxFieldItem;
