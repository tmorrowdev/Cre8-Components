import { createComponent, type EventName } from '@lit-labs/react';
import { cre8Select as cre8SelectElement } from '@cre8/cre8-wc/lib/components/select/select';
import React from 'react';
import { type cre8DomEvent } from '../../util/cre8DomEvent';

/**
 * The Select control is designed and built to be used for selecting between choices in a form.
 * It is not a Dropdown control which is generally used for displaying lists of choices
 * that act as links or actions, like filter options.
 *
 * Consider the use of a Select control carefully.
 * When you have less than 5 options for the user to choose from,
 * Radio or Checkbox inputs may be a better choice to display all of the options at once.
 * Users have to slow down to scan a list with more than 15 options,
 * so using an option group to give the options hierarchy may help users find their choice faster.
 * Alternately, a text input field might be a more appropriate control to use when there are too many options,
 * especially when used with typeahead/auto-complete.
 *
 * ## How to use
 * 1. The collapsed default state always shows a default placeholder value or a selected value.
 * 2. Sort list items in a logical order, such as grouping highly related options together, placing most common options first, using alphabetical or numeric orders or dates in chronological order.
 * 3. A list that includes 6+ items should show a scrollbar.
 * 4. Users should be able to use a keystroke to quickly jump to selecting an option that begins with the entered letter.
 * 5. Utilize appropriate native controls for when a user is on a mobile device rather than our custom Select.
 * 6. Adhere to our common form field conventions and always include a Label, provide short and clear error messages in context, avoid using the Read-only and Disabled states as much as possible, and utilize the info/formatting tip or helpful link rather than placeholder text.
 *
 * @slot fieldNote - Container for optional field note content
 */


export const cre8Select = createComponent({
    react: React,
    tagName: 'cre8-select',
    elementClass: cre8SelectElement,
    events: {
        onChange: 'change' as EventName<cre8DomEvent<cre8SelectElement>>,
    },
});
