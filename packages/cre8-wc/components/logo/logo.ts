import { html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import styles from './logo.module';

/**
 * @slot - The logo element
 */
export class Cre8Logo extends Cre8Element {
    static styles = [styles];

  /**
   * Logo link
   */
  @property()
      href?: string;

  render() {
      const componentClassName = this.componentClassNames('cre8-c-logo', {});

      return html`
      <a href="${this.href}" class="${componentClassName}">
       
      </a>
    `;
  }
}

if (customElements.get('cre8-logo') === undefined) {
    customElements.define('cre8-logo', Cre8Logo);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-logo': Cre8Logo;
  }
}

export default Cre8Logo;
