import svgCaretUp from '@cre8/cre8-icons/lib/icons/System/Regular/Caret Up.svg?raw';
import { html, nothing, unsafeCSS } from 'lit';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { property, query, queryAll } from 'lit/decorators.js';
import { nanoid } from 'nanoid';
import { Cre8FormElement } from '../cre8-form-element';
import '../field-note/field-note';
import styles from './select.scss';

export interface cre8SelectOption {
  label: string;
  value: number | string;
}

export interface cre8SelectOptionGroup {
  optGroupLabel: string;
  options: cre8SelectOption[];
}

/**
 * The Select control is designed and built to be used for selecting between choices in a form.
 * It is not a Dropdown control which is generally used for displaying lists of choices
 * that act as links or actions, like filter options.
 *
 * Consider the use of a Select control carefully.
 * When you have less than 5 options for the user to choose from,
 * Radio or Checkbox inputs may be a better choice to display all of the options at once.
 * Users have to slow down to scan a list with more than 15 options,
 * so using an option group to give the options hierarchy may help users find their choice faster.
 * Alternately, a text input field might be a more appropriate control to use when there are too many options,
 * especially when used with typeahead/auto-complete.
 *
 * ## How to use
 * 1. The collapsed default state always shows a default placeholder value or a selected value.
 * 2. Sort list items in a logical order, such as grouping highly related options together,
 *    placing most common options first, using alphabetical or numeric orders or dates in chronological order.
 * 3. A list that includes 6+ items should show a scrollbar.
 * 4. Users should be able to use a keystroke to quickly jump
 *    to selecting an option that begins with the entered letter.
 * 5. Utilize appropriate native controls for when a user is on a mobile device rather than our custom Select.
 * 6. Adhere to our common form field conventions and always include a Label,
 *    provide short and clear error messages in context, avoid using the Read-only
 *    and Disabled states as much as possible, and utilize the info/formatting tip
 *    or helpful link rather than placeholder text.
 *
 * @slot fieldNote - Container for optional field note content
 */

export class cre8Select extends Cre8FormElement {
    readonly type = 'select';

    static get styles() {
        return unsafeCSS(styles.toString());
    }

  /**
   * A mix of cre8SelectOption and cre8SelectOptionGroup definitions:
   * - cre8SelectOption
   *   - label: option label text - `string`
   *   - value: option value - `number | string`
   * - cre8SelectOptionGroup
   *  - optGroupLabel: optgroup label text - `string`
   *  - options: Array of multiple cre8SelectOption items - `cre8SelectOption[]`
   */
  @property({ type: Array })
      items: Array<cre8SelectOption|cre8SelectOptionGroup> = [];

  /**
   * The required label that appears above the select
   * @attr {string}
   */
  @property()
      label: string = 'Label';

  /**
   * The name property on the select
   * @attr {string}
   */
  @property()
      name?: string;

/**
* The unique id of the select
* @attr {string}
*/
  @property()
      fieldId?: string;

  /**
   * Optional field note text can be added to provide additional field guidance.
   * @attr {string}
   */
  @property()
      fieldNote?: string;

  /**
   * Used to connect the field note in text field to the text menu for accessibility
   * @attr {string}
   */
  @property()
      ariaDescribedBy?: string;

  /**
   * Additional aria-describedby connection to id for additional success and error notes to be accessible
   * @attr {string}
   */
  @property()
      validationAriaDescribedBy?: string;

  /**
   * The required attribute on the select
   * @attr {boolean}
   */
  @property({ type: Boolean, reflect: true })
      required?: boolean;

  /**
   * The disabled attribute on the select
   * @attr {boolean}
   */
  @property({ type: Boolean, reflect: true })
      disabled?: boolean;

  /**
   * Changes the component's treatment to represent an error state
   * @attr {boolean}
   */
  @property({ type: Boolean, reflect: true })
      isError?: boolean;

  /**
   * The error field note that appears below the default field note
   * @attr {string}
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
   * The success field note that appears below the default field note
   * @attr {string}
   */
  @property()
      successNote?: string;

  /**
   * Select input querySelector
   */
  @query('select')
      field!: HTMLSelectElement;


  /**
   * Get all select option elements
   */
  @queryAll('option')
  private _selectOptions: HTMLOptionElement[];


  /**
   * Selected item value
   */
  private selectedItem: string;

  /**
   * Initialize aria attributes
   */
  private _initializeAria() {
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
  private _fieldNoteAria() {
      if (this.validationAriaDescribedBy && this.ariaDescribedBy) {
          return `${this.ariaDescribedBy} ${this.validationAriaDescribedBy}`; /* 1 */
      }
      if (this.validationAriaDescribedBy && (!this.ariaDescribedBy)) {
          return this.validationAriaDescribedBy; /* 2 */
      }
      return this.ariaDescribedBy; /* 3 */
  }

  /**
   * First updatedLifecycle
   * 1) Get the option in the items array with selected set to true. Set that as the selected item
   * 2) The default value is set to the `option` with the `selected` if one exists. Otherwise, use the
   * select the first item value like the native select.
   */
  firstUpdated() {
      super.firstUpdated();
      this._selectOptions.forEach((item) => { /* 1 */
          if (item.selected === true) {
              this.selectedItem = item.value; /* 1 */
          }
      });
      this.defaultValue = this.selectedItem ? this.selectedItem : this._selectOptions[0].value; /* 2 */
      this._setFormData();
      this._initializeAria();
      return this.updateField();
  }

    /**
   * Set form data
   * 1) Set the element internals to the selected item value if it exists,
   *    otherwise the default selected item is the first one
   */
  private _setFormData() {
      if (this.selectedItem) {
          return this.internals.setFormValue(this.selectedItem);
      }
      return this.internals.setFormValue(this.defaultValue.toString());
  }

  /**
   * Handle On Change
   * 1. Set the value when the select is changed.
   * 2. Fire the custom event with the current value.
   */
  private _handleOnChange(e: Event) {
    /* 1 */
      const target = e.target as HTMLSelectElement;
      this.value = target.options[target.selectedIndex].value;
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
   * Render the select options
   */
  private _renderSelectOptions() {
      return this.items.map((item: cre8SelectOption|cre8SelectOptionGroup) => {
          if ('options' in item) {
              const selectedGroup = item.options.map((option: cre8SelectOption) => html`
                  <option value="${option.value}">${option.label}</option>
              `);
              return html`<optgroup label="${item.optGroupLabel}">
          ${selectedGroup}
        </optgroup>`;
          }
          return html`<option value="${item.value}">${item.label}</option>`;
      });
  }

  /**
   * Render the success or error field notes
   * 1. If there is a successNote, then return the field note with the success message and state.
   * 2. If there is a errorNote, then return the field note with the error message and state.
   */
  private _renderSuccessErrorFieldNote() {
      if (this.successNote) {
      /* 1 */
          return html`
        <cre8-field-note
          ?isSuccess=${this.isSuccess}
          id=${this.validationAriaDescribedBy}
          class="cre8-c-select__field-note-success"
          iconName="success"
        >
          ${this.successNote}
        </cre8-field-note>`;
      }
      if (this.errorNote) {
      /* 2 */
          return html`
        <cre8-field-note
          ?isError=${this.isError}
          id=${this.validationAriaDescribedBy}
          class="cre8-c-select__field-note-error"
          iconName="error-alt"
        >
          ${this.errorNote}
        </cre8-field-note>`;
      }
      return null;
  }

  render() {
      const componentClassNames = this.componentClassNames('cre8-c-select', {
          'cre8-is-error': this.isError,
          'cre8-is-success': this.isSuccess,
      });

      return html`
      <div class="${componentClassNames}">
        <label class="cre8-c-select__label" for="${this.fieldId}">${this.label}</label>
        <div class="cre8-c-select__body">
          <select
            class="cre8-c-select__input"
            id=${this.fieldId}
            name=${this.name}
            ?required=${this.required}
            ?disabled=${this.disabled}
            aria-describedby="${ifDefined(this._fieldNoteAria())}"
            @change=${this._handleOnChange}
          >
            ${this._renderSelectOptions()}
          </select>
          <div class="cre8-c-select__icons">
            <cre8-icon svg='${svgCaretUp}' rotate="180" class="cre8-c-select__icon-arrow" aria-hidden='true'>
          </div>
        </div>
      </div>
      ${this.fieldNote || this.slotNotEmpty('fieldNote')
        ? html`
          <cre8-field-note
            id=${this.ariaDescribedBy}
            class="cre8-c-select__field-note"
          ><slot name="fieldNote">${this.fieldNote}</slot></cre8-field-note>`
        : nothing}
      ${this._renderSuccessErrorFieldNote()}
    `;
  }
}

if (customElements.get('cre8-select') === undefined) {
    customElements.define('cre8-select', cre8Select);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-select': cre8Select;
  }
}
