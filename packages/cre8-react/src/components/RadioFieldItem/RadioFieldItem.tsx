import React from 'react';
import { createComponent, EventName } from '@lit/react';
import { Cre8RadioFieldItem as Cre8RadioFieldItemElement } from '@cre8_dev/cre8-wc/lib/components/radio-field-item/radio-field-item';
import { Cre8DomEvent } from '../../util/Cre8DomEvent';

/**
 * A Radio Field Item adds a radio button to a Radio Field. Radio buttons let a user choose only one of several
 * options. Do not use a single radio button, because once selected, it cannot be de-selected. If the user can only
 * choose one, none or many options, use Checkbox instead.
 */
export const Cre8RadioFieldItem = createComponent({
    react: React,
    tagName: 'Cre8-radio-field-item',
    elementClass: Cre8RadioFieldItemElement,
    events: {
        onChange: 'input' as EventName<Cre8DomEvent<Cre8RadioFieldItemElement>>,
    },
});
