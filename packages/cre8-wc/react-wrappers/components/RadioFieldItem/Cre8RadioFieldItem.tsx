import { createComponent } from '@lit/react';
import { Cre8RadioFieldItem as Cre8RadioFieldItemElement } from '@tmorrow/cre8-wc/lib/components/radio-field-item/radio-field-item';
import React from 'react';

export interface Cre8RadioFieldItemProps {
  /** Identifies the element that provides a detailed, extended description for the object. */
  ariaDescribedBy?: string;
  /** A Boolean attribute which, if present, sets the radio button as selected. */
  checked?: boolean;
  /** The Boolean disabled attribute, when present, makes the element not mutable, focusable, or even submitted with the form. The user can neither edit nor focus on the control, nor its form control descendants. */
  disabled?: boolean;
  /** The fieldId attribute is assigned to the HTML input element of the radio button and the for attribute of the corresponding label. */
  fieldId?: string | undefined;
  /** A FieldNote can be placed to provide guidance. It's frequently used to in the context of form fields for extra information or validation messages. */
  fieldNote?: string | undefined;
  /** Sets the item fieldnote icon.  - **check** renders a badge with success state treatment - **error** renders a badge with error state treatment */
  fieldNoteIconName?: string | undefined;
  /** Radio item fieldnote knockout */
  fieldNoteKnockout?: boolean;
  /** Sets the error state of the fieldnote. */
  fieldNoteIsError?: boolean;
  /** The isError attribute is used to indicate an error state related to the radio button. */
  isError?: boolean;
  /** The isSuccess attribute is used to indicate a success state related to the radio button. */
  isSuccess?: boolean;
  /** The label attribute is used to assign a value to the label element corresponding to this radio button. */
  label?: string | undefined;
  /** The name attribute is used to assign a value to the name attribute of the input element in the DOM. */
  name?: string | undefined;
  /** Required attribute */
  required?: boolean;
  /** The value of the form field. */
  value?: string;
}

/**
 * A Radio Field Item adds a radio button to a Radio Field. Radio buttons let a user choose only one of several
 */
export const Cre8RadioFieldItem = createComponent({
  react: React,
  tagName: 'cre8-radio-field-item',
  elementClass: Cre8RadioFieldItemElement,

});

export default Cre8RadioFieldItem;
