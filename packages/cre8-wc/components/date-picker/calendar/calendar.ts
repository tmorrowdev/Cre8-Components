/* eslint-disable max-statements */
/* eslint-disable indent */
/* eslint-disable lit/no-template-arrow */

/* TODO: remove eslint disable on no-template-arrow */
import {
 TemplateResult, html, nothing, unsafeCSS,
} from 'lit';
import { property, query, state } from 'lit/decorators.js';
import styles from './calendar.module';
import { Cre8Element } from '../../cre8-element';

import '../../icon/icon';
import '../calendar-month-modal/calendar-month-modal';
import '../calendar-year-modal/calendar-year-modal';
import '../calendar-navigation/calendar-navigation';
import '../../button/button';

export interface DateConfig {
  locale: string;
  today: Date;
  weekInfo: {
    firstDay: number;
    weekend: Array<number>;
  };
}

export interface DateFormatOptions {
  weekday: string;
  year: string;
  month: string;
  day: string;
}

export enum CalendarModal {
  Month = 'month',
  Year = 'year',
  None = 'none',
}

export class Cre8Calendar extends Cre8Element {
  static get styles() {
    return unsafeCSS(styles.toString());
  }

  /**
   * Query the navigation wrapper
   */
  @query('.cre8-c-calendar__navigation-wrapper')
      _navWrapper: HTMLElement;

  @property({ type: Boolean, reflect: true })
  hasShortcuts?: boolean;

  @state() _activeModal?: CalendarModal = CalendarModal.None;

  @property({ reflect: true, type: String })
  get activeModal() {
    return this._activeModal;
  }

  set activeModal(activeModal: CalendarModal) {
    this._activeModal = activeModal;
  }

  @state() _fieldDate?: string;

  @property({ reflect: true, type: Date })
  get fieldDate() {
    return this._fieldDate;
  }

  set fieldDate(newFieldDate: string) {
    const oldDate = this._fieldDate;
    this.requestUpdate('fieldDate', oldDate);
    const isNewDateValid = !!(
      newFieldDate && new Date(`${newFieldDate}T00:00`).getTime()
    );
    this.currentDate = isNewDateValid
      ? new Date(`${newFieldDate}T00:00`)
      : new Date();
    this._fieldDate = isNewDateValid ? newFieldDate : '';
  }

  @state() _currentDate?: Date;

  @property({ reflect: true, type: Date })
  get currentDate() {
    return this._currentDate;
  }

  set currentDate(newDate: Date) {
    const oldDate = this._currentDate;
    this._currentDate = newDate;
    this.requestUpdate('currentDate', oldDate);
  }

  @state() locale: string;

  @state() weekDays: Array<string>;

  @state() dateConfig: DateConfig;

  @state() dateFormatOptions: DateFormatOptions;

  constructor() {
    super();
    this._handleOnClickOutside = this._handleOnClickOutside.bind(this);
    this.currentDate = (this.fieldDate && new Date(`${this.fieldDate}T00:00`)) ?? new Date();

    this.locale = document.documentElement.getAttribute('lang') || 'en-US';
    this.dateConfig = {
      locale: this.locale,
      today: new Date(),
      weekInfo: {
        firstDay: 7,
        weekend: [6, 7],
      },
    };
    this.weekDays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    this.dateFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('click', this._handleOnClickOutside, false);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('click', this._handleOnClickOutside, false);
  }

  /* Click Event Functions */
  private _handleOnClickOutside(event: MouseEvent) {
    if (!this.shadowRoot?.host) {
      throw Error(
        'Could not determine navigation context during click handler'
      );
    }

    const didClickInside = event.composedPath().includes(this.shadowRoot.host);

    if (!didClickInside) {
      const outsideClickEvent = new CustomEvent('outsideClick', {
        detail: {
          composedPath: event.composedPath(),
        },
      });
      this.dispatchEvent(outsideClickEvent);
    }
  }

  private emitSelectedDate(date: string) {
    const event = new CustomEvent('dateSelect', {
      detail: {
        date,
      },
    });
    this.currentDate = new Date(`${date}T00:00`);
    this.dispatchEvent(event);
  }

  private changeYear(year: number) {
    const oldDate = this.currentDate;
    const newDate = new Date(oldDate.setFullYear(year));
    this.currentDate = newDate;
    this.activeModal = CalendarModal.None;
  }

  private changeMonth(month: number) {
    const oldDate = this.currentDate;
    const newDate = new Date(oldDate.setMonth(month));
    this.currentDate = newDate;
    this.activeModal = CalendarModal.None;
  }

  private activateModal(modal: CalendarModal): void {
    this.activeModal = modal;
  }

  /* Helper/Get Functions */
  static formatMonthOrDayIndex(val: number): string {
    return (val + 1).toString().padStart(2, '0');
  }

  static formatDate(val: number): string {
    return val.toString().padStart(2, '0');
  }

  private numberOfDaysinMonth(): number {
    return new Date(this.getYear(), this.getMonth() + 1, 0).getDate();
  }

  private getMonth(): number {
    return this.currentDate.getMonth();
  }

  private getMonthName(): string {
    const monthName = new Intl.DateTimeFormat(this.locale, {
      month: 'long',
    }).format(this.currentDate);
    return monthName;
  }

  private getYear(): number {
    return this.currentDate.getFullYear();
  }

  static dateToString(date: Date): string {
    return `${date.getFullYear()}-${Cre8Calendar.formatMonthOrDayIndex(
      date.getMonth()
    )}-${Cre8Calendar.formatDate(date.getDate())}`;
  }

  private async updateFocusForKeydown(newDate: Date): Promise<void> {
    this.currentDate = newDate;
    await this.updateComplete;

    const newFocus = this.shadowRoot?.querySelector<HTMLButtonElement>(
      `button[datetime="${Cre8Calendar.dateToString(newDate)}"]`
    );
    newFocus.setAttribute('tabindex', '0');
    newFocus.focus();
  }

  private _handleCalendarKeyDown(e: KeyboardEvent) {
    const oldFocus = this.shadowRoot?.querySelector<HTMLButtonElement>(
      `button[datetime="${Cre8Calendar.dateToString(this.currentDate)}"]`
    );
    if (e.key === 'ArrowUp') {
      const newDate = new Date(
        this.getYear(),
        this.getMonth(),
        this.currentDate.getDate() - 7
      );
      this.updateFocusForKeydown(newDate);
      oldFocus.setAttribute('tabindex', '-1');
    }
    if (e.key === 'ArrowDown') {
      const newDate = new Date(
        this.getYear(),
        this.getMonth(),
        this.currentDate.getDate() + 7
      );
      this.updateFocusForKeydown(newDate);
      oldFocus.setAttribute('tabindex', '-1');
    }
    if (e.key === 'ArrowLeft') {
      const newDate = new Date(
        this.getYear(),
        this.getMonth(),
        this.currentDate.getDate() - 1
      );
      this.updateFocusForKeydown(newDate);
      oldFocus.setAttribute('tabindex', '-1');
    }
    if (e.key === 'ArrowRight') {
      const newDate = new Date(
        this.getYear(),
        this.getMonth(),
        this.currentDate.getDate() + 1
      );
      this.updateFocusForKeydown(newDate);
      oldFocus.setAttribute('tabindex', '-1');
    }
    if (e.key === 'Tab' && !e.shiftKey) {
      const outsideClickEvent = new CustomEvent('outsideClick', {
        detail: {
          composedPath: [],
        },
      });
      // This allows the tab off to happen before the calendar closes
      setTimeout(() => { this.dispatchEvent(outsideClickEvent); }, 20);
    }
  }

  private async changeMonthFromNav(month: number): Promise<void> {
    this.changeMonth(month);
    await this.updateComplete;

    const nav = this.shadowRoot?.querySelector(
      'cre8-calendar-navigation'
    );
    const monthPickerButton = nav.shadowRoot?.querySelector(
      '.cre8-c-calendar-navigation__month-modal-button'
    );
    await this.updateComplete;

    const button = monthPickerButton.shadowRoot.querySelector<HTMLButtonElement>('button');
    button.focus();
  }

  private async changeYearFromNav(year: number) {
    this.changeYear(year);
    await this.updateComplete;

    const nav = this.shadowRoot?.querySelector(
      'cre8-calendar-navigation'
    );
    const yearPickerButton = nav.shadowRoot?.querySelector(
      '.cre8-c-calendar-navigation__year-modal-button'
    );
    await this.updateComplete;

    const button = yearPickerButton.shadowRoot.querySelector<HTMLButtonElement>('button');
    button.focus();
  }

  /* Template Map Functions */
  private getDaysOfWeekAbbreviations(): TemplateResult[] {
    return this.weekDays.map(
      (day) => html` <td>
        <span aria-label="${day}">${day[0]}</span>
      </td>`
    );
  }

  /**
   * Create array of Day Buttons to fill in excess calendar space at the beginning of the month.
   *
   * 1. Map from empty array of length equal to the amount of access calendar "slots" in the beginning of the month.
   * (i.e. if the month starts on Wednesday (getDay = 3), there are 3 days prior that week from last month.)
   *
   * 2. Based on the indice of array, get the given day button's date, where the date is
   * the last day of last month minus the max of the array plus the indice plus one -> x = lastday - (max - (i + 1))
   * (Note: (max - (i + 1) equals the keys of the array in reverse order:
   * [max - i + 1] -> [3-1, 3-2, 3-3] -> [2,1,0] for an array of [3])
   * (i.e. if the calendar is starting on Wednesday June 1st, the access days on the calendar will be
   * Sunday May 29th (31 - (2)), Monday May 30th (31 - (1)), Tuesday May 31st (31 - (0)))
   *
   * 3. Build out day button with necessary props
   * */
  private getPreviousMonthDayButtons(): TemplateResult[] {
    /* 1 */
    return [
      ...Array(new Date(this.getYear(), this.getMonth(), 1).getDay()).keys(),
    ].map((i) => {
      const priorMonthArrayLength = new Date(
        this.getYear(),
        this.getMonth(),
        1
      ).getDay();

      const finalDayLastMonth = new Date(this.getYear(), this.getMonth(), 0);
      const numberOfDaysinLastMonth = finalDayLastMonth.getDate();

      /* 2 */
      const priorMonthDay = new Date(
        finalDayLastMonth.getFullYear(),
        finalDayLastMonth.getMonth(),
        numberOfDaysinLastMonth - priorMonthArrayLength + (i + 1)
      );

      const isToday = this.dateConfig.today.getDate() === priorMonthDay.getDate()
        && this.dateConfig.today.getMonth() === priorMonthDay.getMonth()
        && this.dateConfig.today.getFullYear() === priorMonthDay.getFullYear();

      const isSelected = new Date(`${this.fieldDate}T00:00`).getTime()
        === priorMonthDay.getTime();

      /* 3 */
      return html` <td>
        <button
          class="cre8-c-calendar__day-button cre8-c-calendar__different-month"
          datetime="${Cre8Calendar.dateToString(priorMonthDay)}"
          ?data-today="${isToday}"
          ?data-selected="${isSelected}"
          tabindex="-1"
          aria-label="${new Intl.DateTimeFormat(this.locale, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }).format(
            new Date(`${Cre8Calendar.dateToString(priorMonthDay)}T00:00`)
          )}"
          @click="${() => this.emitSelectedDate(Cre8Calendar.dateToString(priorMonthDay))}"
        >
          ${new Intl.NumberFormat(this.locale).format(priorMonthDay.getDate())}
        </button>
      </td>`;
    });
  }

  /**
   * Create array of Day Buttons to fill out current month
   *
   * 1. Map from empty array of length equal to the amount days in this month
   *
   * 2. Get the date of the current month based on indice of array (i.e. 0 -> 1st, 1 -> 2nd ...)
   *
   * 3. Build out day button with necessary props
   * */
  private getCurrentMonthDayButtons(): TemplateResult[] {
    /* 1 */
    return [...Array(this.numberOfDaysinMonth()).keys()].map((i) => {
      const dayOfTheMonth = i + 1;
      /* 2 */
      const current = new Date(this.getYear(), this.getMonth(), dayOfTheMonth);

      const isToday = this.dateConfig.today.getDate() === dayOfTheMonth
        && this.dateConfig.today.getMonth() === this.getMonth()
        && this.dateConfig.today.getFullYear() === this.getYear();

      const isSelected = new Date(`${this.fieldDate}T00:00`).getTime() === current.getTime();

      /* 3 */
      return html` <td>
        <button
          class="cre8-c-calendar__day-button"
          datetime="${Cre8Calendar.dateToString(current)}"
          ?data-today="${isToday}"
          ?data-selected="${isSelected}"
          tabindex="${dayOfTheMonth === this.currentDate.getDate()
            ? '0'
            : '-1'}"
          aria-label="${new Intl.DateTimeFormat(this.locale, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }).format(new Date(`${Cre8Calendar.dateToString(current)}T00:00`))}"
          @click="${() => this.emitSelectedDate(Cre8Calendar.dateToString(current))}"
        >
          ${new Intl.NumberFormat(this.locale).format(i + 1)}
        </button>
      </td>`;
    });
  }

  /**
   * Create array of Day Buttons to fill in excess calendar space at the end of the month.
   *
   * 1. Map from empty array of length equal to the amount of access calendar "slots" at the end of the month.
   * The array have an amount of slots equal to the number of days in a week minus how many days have already past
   * and since getDay returns the index of the day of the week (Sunday = 0, Monday = 1 ...) our equations is
   * x = 7 - (getDay() + 1)
   * Note: (we need to add 1 because indexing starts at 0)
   * so if the month ends on Monday (getDay() = 1), 5 = 7 - (1 + 1), there are 5 days that week from the new month
   *
   * 2. Get the date from the next month based on indice of array (i.e. 0 -> 1st, 1 -> 2nd ...)
   *
   * 3. Build out day button with necessary props
   * */
  private getNextMonthDayButtons(): TemplateResult[] {
    /* 1 */
    return [
      ...Array(
        6
          - new Date(
            this.getYear(),
            this.getMonth(),
            this.numberOfDaysinMonth()
          ).getDay()
      ).keys(),
    ].map((i) => {
      const lastDayThisMonth = new Date(
        this.getYear(),
        this.getMonth(),
        this.numberOfDaysinMonth()
      );
      const firstDayNextMonth = new Date(
        lastDayThisMonth.setDate(lastDayThisMonth.getDate() + 1)
      );

      /* 2 */
      const nextMonthDay = new Date(
        firstDayNextMonth.getFullYear(),
        firstDayNextMonth.getMonth(),
        i + 1
      );

      const isToday = this.dateConfig.today.getDate() === nextMonthDay.getDate()
        && this.dateConfig.today.getMonth() === nextMonthDay.getMonth()
        && this.dateConfig.today.getFullYear() === nextMonthDay.getFullYear();

      const isSelected = new Date(`${this.fieldDate}T00:00`).getTime()
        === nextMonthDay.getTime();

      /* 3 */
      return html` <td>
        <button
          class="cre8-c-calendar__day-button cre8-c-calendar__different-month"
          datetime="${Cre8Calendar.dateToString(nextMonthDay)}"
          ?data-today="${isToday}"
          ?data-selected="${isSelected}"
          tabindex="-1"
          aria-label="${new Intl.DateTimeFormat(this.locale, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }).format(
            new Date(`${Cre8Calendar.dateToString(nextMonthDay)}T00:00`)
          )}"
          @click="${() => this.emitSelectedDate(Cre8Calendar.dateToString(nextMonthDay))}"
        >
          ${new Intl.NumberFormat(this.locale).format(nextMonthDay.getDate())}
        </button>
      </td>`;
    });
  }

  render() {
    const componentClassNames = this.componentClassNames('cre8-c-calendar', {});

    return html` <div class="${componentClassNames}">
      ${this._activeModal === CalendarModal.Month
        ? html`<cre8-calendar-month-modal
            currentMonth="${this.getMonth()}"
            @changeMonth="${(e: CustomEvent) => this.changeMonthFromNav(e.detail.month)}"
          ></cre8-calendar-month-modal>`
        : nothing}
      ${this._activeModal === CalendarModal.Year
        ? html`<cre8-calendar-year-modal
            currentYear="${this.getYear()}"
            @changeYear="${(e: CustomEvent) => this.changeYearFromNav(e.detail.year)}"
          ></cre8-calendar-year-modal>`
        : nothing}
      ${this._activeModal === CalendarModal.None
        ? html` ${this.hasShortcuts
              ? html`<div class="cre8-c-calendar__header-shortcuts">
                    <cre8-button
                      text="Today"
                      variant="secondary"
                      size="sm"
                      @click="${() => this.emitSelectedDate(
                          Cre8Calendar.dateToString(this.dateConfig.today)
                        )}"
                    ></cre8-button>
                    <cre8-button
                      text="Tomorrow"
                      variant="secondary"
                      size="sm"
                      @click="${() => this.emitSelectedDate(
                          Cre8Calendar.dateToString(
                            new Date(
                              this.dateConfig.today.setDate(
                                this.dateConfig.today.getDate() + 1
                              )
                            )
                          )
                        )}"
                    ></cre8-button>
                    <cre8-button
                      text="In 2 days"
                      variant="secondary"
                      size="sm"
                      @click="${() => this.emitSelectedDate(
                          Cre8Calendar.dateToString(
                            new Date(
                              this.dateConfig.today.setDate(
                                this.dateConfig.today.getDate() + 2
                              )
                            )
                          )
                        )}"
                    ></cre8-button>
                </div>`
              : nothing}
            <cre8-calendar-navigation
              monthName="${this.getMonthName()}"
              year="${this.getYear()}"
              @activateModal="${(e: CustomEvent) => this.activateModal(e.detail.modal)}"
              @changeMonth="${(e: CustomEvent) => this.changeMonth(this.getMonth() + e.detail.addend)}"
              @changeYear="${(e: CustomEvent) => this.changeYear(this.getYear() + e.detail.addend)}"
            >
            </cre8-calendar-navigation>
            <table>
              <thead>
                <tr>
                  ${this.getDaysOfWeekAbbreviations()}
                </tr>
              </thead>
              <tbody>
                <tr @keydown=${this._handleCalendarKeyDown}>
                  ${this.getPreviousMonthDayButtons()}
                  ${this.getCurrentMonthDayButtons()}
                  ${this.getNextMonthDayButtons()}
                </tr>
              </tbody>
            </table>`
        : nothing}
    </div>`;
  }
}

if (customElements.get('cre8-calendar') === undefined) {
  customElements.define('cre8-calendar', Cre8Calendar);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-calendar': Cre8Calendar;
  }
}
