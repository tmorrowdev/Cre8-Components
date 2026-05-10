import { html,  } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import styles from './feature.styles.js';

/**
 * @slot - The component content
 */
export class Cre8Feature extends Cre8Element {
    static styles = [styles];

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

  /**
   * CSS aspect-ratio for the image (e.g. "4/3", "16/9", "1"). Defaults to natural image ratio.
   */
  @property()
      aspectRatio?: string;

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
              <img class="cre8-c-feature__image" src=${this.imgSrc} alt=${this.imgAlt} part="image" style=${this.aspectRatio ? `aspect-ratio:${this.aspectRatio};object-fit:cover;width:100%` : ''} />
            </div>`
        : ''}
      </div>
    `;
  }
}

if (customElements.get('cre8-feature') === undefined) {
    customElements.define('cre8-feature', Cre8Feature);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-feature': Cre8Feature;
  }
}

export default Cre8Feature;
