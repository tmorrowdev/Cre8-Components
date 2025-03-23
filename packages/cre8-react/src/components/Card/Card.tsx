import React from 'react';
import { createComponent } from '@lit-labs/react';
import { cre8Card as cre8CardElement } from '@cre8/cre8-wc/lib/components/card/card';

/** The card component acts a general container element for various content.
*
* # How to Use
* 1. Wrap the card component tags around any html template code which has been properly imported into the file.
* 2. Decide the layout that best fits the designs assigned to your work.  Generally, we recommend visual elements appear at the start with
* custom html content that gives further context and meaning following after.
* 3. The card defaults to a column and includes a `horizontal` directional variant. If you have a card where the layout of the content is
* more aligned horizontally, using the `horizontal` variant will ease the construction of your component
* 4. Finally, we typically recommend reserving the end of the card for any interactive elements such as buttons for navigating to further information.
*
*/

export const cre8Card = createComponent({
    react: React,
    tagName: 'cre8-card',
    elementClass: cre8CardElement,

});
