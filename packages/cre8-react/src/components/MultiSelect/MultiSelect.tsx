import React from 'react';
import { createComponent, EventName } from '@lit-labs/react';
import { cre8MultiSelect as cre8MultiSelectElement } from '@cre8/cre8-wc/lib/components/multi-select/multi-select';
import { cre8DomEvent } from '../../util/cre8DomEvent';

/**
 * Multiselect is used when multiple options can be chosen from a static dropdown
 * This component has a list of items in the dropdown that can be added as "selected tags"
 * The checkbox will always reflect the selected nature of the item and is not removed
 * from the dropdown when clicked, the tags will be added and removed based on their state.
 *
 * Event `selectedItemsChange` emits whenever a tag is added or remove from the list and the
 * current list after the change is given in the detail.
 */

export const cre8MultiSelect = createComponent({
    react: React,
    tagName: 'cre8-multi-select',
    elementClass: cre8MultiSelectElement,
    events: {
        onSelectedItemsChange: 'selectedItemsChange' as EventName<cre8DomEvent<cre8MultiSelectElement>>,
    },
});
