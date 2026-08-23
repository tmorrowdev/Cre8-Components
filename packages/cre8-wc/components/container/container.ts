import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import styles from './container.styles.js';

/** `cre8-container` establishes a CSS containment context so anything slotted
* inside it - a `cre8-container-grid`, a `cre8-card`, plain markup - can be
* styled with `@container` queries against *this element's own rendered
* size*, not the viewport. It renders no visible chrome of its own; the only
* effect is making container queries possible for its content.
*
* # How to Use
* 1. Wrap `cre8-container` around whatever should respond to the space it is
*   actually given rather than the screen size - a sidebar widget, a card
*   that might land in a narrow or a wide column depending on a layout the
*   component itself can't see.
* 2. Write `@container` rules in your own stylesheet keyed to `name`, if
*   set, to target this container specifically when containers are nested
*   and the nearest one isn't the one you mean to query.
*
* @slot - The content to establish a containment context for
*/
export class Cre8Container extends Cre8Element {
  static styles = [styles];

  /**
   * Containment type
   * - **inline-size** (default) contains layout, style, and inline size -
   *   the right choice for width-based `@container` queries on a
   *   block-level container
   * - **size** contains both the inline and block size, so `@container`
   *   rules can also query height - only use this when the container's own
   *   height does not depend on its content
   * - **normal** names the container without adding size containment, for
   *   `@container style(...)` queries
   */
  @property()
  type?: 'inline-size' | 'size' | 'normal';

  /**
   * Container name
   * 1) Lets `@container <name> (...)` target this container specifically
   *   when containers are nested and the nearest one isn't the one being
   *   queried.
   */
  @property()
  name?: string;

  render() {
    const componentClassNames = this.componentClassNames('cre8-c-container', {
      'cre8-c-container--size': this.type === 'size',
      'cre8-c-container--normal': this.type === 'normal',
    });

    return html`
      <div
        class="${componentClassNames}"
        part="container"
        style=${this.name ? `container-name: ${this.name};` : ''}
      >
        <slot></slot>
      </div>
    `;
  }
}

if (customElements.get('cre8-container') === undefined) {
  customElements.define('cre8-container', Cre8Container);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-container': Cre8Container;
  }
}

export default Cre8Container;
