import { html, unsafeCSS } from 'lit';
import { Cre8Element } from '../cre8-element';
import styles from './grid-item.module';

/**
 * @slot - The content of the grid item
 */
export class Cre8GridItem extends Cre8Element {
    static styles = [styles];

    render() {
        const componentClassName = this.componentClassNames('cre8-c-grid__item', {});

        return html`
      <div class="${componentClassName}">
        <slot></slot>
      </div>
    `;
    }
}

if (customElements.get('cre8-grid-item') === undefined) {
    customElements.define('cre8-grid-item', Cre8GridItem);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-grid-item': Cre8GridItem;
  }
}

export default Cre8GridItem;
