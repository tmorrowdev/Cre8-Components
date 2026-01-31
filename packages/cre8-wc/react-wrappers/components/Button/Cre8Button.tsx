import { createComponent } from '@lit/react';
import { Cre8Button as Cre8ButtonElement } from '@tmorrow/cre8-wc/lib/components/button/button';
import React from 'react';

export interface Cre8ButtonProps {
  /** The button text. Should be as short and simple as possible, ideally a maximum of 3 words. - Use Title Case for readability. - Should not include punctuation (exception: "Loading..."). - Should not be used as an indicator of what happens on the next page, or as a substitute for a progress meter. */
  text?: string | undefined;
  /** Style variant - **primary** renders the button used for primary actions. Presents highest visual priority.   When grouped with other buttons, only one primary is allowed - **secondary** renders a secondary button. Presents a lower visual priority - **tertiary** renders a tertiary button. Presents the lowest visual priority.   Should be used in limited amounts - consider if a link (`<a>`) would be more appropriate */
  variant?: "primary" | "secondary" | "tertiary" | undefined;
  /** Disabled attribute */
  disabled?: boolean;
  /** This property is for a neutral button propery mainly used for the secondary or tertiary button variant. */
  neutral?: boolean | undefined;
  /** Inverse attribute */
  inverse?: boolean;
  /** Provide this property if you intend to use button styles for an anchor tag (`<a>`). This changes the component markup from `<button>` usage to `<a>` instead. */
  href?: string | undefined;
  /** Target attribute for a link if providing `href` to style a link as a button - **_blank** yields a link that opens in a new tab - **_self** yields a link that loads the URL into the same browsing context as the current one.   This is the default behavior - **_parent** yields a link that loads the URL into the parent browsing context of the current one.   If there is no parent, this behaves the same way as _self - **_top** yields a link that loads the URL into the top-level browsing context.   If there is no parent, this behaves the same way as _self. */
  target?: "_blank" | "_self" | "_parent" | "_top" | undefined;
  /** Rel if this is an <a> element - this swaps <button> for <a> */
  rel?: string | undefined;
  /** Deprecated: iconName, use svg instead Icon name if including an icon within a button. Must include the icon's position with `iconPostion`. This prop is used for <cre8-icon-legacy> */
  iconName?: string | undefined;
  /** svg as a raw string - For button with icon, the icon is defined by this prop. - Pass in a raw svg as a String for using <cre8-icon> - Must include the icon's position with `iconPostion`. */
  svg?: string | undefined;
  /** iconRotateDegree is used for <cre8-icon> to set the arrow in the correct direction */
  iconRotateDegree?: number | undefined;
  /** iconFlipDirection is used for <cre8-icon> to set the icon in the correct direction */
  iconFlipDirection?: string | undefined;
  /** Icon position. Must include the name of the icon with `iconName`  - **before** places the icon before the button text - **after** places the icon after the button text */
  iconPosition?: "before" | "after" | undefined;
  /** Size variants add another way to increase or decrease visual priority of a button. - **sm** Shrinks the button typography and overall size from the default. Use when vertical space is constrained. - **md** This is the default value for the size. - **lg** Increases the button typography and overall size from the default. */
  size?: "sm" | "lg" | "md";
  /** Visually hide button text. Text is still accessible to assistive technology. Use this for icon-only buttons for accessibility */
  hideText?: boolean | undefined;
  /** Full width button */
  fullWidth?: boolean;
  /** * Changes styling to an active state with a spinning icon. * Adds accessibility treatment by:   * announcing via voiceover when the loading success/error state via a aria-live region   * setting `aria-disabled` * Disables click events / form submitting while allowing focus (for accessibility) */
  loading?: boolean;
  /** * Variant of the loading button that:   * Removes loading spinner   * Informs the SR user that the loading status is now complete, with visually hidden text in the live area */
  loadingComplete?: boolean;
  /** Controls whether your loading status update to voiceover users will occur immediately (used for more urgently needed updates) using `assertive` or at the next convenient pause in their navigation using `polite`. */
  ariaLive?: "polite" | "assertive";
  /** These two subvariants of the split button style the two seperate buttons to style as a singular button */
  splitButtonType?: "text" | "caret" | undefined;
  /** Button aria expanded attribute */
  buttonAriaExpanded?: boolean | undefined;
  /** Type of button. - **button** (default) button has no default behavior and does nothing unless provided some sort of client-side trigger - **submit** button for submitting form data to a server */
  type?: "button" | "submit" | "reset";
  /** The value of the form field. */
  value?: string;
}

/**
 * The size and state of buttons on the screen serve as visual cues for the user
 */
export const Cre8Button = createComponent({
  react: React,
  tagName: 'cre8-button',
  elementClass: Cre8ButtonElement,

});

export default Cre8Button;
