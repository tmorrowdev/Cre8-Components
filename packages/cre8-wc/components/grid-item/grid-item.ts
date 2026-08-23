import { html,  } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import styles from './grid-item.styles.js';

/**
 * @slot - The content of the grid item
 */
export class Cre8GridItem extends Cre8Element {
    static styles = [styles];

    /**
     * Full height
     * 1) Stretches the item to fill the height of its row. Off by default -
     *   only turn this on when the items in a row should line up edge to
     *   edge regardless of how much content each one has.
     */
    @property({ type: Boolean, reflect: true })
        fullHeight?: boolean;

    render() {
        const componentClassName = this.componentClassNames('cre8-c-grid__item', {
            'cre8-c-grid__item--full-height': this.fullHeight === true,
        });

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
