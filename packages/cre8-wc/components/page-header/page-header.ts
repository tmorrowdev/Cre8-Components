import { html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import styles from './page-header.module';

/**
 * @slot - The page header content
 */
export class Cre8PageHeader extends Cre8Element {
    static styles = [styles];

  /**
   * Page header title
   */
  @property({ type: String })
      heading: string = 'Page header title';

  render() {
      const componentClassName = this.componentClassNames('cre8-c-page-header', {});

      return html`
      <div class="${componentClassName}">
        <h1 class="cre8-c-page-header__title">
          ${this.heading}
          ${this.slotNotEmpty('titCre8ter') && html`
          <div class="cre8-c-page-header__title-after">
            <slot name="titCre8ter"></slot>
          </div>`}
        </h1>
        <div class="cre8-c-page-header__description">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

if (customElements.get('cre8-page-header') === undefined) {
    customElements.define('cre8-page-header', Cre8PageHeader);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-page-header': Cre8PageHeader;
  }
}

export default Cre8PageHeader;
