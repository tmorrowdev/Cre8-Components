import { html, unsafeCSS } from 'lit';
import { Cre8Element } from '../cre8-element';
import styles from './table-object.module';

/**
 * @slot - The component content
 */

export class Cre8TableObject extends Cre8Element {
    static styles = [styles];

    render() {
        const componentClassNames = this.componentClassNames('cre8-c-table-object', {});

        return html`
      <div class="${componentClassNames}">
        ${this.slotNotEmpty('header') && html`
          <div class="cre8-c-table-object__header" part="header">
            <slot name="header"></slot>
          </div>
        `}
        <div class="cre8-c-table-object__body">
          <slot></slot>
        </div>
        ${this.slotNotEmpty('footer') && html`
          <div class="cre8-c-table-object__footer">
            <slot name="footer"></slot>
          </div>
        `}
      </div>
    `;
    }
}

if (customElements.get('cre8-table-object') === undefined) {
    customElements.define('cre8-table-object', Cre8TableObject);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-table-object': Cre8TableObject;
  }
}

export default Cre8TableObject;
