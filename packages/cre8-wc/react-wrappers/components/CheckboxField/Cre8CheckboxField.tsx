import { createComponent } from '@lit/react';
import { Cre8CheckboxField as Cre8CheckboxFieldElement } from '@tmorrow/cre8-wc/lib/components/checkbox-field/checkbox-field';
import React from 'react';

export interface Cre8CheckboxFieldProps {
  /** Checkbox container legend label */
  label?: string | undefined;
  /** Checkbox container fieldnote */
  fieldNote?: string | undefined;
  /** Checkbox container fieldnote aria describe by */
  ariaDescribedBy?: string | undefined;
  /** Checkbox container fieldnote icon name */
  fieldNoteIconName?: string | undefined;
  /** Checkbox container fieldnote knockout */
  fieldNoteKnockout?: boolean;
  /** Checkbox container fieldnote isSuccess */
  fieldNoteIsSuccess?: boolean;
  /** Checkbox container fieldnote isError */
  fieldNoteIsError?: boolean;
  children?: React.ReactNode;
}

/**
 * Checkbox Field is the parent container for `checkbox-field-item`.
 */
export const Cre8CheckboxField = createComponent({
  react: React,
  tagName: 'cre8-checkbox-field',
  elementClass: Cre8CheckboxFieldElement,

});

export default Cre8CheckboxField;
