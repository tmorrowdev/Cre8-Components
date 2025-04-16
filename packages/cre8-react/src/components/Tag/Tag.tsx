import React from 'react';
import { createComponent, EventName } from '@lit/react';
import { Cre8Tag as Cre8TagElement } from '@cre8_dev/cre8-wc/lib/components/tag/tag';
import { Cre8DomEvent } from '../../util/Cre8DomEvent';

/**
 * The tag component allows you to make selections, filter content, or trigger actions. While buttons are
 * expected to appear consistently and with familiar calls to actions, tags should appear dynamically
 * as a group of multiple interactions elements. It is a flexible
 * component that comes in the following types:
 *  - **radio**  Clicking a Radio Button causes it to change color. These tags only allow
 * one option to be chosen and can be used in place of radio button when they need to be listed
 * horizontally
 *
 *  - **checkbox** It allows for selecting options, It can be toggled on and off.
 * checkbox tags can be used as an alternative to checkboxes.
 */

export const Cre8Tag = createComponent({
    react: React,
    tagName: 'Cre8-tag',
    elementClass: Cre8TagElement,
    events: {
        onChange: 'input' as EventName<Cre8DomEvent<Cre8TagElement>>,
    },
});
