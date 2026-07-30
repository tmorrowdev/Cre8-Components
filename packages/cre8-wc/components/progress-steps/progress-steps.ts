import { html, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import { syncLightChildren, type ChildSpec } from '../utils/light-children';
import '../progress-steps-item/progress-steps-item.js';
import styles from './progress-steps.styles.js';

/** One step in a data-driven progress indicator. */
export interface Cre8ProgressStepData {
  /** The visible label. This is the `name` prop — the item does not render children. */
  name: string;
  message?: string;
  state?: 'error' | 'warning' | 'complete' | 'current';
}

/**
 * The Progress Steps component is used to display where a user is in a multistep process.
 * It clearly indicates the total number of steps, which steps are complete and incomplete,
 * and which step you’re currently on. They help users estimate how long a task will take and can be
 * used to track status on orders.
 *
 * The Progress Steps component should be used as a parent component for `cre8-progress-steps-item` components.
 * These Components serve a contextual purpose and don't provide any functionality.
 *
 * # How to Use
 *
 * Progress Steps is used when there is ample horizontal space and two to six steps. It displays each step by name
 * and number to help users understand exactly where they are in a process. It is the preferred option for desktop.
 * Progress Steps should change to Compact Steps on mobile web to conserve space.
 *
 * Progress Steps can also be used to track order status. It provides a quick visual of how an order is progressing
 * with options to alert users of any problems along the way. When used for order status, Progress Steps should
 * change to Vertical Steps on mobile web to conserve space while allowing alerts and messages to remain visible.
 *
 * @slot - The Progress Steps Item components that represent the steps in the multistep process.
 */

export class Cre8ProgressSteps extends Cre8Element {
  static get styles() {
    return unsafeCSS(styles.toString());
  }
  /**
   * Steps for a data-driven progress indicator. Note that the visible label is
   * each item's `name` prop rather than its content — `cre8-progress-steps-item`
   * does not render children, which is easy to get wrong by hand.
   */
  @property({ type: Array })
      steps?: Cre8ProgressStepData[];

  /** The composition the data property stands for. */
  private buildComposition(): ChildSpec[] | null {
      if (!this.steps) return null;
      return this.steps.map((step) => ({
          tag: 'cre8-progress-steps-item',
          props: { name: step.name, message: step.message, state: step.state },
      }));
  }

  protected updated(changed: Map<string, unknown>): void {
      if (['steps'].some((key) => changed.has(key))) {
          syncLightChildren(this, this.buildComposition());
      }
  }


  render() {
    const componentClassNames = this.componentClassNames('cre8-c-progress-steps');

    return html`<div class='${componentClassNames}'>
            <slot></slot>
        </div>`;
  }
}

if (customElements.get('cre8-progress-steps') === undefined) {
  customElements.define('cre8-progress-steps', Cre8ProgressSteps);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-progress-steps': Cre8ProgressSteps;
  }
}

export default Cre8ProgressSteps;
