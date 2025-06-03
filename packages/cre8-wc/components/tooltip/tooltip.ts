import { html, unsafeCSS } from 'lit';
import { property, query } from 'lit/decorators.js';
import { nanoid } from 'nanoid';
import { ifDefined } from 'lit/directives/if-defined.js';
import { Cre8Element } from '../cre8-element';
import styles from './tooltip.module';

/**
 * The purpose of tooltips is to provide a tip or hint about what a tool, icon, link, or other interaction does.
 * If you need to present a call to action with perhaps a button for the user to click, then use
 * [Popover](/docs/cre8-components-popover--docs) instead.
 *
 * ##Tooltip Styles
 * There are 4 alignment options for Tooltips: Top, Bottom, Right, and Left. Default placement is Bottom, below the
 * element it is describing. Top or Bottom alignment are the the preferred placement, particularly on screens that
 * have a more narrow viewport. Tooltips utilize Global styles and are not affected by brand themes.
 *
 * **With icon**
 * - **iconRotateDegree** & **iconFlipDirection** props are optional.
 * - They are used to set up the correct dirrection for icons, for example,
 * arrows, caret up or caret down.
 *
 * ##Usability Considerations
 * With the exception of icons - which should always have alt text at a minimum - the UI should never rely on
 * Tooltips for clarity, especially because they are not always discovered by the user. If the user cannot
 * intuitively understand the interface without Tooltips, the interface should be redesigned.
 *
 * ##How to use
 * - Use Tooltips to clarify the UI element the user is interacting with, not to add additional content on the page.
 * Also, do not simply restate content on the page, for example, the title of the field.
 * - Tooltips should be short and to the point. Example: "Click X to do X" or "Icon Description." If a succinct
 * description is not possible, the interaction element should be redesigned.
 * - In a mouse-driven UI, Tooltips are triggered on hover (mouseover) and dismissed (disappear)
 * when the user mouses away from the element. In touch UIs, a Tooltip is triggered by tapping
 * and holding an item. The Tooltip is displayed as long as the user continues to hold the element.
 * Tap and hold is a more advanced user behavior, and further reason for not relying on Tooltips.
 * A novice user may never discover tap and hold for Tooltips.
 *
 * @slot default - Default, unnamed slot container for Tooltip text
 * @slot trigger - Named slot container for Tooltip element to trigger showing/hiding the Tooltip text
 */

export class Cre8Tooltip extends Cre8Element {
    static styles = [styles];

  /**
   * Positions the tooltip panel absolutely to the icon. Position overrides `isDynamic`.
   * @type {"default"|"top"|"left"|"right"}
   * @attr {string}
   * - **default** positions the tooltip panel below the trigger element
   * - **top** positions the tooltip panel above the trigger element
   * - **left** positions the tooltip panel left of the trigger element
   * - **right** positions the tooltip panel right of the trigger element
   */
  @property()
      position?: 'top' | 'left' | 'right';

  /**
   * The knockout variant for the tooltip
   * @attr {boolean}
   * 1. If is true, the tooltip background is white
   * 2. If is false, the tooltip background is gray
   */
  @property({ type: Boolean, reflect: true })
      knockout?: boolean;

  /**
   * The dynamic state for the tooltip. Position overrides isDynamic.
   * @attr {boolean}
   * - If true, the tooltip panel placement is determined by its position in the viewport
   * - If false, the tooltip panel placement will be placed according to the position value
   */
  @property({ type: Boolean, reflect: true })
      isDynamic?: boolean;

  /**
   * The dynamic active state
   * @attr {boolean}
   * <br/><br/> _*This property is dynamically set_
   */
  @property({ type: Boolean })
      isActiveDynamic?: boolean;

  /**
   * The active state for the tooltip
   * @attr {boolean}
   * - If true, the tooltip panel is visible
   * - If false, the tooltip panel is hidden
   * <br/><br/> _*This property is dynamically set_
   */
  @property({ type: Boolean, reflect: true })
      isActive?: boolean;

  /**
   *  Accepts the ID string of the item the tooltip is referencing
   *  @attr {string}
   *  Dynmically appends its own ID to the aria-describedby attribute on the referenced element
   */
  @property({ type: String })
      ariaDescribes?: string;

  @property({ type: String })
      _uniqueId?: string;

  /**
   * svg as a raw string
   * - The icon is defined by this prop.
   * - Pass in a raw svg as a String for using <cre8-icon>
   */
  @property()
      svg?: string;

  /**
   * iconRotateDegree is used for <cre8-icon> to set the arrow in the correct direction
   */
  @property({ type: Number })
      iconRotateDegree?: number = 0;

  /**
   * iconFlipDirection is used for <cre8-icon> to set the icon in the correct direction
   */
  @property()
      iconFlipDirection?: string;

  /**
   * Query the tooltip panel element
   */
  @query('.cre8-c-tooltip')
      _Cre8Tooltip: HTMLElement;

  /**
   * Query the tooltip panel element
   */
  @query('.cre8-c-tooltip__panel')
      _Cre8TooltipPanel: HTMLElement;

  /**
   * Query the document direction value
   * <br/><br/> _*This property is dynamically set_
   */
  get isRTL() {
      return document.dir === 'rtl';
  }

  /**
   * updated Callback Lifecycle
   * 1. Find the second slot
   * 2. Create a string from joining the textContent of the textnodes
   * 3. Set the textContent of the tip generated in the firstUpdated lifecycle callback
   * */
  updated() {
    /* 1 & 2 */
      const tipContent = this.shadowRoot.querySelectorAll('slot')[1]
          .assignedNodes()
          .reduce(
              ((str, item) => `${str}${item.textContent.replace(/\n/g, '').trim()}`),
              ''
          );
    /* 3 */
      if (document.getElementById(this._uniqueId)) {
          document.getElementById(this._uniqueId).textContent = tipContent;
      }
  }

  /**
   * firstUpdated Callback Lifecycle
   * 1. If ariaDescribes is set
      * a. create an ID and assign it to the property _uniqueId
      * b. Generate an empty div, assign it the  _uniqueId and the tooltip role
  * 2. Set the aria-describedby on the ariaDescribes target
  */
  firstUpdated() {
      if (this.ariaDescribes) { /* 1 */
          this._uniqueId = this._uniqueId || nanoid(); /* 1.a */
          const idMatcher = new RegExp(`\\b${this._uniqueId}\\b`); // prevents dupes from reconnects below
      /* 1.b */
          const a11yProxy = document.createElement('div');
          a11yProxy.setAttribute('role', 'tooltip');
          a11yProxy.setAttribute('style', 'position:fixed; left: -1000px; top: -1000px;');
          a11yProxy.id = this._uniqueId;
          const describedEl = document.getElementById(this.ariaDescribes);
          describedEl.parentNode.insertBefore(a11yProxy, describedEl);
          const idList = describedEl?.getAttribute('aria-describedBy');
      /* 2 */
          describedEl?.setAttribute(
              'aria-describedby',
              `${idList ? `${idList.replace(idMatcher, '')} ` : ''}${this._uniqueId}`.trim()
          );
      }
  }

  /**
   * Connected Callback Lifecycle
   * 1. Add window mouseover event listener
   * 2. Add window mouseout event listener
   * 3. Add mousedown event listener
   * 4. Set the id and aria-describedby
   */
  connectedCallback() {
      super.connectedCallback();
      this.addEventListener('mouseover', this.toggleActive); /* 1 */
      this.addEventListener('mouseout', this.removeActive); /* 2 */
  }

  /**
   * Disconnected Callback Lifecycle
   * 1. Remove window mouseover event listener
   * 2. Remove window mouseout event listener
   */
  disconnectedCallback() {
      super.disconnectedCallback();
      this.removeEventListener('mouseover', this.toggleActive); /* 1 */
      this.removeEventListener('mouseout', this.removeActive); /* 2 */
  }

  /**
   * Handle all dynamic placement
   */
  dynamicPosition() {
    // TODO: Temporarily keep eslint complexity as warning. Update during specific story for this rule.
    /* eslint complexity: ["warn", 10] */
      if (this.isDynamic && this._Cre8TooltipPanel) {
          const body = document.querySelector('body').getBoundingClientRect();
          const tooltipPanel = this._Cre8TooltipPanel.getBoundingClientRect();
          const tooltipHeight = this._Cre8Tooltip.clientHeight + tooltipPanel.height + tooltipPanel.top;

      /**
       * If tooltip panel breaks out the left side of the window, position it to the right
       */
          if (tooltipPanel.left < 0) {
              this.position = this.isRTL ? 'left' : 'right';
          }

      /**
       * If tooltip panel breaks out the right side of the window, position it to the left
       */
          if (tooltipPanel.right >= body.width) {
              this.position = this.isRTL ? 'right' : 'left';
          }

      /**
       * If tooltip panel breaks out the top side of the window only, position it to the bottom center
       */
          if (tooltipPanel.top < 0 && tooltipPanel.left > 0 && tooltipPanel.right < body.width) {
              this.position = null;
          }

      /**
       * If tooltip panel breaks out the bottom side of the window only, position it to the top center
       */
          if (
              tooltipHeight >= window.innerHeight
        && tooltipPanel.bottom >= window.innerHeight
        && tooltipPanel.left >= 0
        && tooltipPanel.right <= body.width
          ) {
              this.position = 'top';
          }
      }
  }

  /**
   * Handle Keydown
   * 1. If escape or tab key is struck when the tooltip is active, close it
   * 2. If enter or escape is keyed, toggle the tooltip open or close.
   *    We need these since the click event is on a div so that accessibility reads this aloud to a user
   */
  private _handleKeydown(e: KeyboardEvent) {
      if (this.isActive) {
          if (e.code === 'Escape' || e.code === 'Tab') {
              this.toggleActive(); /* 1 */
          }
      }
      if (e.code === 'Enter' || e.code === 'Space') {
          this.toggleActive(); /* 2 */
      }
  }

  /**
   * Set Tooltip Active State
   * 1. Toggle the active state between true and false
   * 2. If is active, set the dynamic position and custom event.
   * 3. If is not active, remove fire the close custom event.
   * 4. Toggle the active state for dynamic. This prevents a flash of the tooltip in the orginal position.
   */
  toggleActive() {
      this.isActive = !this.isActive; /* 1 */

      if (this.isActive) {
      /* 2 */
          setTimeout(() => {
              this.dynamicPosition();
          }, 1);
          this.dispatchEvent(new CustomEvent('open', {
              detail: { isActive: this.isActive }, bubbles: true, composed: true,
          }));
      } else {
      /* 3 */
          this.dispatchEvent(new CustomEvent('close', {
              detail: { isActive: this.isActive }, bubbles: true, composed: true,
          }));
      }

    /* 4 */
      setTimeout(() => {
          if (this.isActive && this.isDynamic) {
              this.isActiveDynamic = true;
          } else {
              this.isActiveDynamic = false;
          }
      }, 2);
  }

  /**
   * Remove Active State
   * 1. If a specific event is fired, remove the active state.
   */
  removeActive = () => {
      if (this.isActive) {
          this.toggleActive();
      }
  };

  render() {
      const componentClassNames = this.componentClassNames('cre8-c-tooltip', {
          'cre8-c-tooltip--top': this.position === 'top',
          'cre8-c-tooltip--left': this.position === 'left',
          'cre8-c-tooltip--right': this.position === 'right',
          'cre8-c-tooltip--knockout': this.knockout,
          'cre8-is-active': this.isActive,
          'cre8-is-dynamic': this.isDynamic,
          'cre8-is-dynamic-active': this.isActiveDynamic,
      });

      return html`
        <div class="${componentClassNames}">
            <div 
                class="cre8-c-tooltip__trigger"
                tabindex="0"
                @focus=${this.toggleActive}
                @keydown=${this._handleKeydown}
            >
                ${this.svg
        ? html`
            <slot name="trigger">
                <cre8-icon svg='${this.svg}' rotate="${Number(this.iconRotateDegree)}" 
                flip="${this.iconFlipDirection}" aria-hidden="true"></cre8-icon>
            </slot>`
        : html`<slot name="trigger"></slot>`
}
            </div>
            <dialog
                id=${ifDefined(this._uniqueId)}
                aria-labelledby=${this.ariaDescribes}
                class="cre8-c-tooltip__panel"
                role="tooltip">
                <slot></slot>
            </dialog>
        </div>
      `;
  }
}

if (customElements.get('cre8-tooltip') === undefined) {
    customElements.define('cre8-tooltip', Cre8Tooltip);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-tooltip': Cre8Tooltip;
  }
}

export default Cre8Tooltip;
