import { html, unsafeCSS } from 'lit';
import { Cre8Element } from '../cre8-element';
import styles from './table-body.module';

/**
 * @slot - The component content
 */

export class Cre8TableBody extends Cre8Element {
    static styles = [styles];

    render() {
        const componentClassNames = this.componentClassNames('cre8-c-table__body', {});

        return html`
      <tbody role="rowgroup" class="${componentClassNames}">
        ${html`<slot></slot>`}
      </tbody>
    `;
    }
}

if (customElements.get('cre8-table-body') === undefined) {
    customElements.define('cre8-table-body', Cre8TableBody);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-table-body': Cre8TableBody;
  }
}

export default Cre8TableBody;
