import { html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import styles from './band.scss';

/**
 * @slot - The band content
 */
export class Cre8Band extends Cre8Element {
    static get styles() {
        return unsafeCSS(styles);
    }

  /**
   * Gradient variant
   * <cre8-text-passage size="sm">
   * <ul>
   * <li>**1** renders the band with the set gradient background</li>
   * </ul>
   * </cre8-text-passage>
   */
  @property()
      variant?: 'branded';

  /**
   * Full height variant
   * 1) Sets the height to 100%
   */
  @property({ type: Boolean, reflect: true })
      fullHeight?: boolean;

  render() {
      const componentClassName = this.componentClassNames('cre8-c-band', {
          'cre8-c-band--branded': this.variant === 'branded',
          'cre8-c-band--full-height': this.fullHeight === true,
      });

      return html`
      <div class="${componentClassName}">
        <slot></slot>
      </div>
    `;
  }
}

if (customElements.get('cre8-band') === undefined) {
    customElements.define('cre8-band', Cre8Band);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-band': Cre8Band;
  }
}

export default Cre8Band;
