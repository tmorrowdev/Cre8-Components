import { createComponent } from '@lit/react';
import { Cre8Button as Cre8ButtonElement } from '@cre8_dev/cre8-wc/lib/components/button/button';
import React from 'react';

/**
 * The size and state of buttons on the screen serve as visual cues for the user about what they can do and what they should do next. They indicate the availability and priority of the action on the page.
 *
 * - Buttons are a single call-to-action where a single click performs that action
 * - Use buttons when you are performing an action which is almost always on the same page
 * - Use a link instead of a button when you're navigating to another place
 *
 * ## How to Use
 *
 * Buttons are distinguished by three key properties:
 *
 * - **Visual Priority**: Style and size: Primary, Secondary, or Tertiary styles; each with large and small variations
 * - **State**: Interaction state: hover/click (press), focus, disabled, and submitting/loading (only for large buttons)
 * - **Brand**: Styles determined by the site or component theme
 *
 * ### Usage Guidelines
 *
 * Primary, Secondary and Tertiary styles emphasize or de-emphasize an action. They also define
 * background, font style, and border colors. Large and small sizing assists with visual priority by defining button
 * heights, left and right internal padding, and font-size.
 *
 * #### System Feedback
 * Each button has a default and hover/click (press) state that give the user feedback
 * that they have successfully interacted with a button.
 * Button presses should always be combined with other types of timely system feedback.
 * Examples of system feedback may be a page refresh, exposing additional controls or content,
 * dialogs, alerts and notifications.
 * If there is perceived a delay in system response, generally due to technical constraints,
 * provide a progress or loading indicator.
 *
 * #### Button Text
 *
 * - Button text should be as short and simple as possible, ideally a maximum of 3 words.
 * - Use Title Case for readability.
 * - They should not include punctuation (exception: "Loading...").
 * - They should not be used as an indicator of what happens on the next page, or as a substitute
 * for a progress meter.
 *
 * #### Button With Icon
 *
 * For button with icon:
 * - **iconRotateDegree** & **iconFlipDirection** props are optional.
 * - They are used to set up the correct dirrection for icons, for example,
 * arrows, caret up or caret down.
 *
 * #### Button Styling
 *
 * - DO use only the styles of the brand you are working on.
 * - DO NOT combine styles, even if the page is co-branded.
 *
 * #### Button Sizes
 * - DO always pair like sizes together and maintain the hierarchy of Primary and Secondary/Tertiary.
 * - DO NOT mix sizes of buttons when they are used together as a group.
 *
 * #### Input Pairing
 *
 * Primary and Secondary buttons may be paired with input fields.
 * Only one Primary button may appear on each screen.
 * Use the Secondary button when there are multiple in-context buttons
 * and/or when there is an emphasized page level button.
 * When used in a form context, the button's `type` needs to be `submit` to pass along form data.
 *
 * - DO use only large buttons with input fields.
 * - DO NOT use small buttons with input fields.
 *
 */

export const Cre8Button = createComponent({
    react: React,
    tagName: 'cre8-button',
    elementClass: Cre8ButtonElement,
});
