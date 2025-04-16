import React from 'react';
import { EventName, createComponent } from '@lit/react';
import { Cre8DatePicker as Cre8DatePickerElement } from '@cre8_dev/cre8-wc/lib/components/date-picker/date-picker';
import { Cre8DomEvent } from '../../util/Cre8DomEvent';

/**
 * The Date Picker component renders a form group with label, control, help text and validation styling much
 * like the Field component but exclusively for type=date.
 * Cre8DatePicker inherts the Cre8Field component.
 */

export const Cre8DatePicker = createComponent({
    react: React,
    tagName: 'Cre8-date-picker',
    elementClass: Cre8DatePickerElement,
    events: {
        onChange: 'input' as EventName<Cre8DomEvent<Cre8DatePickerElement>>,
    },
});

