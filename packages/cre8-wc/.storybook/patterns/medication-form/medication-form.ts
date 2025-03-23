import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import classnames from 'classnames';
import styles from './medication-form.scss';

/**
 * An example element.
 *
 */
@customElement('medication-form')
export class MedicationForm extends LitElement {
  static get styles() {
    return unsafeCSS(styles.toString());
  }

  /**
   * Append to the class name. Used for passing in utility classes
   */
  @property()
  styleModifier?: string;


  render() {
    const componentClassName = classnames('c-medication-form', this.styleModifier, {
    });

    return html`
      <div class="${componentClassName}">
       <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'medication-form': MedicationForm;
  }
}
