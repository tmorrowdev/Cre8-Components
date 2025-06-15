import React from 'react';
import { createComponent } from '@lit/react';
import { Cre8Pagination as Cre8PaginationElement } from '@cre8_dev/cre8-wc/lib/components/pagination/pagination';

/**
 * The Pagination component is used to split up a large amount of results by showing only
 * a certain amount on each page. You can cycle through the pages using Page Numbers,
 * Next and Previous Buttons, or optional First Page and Last Page Buttons.
 * This component is also used by Table to cycle through rows of results. Pagination has four display options:
 *
 * **default**:  Can contain up to seven Page Numbers (ellipses included) at a time flanked by
 * Next and Previous Buttons. When there are more than seven pages, numbers start getting
 * replaced by ellipses. Use this option when you have a lot of horizontal space in a layout.
 * It should not be used for mobile web layouts since its buttons are smaller than the minimum touch target of 44px.
 *
 *
 * **compact** : Best used as a summary of where you are among pages or table rows
 * flanked by Previous and Next Buttons. Use this option when you have limited horizontal
 * space but still need to show where users are among results. Great for mobile layouts.
 *
 *
 * **icon-only** : Use this option in very tight spaces when it’s not required
 * to show users where they are among results. Great for mobile layouts.
 *
 * ## HOW TO USE
 *
 * Select an option from the “Display” dropdown depending on layout width
 * Select where your current page is from the “Page” dropdown
 * To show less pages when using Full Numbers, use the “pageNumber” toggles
 * To hide the First Page and Last Page Buttons, turn off the “firstLastButton” toggle
 * To change the states of page numbers or buttons, click on each to see its “State” dropdown
 * When using Compact Pagination, you can choose between “Page Numbers” and "Icon Only" formats
 *
 *
 * ## ACCESSIBILITY NOTE
 *
 * To best orient people using screen readers, push focus to the top of
 * the list of results after any of the pagination buttons have been triggered,
 * **except for the currently selected one**. Focus target could be a visual results heading,
 * or the top heading of the results container of the page selected
 * via a programmatic selector, e.g. < section id=“results” aria-label="results-section" > or
 * < div role= “group” aria-label=“results” >.
 *
 * @dependency Cre8-button, Cre8-icon, Cre8-pagination-counter
 * @csspart icon - distinguishes the page buttons from the icon buttons
 */


export const Cre8Pagination = createComponent({
    react: React,
    tagName: 'cre8-pagination',
    elementClass: Cre8PaginationElement,
});
