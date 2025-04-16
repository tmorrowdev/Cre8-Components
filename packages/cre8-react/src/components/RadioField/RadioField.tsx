import React from 'react';
import { createComponent } from '@lit/react';
import { Cre8RadioField as Cre8RadioFieldElement } from '@cre8_dev/cre8-wc/lib/components/radio-field/radio-field';

/**
 * Radio Field is the parent container for `radio-field-item`.
 * It is required to allow for grouping numerous radio fields that need additional context (in the form of `<legend>`).
 * It also provides accessibility roles, aria attributes and field note messaging on the group.
 *
 * See [radio-field-item](?path=/story/Cre8-components-radio-field-item--default) for more guidance on its usage.
 */
export const Cre8RadioField = createComponent({
    react: React,
    tagName: 'Cre8-radio-field',
    elementClass: Cre8RadioFieldElement,

});
