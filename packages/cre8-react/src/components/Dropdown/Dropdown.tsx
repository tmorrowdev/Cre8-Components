import React from 'react';
import { createComponent, EventName } from '@lit/react';
import { Cre8Dropdown as Cre8DropdownElement } from '@tmorrow/cre8-wc/lib/components/dropdown/dropdown';
import { Cre8DropdownItem as Cre8DropdownItemElement } from '@tmorrow/cre8-wc/lib/components/dropdown-item/dropdown-item';
import { Cre8DomEvent } from '../../util/Cre8DomEvent';

/**
 * The Dropdown menu itself is a container that can host multiple interactive items, commonly formatted as a list
 */
export const Cre8Dropdown = createComponent({
    react: React,
    tagName: 'Cre8-dropdown',
    elementClass: Cre8DropdownElement,
    events: {
        onDropdownItemSelected: 'dropdown-item-selected' as EventName<Cre8DomEvent<Cre8DropdownItemElement, Cre8DropdownElement>>,
    },
});
