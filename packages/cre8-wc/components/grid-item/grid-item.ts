import { html, unsafeCSS } from 'lit';
import { Cre8Element } from '../cre8-element';
import styles from './grid-item.scss';

/**
 * @slot - The content of the grid item
 */
export class cre8GridItem extends Cre8Element {
    static get styles() {
        return unsafeCSS(styles);
    }

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
    customElements.define('cre8-grid-item', cre8GridItem);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-grid-item': cre8GridItem;
  }
}

export default cre8GridItem;
