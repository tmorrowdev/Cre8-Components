import React from 'react';
import { EventName, createComponent } from '@lit-labs/react';
import { cre8Switch as cre8SwitchElement } from '@cre8/cre8-wc/lib/components/switch/switch';
import { cre8DomEvent } from '../../util/cre8DomEvent';

/**
 * Switch component is used to quickly change between two possible states.
 * They are commonly used for "On/Off" switches.
 *
 * ## How to Use
 *
 * - Import 'Switch' component
 * - There are default, preselected, disable switches. See the variations below for examples.
 * - User can add label text for the switch component to clarify the action that the switch toggle performs.
 *
 */

export const cre8Switch = createComponent({
    react: React,
    tagName: 'cre8-switch',
    elementClass: cre8SwitchElement,
    events: {
        onChange: 'input' as EventName<cre8DomEvent<cre8SwitchElement>>,
    },
});
