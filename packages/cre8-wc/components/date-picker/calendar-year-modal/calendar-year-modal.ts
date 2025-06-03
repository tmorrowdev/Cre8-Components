/* eslint-disable lit/no-template-arrow */
/* eslint-disable indent */

/* TODO: remove eslint disable on no-template-arrow */
import { TemplateResult, html, unsafeCSS } from 'lit';
import { property, state } from 'lit/decorators.js';
import { Cre8Element } from '../../cre8-element';
import styles from './calendar-year-modal.module';
import '../../button/button';
import '../../icon/icon';

export class Cre8CalendarYearModal extends Cre8Element {
  static get styles() {
    return unsafeCSS(styles.toString());
  }

  @state() yearNumbers: Array<number>;

  @state() _currentYear?: number;

  @state() modalAnchorYear?: number;

  @property({ reflect: true, type: Number })
  get currentYear() {
    return this._currentYear;
  }

  set currentYear(newYear: number) {
    const oldYear = this._currentYear;
    this._currentYear = newYear;
    this.modalAnchorYear = newYear;
    this.requestUpdate('currentDate', oldYear);
    this.createYearArray(this.currentYear);
  }

  constructor() {
    super();
    this.yearNumbers = [];
  }

  private emitYear(year: number) {
    const event = new CustomEvent('changeYear', {
      detail: {
        year,
      },
    });
    this.dispatchEvent(event);
  }

  private createYearArray(anchorYear: number) {
    const gridIndices = Array.from(Array(12).keys());
    /* Leaves current year in the center of the 3x4 grid */
    this.yearNumbers = gridIndices.map((year) => year + (anchorYear - 7));
  }

  private getYearListItems(): TemplateResult[] {
    return this.yearNumbers.map(
      ((year) => html` <li
        ?data-current-year="${year === this.currentYear}"
      >
        <cre8-button
          text="${year}"
          variant="tertiary"
          size="sm"
          @click="${() => this.emitYear(year)}"
        ></cre8-button>
      </li>`
      )
    );
  }

  protected firstUpdated(): void {
    this.focusOnCurrentYear();
  }

  private async focusOnCurrentYear(): Promise<void> {
    await this.updateComplete;

    const currentYearButton = this.shadowRoot?.querySelector<HTMLElement>(
      'li[data-current-year]'
    ).children[0].shadowRoot?.querySelector<HTMLButtonElement>('button');
    currentYearButton.focus();
  }

  private previousYearArray(): void {
    this.modalAnchorYear -= 12;
    this.createYearArray(this.modalAnchorYear);
  }

  private nextYearArray(): void {
    this.modalAnchorYear += 12;
    this.createYearArray(this.modalAnchorYear);
  }

  render() {
    const componentClassNames = this.componentClassNames(
      'cre8-c-calendar-year-modal',
      {}
    );

    return html`
      <div class="${componentClassNames}">
        <cre8-button
          class="cre8-c-calendar-year-modal__nav-button"
          @click="${this.previousYearArray}"
          variant="tertiary"
          text="Previous 12 years"
          ?hideText=${true}
          iconName="keyboard-arrow-left"
        ></cre8-button>
        <ol aria-label="choose a year">
          ${this.getYearListItems()}
        </ol>
        <cre8-button
          class="cre8-c-calendar-year-modal__nav-button"
          @click="${this.nextYearArray}"
          variant="tertiary"
          text="Next 12 years"
          ?hideText=${true}
          iconName="keyboard-arrow-right"
        ></cre8-button>
      </div>
    `;
  }
}

if (customElements.get('cre8-calendar-year-modal') === undefined) {
  customElements.define('cre8-calendar-year-modal', Cre8CalendarYearModal);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-calendar-year-modal': Cre8CalendarYearModal;
  }
}

export default Cre8CalendarYearModal;
