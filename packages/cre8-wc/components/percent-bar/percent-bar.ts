/* eslint-disable indent */
import { html, nothing, unsafeCSS } from 'lit';
import svgCaretUp from '/Users/tylersmbp/Projects/cre8-web-components/packages/cre8-wc/icons/System/Regular/Caret_Up.svg?raw';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import '../button/button';
import '../text-passage/text-passage';
import '../progress-meter/progress-meter';
import styles from './percent-bar.module';

/**
 * The percent bar visually indicates a user's current progress and has a few features: a basic display bar with
 * a percentage, an actionable icon that allows a user to revisit a prior step and an actionable link that
 * allows a user save their progress before exiting.
 */
export class Cre8PercentBar extends Cre8Element {
  static get styles() {
    return unsafeCSS(styles.toString());
  }

  /*
   * The current step the user is on.
   */
  @property()
  value: number;

  /*
   * The total number of steps in the multistep process.
   */
  @property()
  max: number;

  /*
   * The action-left icon-only tertiary button in the percent bar controls can be disabled.
   */
  @property({ type: Boolean, reflect: true })
  disableActionLeft?: boolean;

  private _handleClick(e: MouseEvent) {
    this.dispatchEvent(new Event('leftActionButtonClick', e));
  }

  private fractionAsPercent(): number {
    return Math.round((this.value / this.max) * 100);
  }

  private isFirstStep(): boolean {
    return this.value > 1;
  }

  render() {
    const componentClassNames = this.componentClassNames('cre8-c-percent-bar', {});

    return html`
      <div class="${componentClassNames}">
          <div class="cre8-c-percent-bar__controls">
              <div lass="cre8-c-percent-bar__left-controls">
                ${this.isFirstStep()
                  ? html` <cre8-button
                      ?hideText=${true}
                      svg="${svgCaretUp}"
                      iconRotateDegree="-90"
                      variant="tertiary"
                      ?disabled=${this.disableActionLeft}
                      @click="${this._handleClick}"
                    >
                    </cre8-button>`
                  : nothing}
              </div>
              <div class="cre8-c-percent-bar__right-controls">
                <cre8-text-passage
                  size="small"
                  class="cre8-c-percent-bar__text-passage"
                >
                  ${this.fractionAsPercent()}%
                </cre8-text-passage>
              </div>
            </div>
        <cre8-progress-meter
          value="${this.value}"
          max="${this.max}"
        ></cre8-progress-meter>
      </div>
    `;
  }
}

if (customElements.get('cre8-percent-bar') === undefined) {
  customElements.define('cre8-percent-bar', Cre8PercentBar);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-percent-bar': Cre8PercentBar;
  }
}

export default Cre8PercentBar;
