import classnames from 'classnames';
import { html, unsafeCSS, nothing } from 'lit';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import '../icon/icon';
import '../loading-spinner/loading-spinner';
import { property, query } from 'lit/decorators.js';
import styles from './danger-button.module';
import { Cre8FormElement } from '../cre8-form-element';

/**
     * The size and state of buttons on the screen serve as visual cues for the user
     * about what they can do and what they should do next.
     * They indicate the availability and priority of the action on the page.
     *
     * - Buttons are a single call-to-action where a single click performs that action
     * - Use Danger Buttons when you are performing an action that is potentially dangerous,
     * such as permanently deleting information
     * - Use a link instead of a button when you're navigating to another place
     *
     * ## How to Use
     *
     * Danger Buttons are distinguished by three key properties:
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

export class Cre8DangerButton extends Cre8FormElement {
    static styles = [styles];

    /**
     *
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
     * SVG raw string if including an icon within a button.
     * Must include the icon's position with `iconPostion`. This prop is used for <cre8-icon>
     */
    @property()
        svg?: string;

    /**
     * rotate is used for <cre8-icon> to set the arrow in the correct direction
     */
    @property({ type: Number })
        iconRotateDegree?: number = 0;

    /**
     * flip is used for <cre8-icon> to set the icon in the correct direction
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
     * - **sm** shrinks the button typography and overall size from the default. Use when vertical space is constrained.
     * - **lg** increases the button typography and overall size from the default.
     */
    @property()
        size?: 'sm' | 'lg';

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
     * Inverted colors Danger Button (onDark)
     */
    @property({ type: Boolean })
        inverted?: boolean;

    /**
     * Controls whether your loading status update to voiceover users will occur
     * immediately (used for more urgently needed updates) using `assertive` or at the next convenient
     * pause in their navigation using `polite`.
     */
    @property()
        ariaLive: 'polite' | 'assertive' = 'assertive';

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

    private renderDangerButtonLink(componentClassName: string) {
        return html`
          <a
              href="${ifDefined(this.href)}"
              class="${componentClassName}"
              rel="${ifDefined(this.rel)}"
              target="${ifDefined(this.target)}"
          >
            ${this.iconPosition === 'before'
        ? html`<cre8-icon width="16" height="16" aria-hidden="true" svg="${ifDefined(this.svg)}">
        </cre8-icon>`
        : nothing}
      <span
          class="${this.hideText ? 'cre8-u-is-vishidden cre8-c-danger-button__text' : 'cre8-c-danger-button__text'}"
      >
          ${this.text}
      </span>
      ${this.iconPosition === 'after'
        ? html`<cre8-icon width="16" height="16" aria-hidden="true" svg="${ifDefined(this.svg)}">
        </cre8-icon> `
        : nothing}
      </a>
        `;
    }

    private renderDangerButtonIconography() {
        return html`
        <cre8-icon width="16" height="16" aria-hidden="true" svg="${this.svg}"></cre8-icon>
      `;
    }

    private renderDangerButtonLoading() {
        return html`
          <span class="cre8-c-danger-button__icon" aria-live="${this.ariaLive}" role="alert">
              <span class="cre8-u-is-vishidden">${this.loadingComplete ? 'Loading Complete' : 'Loading'}</span>
              ${!this.loadingComplete
        ? html`
          <cre8-loading-spinner
              class="cre8-c-danger-button__loading-icon"
              inverted size="small"
              aria-hidden="true"
          ></cre8-loading-spinner>`
        : nothing}
              </span>`;
    }

    render() {
        const componentClassName = classnames('cre8-c-danger-button', {
            'cre8-c-danger-button--primary': this.variant === 'primary',
            'cre8-c-danger-button--secondary': this.variant === 'secondary',
            'cre8-c-danger-button--tertiary': this.variant === 'tertiary',
            'cre8-c-danger-button--full-width': this.fullWidth === true,
            'cre8-c-danger-button--sm': this.size === 'sm',
            'cre8-c-danger-button--lg': this.size === 'lg',
            'cre8-c-danger-button--icon-only': this.hideText,
            'cre8-c-danger-button--loading': this.loading,
            'cre8-c-danger-button--inverted': this.inverted,
        });

        if (this.hideText) {
            this.iconPosition = 'after';
        }

        if (this.href) {
            return html`${this.renderDangerButtonLink(componentClassName)}`;
        }

        return html`
          <button
            class="${componentClassName}"
            part="button"
            aria-disabled=${ifDefined(this.loading)}
            ?disabled=${this.disabled}
            @click="${this._buttonClick}"
            aria-expanded=${ifDefined(this.buttonAriaExpanded)}
            type=${this.type}
          >
            ${this.iconPosition === 'before' && this.svg
        ? this.renderDangerButtonIconography() : nothing
}
            <span
              class="${this.hideText ? 'cre8-u-is-vishidden cre8-c-danger-button__text' : 'cre8-c-danger-button__text'}"
            >
                ${this.text}
            </span>
            ${this.iconPosition === 'after' && this.svg
        ? this.renderDangerButtonIconography() : nothing
}
            ${this.loading || this.loadingComplete
        ? this.renderDangerButtonLoading() : nothing
}
          </button>`;
    }

    public _buttonClick(e: MouseEvent | KeyboardEvent) {
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

if (customElements.get('cre8-danger-button') === undefined) {
    customElements.define('cre8-danger-button', Cre8DangerButton);
}

declare global { interface HTMLElementTagNameMap { 'cre8-danger-button': Cre8DangerButton; } }

export default Cre8DangerButton;
