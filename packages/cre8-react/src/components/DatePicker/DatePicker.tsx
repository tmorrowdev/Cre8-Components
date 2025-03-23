import React from 'react';
import { EventName, createComponent } from '@lit-labs/react';
import { cre8DatePicker as cre8DatePickerElement } from '@cre8/cre8-wc/lib/components/date-picker/date-picker';
import { cre8DomEvent } from '../../util/cre8DomEvent';

/**
 * The Date Picker component renders a form group with label, control, help text and validation styling much
 * like the Field component but exclusively for type=date.
 * cre8DatePicker inherts the cre8Field component.
 */

export const cre8DatePicker = createComponent({
    react: React,
    tagName: 'cre8-date-picker',
    elementClass: cre8DatePickerElement,
    events: {
        onChange: 'input' as EventName<cre8DomEvent<cre8DatePickerElement>>,
    },
});

