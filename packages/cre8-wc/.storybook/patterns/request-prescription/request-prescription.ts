import classnames from 'classnames';
import { html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Cre8Element } from '../../../components/cre8-element';
import styles from './request-prescription.scss';

/**
 * An example element.
 *
 */
@customElement('request-prescription')
export class RequestPrescription extends Cre8Element {
  static get styles() {
    return unsafeCSS(styles.toString());
  }

  /**
   * Append to the class name. Used for passing in utility classes
   */
  @property()
  styleModifier?: string;

  render() {
    const componentClassName = classnames('c-request-prescription', this.styleModifier, {});

    return html`
      <div class="${componentClassName}">
        <slot></slot>
        ${this.slotNotEmpty('footer') && html`<div class="c-request-prescription__footer"><slot name="footer"></slot></div>`}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'request-prescription': RequestPrescription;
  }
}
