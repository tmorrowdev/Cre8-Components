import { html, nothing } from 'lit';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { property, query, state } from 'lit/decorators.js';
import styles from './date-picker.styles';
import { Cre8FormElement } from '../cre8-form-element';
import './calendar/calendar';

/**
 * The Date Picker component renders a form group with label, control, help text and validation styling much
 * like the Field component but exclusively for type=date.
 * Cre8DatePicker inherts the Cre8Field component.
 */
export class Cre8DatePicker extends  Cre8FormElement {
   static formAssociated = true;
   @query('input[type="date"]')
    field:  HTMLInputElement;

   /**
    * The type of the form field.
    * For Date Picker, this is always 'date'.
    */
   override type: string = 'date';
    static styles = [styles];

  @state() showCalendar = false;
  @state() disabled: boolean;
  @state() readonly: boolean;

  /**
   * Quick Shortcuts Variant
   * @attr {boolean}
   *
   */
  @property({ type: Boolean, reflect: true })
      hasShortcuts?: boolean;

      connectedCallback(): void {
      super.connectedCallback();
      this.field.attachInternals();
      this.field.disabled = this.disabled;
      this.field.readOnly = this.readonly;
      this.internals.setFormValue(this.value);
      }
  /**
   * Handle Date On Input
   * 1) Set the input's value equal to the event.target.value when the input is changed.
   * 2) Set the internal form value of the input to the updated value
   */
  private handleDateOnInput(e: Event) {
    /* 1 */
      this.value = (e.target as HTMLInputElement).value;

    /* 2 */
      this.internals.setFormValue(this.value);
  }

  private handleCalendarSelect(e: CustomEvent) {
      this.value = e.detail.date;

      this.internals.setFormValue(this.value);
      this.showCalendar = false;
  }

  private handleOutsideClick(e: CustomEvent) {
      const calendarIcon = this.renderRoot.querySelector('.cre8-c-date-picker');

      if (this.showCalendar && !e.detail.composedPath.includes(calendarIcon)) {
          this.showCalendar = false;
      }
  }

  private toggleCalendar() {
      if (!this.disabled && !this.readonly) {
          this.showCalendar = !this.showCalendar;
      }
  }

  render() {
      const componentClassNames = this.componentClassNames('cre8-c-date-picker', {
          'cre8-is-error': this.isError,
          'cre8-is-success': this.isSuccess,
          'cre8-c-date-picker--disabled': this.disabled,
          'cre8-c-date-picker--read-only': this.readonly,
      });

      this.type = 'date';

      return html`
      <div class="${componentClassNames}">
        <label class="cre8-c-date-picker__label" for="${this.fieldId}"
          >${this.label}</label
        >
        <div class="cre8-c-date-picker__body">
          <input
            class="cre8-c-date-picker__input"
            autocomplete=${ifDefined(this.autocomplete)}
            type="${this.type}"
            id="${this.fieldId}"
            name="${ifDefined(this.name)}"
            max=${ifDefined(this.max)}
            min=${ifDefined(this.min)}
            value="${ifDefined(this.value)}"
            ?readonly=${this.readonly}
            ?required=${this.required}
            ?disabled="${this.disabled}"
            aria-describedby="${ifDefined(this.fieldNoteAria())}"
            placeholder="${ifDefined(this.placeholder)}"
            @input=${this.handleDateOnInput}
            @click=${this.toggleCalendar}
          />
          <cre8-button
            class="cre8-c-date-picker__calendar-icon-button"
            aria-expanded="${this.showCalendar}"
            aria-label="Show Calendar"
            ?disabled="${this.disabled || this.readonly}"
            ?hideText=${true}
            iconName="calendar-datepicker"
            variant="tertiary"
            @click="${this.toggleCalendar}"
          ></cre8-button>
        </div>
        ${this.showCalendar
        ? html`<cre8-calendar
              fieldDate="${ifDefined(this.value)}"
              ?hasShortcuts=${this.hasShortcuts}
              @dateSelect="${this.handleCalendarSelect}"
              @outsideClick="${this.handleOutsideClick}"
            ></cre8-calendar>`
        : nothing}
        ${this.fieldNote || this.slotNotEmpty('fieldNote')
        ? html`<cre8-field-note
              id=${this.ariaDescribedBy}
              class="cre8-c-date-picker__field-note"
              ><slot name="fieldNote">${this.fieldNote}</slot></cre8-field-note
            >`
        : nothing}
        ${this.renderSuccessErrorFieldNote()}
      </div>
    `;
  }
}

if (customElements.get('cre8-date-picker') === undefined) {
    customElements.define('cre8-date-picker', Cre8DatePicker);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-date-picker': Cre8DatePicker;
  }
}

export default Cre8DatePicker;
