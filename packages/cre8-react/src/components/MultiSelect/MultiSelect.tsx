import React from 'react';
import { createComponent, EventName } from '@lit/react';
import { Cre8MultiSelect as Cre8MultiSelectElement } from '@cre8_dev/cre8-wc/lib/components/multi-select/multi-select';
import { Cre8DomEvent } from '../../util/Cre8DomEvent';

/**
 * Multiselect is used when multiple options can be chosen from a static dropdown
 * This component has a list of items in the dropdown that can be added as "selected tags"
 * The checkbox will always reflect the selected nature of the item and is not removed
 * from the dropdown when clicked, the tags will be added and removed based on their state.
 *
 * Event `selectedItemsChange` emits whenever a tag is added or remove from the list and the
 * current list after the change is given in the detail.
 */

export const Cre8MultiSelect = createComponent({
    react: React,
    tagName: 'cre8-multi-select',
    elementClass: Cre8MultiSelectElement,
    events: {
        onSelectedItemsChange: 'selectedItemsChange' as EventName<Cre8DomEvent<Cre8MultiSelectElement>>,
    },
});
