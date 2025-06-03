import {LitElement, html, unsafeCSS} from 'lit';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import {customElement, property} from 'lit/decorators.js';
import styles from './f-po.module';

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
      <div class="f-po ${this.styleModifier}" style="${ifDefined(this.inlineStyle)}">
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
