import React from 'react';
import { createComponent } from '@lit/react';
import { Cre8InlineAlert as Cre8InlineAlertElement } from '@cre8_dev/cre8-wc/lib/components/inline-alert/inline-alert';

/**
 * In cases when it is necessary to alert the user but a less strong message that cannot be dismissed is desired, use an in-line contextual alert message as the least "severe" message type. These can be displayed anywhere on the page, but should never cover content.
 * Inline alerts do not include a title or close capability and are considered minimally intrusive user messaging.
 *
 */

export const Cre8InlineAlert = createComponent({
    react: React,
    tagName: 'Cre8-inline-alert',
    elementClass: Cre8InlineAlertElement,
});
