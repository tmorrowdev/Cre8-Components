import { html,  } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import { syncLightChildren, type ChildSpec } from '../utils/light-children';
import styles from './list.styles.js';

/** One item in a data-driven list. */
export interface Cre8ListItemData {
  text: string;
}

/**
 * @slot - The list items
 */

export class Cre8List extends Cre8Element {
    static styles = [styles];

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
  /**
   * Items for a data-driven list. Set this and the list builds its own
   * `cre8-list-item` children in the light DOM — the same composition you would
   * write by hand. Leave it unset to compose the list yourself.
   */
  @property({ type: Array })
      items?: Cre8ListItemData[];

  /** The composition the data property stands for. */
  private buildComposition(): ChildSpec[] | null {
      if (!this.items) return null;
      return this.items.map((item) => ({ tag: 'cre8-list-item', text: item.text }));
  }

  protected updated(changed: Map<string, unknown>): void {
      if (['items'].some((key) => changed.has(key))) {
          syncLightChildren(this, this.buildComposition());
      }
  }


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
