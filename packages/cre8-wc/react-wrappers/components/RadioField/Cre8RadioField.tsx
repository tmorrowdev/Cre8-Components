import { createComponent } from '@lit/react';
import { Cre8RadioField as Cre8RadioFieldElement } from '@tmorrow/cre8-wc/lib/components/radio-field/radio-field';
import type { Cre8RadioItemData } from '@tmorrow/cre8-wc/lib/components/radio-field/radio-field';
import React from 'react';
export type { Cre8RadioItemData } from '@tmorrow/cre8-wc/lib/components/radio-field/radio-field';

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
  /** Options for a data-driven radio field. Each becomes a `cre8-radio-field-item` sharing the field's `name`, which is what the form submits under. Exclusivity is enforced by the field itself — see `enforceSingleSelection`, and do not assume `name` alone does it. */
  items?: Cre8RadioItemData[];
  /** Form control name shared by every generated option. */
  name?: string | undefined;
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
