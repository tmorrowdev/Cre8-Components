import { html, unsafeCSS } from 'lit';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { property } from 'lit/decorators.js';
import { nanoid } from 'nanoid';
import { Cre8Element } from '../cre8-element';
import '../field-note/field-note';
import styles from './select-tile-list.scss';

/**
 * Select Tile List is a container design to hold multiple Select Tile Components.
 *
 * @slot "" - The default slot norminally contains multiple `<select-tile />` Components.
 * @cssprop "--cre8-select-tile-list-item-width" - Width of each child. Not used for horizontal.
 */
export class cre8SelectTileList extends Cre8Element {
    static get styles() {
        return unsafeCSS(styles.toString());
    }

  /**
   * Whether to show the tiles side by side (columns) or stacked vertically (rows).
   */
  @property({ reflect: true })
      variant: 'columns' | 'rows' = 'columns';

  /**
   * Select Tile container label
   */
  @property({ reflect: true })
      label?: string;

  /**
   * Select Tile container fieldnote
   */
  @property({ reflect: true })
      fieldNote?: string;

  /**
   * Select Tile container fieldnote aria describe by
   */
  @property()
      ariaDescribedBy?: string;

  /**
   * Select Tile container fieldnote icon name
   */
  @property({ reflect: true })
      fieldNoteIconName?: string;

  /**
   * Select Tile container fieldnote knockout
   */
  @property({ type: Boolean, reflect: true })
      fieldNoteKnockout?: boolean;

  /**
   * Select Tile container fieldnote isSuccess
   */
  @property({ type: Boolean, reflect: true })
      fieldNoteIsSuccess?: boolean;

  /**
   * Select Tile container fieldnote isError
   */
  @property({ type: Boolean, reflect: true })
      fieldNoteIsError?: boolean;

  connectedCallback() {
      super.connectedCallback();
      if (this.fieldNote) {
          this.ariaDescribedBy = this.ariaDescribedBy || nanoid();
      }
  }

  render() {
      const componentClassNames = this.componentClassNames('cre8-c-select-tile-list', {
          'cre8-c-select-tile-list__rows': this.variant === 'rows',
      });

      return html`
      <fieldset class="${componentClassNames}">
        <legend
          class="cre8-c-select-tile-list__legend"
          aria-describedby="${ifDefined(this.ariaDescribedBy)}"
        >
          ${this.label}
        </legend>
        <div class="cre8-c-select-tile-list__body">
          <div class="cre8-c-select-tile-list__list" role="list">
            <slot></slot>
          </div>
        </div>
        ${this.fieldNote
        ? html`<cre8-field-note
          ?inverted=${this.fieldNoteKnockout}
          id=${ifDefined(this.ariaDescribedBy)}
          iconName=${ifDefined(this.fieldNoteIconName)}
          ?isSuccess=${this.fieldNoteIsSuccess}
          ?isError=${this.fieldNoteIsError}
        >
          ${this.fieldNote}
        </cre8-field-note>` : ''}
      </fieldset>
    `;
  }
}

if (customElements.get('cre8-select-tile-list') === undefined) {
    customElements.define('cre8-select-tile-list', cre8SelectTileList);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-select-tile-list': cre8SelectTileList;
  }
}

export default cre8SelectTileList;
