import React from 'react';
import { EventName, createComponent } from '@lit-labs/react';
import { cre8CheckboxFieldItem as cre8CheckboxFieldItemElement } from '@cre8/cre8-wc/lib/components/checkbox-field-item/checkbox-field-item';
import { cre8DomEvent } from '../../util/cre8DomEvent';

/**
 *  CheckboxFieldItem is the combination of Checkbox, Label and FieldNote. Checkbox can turn an option on or off.
 */
export const cre8CheckboxFieldItem = createComponent({
    react: React,
    tagName: 'cre8-checkbox-field-item',
    elementClass: cre8CheckboxFieldItemElement,
    events: {
        onChange: 'input' as EventName<cre8DomEvent<cre8CheckboxFieldItemElement>>,
    },
});
