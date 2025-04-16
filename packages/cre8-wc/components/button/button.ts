import { html, nothing, unsafeCSS } from 'lit';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { property, query } from 'lit/decorators.js';
import { Cre8FormElement } from '../cre8-form-element';
import '../icon/icon';
import '../loading-spinner/loading-spinner';
import styles from './button.scss';

    /**
     * The size and state of buttons on the screen serve as visual cues for the user
     * about what they can do and what they should do next.
     * They indicate the availability and priority of the action on the page.
     *
     * - Buttons are a single call-to-action where a single click performs that action
     * - Use buttons when you are performing an action which is almost always on the same page
     * - Use a link instead of a button when you're navigating to another place
     *
     * ## How to Use
     *
     * Buttons are distinguished by three key properties:
     *
     * - **Visual Priority**: Style and size: Primary, Secondary, or Tertiary styles;
     *   each with large and small variations
     * - **State**: Interaction state: hover/click (press), focus, disabled,
     *   and submitting/loading (only for large buttons)
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
     * - They are used to set up the correct direction for icons, for example,
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

export class Cre8Button extends Cre8FormElement {
    static get styles() {
        return unsafeCSS(styles);
    }

    /**
     * The button text. Should be as short and simple as possible, ideally a maximum of 3 words.
     * - Use Title Case for readability.
     * - Should not include punctuation (exception: "Loading...").
     * - Should not be used as an indicator of what happens on the next page, or as a substitute for a progress meter.
     */
    @property()
        text? = 'Button';

    /**
     * Style variant
     * - **primary** renders the button used for primary actions. Presents highest visual priority.
     *   When grouped with other buttons, only one primary is allowed
     * - **secondary** renders a secondary button. Presents a lower visual priority
     * - **tertiary** renders a tertiary button. Presents the lowest visual priority.
     *   Should be used in limited amounts - consider if a link (`<a>`) would be more appropriate
     */
    @property({ type: String })
        variant?: 'primary' | 'secondary' | 'tertiary' = 'primary';

    /**
     * Disabled attribute
     * @attr {boolean}
     *
     * **NOTE**: Disabled states are used to indicate that an action is temporarily unavailable.
     * In general, using disabled states is NOT advised. It should be clear to the user what actions they must
     * take to activate the button. Real-time, field-level validation can help provide clarity.
     */
    @property({ type: Boolean, reflect: true })
        disabled?: boolean;

    /**
     * This property is for a neutral button propery mainly used for the secondary or tertiary button variant.
     * @attr {boolean)
     */
    @property({ type: Boolean, reflect: true })
        neutral?: boolean;

    /**
    * Inverse attribute
    * @attr {boolean}
    *
    * The inverse prop allows the button to work on either a light or dark surface.
    */
    @property({ type: Boolean, reflect: true })
        inverse?: boolean;

    /**
     *
     * Provide this property if you intend to use button styles for an anchor tag (`<a>`).
     * This changes the component markup from `<button>` usage to `<a>` instead.
     */
    @property()
        href?: string;

    /**
     * Target attribute for a link if providing `href` to style a link as a button
     * - **_blank** yields a link that opens in a new tab
     * - **_self** yields a link that loads the URL into the same browsing context as the current one.
     *   This is the default behavior
     * - **_parent** yields a link that loads the URL into the parent browsing context of the current one.
     *   If there is no parent, this behaves the same way as _self
     * - **_top** yields a link that loads the URL into the top-level browsing context.
     *   If there is no parent, this behaves the same way as _self.
     */
    @property()
        target?: '_blank' | '_self' | '_parent' | '_top';

    /**
     * Type of button.
     * - **button** (default) button has no default behavior and does nothing unless provided some sort
     * of client-side trigger
     * - **submit** button for submitting form data to a server
     */
    @property()
        type: 'button' | 'submit' | 'reset' = 'button';

    /**
     * Rel if this is an <a> element - this swaps <button> for <a>
     */
    @property()
        rel?: string;

    /**
     * Deprecated: iconName, use svg instead
     * Icon name if including an icon within a button.
     * Must include the icon's position with `iconPostion`. This prop is used for <cre8-icon-legacy>
     * @deprecated
     */
    @property()
        iconName?: string;

    /**
     * svg as a raw string
     * - For button with icon, the icon is defined by this prop.
     * - Pass in a raw svg as a String for using <cre8-icon>
     * - Must include the icon's position with `iconPostion`.
     */
    @property()
        svg?: string;

    /**
     * iconRotateDegree is used for <cre8-icon> to set the arrow in the correct direction
     */
    @property({ type: Number })
        iconRotateDegree?: number = 0;

    /**
     * iconFlipDirection is used for <cre8-icon> to set the icon in the correct direction
     */
    @property()
        iconFlipDirection?: string;

    /**
     * Icon position. Must include the name of the icon with `iconName`
     *
     * - **before** places the icon before the button text
     * - **after** places the icon after the button text
     */
    @property()
        iconPosition?: 'before' | 'after' = undefined;

    /**
     * Size variants add another way to increase or decrease visual priority of a button.
     * - **sm** Shrinks the button typography and overall size from the default. Use when vertical space is constrained.
     * - **md** This is the default value for the size.
     * - **lg** Increases the button typography and overall size from the default.
     */
    @property()
        size: 'sm' | 'md' | 'lg' = 'md';

    /**
     * Visually hide button text. Text is still accessible to assistive technology.
     * Use this for icon-only buttons for accessibility
     */
    @property({ type: Boolean, reflect: true })
        hideText?: boolean;

    /**
     * Full width button
     * @attr {boolean}
     *
     */
    @property({ type: Boolean, reflect: true })
        fullWidth?: boolean;

    /**
     * * Changes styling to an active state with a spinning icon.
     * * Adds accessibility treatment by:
     *   * announcing via voiceover when the loading success/error state via a aria-live region
     *   * setting `aria-disabled`
     * * Disables click events / form submitting while allowing focus (for accessibility)
     * @attr {boolean}
     *
     */
    @property({ type: Boolean, reflect: true })
        loading?: boolean;

    /**
     * * Variant of the loading button that:
     *   * Removes loading spinner
     *   * Informs the SR user that the loading status is now complete, with visually hidden text in the live area
     * @attr {boolean}
     *
     */
    @property({ type: Boolean, reflect: true })
        loadingComplete?: boolean;

    /**
     * Controls whether your loading status update to voiceover users will occur
     * immediately (used for more urgently needed updates) using `assertive` or at the next convenient
     * pause in their navigation using `polite`.
     */
    @property()
        ariaLive: 'polite' | 'assertive' = 'assertive';

    /**
     * These two subvariants of the split button style the two seperate buttons to style as a singular button
     */
    @property()
        splitButtonType?: 'text' | 'caret';

    /**
     * Button aria expanded attribute
     */
    @property({ type: Boolean, reflect: true })
        buttonAriaExpanded?: boolean;

    @query('button')
        field!: HTMLButtonElement;

    formSubmit() {
        const form = this.internals.form;
        if (form) {
            form.requestSubmit();
        }
    }

    formReset() {
        const form = this.internals.form;
        if (form) {
            form.reset();
        }
    }

    private generateIconBefore() {
        if (this.iconPosition === 'before') {
            if (this.iconName) {
                return html`<cre8-icon-legacy slot="before" aria-hidden="true" name="${ifDefined(this.iconName)}">
                </cre8-icon-legacy>`;
            }
            if (this.svg) {
                return html`<cre8-icon slot="before" aria-hidden="true"
                svg='${this.svg}' rotate="${Number(this.iconRotateDegree)}" flip="${this.iconFlipDirection}">
                </cre8-icon>`;
            }
        }
        return nothing;
    }

    private generateIconAfter() {
        if (this.iconPosition === 'after') {
            if (this.iconName) {
                return html`<cre8-icon-legacy slot="after" aria-hidden="true" name="${ifDefined(this.iconName)}">
                </cre8-icon-legacy>`;
            }
            if (this.svg) {
                return html`<cre8-icon slot="after" aria-hidden="true"
                svg='${this.svg}' rotate="${Number(this.iconRotateDegree)}" flip="${this.iconFlipDirection}">
                </cre8-icon>`;
            }
        }
        return nothing;
    }

    // TODO: Temporarily keep eslint complexity as warning. Update during specific story for this rule.
    /* eslint complexity: ["warn", 10] */
    render() {
        const componentClassName = this.componentClassNames('cre8-c-button', {
            'cre8-c-button--primary': this.variant === 'primary',
            'cre8-c-button--secondary': this.variant === 'secondary',
            'cre8-c-button--tertiary': this.variant === 'tertiary',
            'cre8-c-button--full-width': this.fullWidth === true,
            'cre8-c-button--sm': this.size === 'sm',
            'cre8-c-button--lg': this.size === 'lg',
            'cre8-c-button--icon-only': this.hideText,
            'cre8-c-button--split-button-text': this.splitButtonType === 'text',
            'cre8-c-button--split-button-caret': this.splitButtonType === 'caret',
            'cre8-c-button--neutral': this.neutral,
            'cre8-c-button--inverse': this.inverse,
            'cre8-c-button--loading': this.loading,
        });

        if (this.hideText) {
            this.iconPosition = 'after';
        }

        if (this.href) {
            return html`
            <a
                href="${ifDefined(this.href)}"
                class="${componentClassName}"
                rel="${ifDefined(this.rel)}"
                target="${ifDefined(this.target)}"
            >
            ${this.generateIconBefore()}
            <span
                class="${this.hideText ? 'cre8-u-is-vishidden cre8-c-button__text' : 'cre8-c-button__text'}"
            >
                ${this.text}
            </span>
            ${this.generateIconAfter()}
            </a>
        `;
        }
        return html` <button
            class="${componentClassName}"
            part="button"
            aria-disabled=${ifDefined(this.loading)}
            ?disabled=${this.disabled}
            @click="${this._buttonClick}"
            aria-expanded=${ifDefined(this.buttonAriaExpanded)}
        >
            <slot name="before"></slot>
            ${this.generateIconBefore()}
            <span
                class="${this.hideText ? 'cre8-u-is-vishidden cre8-c-button__text' : 'cre8-c-button__text'}"
            >
                ${this.text}
            </span>
            ${this.generateIconAfter()}
            <slot name="after"></slot>
            ${this.loading || this.loadingComplete
        ? html`<span class="cre8-c-button__icon" aria-live="${this.ariaLive}" role="alert">
                <span class="cre8-u-is-vishidden">${this.loadingComplete ? 'Loading Complete' : 'Loading'}</span>
                ${!this.loadingComplete
        ? html`
            <cre8-loading-spinner
                class="cre8-c-button__loading-icon"
                size="small"
                ?neutral=${this.neutral}
                ?inverse=${this.inverse}
                buttonVariant=${this.variant}
                aria-hidden="true"
            ></cre8-loading-spinner>`
        : nothing}
                </span>`
        : nothing}
        </button>`;
    }

    private _buttonClick(e: MouseEvent | KeyboardEvent) {
        if (this.loading) {
            e.stopPropagation();
        } else {
            switch (this.type) {
                case 'submit':
                    this.formSubmit();
                    break;
                case 'reset':
                    this.formReset();
                    break;
                // no default
            }
        }
    }
}

if (customElements.get('cre8-button') === undefined) {
    customElements.define('cre8-button', Cre8Button);
}

export default Cre8Button;
