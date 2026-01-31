import React from 'react';
import { createComponent } from '@lit/react';
import { Cre8FieldNote as Cre8FieldNoteElement } from '@tmorrow/cre8-wc/lib/components/field-note/field-note';

/**
 * Field Note gives direction on how to fill out a form field and to alert users of form errors and successes.
 * It’s used below an input field and never on its own.
 */

export const Cre8FieldNote = createComponent({
    react: React,
    tagName: 'Cre8-field-note',
    elementClass: Cre8FieldNoteElement,

});
