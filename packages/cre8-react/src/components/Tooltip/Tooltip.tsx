import React from 'react';
import { createComponent, EventName } from '@lit/react';
import { Cre8Tooltip as Cre8TooltipElement } from '@cre8_dev/cre8-wc/lib/components/tooltip/tooltip';
import { Cre8DomEvent } from '../../util/Cre8DomEvent';


/**
 * The purpose of tooltips is to provide a tip or hint about what a tool, icon, link, or other interaction does.
 * If you need to present a call to action with perhaps a button for the user to click, then use
 * [Popover](/docs/Cre8-components-popover--docs) instead.
 *
 * ##Tooltip Styles
 * There are 4 alignment options for Tooltips: Top, Bottom, Right, and Left. Default placement is Bottom, below the
 * element it is describing. Top or Bottom alignment are the the preferred placement, particularly on screens that
 * have a more narrow viewport. Tooltips utilize Global styles and are not affected by brand themes.
 *
 * **With icon**
 * - **iconRotateDegree** & **iconFlipDirection** props are optional.
 * - They are used to set up the correct dirrection for icons, for example,
 * arrows, caret up or caret down.
 *
 * ##Usability Considerations
 * With the exception of icons - which should always have alt text at a minimum - the UI should never rely on
 * Tooltips for clarity, especially because they are not always discovered by the user. If the user cannot
 * intuitively understand the interface without Tooltips, the interface should be redesigned.
 *
 * ##How to use
 * - Use Tooltips to clarify the UI element the user is interacting with, not to add additional content on the page.
 * Also, do not simply restate content on the page, for example, the title of the field.
 * - Tooltips should be short and to the point. Example: "Click X to do X" or "Icon Description." If a succinct
 * description is not possible, the interaction element should be redesigned.
 * - In a mouse-driven UI, Tooltips are triggered on hover (mouseover) and dismissed (disappear) when the user mouses
 * away from the element. In touch UIs, a Tooltip is triggered by tapping and holding an item. The Tooltip is
 * displayed as long as the user continues to hold the element. Tap and hold is a more advanced user behavior, and
 * further reason for not relying on Tooltips. A novice user may never discover tap and hold for Tooltips.
 *
 * @slot default - Default, unnamed slot container for Tooltip text
 * @slot trigger - Named slot container for Tooltip element to trigger showing/hiding the Tooltip text
 */
export const Cre8Tooltip = createComponent({
    react: React,
    tagName: 'cre8-tooltip',
    elementClass: Cre8TooltipElement,
    events: {
        onOpen: 'open' as EventName<Cre8DomEvent<Cre8TooltipElement>>,
        onClose: 'close' as EventName<Cre8DomEvent<Cre8TooltipElement>>,
    },
});
