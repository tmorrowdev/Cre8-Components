import { html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import styles from './main.scss';

/**
 * @slot - The main content
 */
export class cre8Main extends Cre8Element {
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
      const componentClassName = this.componentClassNames('cre8-c-main', {
          'cre8-c-main--full-height': this.fullHeight === true,
      });

      return html`<main class=${componentClassName}><slot></slot></main>`;
  }
}

if (customElements.get('cre8-main') === undefined) {
    customElements.define('cre8-main', cre8Main);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-main': cre8Main;
  }
}

export default cre8Main;
