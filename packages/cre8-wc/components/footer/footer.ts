import { html, unsafeCSS } from 'lit';
import { Cre8Element } from '../cre8-element';
import styles from './footer.module';

/**
 * @slot - The footer content
 * @slot top - The top content (above the default slot)
 * @slot bottom - The bottom content (below the default slot)
 */
export class Cre8Footer extends Cre8Element {
    static styles = [styles];

    render() {
        const componentClassName = this.componentClassNames('cre8-c-footer', {});

        return html`
      <footer class="${componentClassName}" role="contentinfo">
        ${this.slotNotEmpty('top')
        && html`<div class="cre8-c-footer__top">
          <cre8-layout-container>
            <slot name="top"></slot>
          </cre8-layout-container>
        </div>`}
        <div class="cre8-c-footer__middle">
          <cre8-layout-container>
            <slot></slot>
          </cre8-layout-container>
        </div>
        ${this.slotNotEmpty('bottom')
        && html`<div class="cre8-c-footer__bottom">
          <cre8-layout-container>
            <slot name="bottom"></slot>
          </cre8-layout-container>
        </div>`}
      </footer>
    `;
    }
}

if (customElements.get('cre8-footer') === undefined) {
    customElements.define('cre8-footer', Cre8Footer);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-footer': Cre8Footer;
  }
}

export default Cre8Footer;
