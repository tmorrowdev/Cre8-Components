import { html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import styles from './feature.scss';

/**
 * @slot - The component content
 */
export class cre8Feature extends Cre8Element {
    static get styles() {
        return unsafeCSS(styles.toString());
    }

  /**
   * Image source
   */
  @property()
      imgSrc?: string;

  /**
   * Image alt text
   */
  @property()
      imgAlt?: string;

  /**
   * Inverted variant
   * 1) Used for dark backgrounds
   */
  @property({ type: Boolean, reflect: true })
      inverted?: boolean;

  render() {
      const componentClassNames = this.componentClassNames('cre8-c-feature', {
          'cre8-c-feature--inverted': this.inverted === true,
      });

      return html`
      <div class="${componentClassNames}" part="feature">
        <div class="cre8-c-feature__body" part="body">
          <slot></slot>
        </div>
        ${this.imgAlt
        ? html`<div class="cre8-c-feature__media">
              <img class="cre8-c-feature__image" src=${this.imgSrc} alt=${this.imgAlt} part="image" />
            </div>`
        : ''}
      </div>
    `;
  }
}

if (customElements.get('cre8-feature') === undefined) {
    customElements.define('cre8-feature', cre8Feature);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-feature': cre8Feature;
  }
}

export default cre8Feature;
