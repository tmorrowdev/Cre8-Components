import { createComponent } from '@lit/react';
import { Cre8DangerButton as Cre8DangerButtonElement } from '@tmorrow/cre8-wc/lib/components/danger-button/danger-button';
import React from 'react';

export interface Cre8DangerButtonProps {
  /** Disabled attribute */
  disabled?: boolean | undefined;
  /** Full width button */
  fullWidth?: boolean | undefined;
  /** * Changes styling to an active state with a spinning icon. * Adds accessibility treatment by:   * announcing via voiceover when the loading success/error state via a aria-live region   * setting `aria-disabled` * Disables click events / form submitting while allowing focus (for accessibility) */
  loading?: boolean | undefined;
  /** * Variant of the loading button that:   * Removes loading spinner   * Informs the SR user that the loading status is now complete, with visually hidden text in the live area */
  loadingComplete?: boolean | undefined;
  /** The button text. Should be as short and simple as possible, ideally a maximum of 3 words. - Use Title Case for readability. - Should not include punctuation (exception: "Loading..."). - Should not be used as an indicator of what happens on the next page, or as a substitute for a progress meter. */
  text?: string;
  /** Style variant - **primary** renders the button used for primary actions. Presents highest visual priority.   When grouped with other buttons, only one primary is allowed - **secondary** renders a secondary button. Presents a lower visual priority - **tertiary** renders a tertiary button. Presents the lowest visual priority.   Should be used in limited amounts - consider if a link (`<a>`) would be more appropriate */
  variant?: any;
  /** Provide this property if you intend to use button styles for an anchor tag (`<a>`). This changes the component markup from `<button>` usage to `<a>` instead. */
  href?: string | undefined;
  /** Target attribute for a link if providing `href` to style a link as a button - **_blank** yields a link that opens in a new tab - **_self** yields a link that loads the URL into the same browsing context as the current one.   This is the default behavior - **_parent** yields a link that loads the URL into the parent browsing context of the current one.   If there is no parent, this behaves the same way as _self - **_top** yields a link that loads the URL into the top-level browsing context.   If there is no parent, this behaves the same way as _self. */
  target?: any;
  /** Type of button. - **button** (default) button has no default behavior and does nothing unless provided some sort of client-side trigger - **submit** button for submitting form data to a server */
  type?: any;
  /** Rel if this is an <a> element - this swaps <button> for <a> */
  rel?: string | undefined;
  /** SVG raw string if including an icon within a button. Must include the icon's position with `iconPostion`. This prop is used for <cre8-icon> */
  svg?: string | undefined;
  /** rotate is used for <cre8-icon> to set the arrow in the correct direction */
  iconRotateDegree?: number | undefined;
  /** flip is used for <cre8-icon> to set the icon in the correct direction */
  iconFlipDirection?: string | undefined;
  /** Icon position. Must include the name of the icon with `iconName`  - **before** places the icon before the button text - **after** places the icon after the button text */
  iconPosition?: any;
  /** Size variants add another way to increase or decrease visual priority of a button. - **sm** shrinks the button typography and overall size from the default. Use when vertical space is constrained. - **lg** increases the button typography and overall size from the default. */
  size?: any;
  /** Visually hide button text. Text is still accessible to assistive technology. Use this for icon-only buttons for accessibility */
  hideText?: boolean | undefined;
  /** Inverted colors Danger Button (onDark) */
  inverted?: boolean | undefined;
  /** Controls whether your loading status update to voiceover users will occur immediately (used for more urgently needed updates) using `assertive` or at the next convenient pause in their navigation using `polite`. */
  ariaLive?: any;
  /** Button aria expanded attribute */
  buttonAriaExpanded?: boolean | undefined;
}

/**
 * The size and state of buttons on the screen serve as visual cues for the user
 */
export const Cre8DangerButton = createComponent({
  react: React,
  tagName: 'cre8-danger-button',
  elementClass: Cre8DangerButtonElement,

});

export default Cre8DangerButton;
