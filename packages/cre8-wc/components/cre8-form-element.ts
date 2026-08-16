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
     * True while a message set via `setCustomValidity` is in effect, so
     * `syncValidity` does not overwrite it with the field's constraint state.
     */
    protected hasCustomError = false;

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
     * Moves focus to the underlying field.
     *
     * Custom elements are not focusable by default, so without this calling
     * `focus()` on the host silently did nothing and focus stayed where it was.
     * Anything that needs to move focus to a control - such as a form focusing
     * its first invalid field - depends on this.
     */
    focus(options?: FocusOptions): void {
        if (this.field) {
            this.field.focus(options);
            return;
        }
        super.focus(options);
    }

    /**
     * Forwards the underlying field's constraint validity to ElementInternals.
     *
     * The inner field renders the constraint attributes (`required`, `pattern`,
     * `min`, `max`, ...), so the browser already computes a correct
     * ValidityState for it. Without this the host element's own
     * `checkValidity()` always returned true and `required` was effectively
     * ignored by any form containing it.
     *
     * A message set through `setCustomValidity` takes precedence and is left
     * untouched.
     */
    protected syncValidity(): void {
        if (!this._internals || !this.field || this.hasCustomError) {
            return;
        }

        const validity = this.field.validity;
        if (validity.valid) {
            this._internals.setValidity({});
            return;
        }

        // ValidityState exposes its flags on the prototype, so it cannot be
        // handed to setValidity() directly - copy them onto a plain object.
        const flags: ValidityStateFlags = {
            badInput: validity.badInput,
            customError: validity.customError,
            patternMismatch: validity.patternMismatch,
            rangeOverflow: validity.rangeOverflow,
            rangeUnderflow: validity.rangeUnderflow,
            stepMismatch: validity.stepMismatch,
            tooLong: validity.tooLong,
            tooShort: validity.tooShort,
            typeMismatch: validity.typeMismatch,
            valueMissing: validity.valueMissing,
        };

        // setValidity() throws when a control is invalid but the message is
        // empty, which happens in environments that do not localise one.
        this._internals.setValidity(
            flags,
            this.field.validationMessage || 'This field is invalid.',
            this.field
        );
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

        // Keep ElementInternals validity in step with the rendered field.
        this.syncValidity();
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
                this.hasCustomError = true;
                this._internals.setValidity({ customError: true }, message, this.field);
            } else {
                this.hasCustomError = false;
                // Fall back to the field's own constraint validity.
                this.syncValidity();
            }
        }
    }

    constructor() {
        super();
        this._internals = this.attachInternals() as unknown as Cre8ElementInternals;
    }
}

export default Cre8FormElement;
