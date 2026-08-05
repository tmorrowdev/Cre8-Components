import { html, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import type { Cre8FormElement } from '../cre8-form-element';

/**
 * The form component groups form-associated Cre8 controls, aggregates their
 * validation on submit, and orchestrates submit and reset.
 *
 * # How to Use
 * 1. Place any Cre8 form controls inside `cre8-form`. They may be nested inside
 *    layout components such as `cre8-grid` or `cre8-layout`.
 * 2. Add a `cre8-button` with `type="submit"` to submit the form.
 * 3. Listen for `form-submit` to receive the collected `FormData`.
 *
 * Note: this component renders to light DOM. A form-associated control's form
 * owner is the nearest `<form>` in its own node tree, so a shadow-DOM `<form>`
 * would own nothing and `new FormData(form)` would come back empty.
 *
 * @slot The form's controls and layout.
 */
export class Cre8Form extends Cre8Element {
    /**
     * Skips aggregate validation on submit.
     */
    @property({ type: Boolean, reflect: true })
        novalidate?: boolean;

    /**
     * Disables every control in the form, for example while submitting.
     */
    @property({ type: Boolean, reflect: true })
        disabled?: boolean;

    private _form: HTMLFormElement | null = null;

    /** Renders to light DOM so child controls are owned by the form. */
    createRenderRoot() {
        return this;
    }

    /**
     * Renders nothing. The `<form>` and the author's controls are managed
     * imperatively in `_ensureForm` so that Lit never owns, and therefore never
     * clears, the light-DOM children.
     */
    render() {
        return html``;
    }

    connectedCallback() {
        super.connectedCallback();
        this._ensureForm();
    }

    protected updated(changed: PropertyValues) {
        super.updated(changed);
        if (changed.has('disabled')) {
            this.controls.forEach((control) => {
                control.disabled = this.disabled;
            });
        }
    }

    private _ensureForm() {
        if (this._form?.isConnected) {
            return;
        }

        const form = document.createElement('form');
        form.className = 'cre8-c-form';
        // We own the validation UX. Without this the browser blocks submission
        // on invalid controls and our submit handler never runs.
        form.noValidate = true;

        while (this.firstChild) {
            form.appendChild(this.firstChild);
        }

        this.appendChild(form);
        this._form = form;

        form.addEventListener('submit', this._onSubmit);
        form.addEventListener('reset', this._onReset);
    }

    /** The wrapped native form element. */
    get form(): HTMLFormElement | null {
        return this._form;
    }

    /**
     * Every form-associated Cre8 control owned by this form, in document order.
     * Reaches through layout components because slotting does not move nodes
     * out of the light-DOM tree.
     */
    get controls(): Cre8FormElement[] {
        if (!this._form) {
            return [];
        }
        return Array.from(this.querySelectorAll<HTMLElement>('*')).filter(
            (el) => (el as unknown as Cre8FormElement)._internals?.form === this._form
        ) as unknown as Cre8FormElement[];
    }

    /** The form's current values, derived from FormData. */
    get values(): Record<string, FormDataEntryValue | FormDataEntryValue[]> {
        const out: Record<string, FormDataEntryValue | FormDataEntryValue[]> = {};
        if (!this._form) {
            return out;
        }
        for (const [key, value] of new FormData(this._form).entries()) {
            const existing = out[key];
            if (existing === undefined) {
                out[key] = value;
            } else if (Array.isArray(existing)) {
                existing.push(value);
            } else {
                out[key] = [existing, value];
            }
        }
        return out;
    }

    private _onSubmit = (event: Event) => {
        // This component never performs a native navigation.
        event.preventDefault();

        if (!this.novalidate && !this._validate()) {
            return;
        }

        this.dispatchEvent(
            new CustomEvent('form-submit', {
                detail: {
                    data: new FormData(this._form!),
                    values: this.values,
                    form: this._form,
                },
                bubbles: true,
                composed: true,
            })
        );
    };

    private _onReset = () => {
        this.controls.forEach((control) => {
            control.isError = false;
        });
        this.dispatchEvent(
            new CustomEvent('form-reset', { bubbles: true, composed: true })
        );
    };

    /** Submits the form, running aggregate validation unless `novalidate`. */
    submit() {
        this._form?.requestSubmit();
    }

    /** Resets the form to its default values. */
    reset() {
        this._form?.reset();
    }

    /** True when every control is valid. Does not change error state. */
    checkValidity(): boolean {
        return this.controls.every((control) => control.checkValidity());
    }

    /**
     * Like `checkValidity`, but flags errors and focuses the first invalid
     * control.
     */
    reportValidity(): boolean {
        return this._validate();
    }

    /**
     * Checks every control, reflects the result onto their `isError` state,
     * focuses the first invalid one, and emits `form-invalid`.
     * Returns true when the form is valid.
     */
    private _validate(): boolean {
        const controls = this.controls;
        const invalid = controls.filter((control) => !control.checkValidity());

        controls.forEach((control) => {
            control.isError = invalid.includes(control);
        });

        if (invalid.length === 0) {
            return true;
        }

        (invalid[0] as unknown as HTMLElement).focus?.();
        this.dispatchEvent(
            new CustomEvent('form-invalid', {
                detail: { invalidControls: invalid },
                bubbles: true,
                composed: true,
            })
        );
        return false;
    }
}

if (customElements.get('cre8-form') === undefined) {
    customElements.define('cre8-form', Cre8Form);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-form': Cre8Form;
  }
}

export default Cre8Form;
