import { html,  } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import styles from './band.styles.js';

/**
 * @slot - The band content
 */
export class Cre8Band extends Cre8Element {
    static styles = [styles];

  /**
   * Gradient variant
   * <cre8-text-passage size="sm">
   * <ul>
   * <li>**1** renders the band with the set gradient background</li>
   * </ul>
   * </cre8-text-passage>
   */
  @property()
      variant?: 'branded';

  /**
   * Full height variant
   * 1) Sets the height to 100%
   */
  @property({ type: Boolean, reflect: true })
      fullHeight?: boolean;

  /** True when this band, not the author, put the host in inverse mode. */
  private ownsMode = false;

  /**
   * A branded band is a dark brand surface. Put the host in inverse mode so
   * the slotted components read the inverse tokens and stay legible on it.
   * An author's own data-mode wins.
   */
  updated(changed: Map<string, unknown>) {
      super.updated?.(changed);
      if (!changed.has('variant')) return;
      if (this.variant === 'branded') {
          if (!this.hasAttribute('data-mode')) {
              this.setAttribute('data-mode', 'inverse');
              this.ownsMode = true;
          }
          if (this.ownsMode && !this.hasAttribute('data-cre8-theme')) this.setAttribute('data-cre8-theme', '');
      } else if (this.ownsMode) {
          this.removeAttribute('data-mode');
          this.removeAttribute('data-cre8-theme');
          this.ownsMode = false;
      }
  }

  render() {
      const componentClassName = this.componentClassNames('cre8-c-band', {
          'cre8-c-band--branded': this.variant === 'branded',
          'cre8-c-band--full-height': this.fullHeight === true,
      });

      return html`
      <div class="${componentClassName}">
        <slot></slot>
      </div>
    `;
  }
}

if (customElements.get('cre8-band') === undefined) {
    customElements.define('cre8-band', Cre8Band);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-band': Cre8Band;
  }
}

export default Cre8Band;
