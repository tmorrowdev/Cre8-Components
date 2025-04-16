import React from 'react';
import { EventName, createComponent } from '@lit/react';
import { Cre8Tabs as Cre8TabsElement } from '@cre8_dev/cre8-wc/lib/components/tabs/tabs';
import { Cre8DomEvent } from '../../util/Cre8DomEvent';

/**
 * Tabs are used to quickly navigate back and forth between views.
 * The Tab design and interaction varies depending on the requirements for your organization and project.
 * Standardizing on the best individual controls will improve usability and reduce development and QA time.
 *
 * Create a standard set of Tab controls: Primary Tabs (for system navigation), Secondary Tabs (for sub navigation within a screen).
 *
 * ## Usability Guidelines
 * - The selected Tab should be visually differentiated from the other Tabs. The deselected Tabs should still look enabled. Dimming the other Tabs decreases the legibility of items that are actually active and clickable.
 * - There must be a minimum of 2 Tabs.
 * - Showing status in a Tab is non-standard (such as 0%, 10%).
 * - Tab labels and content should be parallel, with the exception of a Summary or Overview Tab which can be a rollup of content across other Tabs.
 * - Keep the font size of the Tabs the same. If the Tabs are a fixed width and one of the labels is too long, don't resize the text to fit and consider wrapping text to a second line.
 * - If possible, don't truncate text because it makes it harder to understand what's in the Tab.
 * - Try not to use more than six Tabs to keep the UI uncluttered.
 * - Do not stack Tabs on top of each other, and do not nest Tabs within Tabs. Find alternate ways of navigating page hierarchy.
 *
 * @slot default - Default, unnamed slot container for each `Cre8-tab` button
 * @slot panel - Container for each `Cre8-tab-panel` content item
 */

export const Cre8Tabs = createComponent({
    react: React,
    tagName: 'Cre8-tabs',
    elementClass: Cre8TabsElement,
    events: {
        onTabChange: 'tabChange' as EventName<Cre8DomEvent<Cre8TabsElement>>,
    },
});
