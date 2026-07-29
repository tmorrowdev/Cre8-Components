/* eslint-disable lit-a11y/list --
* <slot> is a non-content element, which is permitted as a direct child within a list
* Ref https://dequeuniversity.com/rules/axe/4.8/list regarding non-content elements
*/
import { html,  } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import { syncLightChildren, type ChildSpec } from '../utils/light-children';
import styles from './breadcrumbs.styles.js';

/** One crumb in a data-driven breadcrumb trail. */
export interface Cre8BreadcrumbData {
  text: string;
  /** Omit on the final crumb — the page you are on is not a link. */
  href?: string;
}

/**
 * The breadcrumbs component is a secondary navigation pattern that helps a user understand where the user is located.
 * The breadcrumbs component shows the users their current location relative to the information architecture
 * It enables the users to quickly move up to a parent level or previous location.
 *
 * ## How to Use
 *
 * - Import 'Breadcrumbs' component.
 * - Add the pages in the path of the breadcrumbs using `cre8-breadcrumbs-item`.
 * All the pages in the breadcrumbs component should be interactive.
 * - All the page should link to their respective pages (except the current page) using `cre8-link`.
 * - The current page is included in the breadcrumbs trail.
 * - The current page is always the last text listed and is not an interactive link.
 *
 * @slot - The component content
 */


export class Cre8Breadcrumbs extends Cre8Element {
    static styles = [styles];

  /**
   * aria-label attribute to designate at name for the nav. Can be override by user
   */
  @property()
      navAriaLabel: string = 'breadcrumbs';
  /**
   * Crumbs for a data-driven trail. Each becomes a `cre8-breadcrumbs-item`,
   * wrapping a `cre8-text-link` when it has an `href`.
   */
  @property({ type: Array })
      items?: Cre8BreadcrumbData[];

  /** The composition the data property stands for. */
  private buildComposition(): ChildSpec[] | null {
      if (!this.items) return null;
      return this.items.map((item) => ({
          tag: 'cre8-breadcrumbs-item',
          children: item.href
              ? [{ tag: 'cre8-text-link', props: { href: item.href }, text: item.text }]
              : undefined,
          text: item.href ? undefined : item.text,
      }));
  }

  protected updated(changed: Map<string, unknown>): void {
      if (['items'].some((key) => changed.has(key))) {
          syncLightChildren(this, this.buildComposition());
      }
  }


  render() {
      const componentClassNames = this.componentClassNames('cre8-c-breadcrumbs', {});

      return html`
      <nav aria-label="${this.navAriaLabel}"  class="${componentClassNames}">
        <ol class="cre8-c-breadcrumbs__list">
          <slot></slot>
        </ol>
      </nav>
    `;
  }
}

if (customElements.get('cre8-breadcrumbs') === undefined) {
    customElements.define('cre8-breadcrumbs', Cre8Breadcrumbs);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-breadcrumbs': Cre8Breadcrumbs;
  }
}

export default Cre8Breadcrumbs;
