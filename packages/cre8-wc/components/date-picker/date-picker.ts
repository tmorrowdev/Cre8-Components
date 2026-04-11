import { html, nothing } from 'lit';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { property, state } from 'lit/decorators.js';
import styles from './date-picker.styles';
import './calendar/calendar';
import { consume } from '@lit/context';
import { Cre8ElementInternals, formInternalsContext } from '../contexts/form-internals-context';
import { Cre8Field } from '../field/field';

/**
 * The Date Picker component renders a form group with label, control, help text and validation styling much
 * like the Field component but exclusively for type=date.
 * Cre8DatePicker inherits the Cre8Field component.
 */
export class Cre8DatePicker extends Cre8Field {
  field!: HTMLInputElement;
  override type: 'text' | 'email' | 'number' | 'url' | 'tel' | 'password' | 'date' = 'date';

  @consume({ context: formInternalsContext })
  _internals: Cre8ElementInternals;

  /**
   * The type of the form field.
   * For Date Picker, this is always 'date'.
   */
  static styles = [styles];

  @state() showCalendar = false;

  /**
   * Quick Shortcuts Variant
   * @attr {boolean}
   *
   */
  @property({ type: Boolean, reflect: true })
  hasShortcuts?: boolean;

  @property()
  label: string;

  /**
   * Handle Date On Input
   * 1) Set the input's value equal to the event.target.value when the input is changed.
   * 2) Set the internal form value of the input to the updated value
   */
  private handleDateOnInput(e: Event) {
    /* 1 */
    this.value = (e.target as HTMLInputElement).value;

    /* 2 */
    this._internals.setFormValue(this.value);
  }

  private handleCalendarSelect(e: CustomEvent) {
    this.value = e.detail.date;

    this._internals.setFormValue(this.value);
    this.showCalendar = false;
  }

  private handleOutsideClick(e: CustomEvent) {
    const calendarIcon = this.renderRoot.querySelector('.cre8-c-date-picker');

    if (this.showCalendar && !e.detail.composedPath.includes(calendarIcon)) {
      this.showCalendar = false;
    }
  }

  private toggleCalendar() {
    if (!this.disabled && !this._internals.readonly) {
      this.showCalendar = !this.showCalendar;
    }
  }

  render() {
    const componentClassNames = this.componentClassNames('cre8-c-date-picker', {
      'cre8-is-error': this.isError,
      'cre8-is-success': this.isSuccess,
      'cre8-c-date-picker--disabled': this.disabled,
      'cre8-c-date-picker--read-only': this._internals.readonly,
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
            autocomplete=${ifDefined(this._internals.autocomplete)}
            type="${this.type}"
            id="${this.id}"
            name="${ifDefined(this.name)}"
            max=${ifDefined(this._internals.max)}
            min=${ifDefined(this._internals.min)}
            value="${ifDefined(this.value)}"
            ?readonly=${this._internals.readonly}
            ?required=${this.required}
            ?disabled="${this.disabled}"
            placeholder="${ifDefined(this._internals.placeholder)}"
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
