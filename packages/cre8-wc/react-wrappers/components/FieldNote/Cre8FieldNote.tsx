import { createComponent } from '@lit/react';
import { Cre8FieldNote as Cre8FieldNoteElement } from '@tmorrow/cre8-wc/lib/components/field-note/field-note';
import React from 'react';

export interface Cre8FieldNoteProps {
  /** Changes the component's treatment to represent an error */
  isError?: boolean;
  /** Changes the component's treatment to represent a success */
  isSuccess?: boolean;
  /** DEPRECATED: Icon name used for the icon before to the field note */
  iconName?: string | undefined;
  children?: React.ReactNode;
}

/**
 * Field Note gives direction on how to fill out a form field and to alert users of form errors and successes.
 */
export const Cre8FieldNote = createComponent({
  react: React,
  tagName: 'cre8-field-note',
  elementClass: Cre8FieldNoteElement,

});

export default Cre8FieldNote;
