import React from 'react';
import { EventName, createComponent } from '@lit-labs/react';
import { cre8Field as cre8FieldElement } from '@cre8/cre8-wc/lib/components/field/field';
import { cre8DomEvent } from '../../util/cre8DomEvent';

/**
 * The Field component renders a form group with label, control, help text and validation styling. There are
 * convenience variants of Field to support HTML5 input types and static content.
 */
export const cre8Field = createComponent({
    react: React,
    tagName: 'cre8-field',
    elementClass: cre8FieldElement,
    events: {
        onChange: 'input' as EventName<cre8DomEvent<cre8FieldElement>>,
    },
});
