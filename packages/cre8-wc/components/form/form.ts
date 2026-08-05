import { nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';

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

    render() {
        return nothing;
    }

    connectedCallback() {
        super.connectedCallback();
        this._ensureForm();
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
    }

    /** The wrapped native form element. */
    get form(): HTMLFormElement | null {
        return this._form;
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
