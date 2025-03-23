import React from 'react';
import { createComponent, EventName } from '@lit-labs/react';
import { cre8DropdownItem as cre8DropdownItemElement } from '@cre8/cre8-wc/lib/components/dropdown-item/dropdown-item';
import { cre8DomEvent } from '../../util/cre8DomEvent';

/**
 * The Dropdown item component is designed to be used with Dropdown component, each item represents a
 * selectable option or action within the dropdown menu. It can be configured to trigger actions, navigate
 * to links, initiate commands when clicked.
 */
export const cre8DropdownItem = createComponent({
    react: React,
    tagName: 'cre8-dropdown-item',
    elementClass: cre8DropdownItemElement,
    events: {
        onDropdownItemSelected: 'dropdown-item-selected' as EventName<cre8DomEvent<cre8DropdownItemElement>>,
    },
});
