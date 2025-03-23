import { html, nothing, unsafeCSS } from 'lit';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { property, query } from 'lit/decorators.js';
import { nanoid } from 'nanoid';
import { Cre8FormElement } from '../cre8-form-element';
import '../field-note/field-note';
import styles from './field.scss';

/**
 * The Field component renders a form group with label, control, help text and validation styling. There are
 * convenience variants of Field to support HTML5 input types and static content.
 */
export class cre8Field extends Cre8FormElement {
    static get styles() {
        return unsafeCSS(styles);
    }

  /**
   * Autocomplete attribute that allows input to expect certain types of information. Note: autocomplete is supported
   * by most browsers, but the suggested 'completions' are also sourced from those browsers. Values come
   * from past user stored data from past interactions in that browser, such as:
   *
   *  1. From past values entered by the user, but they may also come from pre-configured values. For
   *  instance, a browser might let the user save their name, address, phone number, and email addresses for
   *  autocomplete purposes.
   *
   *  2. Perhaps the browser offers the ability to save encrypted credit card information, for autocompletion
   *  following a an authentication procedure.
   *  See: [MDN web docs_](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)
   *
   *  NOTE:: In order to provide autocompletion, user-agents might require input, select, textarea
   *  elements to:
   *
   *  1. Have a {{name}} and/or {{id}} attribute
   *  2. Be descendants of a form element
   *  3. The form to have a [submit button](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/submit)
   *
   * @attr {string}
   */
  @property()
      autocomplete?: 'on' | 'off' | 'name' | 'email' | 'username' | 'new-password' | 'current-password' | 'tel' | 'url' | 'address-line1' | 'address-line2' | 'country' | 'postal-code';

  /**
   * Pattern attribute defines a regular expression to validate against input
   *
   * @attr {string}
   */
  @property()
      pattern?: string;

  /**
   * Type variants
   * - **text** renders a standard text input
   * - **email** renders a text input for an email format
   * - **number** renders an input for number values only
   * - **url** renders an input for urls only
   * - **tel** renders an input for telephone number values only
   *
   * @attr {string}
   */
  @property()
      type: 'text' | 'email' | 'number' | 'url' | 'tel' | 'password' | 'date' = 'text';

  /**
   * The placeholder text that appears inside the input
   *
   * @attr {string}
   */
  @property()
      placeholder?: string;

  /**
   * The required label that appears above the input
   *
   * @attr {string}
   */
  @property()
      label: string = 'Label';

  /**
   * The name property on the input
   *
   * @attr {string}
   */
  @property()
      name?: string;

  /**
   * The unique id of the field
   * <br/><br/> _*This property is dynamically set_
   *
   * @attr {string}
   */
  @property()
      fieldId?: string;

  /**
   * The text that displays below in text field input
   *
   * @attr {string}
   */
  @property()
      fieldNote?: string;

  /**
   * Controls how the voiceover will experience the new information when field note changes,
   * immediately (used for more urgently needed updates) using `assertive` or at the next convenient
   * pause in their navigation using `polite`.
   */
  @property()
      ariaLive: 'polite' | 'assertive' = 'polite';

  /**
   * Used to connect the field note in text field to the text menu for accessibility
   *
   * @attr {string}
   */
  @property()
      ariaDescribedBy?: string;

  /**
   * The required attribute on the input
   *
   * @attr {boolean}
   */
  @property({ type: Boolean, reflect: true })
      required?: boolean;

  /**
   * The disabled attribute on the input
   *
   * @attr {boolean}
   */
  @property({ type: Boolean, reflect: true })
      disabled?: boolean;

  /**
   * Changes the component's treatment to represent an error state
   *
   * @attr {boolean}
   */
  @property({ type: Boolean, reflect: true })
      isError?: boolean;

  /**
   * Visually hidden text that always signifies that this is an error for screen reader usage
   *
   * @attr {string}
   */
  @property()
      errorText: string = 'Error';

  /**
   * The error field note that appears below the default field note
   *
   * @attr {string}
   */
  @property()
      errorNote?: string;

   /**
    * The max attribute defines the maximum value that is acceptable and valid for the input containing the attribute.
    * @attr {string | number}
    */
  @property()
      max?: string;

    /**
    * The min attribute defines the minimum value that is acceptable and valid for the input containing the attribute.
    * @attr {string | number}
    */
  @property()
      min?: string;

  /**
   * The maxlength is an integer above 0 that indicates the maximum allowed characters to be entered. When using the
   * maxlength prop, you must also use the "required" prop to provide Constraint Validation on the input field.
   * This allows users to know why the input they attempted didn't render in the input field. see
   * [MDN maxlength](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/maxlength#constraint_validation)
   *
   * @attr {string}
   */
  @property()
      maxlength?: number;

  /**
   * Additional aria-describedby connection to id for additional success and error notes to be accessible
   *
   * @attr {string}
   */
  @property()
      validationAriaDescribedBy?: string;

  /**
   * Changes the component's treatment to represent a success state
   *
   * @attr {boolean}
   */
  @property({ type: Boolean, reflect: true })
      isSuccess?: boolean;

  /**
   * Visually hidden text that always signifies that this is successful for screen reader usage
   *
   * @attr {string}
   */
  @property()
      successText: string = 'Success';

  /**
   * Readonly attribute
   *
   * @attr {boolean}
   */
  @property({ type: Boolean, reflect: true })
      readonly?: boolean;

  /**
   * The success field note that appears below the default field note
   *
   * @attr {string}
   */
  @property()
      successNote?: string;

  @query('input')
      field!: HTMLInputElement;

  /**
   * First update lifecycle hook
   * 1) super.firstUpdated also uses the firstUpdated from the Cre8FormElement
   */
  firstUpdated() {
      this.initializeAria();
      return super.firstUpdated();
  }

  /**
   * Initialize aria attributes
   */
  initializeAria() {
      this.fieldId = this.fieldId || nanoid();
      if (this.fieldNote || this.slotNotEmpty('fieldNote')) {
          this.ariaDescribedBy = this.ariaDescribedBy || `Field_${nanoid()}`;
      }
      if (this.successNote || this.errorNote) {
          this.validationAriaDescribedBy = this.validationAriaDescribedBy || `Field_validation_${nanoid()}`;
      }
  }

  /**
   * Aria describedby string based on field notes and error/success notes
   * 1) If both validationAriaDescribedBy (error/success note) and field note exists,
   * render both in the input's `aria-describedby` attribute
   * 2) Otherwise, if only validationAriaDescribedBy exists, then render only that as
   * the `aria-describedby` attribute (input without field note initially, but then error/success is added).
   * 3) Otherwise, render only the `ariaDescribedBy` property (field note only)
   */
  fieldNoteAria() {
      if (this.validationAriaDescribedBy && this.ariaDescribedBy) {
          return `${this.ariaDescribedBy} ${this.validationAriaDescribedBy}`; /* 1 */
      }
      if (this.validationAriaDescribedBy && !this.ariaDescribedBy) {
          return this.validationAriaDescribedBy; /* 2 */
      }
      return this.ariaDescribedBy; /* 3 */
  }

  /**
   * Handle On Input
   * 1) Set the input's value equal to the event.target.value when the input is changed.
   * 2) Set the internal form value of the input to the updated value
   */
  private _handleOnInput(e: Event) {
    /* 1 */
      const inputValue = (e.target as HTMLInputElement).value;
      this.value = inputValue;

    /* 2 */
      this.internals.setFormValue(this.value);
  }

  /**
   * Render the success or error field notes
   * 1. If there is a successNote, then return the field note with the success message and state.
   * 2. If there is a errorNote, then return the field note with the error message and state.
   */
  renderSuccessErrorFieldNote() {
      if (this.successNote) {
      /* 1 */
          return html` <cre8-field-note
        ?isSuccess=${this.isSuccess}
        class="cre8-c-field__field-note-success"
        id=${this.validationAriaDescribedBy}
        iconName="success"
      >
        ${this.successNote}
      </cre8-field-note>`;
      }
      if (this.errorNote) {
      /* 2 */
          return html` <cre8-field-note
        ?isError=${this.isError}
        class="cre8-c-field__field-note-error"
        id=${this.validationAriaDescribedBy}
        iconName="error-alt"
      >
        ${this.errorNote}
      </cre8-field-note>`;
      }
      return null;
  }

  render() {
      const componentClassNames = this.componentClassNames('cre8-c-field', {
          'cre8-is-error': this.isError,
          'cre8-is-success': this.isSuccess,
      });

      return html`
      <div class="${componentClassNames}">
        <label class="cre8-c-field__label" for="${this.fieldId}">${this.label}</label>
        <div class="cre8-c-field__body">
          <input
            class="cre8-c-field__input"
            autocomplete=${ifDefined(this.autocomplete)}
            type="${this.type}"
            id="${this.fieldId}"
            name="${ifDefined(this.name)}"
            max=${(this.type === 'date') && ifDefined(this.max).toString()}
            min=${(this.type === 'date') && ifDefined(this.max).toString()}
            maxlength=${ifDefined(this.maxlength)}
            ?readonly=${this.readonly}
            ?required=${this.required}
            aria-invalid=${this.isError ? 'true' : 'false'}
            ?disabled="${this.disabled}"
            pattern=${ifDefined(this.pattern)}
            aria-describedby="${ifDefined(this.fieldNoteAria())}"
            placeholder="${ifDefined(this.placeholder)}"
            .value="${this.value}"
            @input=${this._handleOnInput}
          />
        </div>
        ${this.fieldNote || this.slotNotEmpty('fieldNote')
        ? html`<cre8-field-note id=${this.ariaDescribedBy} class="cre8-c-field__field-note"
              ><slot name="fieldNote">${this.fieldNote}</slot></cre8-field-note
            >`
        : nothing}
        ${this.renderSuccessErrorFieldNote()}
      </div>
    `;
  }
}

if (customElements.get('cre8-field') === undefined) {
    customElements.define('cre8-field', cre8Field);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-field': cre8Field;
  }
}

export default cre8Field;
