import React from 'react';
import { createComponent } from '@lit/react';
import { Cre8Link as Cre8LinkElement } from '@cre8_dev/cre8-wc/lib/components/link/link';

/**
 * Link Component are strictly used in the case where the component will take
 * the user away from the current page to a new url.
 * In this vein, this component should ONLY be used in situations an anchor tag would be used (an href is required)
 * This goes for the variations as well such as the Call To Action Link
 *
 * **Note**
 *
 * For link with icon:
 * - **iconRotateDegree** & **iconFlipDirection** props are optional.
 * - They are used to set up the correct dirrection for icons, for example,
 * arrows, caret up or caret down.
 *
*/

export const Cre8Link = createComponent({
    react: React,
    tagName: 'cre8-link',
    elementClass: Cre8LinkElement,

});
