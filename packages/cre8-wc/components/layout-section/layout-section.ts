import { html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import styles from './layout-section.scss';

/**
 * @slot - The content of the layout section
 */
export class Cre8LayoutSection extends Cre8Element {
    static get styles() {
        return unsafeCSS(styles);
    }

  /**
   * Behavioral variants
   * - **sticky** allows the layout section to stick to the screen until the
   *   section reaches the bottom of the layout or the next layout section.
   */
  @property()
      behavior?: 'sticky';

  /**
   * Top style
   * 1) Used to create dynamic sticky containers that can be adjusted based on the content
   */
  @property()
      top?: string = '1rem';

  render() {
      const componentClassName = this.componentClassNames('cre8-c-layout-section', {
          'cre8-c-layout-section--sticky': this.behavior === 'sticky',
      });

      return html`
      <div class="${componentClassName}" style=${`top: ${this.top}`}>
        <slot></slot>
      </div>
    `;
  }
}

if (customElements.get('cre8-layout-section') === undefined) {
    customElements.define('cre8-layout-section', Cre8LayoutSection);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-layout-section': Cre8LayoutSection;
  }
}

export default Cre8LayoutSection;
