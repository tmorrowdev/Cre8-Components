import classnames from 'classnames';
import { html, LitElement } from 'lit';

export interface DetailObj {
  [key: string]: unknown;
}

export interface Cre8DispatchProps {
  e?: Event;
  eventName: string;
  detailObj?: DetailObj;
  optionsObj?: { [key: string]: unknown };
}

export interface Cre8Event extends Event {
  detail: {
    originalEvent: Event;
    detailObj: DetailObj;
  };
}

/**
 * Pre-normalization event names, keyed by their current name.
 *
 * Events were normalized to `component-action` kebab-case (see
 * `agent-docs/CODE_GUIDELINES.md`). Every renamed event is dispatched twice —
 * once under its current name, once under the legacy name — so existing
 * listeners keep working for one major version.
 *
 * 1) Delete this map and `dispatchLegacyAlias` in the next major release.
 */
export const DEPRECATED_EVENT_ALIASES: Readonly<Record<string, string>> = {
    'tab-change': 'tabChange',
    'tab-select': 'tabSelected',
    'modal-close': 'close-modal',
    'popover-open': 'open',
    'popover-close': 'close',
    'tooltip-open': 'open',
    'tooltip-close': 'close',
    'multi-select-change': 'selectedItemsChange',
    'remove-tag-click': 'removeTagClicked',
    'percent-bar-left-action-click': 'leftActionButtonClick',
    'dropdown-item-select': 'dropdown-item-selected',
    'split-button-text-click': 'text-click',
    'split-button-dropdown-click': 'dropdown-click',
    'pagination-change': 'pagination.click',
    'chart-click': 'cre8-chart-click',
    'chart-hover': 'cre8-chart-hover',
    'chart-ready': 'cre8-chart-ready',
};

/**
 * A base element.
 */
export class Cre8Element extends LitElement {
  /**
   * Abstraction of `classnames` that automatically includes any style modifier
   * as well as any set variants.
   *
   * It is expected that `variant` would be overridden in a subclass with more
   * specific types, `@property() variant?: 'foo' | 'bar'`
   *
   * @param baseClassName
   */
    componentClassNames(baseClassName: string, additionalClassNames = {}) {
        return classnames(baseClassName, additionalClassNames);
    }

  /**
   * Check if a slot is empty
   *
   * @param slotName
   */
    slotEmpty(slotName: string) {
        return !this.querySelector(`[slot="${slotName}"]`);
    }

  /**
   * Check if a slot is not empty
   *
   * @param slotName
   */
    slotNotEmpty(slotName: string) {
        if (!this.slotEmpty(slotName) !== false) {
            return !this.slotEmpty(slotName);
        }
        return null;
    }

    /**
   * Dispatch a custom event.
   */
    dispatch({
        e, eventName, detailObj = {}, optionsObj = {},
    }: Cre8DispatchProps): CustomEvent {
        const options = {
            bubbles: true,
            composed: true,
            ...optionsObj,
            detail: { ...(e && { originalEvent: e }), ...detailObj },
        };
        return this.dispatchWithLegacyAlias(new CustomEvent(eventName, options));
    }

    /**
   * Dispatch an event, followed by its pre-normalization alias if it has one.
   * 1) Components that build their own event object should dispatch through
   *    this instead of `dispatchEvent` so legacy listeners keep firing
   * 2) The alias mirrors the original's propagation flags and detail, so a
   *    legacy listener sees exactly what it saw before the rename
   */
    protected dispatchWithLegacyAlias<T extends Event>(event: T): T {
        this.dispatchEvent(event); /* 1 */

        const legacyEventName = DEPRECATED_EVENT_ALIASES[event.type];
        if (legacyEventName) {
            const options = {
                bubbles: event.bubbles,
                composed: event.composed,
                cancelable: event.cancelable,
            }; /* 2 */

            this.dispatchEvent(
                event instanceof CustomEvent
                    ? new CustomEvent(legacyEventName, { ...options, detail: event.detail })
                    : new Event(legacyEventName, options),
            );
        }

        return event;
    }

  /**
   * Example render, should not be used
   */
    render() {
        return html`<slot></slot>`;
    }
}
