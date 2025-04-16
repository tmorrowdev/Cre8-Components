import { html, unsafeCSS } from 'lit';
import { Cre8Element } from '../cre8-element';
import styles from './table-header.scss';

/**
 * @slot - The component content
 */

export class Cre8TableHeader extends Cre8Element {
    static get styles() {
        return unsafeCSS(styles.toString());
    }

    render() {
        const componentClassNames = this.componentClassNames('cre8-c-table__header', {});

        return html`
      <thead role="rowgroup" class="${componentClassNames}">
        ${html`<slot></slot>`}
      </thead>
    `;
    }
}

if (customElements.get('cre8-table-header') === undefined) {
    customElements.define('cre8-table-header', Cre8TableHeader);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-table-header': Cre8TableHeader;
  }
}

export default Cre8TableHeader;
