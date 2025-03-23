/* eslint-disable lit/no-template-arrow */
/* eslint-disable indent */

/* TODO: remove eslint disable on no-template-arrow */
import { TemplateResult, html, unsafeCSS } from 'lit';
import { property, state } from 'lit/decorators.js';
import { Cre8Element } from '../../cre8-element';
import styles from './calendar-month-modal.scss';
import '../../button/button';
import '../../icon/icon';

export class cre8CalendarMonthModal extends Cre8Element {
  static get styles() {
    return unsafeCSS(styles.toString());
  }

  @state() monthNames: Array<string>;

  @property({ reflect: true, type: Number })
    currentMonth: number;

    constructor() {
      super();
      this.monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
    }

    protected firstUpdated(): void {
        this.focusOnCurrentMonth();
    }

    private async focusOnCurrentMonth(): Promise<void> {
      await this.updateComplete;

      const currentMonthButton = this.shadowRoot?.querySelector<HTMLElement>(
        'li[data-current-month]'
      ).children[0].shadowRoot?.querySelector<HTMLButtonElement>('button');
      currentMonthButton.focus();
    }

    private emitMonth(month: number): void {
      const event = new CustomEvent('changeMonth', {
        detail: {
          month,
        },
      });
      this.dispatchEvent(event);
    }

    getMonthListItems(): TemplateResult[] {
      return this.monthNames.map(
        (month, index) => html` <li ?data-current-month="${index === this.currentMonth}" >
          <cre8-button text="${month}" variant="tertiary" size="sm"
          @click="${() => this.emitMonth(index)}"></cre8-button>
        </li>`
      );
    }

  render() {
    const componentClassNames = this.componentClassNames('cre8-c-calendar-month-modal', {});

    return html` <div class="${componentClassNames}">
      <ol aria-label="choose a month">
        ${this.getMonthListItems()}
      </ol>
    </div> `;
  }
}

if (customElements.get('cre8-calendar-month-modal') === undefined) {
  customElements.define('cre8-calendar-month-modal', cre8CalendarMonthModal);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-calendar-month-modal': cre8CalendarMonthModal;
  }
}

export default cre8CalendarMonthModal;
