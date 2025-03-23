import React from 'react';
import { createComponent } from '@lit-labs/react';
import { cre8RadioField as cre8RadioFieldElement } from '@cre8/cre8-wc/lib/components/radio-field/radio-field';

/**
 * Radio Field is the parent container for `radio-field-item`.
 * It is required to allow for grouping numerous radio fields that need additional context (in the form of `<legend>`).
 * It also provides accessibility roles, aria attributes and field note messaging on the group.
 *
 * See [radio-field-item](?path=/story/cre8-components-radio-field-item--default) for more guidance on its usage.
 */
export const cre8RadioField = createComponent({
    react: React,
    tagName: 'cre8-radio-field',
    elementClass: cre8RadioFieldElement,

});
