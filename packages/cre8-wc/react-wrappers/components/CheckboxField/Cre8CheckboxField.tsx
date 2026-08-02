import { createComponent } from '@lit/react';
import { Cre8CheckboxField as Cre8CheckboxFieldElement } from '@tmorrow/cre8-wc/lib/components/checkbox-field/checkbox-field';
import type { Cre8CheckboxItemData } from '@tmorrow/cre8-wc/lib/components/checkbox-field/checkbox-field';
import React from 'react';
export type { Cre8CheckboxItemData } from '@tmorrow/cre8-wc/lib/components/checkbox-field/checkbox-field';

export interface Cre8CheckboxFieldProps {
  /** Checkbox container fieldnote knockout */
  fieldNoteKnockout?: boolean | undefined;
  /** Checkbox container fieldnote isSuccess */
  fieldNoteIsSuccess?: boolean | undefined;
  /** Checkbox container fieldnote isError */
  fieldNoteIsError?: boolean | undefined;
  /** Checkbox container legend label */
  label?: string | undefined;
  /** Checkbox container fieldnote */
  fieldNote?: string | undefined;
  /** Checkbox container fieldnote aria describe by */
  ariaDescribedBy?: string | undefined;
  /** Checkbox container fieldnote icon name */
  fieldNoteIconName?: string | undefined;
  /** Checkboxes for a data-driven field. Each becomes a `cre8-checkbox-field-item`, sharing the field's `name` so they submit as a group. */
  items?: Cre8CheckboxItemData[];
  /** Form control name shared by every generated item. */
  name?: string | undefined;
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
