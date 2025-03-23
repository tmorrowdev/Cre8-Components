import React from 'react';
import { createComponent, EventName } from '@lit-labs/react';
import { cre8Tag as cre8TagElement } from '@cre8/cre8-wc/lib/components/tag/tag';
import { cre8DomEvent } from '../../util/cre8DomEvent';

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

export const cre8Tag = createComponent({
    react: React,
    tagName: 'cre8-tag',
    elementClass: cre8TagElement,
    events: {
        onChange: 'input' as EventName<cre8DomEvent<cre8TagElement>>,
    },
});
