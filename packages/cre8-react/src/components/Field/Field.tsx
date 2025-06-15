import React from 'react';
import { EventName, createComponent } from '@lit/react';
import { Cre8Field as Cre8FieldElement } from '@cre8_dev/cre8-wc/lib/components/field/field';
import { Cre8DomEvent } from '../../util/Cre8DomEvent';

/**
 * The Field component renders a form group with label, control, help text and validation styling. There are
 * convenience variants of Field to support HTML5 input types and static content.
 */
export const Cre8Field = createComponent({
    react: React,
    tagName: 'cre8-field',
    elementClass: Cre8FieldElement,
    events: {
        onChange: 'input' as EventName<Cre8DomEvent<Cre8FieldElement>>,
    },
});
