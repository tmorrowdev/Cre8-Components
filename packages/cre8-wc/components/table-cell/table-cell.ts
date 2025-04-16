import { html, unsafeCSS } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import styles from './table-cell.scss';

/**
 * @slot - The component content
 */

export class Cre8TableCell extends Cre8Element {
    static get styles() {
        return unsafeCSS(styles.toString());
    }

  /**
   * Colspan attribute on td
   */
  @property({ type: Number })
      colspan?: number;

  /**
   * Style variants
   * <cre8-text-passage size="sm">
   * <ul>
   * <li>**bare** renders a table cell without a border</li>
   * </ul>
   * </cre8-text-passage>
   */
  @property()
      variant?: 'bare';

  /**
   * Column header text for cell to display when table is using responsive variant
   */
  @property()
      dataHeader?: string;

  render() {
      const componentClassNames = this.componentClassNames('cre8-c-table__cell', {
          'cre8-c-table__cell--bare': this.variant === 'bare',
      });

      return html`
      <td
        data-header="${this.dataHeader}"
        role="cell"
        colspan=${ifDefined(this.colspan)}
        class="${componentClassNames}"
      >
        ${html`<slot></slot>`}
      </td>
    `;
  }
}

if (customElements.get('cre8-table-cell') === undefined) {
    customElements.define('cre8-table-cell', Cre8TableCell);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-table-cell': Cre8TableCell;
  }
}

export default Cre8TableCell;
