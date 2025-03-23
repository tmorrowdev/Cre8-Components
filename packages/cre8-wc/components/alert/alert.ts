import svgWarningFilled from '@cre8/cre8-icons/lib/icons/System/Filled/Warning.svg?raw';
import svgCheckCircle from '@cre8/cre8-icons/lib/icons/System/Filled/Check.svg?raw';
import svgInfoFilled from '@cre8/cre8-icons/lib/icons/System/Filled/Info.svg?raw';
import svgErrorFilled from '@cre8/cre8-icons/lib/icons/System/Filled/Error.svg?raw';
import svgLightbulbFilled from '@cre8/cre8-icons/lib/icons/System/Filled/Lightbulb.svg?raw';
import svgClose from '@cre8/cre8-icons/lib/icons/System/Regular/Close.svg?raw';
import { html, nothing, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import '../button/button';
import '../link/link';
import '../heading/heading';
import '../text-passage/text-passage';
import '@cre8/cre8-icons';
import '../icon/icon';
import { Cre8Element } from '../cre8-element';
import styles from './alert.scss';

/**
 * The general purpose of an alert or notification is to draw the user’s attention
 * and provide the user with timely, relevant information.
 *
 * ## Alert Styles:
 * - There are 6 statuses for 6 types of alerts: 'error', 'info', 'notification', 'neutral', 'warning', 'success'.
 * Each alert will have different icon to be displayed in the alert.
 * - Users can select two types of alert variants: 'standalone', or 'banner'.
 * - User can also choose the alert should be emphasized or not. There are two options: subtle or strong.
 * - User can add button or link in the alert.
 * If users choose to emphasize the alert (**strong**), user needs to used **"inverted"** prop in button or link.
 * - User can choose whether the alert can be dismissed or not
 *
 */

export class cre8Alert extends Cre8Element {
    static get styles() {
        return unsafeCSS(styles.toString());
    }

  /** The alert type. */
  @property({ reflect: true })
      status?:
      | 'error'
      | 'info'
      | 'notification'
      | 'neutral'
      | 'warning'
      | 'success' = 'info';

  /** The alert variant. */
  @property({ reflect: true })
      variant: 'standalone' | 'banner' = 'standalone';

  @property({ reflect: true })
      emphasis: 'subtle' | 'strong' = 'subtle';


  @property({ type: String })
      iconAlert: string = undefined;

  /**
   * Icon title used for the icon alt text
   */
  @property()
      iconTitle?: string;

  @property({ type: String })
      headerText: string = undefined;

  @property({ type: String })
      ctaBody: string = undefined;

  /**
   * Dismissed property
   * 1) State that changes to true and is removed when the banner is dismissed
   */
  @property({ type: Boolean, reflect: true })
      dismissed?: boolean;

  /**
   * Dismissable property
   * 1) Adds the ability to close when toggled to true
   */
  @property({ type: Boolean, reflect: true })
      notDismissible?: boolean;

  /**
   * On banner dismiss
   * 1) Function that toggles dismissed to true and removes the banner from the UI
   */
  onDismiss() {
      this.dismissed = true; /* 1 */
  }

  private checkEmphasisAlert = () => {
      if (this.emphasis === 'subtle') {
          return false;
      } return true;
  };

  private mapStatusToIconAlert = (status: string) => {
      switch (status) {
          case 'error':
              return html`<cre8-icon
              svg="${svgErrorFilled}"
              aria-label="${this.iconTitle}"
              aria-hidden="true"
              class="cre8-c-alert__icon"
              ></cre8-icon>`;
          case 'success':
              return html`<cre8-icon
              svg="${svgCheckCircle}"
              aria-label="${this.iconTitle}"
              aria-hidden="true"
              class="cre8-c-alert__icon"
              ></cre8-icon>`;
          case 'warning':
              return html`<cre8-icon
              svg="${svgWarningFilled}"
              aria-label="${this.iconTitle}"
              aria-hidden="true"
              class="cre8-c-alert__icon"
              ></cre8-icon>`;
          case 'notification':
              return html`<cre8-icon
              svg="${svgLightbulbFilled}"
              aria-label="${this.iconTitle}"
              aria-hidden="true"
              class="cre8-c-alert__icon"
              ></cre8-icon>`;
          case 'info':
              return html`<cre8-icon
              svg="${svgInfoFilled}"
              aria-label="${this.iconTitle}"
              aria-hidden="true"
              class="cre8-c-alert__icon"
              ></cre8-icon>`;
          case 'neutral':
              return html`<cre8-icon
              svg="${svgInfoFilled}"
              aria-label="${this.iconTitle}"
              aria-hidden="true"
              class="cre8-c-alert__icon"
              ></cre8-icon>`;
          default:
              return nothing;
      }
  };

  render() {
      const componentClassNames = this.componentClassNames('cre8-c-alert', {
          'cre8-c-alert--error': this.status === 'error',
          'cre8-c-alert--info': this.status === 'info',
          'cre8-c-alert--notification': this.status === 'notification',
          'cre8-c-alert--neutral': this.status === 'neutral',
          'cre8-c-alert--success': this.status === 'success',
          'cre8-c-alert--warning': this.status === 'warning',
          'cre8-c-alert--standalone': this.variant === 'standalone',
          'cre8-c-alert--banner': this.variant === 'banner',
          'cre8-c-alert--emphasis-subtle': this.emphasis === 'subtle',
          'cre8-c-alert--notdismissible': this.notDismissible,
      });

      return this.dismissed
          ? null
          : html`
          <dialog open>
            <div class="${componentClassNames}">
              <div class="cre8-c-alert__container">
                ${this.status
        ? html` ${this.mapStatusToIconAlert(this.status)}`
        : ''}
                <div class="cre8-c-alert__message-container">
                  <div class="cre8-c-alert__heading-container">
                    ${this.headerText
        ? html`${this.headerText}`
        : ''}
                    ${this.notDismissible
        ? ''
        : html`<cre8-button
                     class="cre8-c-alert__close-btn"
                     svg='${svgClose}'
                     iconRotateDegree="90"
                     iconPosition="after"
                     variant="tertiary"
                     text="close"
                     ?hideText=${true}
                     @click=${this.onDismiss}
                     ?inverted=${this.checkEmphasisAlert()}
              ></cre8-button>`}
                  </div>
                  <div class="cre8-c-alert__body-container">
                    <slot></slot>
                  </div>
                  <div class="cre8-c-alert__footer-container">
                        <slot name="cta">${this.ctaBody}</slot>
                      </div>
                </div>
              </div>
            </div>
          </dialog>
        `;
  }
}

if (customElements.get('cre8-alert') === undefined) {
    customElements.define('cre8-alert', cre8Alert);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-alert': cre8Alert;
  }
}

export default cre8Alert;
