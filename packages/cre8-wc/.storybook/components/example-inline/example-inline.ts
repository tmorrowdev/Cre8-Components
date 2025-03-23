import {LitElement, html, unsafeCSS} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import styles from './example-inline.scss';

@customElement('example-inline')
export class ExampleInline extends LitElement {
  static get styles() {
    return unsafeCSS(styles.toString().replace(':root', ':host'));
  }

  @property()
  styleModifier?: string;

  @property()
  inlineStyle?: string;

  render() {
    return html`
      <span class="f-po ${this.styleModifier}" style="${this.inlineStyle}">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'example-inline': ExampleInline;
  }
}
