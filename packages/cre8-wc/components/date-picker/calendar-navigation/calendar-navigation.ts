/* eslint-disable lit/no-template-arrow */
/* TODO: remove eslint disable on no-template-arrow */
import { html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../../cre8-element';
import styles from './calendar-navigation.scss';
import '../../button/button';
import '../../icon/icon';

export class cre8CalendarNavigation extends Cre8Element {
    static get styles() {
        return unsafeCSS(styles.toString());
    }

  @property({ type: String, reflect: true })
      monthName: string;

  @property({ type: String, reflect: true })
      year: number;

  private activateModal(modal: string): void {
      const event = new CustomEvent('activateModal', {
          detail: {
              modal,
          },
      });
      this.dispatchEvent(event);
  }

  private changeMonth(addend: number): void {
      const event = new CustomEvent('changeMonth', {
          detail: {
              addend,
          },
      });
      this.dispatchEvent(event);
  }

  private changeYear(addend: number): void {
      const event = new CustomEvent('changeYear', {
          detail: {
              addend,
          },
      });
      this.dispatchEvent(event);
  }

  render() {
      const componentClassNames = this.componentClassNames(
          'cre8-c-calendar-navigation',
          {}
      );

      return html`
      <div class="${componentClassNames}">
        <cre8-button
          variant="tertiary"
          text="Previous year"
          ?hideText=${true}
          iconName="caret-double-left"
          @click="${() => this.changeYear(-1)}"
        ></cre8-button>

        <cre8-button
          variant="tertiary"
          text="Previous month"
          ?hideText=${true}
          iconName="keyboard-arrow-left"
          @click="${() => this.changeMonth(-1)}"
        ></cre8-button>

        <div class="cre8-c-calendar-navigation__inner-buttons">
          <cre8-button
            class="cre8-c-calendar-navigation__month-modal-button"
            variant="tertiary"
            text="${this.monthName}"
            aria-label="${this.monthName}, month picker modal"
            size="sm"
            @click="${() => this.activateModal('month')}"
          ></cre8-button>

          <cre8-button
            class="cre8-c-calendar-navigation__year-modal-button"
            variant="tertiary"
            text="${this.year}"
            aria-label="${this.year}, year picker modal"
            size="sm"
            @click="${() => this.activateModal('year')}"
          ></cre8-button>
        </div>

        <cre8-button
          variant="tertiary"
          text="Next month"
          ?hideText=${true}
          iconName="keyboard-arrow-right"
          @click="${() => this.changeMonth(1)}"
        ></cre8-button>

        <cre8-button
          variant="tertiary"
          text="Next year"
          ?hideText=${true}
          iconName="caret-double-right"
          @click="${() => this.changeYear(1)}"
        ></cre8-button>
      </div>
    `;
  }
}

if (customElements.get('cre8-calendar-navigation') === undefined) {
    customElements.define('cre8-calendar-navigation', cre8CalendarNavigation);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-calendar-navigation': cre8CalendarNavigation;
  }
}

export default cre8CalendarNavigation;
