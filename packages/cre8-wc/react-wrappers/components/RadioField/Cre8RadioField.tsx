import { createComponent } from '@lit/react';
import { Cre8RadioField as Cre8RadioFieldElement } from '@tmorrow/cre8-wc/lib/components/radio-field/radio-field';
import React from 'react';

export interface Cre8RadioFieldProps {
  /** Radio Field Note */
  fieldNote?: string | undefined;
  /** Radio container fieldnote aria describe by */
  ariaDescribedBy?: string | undefined;
  /** Radio container fieldnote icon name */
  fieldNoteIconName?: string | undefined;
  /** Radio container fieldnote knockout */
  fieldNoteKnockout?: boolean | undefined;
  /** Radio container fieldnote isSuccess */
  isSuccess?: boolean | undefined;
  /** Radio container fieldnote isError */
  isError?: boolean | undefined;
  /** Radio field legend label */
  label?: string | undefined;
  children?: React.ReactNode;
}

/**
 * Radio Field is the parent container for `radio-field-item`.
 */
export const Cre8RadioField = createComponent({
  react: React,
  tagName: 'cre8-radio-field',
  elementClass: Cre8RadioFieldElement,

});

export default Cre8RadioField;
