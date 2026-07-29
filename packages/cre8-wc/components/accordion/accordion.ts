import { html,  } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import { syncLightChildren, type ChildSpec } from '../utils/light-children';
import styles from './accordion.styles.js';

/** One panel in a data-driven accordion. */
export interface Cre8AccordionItemData {
  heading: string;
  content: string;
  isActive?: boolean;
  headingTagVariant?: 'h1' | 'h2' | 'h3' | 'h4';
}

/**
 * The component is a vertically stacked list of headers that reveal or hide sections of related content on a page.
 * The header title gives the user a high level overview of the content allowing the user to decide
 * which sections to expand for the information.
 *
 * Accordion contains Accordion Items as children. This component is the wrapper for grouping related accordion items.
 *
 * Users can select different border types: default (no border), rectangle, rounded bottom, and rounded.
 *
 * @slot - The `cre8-accordion-item` children to group
 */


export class Cre8Accordion extends Cre8Element {
    static styles = [styles];


  /**
   * borderType
   * @prop {'rectangle' | 'rounded-bottom' | 'rounded' | 'none'}
   *
   * Controls the border and border-radius of the parent container of the slotted accordions.
   *
   */
  @property()
      borderType?: 'rectangle' | 'rounded-bottom' | 'rounded' | 'none';

  /**
   *
   * When it is true, the inner dividers are displayed;
   * if it is false, the inner dividers are not displayed
   * @prop {boolean} hasDivider
   *
   */
  @property({ type: Boolean, reflect: true })
      hasDivider? = false;

  connectedCallback(): void {
      super.connectedCallback();
  }
  /**
   * Panels for a data-driven accordion. Each becomes a `cre8-accordion-item`
   * with its heading as a prop and its content in the default slot.
   */
  @property({ type: Array })
      items?: Cre8AccordionItemData[];

  /** The composition the data property stands for. */
  private buildComposition(): ChildSpec[] | null {
      if (!this.items) return null;
      return this.items.map((item) => ({
          tag: 'cre8-accordion-item',
          props: {
              heading: item.heading,
              isActive: item.isActive,
              headingTagVariant: item.headingTagVariant,
          },
          text: item.content,
      }));
  }

  protected updated(changed: Map<string, unknown>): void {
      if (['items'].some((key) => changed.has(key))) {
          syncLightChildren(this, this.buildComposition());
      }
  }


  render() {
      const componentClassNames = this.componentClassNames('cre8-c-accordion', {
          'cre8-c-inner-divider': this.hasDivider === true,
          'cre8-c-accordion--border-none': this.borderType === undefined || this.borderType === 'none',
          'cre8-c-accordion--border-rectangle': this.borderType === 'rectangle',
          'cre8-c-accordion--border-rounded-bottom': this.borderType === 'rounded-bottom',
          'cre8-c-accordion--border-rounded': this.borderType === 'rounded',
      });

      return html`
      <div class="${componentClassNames}">
        <slot> </slot>
      </div>
    `;
  }
}

if (customElements.get('cre8-accordion') === undefined) {
    customElements.define('cre8-accordion', Cre8Accordion);
}
declare global {
  interface HTMLElementTagNameMap {
    'cre8-accordion': Cre8Accordion;
  }
}

export default Cre8Accordion;
