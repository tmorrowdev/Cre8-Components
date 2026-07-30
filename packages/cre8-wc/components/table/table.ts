import { html,  } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import { syncLightChildren, type ChildSpec } from '../utils/light-children';
import styles from './table.styles.js';


/**
 * One row in a data-driven table: either an object keyed by column `key`, or a
 * plain array of cell values positioned to match `columns`.
 */
export type Cre8TableRowData = Record<string, string | number> | Array<string | number>;

/** One column in a data-driven table. */
export interface Cre8TableColumn {
  /** Header text. Also stamped onto every cell beneath it as `dataHeader`. */
  label: string;
  /** Key to read each row's value from, when rows are objects. */
  key?: string;
  /** Inline width for the column, e.g. `"20%"`. */
  width?: string;
}

/**
 * @slot - The component content
 */

export class Cre8Table extends Cre8Element {
    static styles = [styles];

  /**
   * Columns for a data-driven table. Set this with `rows` and the table builds
   * its own header, body, rows and cells — the same composition you would write
   * by hand, generated into the light DOM, so nothing about styling or
   * behaviour changes.
   *
   * Leave both unset to compose the table yourself with `cre8-table-header`,
   * `cre8-table-body` and friends. Do not do both on one table.
   */
  @property({ type: Array })
      columns?: Cre8TableColumn[];

  /**
   * Rows for a data-driven table. Each row is either an object keyed by the
   * columns' `key`, or an array of values positioned to match `columns`.
   */
  @property({ type: Array })
      rows?: Cre8TableRowData[];

  /**
   * Specifies the caption/title of the table, visible to all users.
   * Increases accessibility of table.
   */
  @property()
      caption?: string;

  /**
   * Behavior variants
   * <cre8-text-passage size="sm">
   * <ul>
   * <li>**responsive** stacks column headers with respective table cells on small screens</li>
   * </ul>
   * </cre8-text-passage>
   */
  @property()
      behavior?: 'responsive';

  /**
   * Hoverable rows variant
   * 1) Allows the table rows to be styled on hover
   */
  @property({ type: Boolean, reflect: true })
      isHoverable?: boolean;

  /**
   * Style variants
   * <cre8-text-passage size="sm">
   * <ul>
   * <li>**striped** add zebra-striping to table rows within the `<tbody>`</li>
   * </ul>
   * </cre8-text-passage>
   */
  @property()
      variant?: 'striped';

  /**
   * The composition `columns` and `rows` stand for. Kept as data rather than
   * markup so the reconciler can update a cell in place instead of rebuilding
   * the table under the user's cursor.
   */
  private buildComposition(): ChildSpec[] | null {
      if (!this.columns && !this.rows) return null;
      const columns = this.columns ?? [];
      const rows = this.rows ?? [];

      const cell = (value: unknown, column?: Cre8TableColumn, header = false): ChildSpec => ({
          tag: header ? 'cre8-table-header-cell' : 'cre8-table-cell',
          props: header
              ? { width: column?.width }
              // `behavior="responsive"` stacks each cell under a repeat of its
              // column header, which the cell reads from `dataHeader`. Writing
              // that by hand means restating every header on every row.
              : { dataHeader: column?.label },
          text: value === undefined || value === null ? '' : String(value),
      });

      const composition: ChildSpec[] = [];

      if (columns.length) {
          composition.push({
              tag: 'cre8-table-header',
              children: [
                  {
                      tag: 'cre8-table-row',
                      children: columns.map((column) => cell(column.label, column, true)),
                  },
              ],
          });
      }

      composition.push({
          tag: 'cre8-table-body',
          children: rows.map((row) => ({
              tag: 'cre8-table-row',
              children: Array.isArray(row)
                  ? row.map((value, i) => cell(value, columns[i]))
                  : columns.map((column) => cell(row[column.key ?? column.label], column)),
          })),
      });

      return composition;
  }

  protected updated(changed: Map<string, unknown>): void {
      if (changed.has('columns') || changed.has('rows')) {
          syncLightChildren(this, this.buildComposition());
      }
  }

  render() {
      const componentClassNames = this.componentClassNames('cre8-c-table', {
          'cre8-c-table--hoverable': this.isHoverable,
          'cre8-c-table--striped': this.variant === 'striped',
          'cre8-c-table--responsive': this.behavior === 'responsive',
      });

      return html`
      <table role="table" class="${componentClassNames}">
        ${this.caption
        ? html`<caption class="cre8-c-table__caption">
            ${this.caption}
          </caption>`
        : ''}
        ${html`<slot></slot>`}
      </table>
    `;
  }
}

if (customElements.get('cre8-table') === undefined) {
    customElements.define('cre8-table', Cre8Table);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-table': Cre8Table;
  }
}

export default Cre8Table;
