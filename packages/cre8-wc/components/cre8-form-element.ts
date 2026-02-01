import { property } from 'lit/decorators.js';
import { provide } from '@lit/context';
import { Cre8Element } from './cre8-element';
import {
    formInternalsContext,
    formStateContext,
    type Cre8ElementInternals,
    type FormElementState
} from './contexts/form-internals-context';

export { type Cre8ElementInternals, type FormElementState } from './contexts/form-internals-context';

/**
 * Base class for form-associated custom elements.
 * Provides ElementInternals context to descendant components.
 */
export abstract class Cre8FormElement extends Cre8Element {
    /**
     * @internal
     * Tells the browser to treat the element like a form field.
     * Ties the element to the HTML form it is in.
     */
    static formAssociated = true;

    /**
     * The type of form control (text, checkbox, radio, etc.)
     */
    abstract type: string;

    /**
     * @protected
     * @internal
     * Stores the value for the `value` getter and setter.
     */
    protected internalValue: string = '';

    /**
     * The underlying HTML form field element.
     * Should be implemented with `@query` in extending classes.
     */
    protected field?: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | HTMLButtonElement;

    /**
     * @internal
     * Stores the initial value for form reset functionality
     */
    protected defaultValue: string | boolean = '';

    /**
     * Provides ElementInternals to descendant components via context.
     * Descendants can consume this to access form participation APIs.
     */
    @provide({ context: formInternalsContext })
    _internals: Cre8ElementInternals;

    /**
     * Provides form element state to descendants via context.
     * Useful for nested components that need to react to form state.
     */
    @provide({ context: formStateContext })
    _formState: FormElementState = {
        value: '',
        disabled: false,
        required: false,
        isError: false,
        isSuccess: false,
    };

    /**
     * The name of the form field
     */
    @property()
    name?: string;

    /**
     * Whether the field is disabled
     */
    @property({ type: Boolean, reflect: true })
    disabled?: boolean;

    /**
     * Whether the field is required
     */
    @property({ type: Boolean, reflect: true })
    required?: boolean;

    /**
     * Whether the field is in an error state
     */
    @property({ type: Boolean, reflect: true })
    isError?: boolean;

    /**
     * Whether the field is in a success state
     */
    @property({ type: Boolean, reflect: true })
    isSuccess?: boolean;

    /**
     * The value of the form field.
     */
    @property()
    get value(): string {
        return this.internalValue;
    }

    /**
     * Sets the value of the form field.
     * 1. Stores the new value so it can be retrieved by the getter.
     * 2. Sets the current value of the control via ElementInternals.
     * 3. Updates the actual field element.
     * 4. Updates the form state context.
     * 5. Triggers a re-render.
     */
    set value(newValue: string) {
        const oldValue = this.value;
        this.internalValue = newValue;

        // Update form value for non-checkbox/radio types
        if (this.type !== 'checkbox' && this.type !== 'radio') {
            this._internals?.setFormValue(newValue);
        }

        this.updateField();
        this.updateFormState();
        this.requestUpdate('value', oldValue);
    }

    /**
     * Updates the form state context for descendant consumption
     */
    protected updateFormState(): void {
        this._formState = {
            value: this.internalValue,
            disabled: this.disabled ?? false,
            required: this.required ?? false,
            isError: this.isError ?? false,
            isSuccess: this.isSuccess ?? false,
            name: this.name,
        };
    }

    /**
     * Updates the actual field element's value
     */
    protected updateField(): void {
        if (this.field && this.internalValue !== undefined) {
            this.field.value = this.internalValue ?? '';
        }
    }

    /**
     * Lifecycle hook called after first render
     */
    protected firstUpdated(): void {
        if (this.type !== 'checkbox' && this.type !== 'radio') {
            this.defaultValue = this.value || this.getAttribute('value') || '';
        }
        this.updateField();
        this.updateFormState();
    }

    /**
     * Called when properties change
     */
    protected updated(changedProperties: Map<PropertyKey, unknown>): void {
        super.updated(changedProperties);

        // Update form state context when relevant properties change
        if (
            changedProperties.has('disabled') ||
            changedProperties.has('required') ||
            changedProperties.has('isError') ||
            changedProperties.has('isSuccess') ||
            changedProperties.has('name')
        ) {
            this.updateFormState();
        }
    }

    /**
     * Form lifecycle callback - called when the form is reset
     */
    formResetCallback(): void {
        this.value = this.defaultValue as string;
        this.updateField();
    }

    /**
     * Form lifecycle callback - called when the element is disabled via fieldset
     */
    formDisabledCallback(disabled: boolean): void {
        this.disabled = disabled;
    }

    /**
     * Form lifecycle callback - called when form state is restored
     */
    formStateRestoreCallback(state: string | FormData | null, _mode: 'restore' | 'autocomplete'): void {
        if (typeof state === 'string') {
            this.value = state;
        }
    }

    /**
     * Gets the form associated with this element
     */
    get form(): HTMLFormElement | null {
        return this._internals?.form ?? null;
    }

    /**
     * Gets the validation message
     */
    get validationMessage(): string {
        return this._internals?.validationMessage ?? '';
    }

    /**
     * Gets the validity state
     */
    get validity(): ValidityState | undefined {
        return this._internals?.validity;
    }

    /**
     * Gets whether the element will be validated
     */
    get willValidate(): boolean {
        return this._internals?.willValidate ?? false;
    }

    /**
     * Checks validity and reports to the user
     */
    reportValidity(): boolean {
        return this._internals?.reportValidity() ?? true;
    }

    /**
     * Checks validity without reporting
     */
    checkValidity(): boolean {
        return this._internals?.checkValidity() ?? true;
    }

    /**
     * Sets a custom validity message
     */
    setCustomValidity(message: string): void {
        if (this._internals && this.field) {
            if (message) {
                this._internals.setValidity({ customError: true }, message, this.field);
            } else {
                this._internals.setValidity({});
            }
        }
    }

    constructor() {
        super();
        this._internals = this.attachInternals() as Cre8ElementInternals;
    }
}

export default Cre8FormElement;
