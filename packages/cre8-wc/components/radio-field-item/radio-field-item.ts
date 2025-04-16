import { html, unsafeCSS } from 'lit';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { property, query } from 'lit/decorators.js';
import { nanoid } from 'nanoid';
import { Cre8FormElement } from '../cre8-form-element';
import '../field-note/field-note';
import styles from './radio-field-item.scss';

    /**
     * A Radio Field Item adds a radio button to a Radio Field. Radio buttons let a user choose only one of several
     * options. Do not use a single radio button, because once selected, it cannot be de-selected. If the user can only
     * choose one, none or many options, use Checkbox instead.
     */

export class Cre8RadioFieldItem extends Cre8FormElement {
    type = 'radio';

    static get styles() {
        return unsafeCSS(styles.toString());
    }

    /**
     * Identifies the element that provides a detailed, extended description for the object.
     *
     * @attr{string}
     */
    @property()
        ariaDescribedBy?: string;

    /**
     * A Boolean attribute which, if present, sets the radio button as selected.
     *
     * @attr {boolean}
     */
    @property({ type: Boolean, reflect: true })
        checked?: boolean;

    /**
     * The Boolean disabled attribute, when present, makes the element not mutable, focusable, or even submitted with
     * the form. The user can neither edit nor focus on the control, nor its form control descendants.
     *
     * @attr {boolean}
     */
    @property({ type: Boolean, reflect: true })
        disabled?: boolean;

    /**
     * Get the radio field item input
     */
    @query('input')
        field!: HTMLInputElement;

    /**
     * The fieldId attribute is assigned to the HTML input element of the radio button and the for attribute of the
     * corresponding label.
     */
    @property()
        fieldId?: string;

    /**
     * A FieldNote can be placed to provide guidance. It's frequently used to in the context of form fields for extra
     * information or validation messages.
     */
    @property()
        fieldNote?: string;

    /**
     * Sets the item fieldnote icon.
     *
     * - **check** renders a badge with success state treatment
     * - **error** renders a badge with error state treatment
     */
    @property()
        fieldNoteIconName?: string;

    /**
     * Radio item fieldnote knockout
     *
     * @attr {boolean}
     */
    @property({ type: Boolean, reflect: true })
        fieldNoteKnockout?: boolean;

    /**
     * Sets the error state of the fieldnote.
     *
     * @attr {boolean}
     */
    @property({ type: Boolean, reflect: true })
        fieldNoteIsError?: boolean;

    /**
     * The isError attribute is used to indicate an error state related to the radio button.
     *
     * @attr {boolean}
     */
    @property({ type: Boolean, reflect: true })
        isError?: boolean;

    /**
     * The isSuccess attribute is used to indicate a success state related to the radio button.
     *
     * @attr {boolean}
     */
    @property({ type: Boolean, reflect: true })
        isSuccess?: boolean;

    /**
     * The label attribute is used to assign a value to the label element corresponding to this radio button.
     */
    @property()
        label?: string;

    /**
     * The name attribute is used to assign a value to the name attribute of the input element in the DOM.
     */
    @property()
        name?: string;

    /**
     * Required attribute
     *
     * @attr {boolean}
     */
    @property({ type: Boolean, reflect: true })
        required?: boolean;

    /**
     * Initial checked for initial checked state
     */
    private initialChecked?: boolean;

    /**
     * Connected callback lifecycle
     * 1) Set the initial checked value to the checked property
     * 2) Auto-generate the fieldId if a user doesn't provided so that the form field is accessible
     * 3) If a field note exists, set the aria-describedby attribute to make sure the field note is read out
     */
    connectedCallback() {
        super.connectedCallback();
        this.fieldId = this.fieldId || nanoid(); /* 2 */
        if (this.fieldNote) {
            this.ariaDescribedBy = this.ariaDescribedBy || nanoid(); /* 3 */
        }
    }

    /**
     * Reset the radio field
     */
    public resetField() {
        this.internals.setFormValue(null);
    }

    /**
     * Reset the radio field items tab indeces
     */
    resetTabIndeces(radioFieldItems: Cre8RadioFieldItem[]) {
        radioFieldItems.forEach((element: HTMLElement) => {
            element.shadowRoot.querySelector('.cre8-c-radio-field-item__input').setAttribute('tabindex', '0');
        });
    }

    /**
     * Remove checked
     * 1) Remove checked property from all items and set tabindex to -1
     * 2) Reset the form field to not checked
     */
    removeChecked() {
        if (this.parentNode) {
        /* 1 */
            const radioFieldItems = this.parentNode.querySelectorAll('cre8-radio-field-item');
            radioFieldItems.forEach((element: Cre8RadioFieldItem) => {
                element.checked = false;
                element.shadowRoot.querySelector('.cre8-c-radio-field-item__input').setAttribute('tabindex', '-1');
                element.resetField(); /* 2 */
            });
        }
    }

    /**
     * Reset form callback
     * 1) Remove the checked state from all radio elements
     * 2) Set the checked state to the initial checked state
     * 3) Set the radio field input checked attribute to the initial checked state
     */
    formResetCallback(): void {
        this.removeChecked();
        this.checked = this.initialChecked;
        this.field.checked = this.initialChecked;
    }

    /**
     * access role when radio-field-item embedded in radio-field
     */
    private _getRole() {
        const radioFieldContainer = this.closest('cre8-radio-field');
        if (radioFieldContainer) {
            return 'listitem';
        }
        return '';
    }

    /**
     * Toggle active state of primary nav item
     * 1) Remove isActive state from all sibling elements
     * 2) Toggle active state of element selected
     */
    private _clickHandler() {
        this.removeChecked();
        this.checked = !this.checked; /* 2 */
        const radioInput = this.shadowRoot?.querySelector<HTMLInputElement>('.cre8-c-radio-field-item__input');
        if (radioInput) {
            radioInput.setAttribute('tabindex', '0');
        }
        return this.checked ? this.internals.setFormValue(this.value || 'on') : this.internals.setFormValue(null);
    }

    /**
     * Handle sibling element updates during handleKeyDown function
     * 1) Prevent default keyboard functionality to disable scroll with up/down keys
     * 2) Trigger removeChecked
     * 3) Focus sibling shadowRoot element
     * 4) Click sibling shadowRoot element
     * 5) Set sibling element `tabindex` to `0`
     * 6) Set sibling element `checked` value
     */
    private _updateSibling(event: KeyboardEvent, sibling: Element, element: HTMLElement) {
        event.preventDefault();
        this.removeChecked();
        element.focus();
        element.click();
        element.setAttribute('tabindex', '0');
        sibling.setAttribute('checked', '');
    }

    /**
     * Handle keydown
     * 1) If left or up arrow key is struck and radio field item exists before current item,
     *    remove checked from all items and add it to the next item
     * 2) If right or down arrow key is struck and radio field item exists after current item,
     *    remove checked from all items and add checked to the next item. Focus on this item
     *    and set tabindex for when focusing out of radio field and back onto checked item.
     * 3) If the element is in focused, then for event emission the current
     *    focues element should be clicked to emit event.
     * 4) If the Tab key is pressed, and none of the items are checked
     *    then jump away from field set to the next tabbable item
     */
    handleKeyDown(e: KeyboardEvent) {
        if (e.code === 'ArrowLeft' || e.code === 'ArrowUp') {
        /* 1 */
            const previous = this.previousElementSibling;
            const previousElement = previous?.shadowRoot?.querySelector<HTMLInputElement>(
                '.cre8-c-radio-field-item__input:not([disabled])'
            );

            if (previousElement) {
                this._updateSibling(e, previous, previousElement);
            }
        } else if (e.code === 'ArrowRight' || e.code === 'ArrowDown') {
        /* 2 */
            const next = this.nextElementSibling;
            const nextElement = next?.shadowRoot?.querySelector<HTMLInputElement>(
                '.cre8-c-radio-field-item__input:not([disabled])'
            );
            if (nextElement) {
                this._updateSibling(e, next, nextElement);
            }
        } else if (e.code === 'Tab' && !this.checked) {
            const radioFieldItems = this.parentNode.querySelectorAll('cre8-radio-field-item');
            radioFieldItems.forEach((element: HTMLElement) => {
                element.shadowRoot.querySelector('.cre8-c-radio-field-item__input').setAttribute('tabindex', '-1');
            });

        // After making tabbing away from the feildset,
        // reset the items to be tabbable again so the user can come back to the fieldset
            setTimeout(this.resetTabIndeces, 100, radioFieldItems);
        }
    }

    render() {
        const componentClassNames = this.componentClassNames('cre8-c-radio-field-item', {
            'cre8-c-radio-field-item--error': this.isError,
            'cre8-c-radio-field-item--success': this.isSuccess,
            'cre8-c-radio-field-item--disabled': this.disabled,
        });

        const isChecked = this.checked === true || this.initialChecked === true;

        return html`
        <div role=${ifDefined(this._getRole())} class="${componentClassNames}" @keydown=${this.handleKeyDown}>
            <input
            class="cre8-c-radio-field-item__input"
            type="radio"
            @input=${this._clickHandler}
            id=${this.fieldId}
            aria-describedby="${ifDefined(this.ariaDescribedBy)}"
            required=${ifDefined(this.required)}
            aria-invalid=${this.required ? !!this.isError : ifDefined(this.isError)}
            name=${this.name}
            .value=${this.value}
            disabled="${ifDefined(this.disabled)}"
            .checked="${isChecked}"
            />
            <span class="cre8-c-radio-field-item__custom-radio">
            <div class="cre8-c-radio-field-item__inner-circle"></div>
            </span>
            <label class="cre8-c-radio-field-item__label" for=${this.fieldId}>${this.label}</label>
    </div>
        ${this.fieldNote
        ? html`<cre8-field-note
                ?inverted=${this.fieldNoteKnockout}
                id=${ifDefined(this.ariaDescribedBy)}
                iconName=${ifDefined(this.fieldNoteIconName)}
                ?isSuccess=${this.isSuccess}
                ?isError=${this.isError}
            >
                ${this.fieldNote}
            </cre8-field-note>`
        : ''}
        `;
    }
}

if (customElements.get('cre8-radio-field-item') === undefined) {
    customElements.define('cre8-radio-field-item', Cre8RadioFieldItem);
}

declare global {
    interface HTMLElementTagNameMap {
        'cre8-radio-field-item': Cre8RadioFieldItem;
    }
}

export default Cre8RadioFieldItem;
