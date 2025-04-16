import { html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import styles from './list.scss';

/**
 * @slot - The list items
 */
export class Cre8List extends Cre8Element {
    static get styles() {
        return unsafeCSS(styles);
    }

  /**
   * Style variants
   * <cre8-text-passage size="sm">
   * <ul>
   * <li>**bare** removes any lines from in between list items</li>
   * </ul>
   * </cre8-text-passage>
   */
  @property()
      variant?: 'bare';

  /**
   * Spacing variants
   * <cre8-text-passage size="sm">
   * <ul>
   * <li>**padded** applies more padding in between list items compared to the default</li>
   * <li>**condensed** reduces padding in between list items compared to the default</li>
   * </ul>
   * </cre8-text-passage>
   */
  @property()
      spacing?: 'padded' | 'condensed';

  render() {
      const componentClassName = this.componentClassNames('cre8-c-list', {
          'cre8-c-list--bare': this.variant === 'bare',
          'cre8-c-list--padded': this.spacing === 'padded',
          'cre8-c-list--condensed': this.spacing === 'condensed',
      });

      return html`
      <ul class="${componentClassName}">
        <slot></slot>
      </ul>
    `;
  }
}

if (customElements.get('cre8-list') === undefined) {
    customElements.define('cre8-list', Cre8List);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-list': Cre8List;
  }
}

export default Cre8List;
