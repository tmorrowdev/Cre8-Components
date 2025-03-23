import { html, nothing, unsafeCSS } from 'lit';
import { property, query, queryAssignedElements } from 'lit/decorators.js';
import { Cre8Element } from '../cre8-element';
import '../heading/heading';
import styles from './popover.scss';
import { cre8Button } from '../button/button';

/**
 * The Popover is for progressive disclosure of relevant content often hidden behind a help or info icon.
 * Its content should be no longer than 3-4 lines in addition to a line of heading text and an optional button.
 * @slot - The component content
 */

export class cre8Popover extends Cre8Element {
    static get styles() {
        return unsafeCSS(styles.toString());
    }

  /**
   * The heading text that appears at the top of the popover panel. Should only be 2-3 lines max.
   *  @attr {string | undefined}
   */
  @property()
      heading?: string;

  /**
   * Positions the popover panel absolutely to the trigger
   * - **default** positions the popover panel below the trigger
   * - **top** positions the popover panel below the trigger
   * - **left** positions the popover panel below the trigger
   * - **right** positions the popover panel below the trigger
   *  @attr {string | undefined}
   */
  @property()
      position?: 'top' | 'left' | 'right';

  /**
   * Set to prevent the popover panel from hiding on scroll
   *  @attr {boolean | undefined}
   */
  @property({ type: Boolean, reflect: true })
      isVisibleOnScroll?: boolean;

  /**
   * The dynamic state for the popover
   * - If true, the popover panel placement is determined by its position in the viewport
   * - If false, the popover panel placement will be placed according to the position value
   *  @attr {boolean | undefined}
   */
  @property({ type: Boolean, reflect: true })
      isDynamic?: boolean;

  /**
   * The dynamic active state
   * _This property is dynamically set_
   *  @attr {boolean | undefined}
   */
  @property({ type: Boolean, reflect: true })
      isActiveDynamic?: boolean;

  /**
   * The active state for the popover
   * - If true, the popover panel is visible
   * - If false, the popover panel is hidden
   *
   * _This property is dynamically set_
   *  @attr {boolean | undefined}
   */
  @property({ type: Boolean, reflect: true })
      isActive?: boolean;


  /**
   * Query the popover panel element
   */
  @query('.cre8-c-popover')
      _cre8Popover: HTMLElement;

  /**
   * Query the popover panel element
   */
  @query('.cre8-c-popover__panel')
      _cre8PopoverPanel: HTMLElement;

  /**
   * Query the assigned elements in the trigger slot
   */
  @queryAssignedElements({ slot: 'trigger' })
      _cre8PopoverTrigger: Array<HTMLElement>;

  /**
   * Query the assigned elements in the footer slot
   */
  @queryAssignedElements({ slot: 'footer' })
      _cre8PopoverFooter: Array<HTMLElement>;

  /**
   * Query the document direction value
   * <br/><br/> _*This property is dynamically set_
   */
  get isRTL() {
      return document.dir === 'rtl';
  }

  /**
   * Connected Callback Lifecycle
   * 1. Add window resize event listener
   * 2. Add window scroll event listener
   * 3. Add window orientation change event listener
   * 4. Add mousedown event listener
   */
  connectedCallback() {
      super.connectedCallback();
      globalThis.window.addEventListener('resize', this.removeActive); /* 1 */
      globalThis.window.addEventListener('scroll', this.removeActiveOnScroll); /* 2 */
      globalThis.window.addEventListener('orientationchange', this.removeActive); /* 3 */
      globalThis.document.addEventListener('mousedown', this.handleOnClickOutside, false); /* 4 */
  }

  /**
   * Disconnected Callback Lifecycle
   * 1. Remove window resize event listener
   * 2. Remove window scroll event listener
   * 3. Remove window orientation change event listener
   * 4. Remove mousedown event listener
   */
  disconnectedCallback() {
      super.disconnectedCallback();
      globalThis.window.removeEventListener('resize', this.removeActive); /* 1 */
      globalThis.window.removeEventListener('scroll', this.removeActiveOnScroll); /* 2 */
      globalThis.window.removeEventListener('orientationchange', this.removeActive); /* 3 */
      globalThis.document.removeEventListener('mousedown', this.handleOnClickOutside, false); /* 4 */
  }

  /**
   * First Updated Lifecycle
   * 1. Set attribute since aria expanded can't be passed down through the slot
   */
  firstUpdated() {
      this.addAria(); /* 1 */
  }

  /**
   * Add aria attributes on the trigger button
   * 1. Select the element within the trigger slot
   * 2. Set aria-expanded on the popover trigger to the active state if provided. Otherwise, set to false.
   * 3 Set the type to button.
   */
  addAria() {
    /* 1 */
      let popoverTrigger;
      if (this._cre8PopoverTrigger[0].tagName === 'cre8-BUTTON') {
          popoverTrigger = this._cre8PopoverTrigger[0] as cre8Button;
          popoverTrigger.buttonAriaExpanded = this.isActive ? this.isActive : false;
      } else {
          popoverTrigger = this._cre8PopoverTrigger[0];
          popoverTrigger.setAttribute('aria-expanded', `${this.isActive ? this.isActive : false}`); /* 2 */
          popoverTrigger.setAttribute('type', 'button'); /* 3 */
      }
  }

  /**
   * Handle all dynamic placement
   */
  dynamicPosition() {
    // TODO: Temporarily keep eslint complexity as warning. Update during specific story for this rule.
    /* eslint complexity: ["warn", 10] */
      if (this.isDynamic && this._cre8PopoverPanel) {
          const body = document.querySelector('body').getBoundingClientRect();
          const popoverPanel = this._cre8PopoverPanel.getBoundingClientRect();

      /**
       * If popover panel breaks out the left side of the window, position it to the right
       */
          if (popoverPanel.left < 0) {
              this.position = this.isRTL ? 'left' : 'right';
          }

      /**
       * If popover panel breaks out the right side of the window, position it to the left
       */
          if (popoverPanel.right >= body.width) {
              this.position = this.isRTL ? 'right' : 'left';
          }

      /**
       * If popover panel breaks out the top side of the window only, position it to the bottom
       */
          if (popoverPanel.top < 0 && popoverPanel.left > 0 && popoverPanel.right < body.width) {
              this.position = null;
          }

      /**
       * If popover panel breaks out the bottom side of the window only, position it to the top
       */
          if (
              popoverPanel.bottom >= window.innerHeight
        && popoverPanel.left >= 0
        && popoverPanel.right <= body.width
          ) {
              this.position = 'top';
          }
      }
  }

  /**
   * Set Popover Active State
   * 1. Toggle the active state between true and false
   * 2. Set attribute since aria expanded can't be passed down through the slot
   * 3. If the active state is toggled to false, close the panel and return focus to the dropdown trigger.
   * This accounts for both design system buttons and native HTML buttons
   */
  private _toggleActive() {
      this.isActive = !this.isActive; /* 1 */
      this.addAria(); /* 2 */

      if (this.isActive) {
          requestAnimationFrame(() => {
              this.dynamicPosition();
          });
          this.dispatchEvent(
              new CustomEvent('open', { detail: { isActive: this.isActive }, bubbles: true, composed: true })
          );
      } else {
      /* 3 */
          this.dispatchEvent(
              new CustomEvent('close', { detail: { isActive: this.isActive }, bubbles: true, composed: true })
          );
      }

    /**
     * Toggle the active state for dynamic. This prevents a flash of the popover in the orginal position
     */
      setTimeout(() => {
          if (this.isActive) {
              this.isActiveDynamic = true;
          } else {
              this.isActiveDynamic = false;
          }
      }, 2);
  }

  /**
   * Handle Keydown
   * 1. If the panel is open and escape is keyed, close the popover panel and return focus to the trigger button
   * 2. If the panel is opened, tab away closes the popover panel
   * 3. The panel can be opened and closed by Enter or Space keys.
   */
  private _handleKeydown(e: KeyboardEvent) {
      if (e.key === 'Escape' && this.isActive === true) {
          this._toggleActive();
      } else if (e.key === 'Tab') {
          this._handleTabNavigation(e);
      }
  }

  private _handleTabNavigation(e: KeyboardEvent) {
      if (this.isActive) {
          this._navigateInsidePopover(e);
      }
  }

  private _navigateInsidePopover(e: KeyboardEvent) {
      const focusableElements = this._getFocusableElements();
      if (focusableElements.length === 0) {
          this._closePopoverAndFocusTrigger(e);
          return;
      }

      const lastFocusableElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (document.activeElement === lastFocusableElement) {
          this._closePopoverAndFocusTrigger(e);
          e.preventDefault();
      }
  }

  private _getFocusableElements(): HTMLElement[] {
      const panelFocusableElements = Array.from(this._cre8PopoverFooter);
      return [...panelFocusableElements];
  }

  private _closePopoverAndFocusTrigger(e: KeyboardEvent) {
      this._toggleActive();
      e.preventDefault();
  }

  /**
   * Handle click outside the component
   * 1. Close the show/hide popover panel on click outside
   * 2. If the popover panel is already closed then we don't care about outside clicks and we can bail early
   * 3. By the time a user clicks on the page the shadowRoot will almost certainly be
   * defined, but TypeScript isn't that trusting and sees this.shadowRoot as possibly
   * undefined. To work around that we'll check that we have a shadowRoot (and a
   * rendered .host) element here to appease the TypeScript compiler. This should never
   * actually be shown or run for a human end user.
   * 4. Check to see if we clicked inside the active panel
   * 5. If the panel is active and we've clicked outside of the panel then it should be closed.
   */
  handleOnClickOutside = (e: MouseEvent) => {
    /* 2 */
      if (!this.isActive) {
          return;
      }

    /* 3 */
      if (!this.shadowRoot?.host) {
          throw Error('Could not determine panel context during click handler');
      }

    /* 4 */
      const didClickInside = e.composedPath().includes(this.shadowRoot.host);

    /* 5 */
      if (!(e.target === document.querySelector('html') && e.clientX >= document.documentElement.offsetWidth)) {
          if (this.isActive && !didClickInside) {
              this._toggleActive();
          }
      }
  };

  /**
   * Remove Active State on Scroll
   * 1. If a scroll event is fired and visibileOnScroll is not true, remove the active state
   * 2. If the popover height is less than the window height, then allow the active to remove on scroll
   */
  removeActiveOnScroll = () => {
    /* 1 */
      if (this.isActive && !this.isVisibleOnScroll) {
      /* 2 */
          const popoverPanel = this._cre8PopoverPanel.getBoundingClientRect();
          const popoverTrigger = this._cre8Popover;
          const popoverHeight = popoverTrigger.clientHeight + popoverPanel.height + popoverPanel.top;

          if (popoverHeight < window.innerHeight) {
              this._toggleActive();
          }
      }
  };

  /**
   * Remove Active State
   * 1. If a specific event is fired, remove the active state.
   */
  removeActive = () => {
      if (this.isActive) {
          this._toggleActive();
      }
  };

  render() {
      const componentClassNames = this.componentClassNames('cre8-c-popover', {
          'cre8-c-popover--top': this.position === 'top',
          'cre8-c-popover--left': this.position === 'left',
          'cre8-c-popover--right': this.position === 'right',
          'cre8-is-active': this.isActive,
          'cre8-is-dynamic': this.isDynamic,
          'cre8-is-dynamic-active': this.isActiveDynamic,
      });

      return html`
      <div class="${componentClassNames}">
        ${this.slotNotEmpty('trigger')
        && html` <slot name="trigger" @keydown=${this._handleKeydown} @click=${this._toggleActive}></slot> `}
        ${this.isActive
        ? html`
              <div tabindex="0" class="cre8-c-popover__panel" @keydown=${this._handleKeydown}>
                ${(this.slotNotEmpty('header') || this.heading)
                && html`
                  <div class="cre8-c-popover__header">
                    ${this.heading
        ? html`<div class="cre8-c-popover__heading">${this.heading}</div>`
        : html`<slot name="header"></slot>`}
                  </div>
                `}
                <slot></slot>
                ${this.slotNotEmpty('footer')
                && html`
                  <div class="cre8-c-popover__footer">
                    <slot name="footer"></slot>
                  </div>
                `}
              </div>
            `
        : nothing}
      </div>
    `;
  }
}

if (customElements.get('cre8-popover') === undefined) {
    customElements.define('cre8-popover', cre8Popover);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-popover': cre8Popover;
  }
}

export default cre8Popover;
