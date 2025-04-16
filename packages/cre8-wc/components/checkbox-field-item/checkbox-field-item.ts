import { html, nothing, unsafeCSS } from 'lit';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { property, query } from 'lit/decorators.js';
import { nanoid } from 'nanoid';
import '../icon/icon';
import '../field-note/field-note';
import svgCheck from '@Cre8/cre8-icons/lib/icons/System/Regular/Check.svg?raw';
import styles from './checkbox-field-item.scss';
import { Cre8FormElement } from '../cre8-form-element';

/**
 * Checkbox Field Item is the combination of a checkbox input, label and field note.
 * Checkboxes can turn an option on or off.
 *
 * Checkboxes should be used when the user is allowed to select one, none or multiple options
 * OR to "opt-in" (ex. I would like to receive the newsletter by email)
 * or as a required acknowledgement(ex. I've read the Terms and Conditions).
 * If the user can only chose one option from many, use `radio-field-item`.
 *
 * ## How to Use
 *
 * - A checkbox is independent of all other checkboxes in the list,
 *   so checking one box should not uncheck the others in the group.
 * - Place checkbox options one on top of another vertically. Do not display them in a row horizontally.
 * - Avoid disabled and read-only states as much as possible.
 *
 * ## Universal Form Field Rules
 * - Unless indicated with the "(Optional)" label, all fields are assumed required.
 *   Minimize the number of optional fields to keep forms as short as possible.
 * - Always include a label written in sentence case.
 * - Avoid using the read-only and disabled states as much as possible.
 */
export class Cre8CheckboxFieldItem extends Cre8FormElement {
    readonly type = 'checkbox';

    static get styles() {
        return unsafeCSS(styles.toString());
    }

  /**
   * The checkbox label
   */
  @property({ type: String })
      label?: string;

  /**
   * Changes the component's treatment to represent an error state
   * @attr {boolean}
   */
  @property({ type: Boolean, reflect: true })
      isError?: boolean;

  /**
   * Visually hidden text that always signifies that this is an error for screen reader usage
   * @attr {string}
   */
  @property()
      errorText: string = 'Error';

  /**
   * The error field note that appears below the default field note
   */
  @property()
      errorNote?: string;

  /**
   * Changes the component's treatment to represent a success state
   * @attr {boolean}
   */
  @property({ type: Boolean, reflect: true })
      isSuccess?: boolean;

  /**
   * Visually hidden text that always signifies that this is successful for screen reader usage
   */
  @property()
      successText: string = 'Success';

  /**
   * The success field note that appears below the default field note
   */
  @property()
      successNote?: string;

  /**
   * Disabled State
   * @attr {boolean}
   */
  @property({ type: Boolean, reflect: true })
      disabled?: boolean;

  /**
   * Checked State
   * @attr {boolean}
   */
  @property({ type: Boolean, reflect: true })
      checked?: boolean;

  /**
   * Checkbox FieldId
   * @attr {string}
   */
  @property()
      fieldId?: string;

  /**
   * Checkbox FieldNote
   */
  @property()
      fieldNote?: string;

  /**
   * Checkbox fieldnote ariaDescribeBy
   * @attr {string}
   */
  @property()
      ariaDescribedBy?: string;

  /**
   * Additional aria-describedby connection to id for additional success and error notes to be accessible
   */
  @property()
      validationAriaDescribedBy?: string;

  /**
   * Checkbox name
   * @attr {string}
   */
  @property()
      name?: string;

  /**
   * Required property
   * @attr {boolean}
   */
  @property({ type: Boolean, reflect: true })
      required?: boolean;

  /**
   * Checkbox fieldnote icon name
   */
  @property()
      fieldNoteIconName?: string;

  /**
   * Get the input element within the shadow root and set it to this.field
   */
  @query('input')
      field!: HTMLInputElement;

  protected override defaultValue: boolean;

  /**
   * Connected callback lifecycle
   * 1) Set the fieldID to a random string if not provided so form is always accessible
   * 2) If a fieldnote is added, set the aria-describedby property to the `ariaDescribedBy` property
   * or a random string to always make the form field accessible.
   * 3) Set the form internal data to set that to the default checked state.
   * 4) Set the default value of the checkbox field item to the checked property
  */

  connectedCallback() {
      super.connectedCallback();
      this.setFormData(); /* 3 */
      this.defaultValue = this.checked; /* 4 */
  }

  /**
   * access role when check-box-field-item embedded in checkbox-field
   */
  private getRole() {
      const checkboxFieldContainer = this.closest('cre8-checkbox-field');
      if (checkboxFieldContainer) {
          return 'listitem';
      }
      return '';
  }

  /**
   * Set form data
   * 1) If a checked property is provided, set the form value the checkbox value attribute.
   * Otherwise, don't provide a value for the checkbox data array
   */
  private setFormData() {
      return this.checked ? this.internals.setFormValue(this.value || 'on') : this.internals.setFormValue(null); /* 1 */
  }

  /**
   * Handle on checkbox change
   * 1) On change of the checkbox input, if `checked` is true, then set it to false and vice versa.
   */
  private _clickHandler() {
      this.checked = !this.checked; /* 2 */
      return this.checked ? this.internals.setFormValue(this.value || 'on') : this.internals.setFormValue(null);
  }

  /**
   * Handle On Change
   * 1. Set the value when the select is changed.
   * 2. Fire the custom event with the current value.
   */
  private _handleOnChange(e: Event) {
      /* 1 */
      const target = e.target as HTMLSelectElement;
      this.value = target.value;
      this.internals.setFormValue(this.value);

      /* 2 */
      const customEvent = new CustomEvent('change', {
          detail: {
              name: this.name,
              value: this.value,
          },
          bubbles: true,
          composed: true,
      });
      this.dispatchEvent(customEvent);
  }

  /**
   * Form reset callback
   * 1) Set checked property to the default value and then set the input's checked attribute to that default value
   * 2) Set the input's checked attribute to that default value
   * 3) Set the element internals form data when the form is reset
   * 4) Change the new value to the old value on reset
   */
  formResetCallback(): void {
      this.checked = this.defaultValue; /* 1 */
      this.field.checked = this.defaultValue; /* 2 */
      this.setFormData();
      this.requestUpdate();
  }

  /**
   * First update lifecycle hook
   * 1) super.firstUpdated also uses the firstUpdated from the Cre8FormElement
   */
  firstUpdated() {
      this.initializeAria(); /* 1 */
      return super.firstUpdated();
  }

  /**
   * Initialize aria attributes
   */
  initializeAria() {
      this.fieldId = this.fieldId || nanoid();
      if (this.fieldNote || this.slotNotEmpty('fieldNote')) {
          this.ariaDescribedBy = this.ariaDescribedBy || nanoid();
      }
      if (this.successNote || this.errorNote) {
          this.validationAriaDescribedBy = this.validationAriaDescribedBy || nanoid();
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
  fieldNoteAria(): string {
      if (this.validationAriaDescribedBy && this.ariaDescribedBy) {
          return `${this.ariaDescribedBy} ${this.validationAriaDescribedBy}`; /* 1 */
      } if (this.validationAriaDescribedBy && !this.ariaDescribedBy) {
          return this.validationAriaDescribedBy; /* 2 */
      }
      return this.ariaDescribedBy; /* 3 */
  }

  /**
   * Render the success or error field notes
   * 1. If there is a successNote, then return the field note with the success message and state.
   * 2. If there is a errorNote, then return the field note with the error message and state.
   */
  renderSuccessErrorFieldNote() {
      if (this.successNote) {
      /* 1 */
          return html`<cre8-field-note
        ?isSuccess=${this.isSuccess}
        id=${this.validationAriaDescribedBy}
        class="cre8-c-checkbox-field-item__field-note-success"
        iconName="success"
      >
        <span class="cre8-u-is-vishidden">${this.successText}</span> ${this.successNote}
      </cre8-field-note>`;
      }
      if (this.errorNote) {
      /* 2 */
          return html` <cre8-field-note
        ?isError=${this.isError}
        id=${this.validationAriaDescribedBy}
        class="cre8-c-checkbox-field-item__field-note-error"
        iconName="error-alt"
      >
        <span class="cre8-u-is-vishidden">${this.errorText}</span> ${this.errorNote}
      </cre8-field-note>`;
      }
      return null;
  }

  render() {
      const componentClassNames = this.componentClassNames('cre8-c-checkbox-field-item', {
          'cre8-c-checkbox-field-item--error': this.isError,
          'cre8-c-checkbox-field-item--success': this.isSuccess,
          'cre8-c-checkbox-field-item--disabled': this.disabled,
      });

      return html`
      <div role=${ifDefined(this.getRole())} class="${componentClassNames}">
        <input class="cre8-c-checkbox-field-item__input"
          type="checkbox"
          @input=${this._clickHandler}
          id=${this.fieldId}
          name=${this.name}
          .value=${this.value}
          required=${ifDefined(this.required)}
          aria-invalid=${this.required ? !!this.isError : ifDefined(this.isError)}
          disabled="${ifDefined(this.disabled ? this.disabled : undefined)}"
          aria-describedby="${ifDefined(this.fieldNoteAria())}"
          .checked="${this.checked}"
          @change=${this._handleOnChange}
        />
        <span class="cre8-c-checkbox-field-item__custom-checkbox">
          <cre8-icon svg='${svgCheck}' class="cre8-c-checkbox-field-item__icon" aria-label="checkbox"
          aria-hidden="${!this.checked}"></cre8-icon>
        </span>
        <label class="cre8-c-checkbox-field-item__label" for=${this.fieldId}>${this.label}</label>
      </div>
      ${
    this.fieldNote || this.slotNotEmpty('fieldNote')
        ? html`<cre8-field-note id=${this.ariaDescribedBy} class="cre8-c-checkbox-field-item__field-note"
              ><slot name="fieldNote">${this.fieldNote}</slot></cre8-field-note
            >`
        : nothing
}
        ${this.renderSuccessErrorFieldNote()}
    `;
  }
}

if (customElements.get('cre8-checkbox-field-item') === undefined) {
    customElements.define('cre8-checkbox-field-item', Cre8CheckboxFieldItem);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-checkbox-field-item': Cre8CheckboxFieldItem;
  }
}

export default Cre8CheckboxFieldItem;
