import React from 'react';
import { createComponent, EventName } from '@lit-labs/react';
import { cre8RadioFieldItem as cre8RadioFieldItemElement } from '@cre8/cre8-wc/lib/components/radio-field-item/radio-field-item';
import { cre8DomEvent } from '../../util/cre8DomEvent';

/**
 * A Radio Field Item adds a radio button to a Radio Field. Radio buttons let a user choose only one of several
 * options. Do not use a single radio button, because once selected, it cannot be de-selected. If the user can only
 * choose one, none or many options, use Checkbox instead.
 */
export const cre8RadioFieldItem = createComponent({
    react: React,
    tagName: 'cre8-radio-field-item',
    elementClass: cre8RadioFieldItemElement,
    events: {
        onChange: 'input' as EventName<cre8DomEvent<cre8RadioFieldItemElement>>,
    },
});
