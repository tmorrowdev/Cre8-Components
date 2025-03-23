import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import styles from './f-po.scss';

@customElement('f-po')
export class FPO extends LitElement {
  static get styles() {
    return unsafeCSS(styles.toString().replace(':root', ':host'));
  }

  @property()
  styleModifier?: string;

  @property()
  inlineStyle?: string;

  render() {
    return html`
      <div class="f-po ${this.styleModifier}" style="${this.inlineStyle}">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'f-po': FPO;
  }
}
