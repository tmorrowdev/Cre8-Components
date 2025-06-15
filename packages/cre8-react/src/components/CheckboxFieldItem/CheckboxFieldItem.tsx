import React from 'react';
import { EventName, createComponent } from '@lit/react';
import { Cre8CheckboxFieldItem as Cre8CheckboxFieldItemElement } from '@cre8_dev/cre8-wc/lib/components/checkbox-field-item/checkbox-field-item';
import { Cre8DomEvent } from '../../util/Cre8DomEvent';

/**
 *  CheckboxFieldItem is the combination of Checkbox, Label and FieldNote. Checkbox can turn an option on or off.
 */
export const Cre8CheckboxFieldItem = createComponent({
    react: React,
    tagName: 'cre8-checkbox-field-item',
    elementClass: Cre8CheckboxFieldItemElement,
    events: {
        onChange: 'input' as EventName<Cre8DomEvent<Cre8CheckboxFieldItemElement>>,
    },
});
