import React from 'react';
import { createComponent, EventName } from '@lit-labs/react';
import { cre8Dropdown as cre8DropdownElement } from '@cre8/cre8-wc/lib/components/dropdown/dropdown';
import { cre8DropdownItem as cre8DropdownItemElement } from '@cre8/cre8-wc/lib/components/dropdown-item/dropdown-item';
import { cre8DomEvent } from '../../util/cre8DomEvent';

/**
 * The Dropdown menu itself is a container that can host multiple interactive items, commonly formatted as a list
 */
export const cre8Dropdown = createComponent({
    react: React,
    tagName: 'cre8-dropdown',
    elementClass: cre8DropdownElement,
    events: {
        onDropdownItemSelected: 'dropdown-item-selected' as EventName<cre8DomEvent<cre8DropdownItemElement, cre8DropdownElement>>,
    },
});
