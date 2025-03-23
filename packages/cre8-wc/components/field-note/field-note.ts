import svgCheckCircle from '@cre8/cre8-icons/lib/icons/System/Filled/Check.svg?raw';
import svgErrorFilled from '@cre8/cre8-icons/lib/icons/System/Filled/Error.svg?raw';
import { html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { Cre8Element } from '../cre8-element';
import '../icon/icon';
import styles from './field-note.scss';

/**
 * Field Note gives direction on how to fill out a form field and to alert users of form errors and successes.
 * It’s used below an input field and never on its own.
 * @slot - The note content
 */

export class cre8FieldNote extends Cre8Element {
    static get styles() {
        return unsafeCSS(styles);
    }

  /**
   * Changes the component's treatment to represent an error
   *  @attr {boolean}
   */
  @property({ type: Boolean, reflect: true })
      isError?: boolean;

  /**
   * Changes the component's treatment to represent a success
   *  @attr {boolean}
   */
  @property({ type: Boolean, reflect: true })
      isSuccess?: boolean;

  /**
   *  DEPRECATED: Icon name used for the icon before to the field note
   * @deprecated
   */
  @property()
      iconName?: string;

  /**
   * Check if there are success or error states and set "aria-live=polite"
   */
  fieldNoteAriaLive(): string {
      if (this.isError || this.isSuccess) {
          return 'polite';
      }
      return null;
  }

  render() {
      const componentClassName = this.componentClassNames('cre8-c-field-note', {
          'cre8-is-error': this.isError,
          'cre8-is-success': this.isSuccess,
      });

      return html`
        <div
          aria-live=${ifDefined(this.fieldNoteAriaLive())}
          class="${componentClassName}">
        ${this.isError === true
        ? html`<cre8-icon class="cre8-field-note-icon" svg='${svgErrorFilled}' aria-hidden="true" ></cre8-icon>`
        : ''
}
            ${this.isSuccess === true
        ? html`<cre8-icon class="cre8-field-note-icon" svg='${svgCheckCircle}' aria-hidden="true"></cre8-icon>`
        : ''
}
          <div><slot></slot></div>
        </div>
    `;
  }
}

if (customElements.get('cre8-field-note') === undefined) {
    customElements.define('cre8-field-note', cre8FieldNote);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-field-note': cre8FieldNote;
  }
}

export default cre8FieldNote;
