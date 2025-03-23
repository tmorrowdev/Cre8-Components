import React from 'react';
import { createComponent } from '@lit-labs/react';
import { cre8FieldNote as cre8FieldNoteElement } from '@cre8/cre8-wc/lib/components/field-note/field-note';

/**
 * Field Note gives direction on how to fill out a form field and to alert users of form errors and successes.
 * It’s used below an input field and never on its own.
 */

export const cre8FieldNote = createComponent({
    react: React,
    tagName: 'cre8-field-note',
    elementClass: cre8FieldNoteElement,

});
