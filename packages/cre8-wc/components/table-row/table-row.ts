import svgCaretUp from '@Cre8/cre8-icons/lib/icons/System/Regular/Caret Up.svg?raw';
import { html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import styles from './table-row.scss';
import '../button/button';
import '../table-cell/table-cell';

/**
 * @slot - The component content
 */

export class Cre8TableRow extends Cre8Element {
    static get styles() {
        return unsafeCSS(styles.toString());
    }

    toggleIsExpanded() {
        this.isExpanded = !this.isExpanded;
        if (this.classList.contains('cre8-is-expanded')) {
            this.classList.remove('cre8-is-expanded');
        } else {
            this.classList.add('cre8-is-expanded');
        }
    }

  /**
   * Visually show additional expandable content
   */
  @property({ type: Boolean, reflect: true })
      isExpanded?: boolean;

  /**
   * Indicates row has additional visually hidden related content
   */
  @property({ type: Boolean, reflect: true })
      isExpandable?: boolean;

  /**
   * Style variants
   * <cre8-text-passage size="sm">
   * <ul>
   * <li>**bare** renders a table row without a border</li>
   * </ul>
   * </cre8-text-passage>
   */
  @property()
      variant?: 'bare';

  /**
   * Expanded button text
   */
  @property()
      expandedButtonText: string = 'Collapse Table Row';

  /**
   * Expand button text
   */
  @property()
      collapsedButtonText: string = 'Expand Table Row';

  render() {
      const componentClassNames = this.componentClassNames('cre8-c-table__row', {
          'cre8-c-table__row--expandable': this.isExpandable,
          'cre8-c-table__row--bare': this.variant === 'bare',
          'cre8-is-expanded': this.isExpanded,
      });

      return html`
      <tr role="row" class="${componentClassNames}">
        ${this.isExpandable
        ? html`<cre8-table-cell>
              <button
                class="cre8-c-table__expand-button" 
                aria-expanded=${!!this.isExpanded}
                @click=${this.toggleIsExpanded}
              >
                <span class="cre8-c-table__expand-button-text">
                  ${this.isExpanded ? this.expandedButtonText : this.collapsedButtonText}
                </span>
                <cre8-icon svg='${svgCaretUp}' rotate="90" class="cre8-c-table__expand-button-icon"></cre8-icon>
              </button>
            </cre8-table-cell>`
        : ''}
        ${html`<slot></slot>`}
      </tr>
      ${this.isExpandable
        ? html` <slot class="cre8-c-table__expandable-content" name="expandableContent"><slot></slot></slot>`
        : ''}
    `;
  }
}

if (customElements.get('cre8-table-row') === undefined) {
    customElements.define('cre8-table-row', Cre8TableRow);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-table-row': Cre8TableRow;
  }
}

export default Cre8TableRow;
