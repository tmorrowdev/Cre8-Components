import { html, unsafeCSS } from 'lit';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { property } from 'lit/decorators.js';
import { nanoid } from 'nanoid';
import { Cre8Element } from '../cre8-element';
import '../field-note/field-note';
import styles from './checkbox-field.scss';

/**
 * Checkbox Field is the parent container for `checkbox-field-item`.
 * It is required to allow for grouping numerous checkboxes that need additional context (in the form of `<legend>`).
 * It also provides accessibility roles, aria attributes and field note messaging on the group.
 *
 * See `checkbox-field-item` for more guidance on its usage.
 *
 * @slot - The component content, which should be a set of `checkbox-field-item`s
 */
export class cre8CheckboxField extends Cre8Element {
    static get styles() {
        return unsafeCSS(styles.toString());
    }

  /**
   * Checkbox container legend label
   */
  @property()
      label?: string;

  /**
   * Checkbox container fieldnote
   */
  @property()
      fieldNote?: string;

  /**
   * Checkbox container fieldnote aria describe by
   */
  @property()
      ariaDescribedBy?: string;

  /**
   * Checkbox container fieldnote icon name
   */
  @property()
      fieldNoteIconName?: string;

  /**
   * Checkbox container fieldnote knockout
   * @attr {boolean}
   */
  @property({ type: Boolean, reflect: true })
      fieldNoteKnockout?: boolean;

  /**
   * Checkbox container fieldnote isSuccess
   * @attr {boolean}
   */
  @property({ type: Boolean, reflect: true })
      fieldNoteIsSuccess?: boolean;

  /**
   * Checkbox container fieldnote isError
   * @attr {boolean}
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
      const componentClassNames = this.componentClassNames('cre8-c-checkbox-field', {});

      return html`
      <fieldset class="${componentClassNames}" aria-describedby="${ifDefined(this.ariaDescribedBy)}">
      <legend class="cre8-c-checkbox-field__legend">${this.label}</legend>
        <div class="cre8-c-checkbox-field__body">
          <div class="cre8-c-checkbox-field__list" role="list">
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

if (customElements.get('cre8-checkbox-field') === undefined) {
    customElements.define('cre8-checkbox-field', cre8CheckboxField);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-checkbox-field': cre8CheckboxField;
  }
}

export default cre8CheckboxField;
