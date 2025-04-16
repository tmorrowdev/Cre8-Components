import React from 'react';
import { createComponent, EventName } from '@lit/react';
import { Cre8DropdownItem as Cre8DropdownItemElement } from '@cre8_dev/cre8-wc/lib/components/dropdown-item/dropdown-item';
import { Cre8DomEvent } from '../../util/Cre8DomEvent';

/**
 * The Dropdown item component is designed to be used with Dropdown component, each item represents a
 * selectable option or action within the dropdown menu. It can be configured to trigger actions, navigate
 * to links, initiate commands when clicked.
 */
export const Cre8DropdownItem = createComponent({
    react: React,
    tagName: 'Cre8-dropdown-item',
    elementClass: Cre8DropdownItemElement,
    events: {
        onDropdownItemSelected: 'dropdown-item-selected' as EventName<Cre8DomEvent<Cre8DropdownItemElement>>,
    },
});
