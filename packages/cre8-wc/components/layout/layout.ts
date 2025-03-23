import { html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import styles from './layout.scss';

/**
 * @slot - The layout content
 */
export class cre8Layout extends Cre8Element {
    static get styles() {
        return unsafeCSS(styles);
    }

  /**
   *  Style variants
   * <cre8-text-passage size="sm">
   * <ul>
   * <li>Default is a right sidebar</li>
   * <li>**left-sidebar** formats the first `layout-section` component as a left sidebar</li>
   * </ul>
   * </cre8-text-passage>
   */
  @property()
      variant?: 'left-sidebar';

  render() {
      const componentClassName = this.componentClassNames('cre8-c-layout', {
          'cre8-c-layout--left-sidebar': this.variant === 'left-sidebar',
      });

      return html`
      <div class="${componentClassName}">
        <slot></slot>
      </div>
    `;
  }
}

if (customElements.get('cre8-layout') === undefined) {
    customElements.define('cre8-layout', cre8Layout);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-layout': cre8Layout;
  }
}

export default cre8Layout;
