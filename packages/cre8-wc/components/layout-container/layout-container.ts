import { html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import styles from './layout-container.scss';

/**
 * @slot - The contents of the layout container
 */
export class Cre8LayoutContainer extends Cre8Element {
    static get styles() {
        return unsafeCSS(styles);
    }

  /**
   * Full height variant
   * 1) Sets the height to 100%
   */
  @property({ type: Boolean, reflect: true })
      fullHeight?: boolean;

  render() {
      const componentClassName = this.componentClassNames('cre8-l-layout-container', {
          'cre8-l-layout-container--full-height': this.fullHeight === true,
      });

      return html`
      <div class="${componentClassName}">
        <slot></slot>
      </div>
    `;
  }
}

if (customElements.get('cre8-layout-container') === undefined) {
    customElements.define('cre8-layout-container', Cre8LayoutContainer);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-layout-container': Cre8LayoutContainer;
  }
}

export default Cre8LayoutContainer;
