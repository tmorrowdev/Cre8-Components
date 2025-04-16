import svgCheck from '@Cre8/cre8-icons/lib/icons/System/Regular/Check.svg?raw';
import {
    LitElement, PropertyValues, html, unsafeCSS,
} from 'lit';
import { property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { nanoid } from 'nanoid';

import { Cre8FormElement } from '../cre8-form-element';
import '../icon/icon';

import styles from './select-tile.scss';
import { SelectTileRadioController } from './select-tile-radio-controller';
import { SelectTileCheckboxController } from './select-tile-checkbox-controller';

    /**
     * The Select Tile component is a short block of content inside a visual
     * container that can be used in place of checkboxes, radio buttons, and
     * links.  It allows you to add more descriptive and visually appealing
     * content for these actions while letting you compare different choices
     * either side-by-side or on top of each other.
     *
     * Typically you could use the "header" slot for an icon, and the "title"
     * and "body" slots for a content title and body text below it.
     *
     * The css parts are shown here wrapped in ::part() because otherwise Storybook
     * won't render them and the slots if they have the same name.
     * See https://developer.mozilla.org/en-US/docs/Web/CSS/::part
     *
     * @fires change
     * @fires input
     * @slot "" - The default slot goes into the center, main part of the Select Tile.
     *         Consider using title and body instead.
     * @slot "header" - The top or left part of the Select Tile
     * @slot footer - The bottom or right part of the Select Tile
     * @slot title - The title part of the Select Tile, use with body slot and
     *               instead of the default slot for appropriate typography.
     * @slot "body" - The "body" part of the Select Tile, which appears under
     *                the title slot and receives apporpriate typography.
     *
     * @csspart ::part(select-tile) - The main wrapping element
     * @csspart ::part(header) - The header element wrapping the left or top element
     * @csspart ::part(footer) - The footer element wrapping the right element
     * @csspart ::part(body) - The main body of the select-tile, wrapper around the default slot
     * @csspart ::part(body-title) - The element that wraps the "title" slot
     * @csspart ::part(body-body) - The element that wraps the "body" slot
     *
    */
export class Cre8SelectTile extends Cre8FormElement {
    static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

    private _controller: SelectTileRadioController | SelectTileCheckboxController | undefined = undefined;

    /**
     * Should this Select Tile behave as a radio button or a checkbox?
     */
    @property({ reflect: true })
        type: 'radio' | 'checkbox' = 'radio';

    /**
     * Get the radio field item input
     */
    @query('input')
        field!: HTMLInputElement;

    static get styles() {
        return unsafeCSS(styles);
    }

    /**
     * Style variants
     * - **bare** renders a select-tile without a border and without padding around the content
     * - **horizontal** renders a select-tile with header, body, footer oriented in a row rather than a column
     * - **horizontal-bare** renders a select-tile with header, body, footer
     *   oriented in a row rather than a column without a border and without padding around the content
     */
    @property({ reflect: true })
        variant?: 'bare' | 'horizontal' | 'horizontal-bare';

    /**
     * Which breakpoint, if any, to switch to verticial.
     * Only useful for horizontal variants. Defaults to 'sm'.
     */
    @property({ reflect: true })
        variantBreakToVertical: 'sm' | 'sm-2' | 'md' | 'lg' | 'xl' | 'xxl' | 'none' = 'sm';

    /**
     * Where does the checkmark or radio button go?
     * It disappears on 'none'. Only top-right is supported for vertical variants.
     */
    @property({ reflect: true })
        checkPosition: 'left' | 'right' | 'top-right' | 'none' = 'right';

    /**
     * In radio mode, whether to use the circle with the dot, or the rounded check.
     */
    @property({ reflect: true })
        radioVariant: 'dot' | 'check' = 'dot';

    /**
     * Align variants
     * <cre8-text-passage size="sm">
     * <ul>
     * <li>**center** renders a select-tile that has center aligned content/text</li>
     * </ul>
     * </cre8-text-passage>
     */
    @property({ reflect: true })
        align?: 'center';

    /**
     * Error State
     */
    @property({ type: Boolean, reflect: true })
        isError?: boolean;

    /**
     * Disabled State
     */
    @property({ type: Boolean, reflect: true })
        disabled?: boolean;

    /**
     * Required attribute
     */
    @property({ type: Boolean, reflect: true })
        required?: boolean;

    /**
     * Checked State.
     * Note: the `checked` attribute sets the `defaultChecked` property, as well
     * as sets the initial value for the `checked` property.
     */
    @property({ type: Boolean, reflect: true })
        checked?: boolean;

    /**
     * The default checked state when the element first renders or is reset.
     *
     * Note: the attribute is named `checked` and the property is
     * named `defaultChecked`. This is the same as a regular radio button.
     */
    @property({ attribute: 'checked', type: Boolean, reflect: true })
        defaultChecked: boolean;

    /**
     * Select Tile FieldId
     */
    @property()
        fieldId?: string;

    /**
     * Name of the form control.
     */
    @property({ reflect: true })
        name?: string;

    /**
     * Radio item fieldnote aria describe by
     */
    @property()
    private ariaDescribedBy?: string;

    /**
     * Radio item fieldnote isSuccess
     */
    @property({ type: Boolean, reflect: true })
        isSuccess?: boolean;

    /**
     * The form associated with this field
     *
     * TOOD: maybe this goes on Cre8FormElement
     */
    get form() {
        return this.internals.form;
    }

    /**
     * Connected callback lifecycle
     * 1) Auto-generate the fieldId if a user doesn't provided so that the form field is accessible
     * 2) Initialize the correct controller
     */
    connectedCallback() {
        super.connectedCallback();
        this.fieldId = this.fieldId || nanoid(); /* 1 */
        this._controller = this.type === 'radio'
            ? new SelectTileRadioController(this)
            : new SelectTileCheckboxController(this);
        if (this.disabled) {
            this.internals.ariaDisabled = 'true';
        }
    }

    /**
     * Reset form callback
     * 1) Remove the checked state from all radio elements
     * 2) Set the checked state to the initial checked state
     * 3) Set the radio field input checked attribute to the initial checked state
     */
    formResetCallback(): void {
        this.checked = this.defaultChecked;
        this.field.checked = this.defaultChecked;
    }


    /**
     * Whenever the "checked" property changes, update our form value, aria-checked,
     * and the checked property of `this.field`.
     *
     */
    updated(changedProps: PropertyValues) {
        super.updated(changedProps);

        if (changedProps.has('checked')) {
            // this.field.checked = this.checked;
            // this.field.checked ? this.internals.setFormValue(this.value || 'on') : this.internals.setFormValue(null);
            this.setAttribute('aria-checked', this.checked ? 'true' : 'false');
        }
        if (changedProps.has('type')) {
            this._controller.hostDisconnected();
            this._controller = this.type === 'radio'
                ? new SelectTileRadioController(this)
                : new SelectTileCheckboxController(this);
        }
        if (changedProps.has('disabled')) {
            if (this.disabled) {
                this.internals.ariaDisabled = 'true';
            } else {
                this.internals.ariaDisabled = 'false';
            }
        }
    }


    renderInput() {
        return html`
        <input
            class="cre8-c-select-tile__input"
            type=${this.type}
            id=${this.fieldId}
            aria-describedby="${ifDefined(this.ariaDescribedBy)}"
            required=${ifDefined(this.required)}
            name=${this.name}
            .value=${this.value}
            disabled="${ifDefined(this.disabled)}"
            .checked="${this.checked}"
        />
        `;
    }

    renderCheckboxIcon() {
        if (this.type === 'checkbox') {
            return html`
            <cre8-icon svg="${svgCheck}" class="cre8-c-select-tile__icon" aria-hidden="${!this.checked}"></cre8-icon>
        `;
        }
        return null;
    }

    render() {
        const componentClassNames = this.componentClassNames('cre8-c-select-tile', {
            'cre8-c-select-tile--bare': this.variant === 'bare',
            'cre8-c-select-tile--horizontal': this.variant === 'horizontal',
            'cre8-c-select-tile--horizontal-bare': this.variant === 'horizontal-bare',
            'cre8-c-select-tile--vertical-at-sm': this.variantBreakToVertical === 'sm',
            'cre8-c-select-tile--vertical-at-sm-2': this.variantBreakToVertical === 'sm-2',
            'cre8-c-select-tile--vertical-at-md': this.variantBreakToVertical === 'md',
            'cre8-c-select-tile--vertical-at-lg': this.variantBreakToVertical === 'lg',
            'cre8-c-select-tile--vertical-at-xl': this.variantBreakToVertical === 'xl',
            'cre8-c-select-tile--vertical-at-xxl': this.variantBreakToVertical === 'xxl',
            'cre8-c-select-tile--align-center': this.align === 'center',
            'cre8-c-select-tile--error': this.isError,
            'cre8-c-select-tile--success': this.isSuccess,
            'cre8-c-select-tile--disabled': this.disabled,
        });

        const checkboxClassNames = this.componentClassNames(
            this.type === 'radio' ? 'cre8-c-select-tile__custom-radio' : 'cre8-c-select-tile__custom-checkbox',
            {
                'cre8-c-select-tile__custom-radio-top-right': !this.variant
                    || this.variant === 'bare' || this.checkPosition === 'top-right',
                'cre8-c-select-tile__custom-radio-left': this.checkPosition === 'left',
                'cre8-c-select-tile__custom-radio-none': this.checkPosition === 'none',
                'cre8-c-select-tile__custom-radio-check': this.radioVariant === 'check',
            }
        );

        const labelTabIndex = this.disabled ? undefined : '0';

        return html`
        ${this.renderInput()}
        <label class="${componentClassNames}" part="select-tile" for=${this.fieldId} tabindex=${labelTabIndex}>
            ${this.slotNotEmpty('header') && html`
                <div class="cre8-c-select-tile__header" part="header">
                    <slot name="header"></slot>
                </div>
            `}
            <div part="body" class="cre8-c-select-tile__body">
                <slot></slot>
                ${this.slotNotEmpty('title') && html`
                    <div part="body-title" class="cre8-c-select-tile__body_title">
                        <slot name="title"></slot>
                    </div>
                `}
                ${this.slotNotEmpty('body') && html`
                    <div part="body-body" class="cre8-c-select-tile__body_body">
                        <slot name="body"></slot>
                    </div>
                `}
            </div>
            <div part="footer" class="cre8-c-select-tile__footer">
                <slot name="footer"></slot>
            </div>
            <div class="${checkboxClassNames}">
                ${this.renderCheckboxIcon()}
                <div class="cre8-c-select-tile__inner-circle">
                    <cre8-icon svg="${svgCheck}" class="cre8-c-select-tile__icon"></cre8-icon>
                </div>
            </div>
        </label>`;
    }
}

if (customElements.get('cre8-select-tile') === undefined) {
    customElements.define('cre8-select-tile', Cre8SelectTile);
}

declare global {
    interface HTMLElementTagNameMap {
        'cre8-select-tile': Cre8SelectTile;
    }
}

export default Cre8SelectTile;
