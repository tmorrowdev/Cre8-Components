import { html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import styles from './hero.scss';

/**
 * @slot - The component content
 */
export class Cre8Hero extends Cre8Element {
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
   * Position variant. Bottom left is the default position
   * <cre8-text-passage size="sm">
   * <ul>
   * <li>**top-left** renders content in the top left corner of the image</li>
   * <li>**left** renders content in the left, center part of the image</li>
   * <li>**top-center** renders content in the top, center part of the image</li>
   * <li>**center** renders content center of the image</li>
   * <li>**bottom-center** renders content bottom center of the image</li>
   * <li>**top-right** renders content top-right of the image</li>
   * <li>**right** renders content right of the image</li>
   * <li>**bottom-right** renders content bottom, right part of the image</li>
   * </ul>
   * </cre8-text-passage>
   */
  @property()
      align?: 'top-left' | 'left' | 'top-center' | 'center' | 'bottom-center' | 'top-right' | 'right' | 'bottom-right';

  render() {
      const componentClassNames = this.componentClassNames('cre8-c-hero', {
          'cre8-c-hero--top-left': this.align === 'top-left',
          'cre8-c-hero--left': this.align === 'left',
          'cre8-c-hero--top-center': this.align === 'top-center',
          'cre8-c-hero--center': this.align === 'center',
          'cre8-c-hero--bottom-center': this.align === 'bottom-center',
          'cre8-c-hero--top-right': this.align === 'top-right',
          'cre8-c-hero--right': this.align === 'right',
          'cre8-c-hero--bottom-right': this.align === 'bottom-right',
      });

      return html`
      <div class="${componentClassNames}">
        <cre8-layout-container>
          <img class="cre8-c-hero__image" src="${this.imgSrc}" alt="${this.imgAlt}" />
          <div class="cre8-c-hero__body">
            <slot></slot>
          </div>
        </cre8-layout-container>
      </div>
    `;
  }
}

if (customElements.get('cre8-hero') === undefined) {
    customElements.define('cre8-hero', Cre8Hero);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-hero': Cre8Hero;
  }
}

export default Cre8Hero;
