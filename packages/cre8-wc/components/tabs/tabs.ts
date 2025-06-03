import { html, unsafeCSS } from 'lit';
import {
    property, query, queryAssignedElements, state,
} from 'lit/decorators.js';
import { nanoid } from 'nanoid';
import { Cre8Element } from '../cre8-element';
import { Cre8TabPanel } from '../tab-panel/tab-panel';
import { Cre8Tab } from '../tab/tab';
import styles from './tabs.module';

let tabId = 1;

/**
 * Tabs are used to quickly navigate back and forth between views.
 * The Tab design and interaction varies depending on the requirements for your organization and project.
 * Standardizing on the best individual controls will improve usability and reduce development and QA time.
 *
 * Create a standard set of Tab controls:
 * Primary Tabs (for system navigation), Secondary Tabs (for sub navigation within a screen).
 *
 * ## Usability Guidelines
 * - The selected Tab should be visually differentiated from the other Tabs.
 *   The deselected Tabs should still look enabled.
 *   Dimming the other Tabs decreases the legibility of items that are actually active and clickable.
 * - There must be a minimum of 2 Tabs.
 * - Showing status in a Tab is non-standard (such as 0%, 10%).
 * - Tab labels and content should be parallel, with the exception of a Summary or Overview Tab
 *   which can be a rollup of content across other Tabs.
 * - Keep the font size of the Tabs the same.
 *   If the Tabs are a fixed width and one of the labels is too long,
 *   don't resize the text to fit and consider wrapping text to a second line.
 * - If possible, don't truncate text because it makes it harder to understand what's in the Tab.
 * - Try not to use more than six Tabs to keep the UI uncluttered.
 * - Do not stack Tabs on top of each other, and do not nest Tabs within Tabs.
 *   Find alternate ways of navigating page hierarchy.
 *
 * @slot default - Default, unnamed slot container for each `cre8-tab` button
 * @slot panel - Container for each `cre8-tab-panel` content item
 */

export class Cre8Tabs extends Cre8Element {
    static styles = [styles];

    /**
     * Tab sizes
     * - **default** displays the cre8-tab text with cre8-typography-label-default
     * - **sm** displays the cre8-tab text with cre8-typography-label-small
     * @type {"sm"}
     * @attr
     */
    @property()
        size?: 'sm';

    /**
     * Displays a set of tabs with a spanning the width of the element
     * @attr {boolean}
     */
    @property({ type: Boolean, reflect: true })
        fullWidth?: boolean;

    /**
     * Auto Increment id to sync tab and tab panel
     *
     * _*This property is dynamically set_
     */
    tabId: string;

    /**
     * Sets the initial active tab (e.g. 0 sets the first tab, 1 sets the second tab, etc.)
     * @attr {number}
     */
    @property({ type: Number })
        activeIndex?: number = 0;

    /**
     * The active tab
     *
     * _*This property is dynamically set_
     */
    @state()
        activeTab?: Cre8Tab;

    /**
     * If position from left is greater than 0, set isStart to false. Otherwise set isStart to true.
     *
     * _*This property is dynamically set_
     * @attr {boolean}
     */
    @state()
        isStart?: boolean = true;

    /**
     * If last child is fully in the viewport, set isEnd to true. Otherwise, set isEnd to false.
     *
     * _*This property is dynamically set_
     * @attr {boolean}
     */
    @state()
        isEnd?: boolean = false;

    /**
     * Query all the tab items
     */
    @queryAssignedElements()
        _Cre8TabItems: Array<Cre8Tab>;

    /**
     * Query all the tab panels
     */
    @queryAssignedElements({ slot: 'panel' })
        _Cre8TabPanels: Array<Cre8TabPanel>;

    /**
     * Query the tabs header element
     */
    @query('.cre8-c-tabs__header')
        _Cre8TabsHeader: HTMLElement;

    /**
     * Query the tabs header list element
     */
    @query('.cre8-c-tabs__list')
        _Cre8TabsHeaderList: HTMLElement;

    /**
     * Query the document direction value
     *
     * _*This property is dynamically set_
     */
    get isRTL() {
        return document.dir === 'rtl';
    }

    /**
     * Initialize Functions
     */
    constructor() {
        super();
        this.handleScroll = this.handleScroll.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.setIsStart = this.setIsStart.bind(this);
        this.setIsEnd = this.setIsEnd.bind(this);
        this.emitEvent = this.emitEvent.bind(this);

        /**
         * Set the tab id.
         */
        this.tabId = `cre8-tabpanel-${tabId}`;
        tabId += 1;
    }

    /**
     * Connected Callback Lifecycle
     * 1. Fires each time a custom element is appended into a document-connected element.
     */
    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('resize', this.handleResize);
    }

    /**
     * Disconnected Callback Lifecycle
     * 1. Removes the event listeners to ensure that any memory allocated by your component
     *    will be cleaned up when your component is destroyed or disconnected from the page.
     */
    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('resize', this.handleResize);
    }

    /**
     * First Updated Lifecycle Hook
     * 1. Sets the `aria-labelledby` prop for accessible tabs if user doesn't define the `ariaLabelledBy` prop.
     * 2. Sets the active tab if activeIndex is defined. Otherwise, set the first tab as active by default.
     * 3. Initialize isStart and isEnd.
     * 4. Set the varaint on the cre8-tab according to the cre8-tabs variant.
     */
    async firstUpdated() {
        /* 1 */
        this.setTabAttributes();
        await this.updateComplete;

        /* 2 */
        this.activeTab = this._Cre8TabItems[this.activeIndex] || this._Cre8TabItems[0];
        this.setActiveTab();

        /* 3 */
        this.setIsStart();
        this.setIsEnd();

        /* 4 */
        this.setTabVariant();
    }

    /**
     * Updated Lifecycle Hook
     * 1. remove selected state from previously selected tab
     * 2. Checks to see if the old `activeIndex` property has been updated.
     *    If the new value doesn't equal the old value, activate the proper tab
     */
    async updated(changedProperties: Map<string, unknown>) {
        changedProperties.forEach(async (oldValue, propName) => {
            if (propName === 'activeIndex' && this.activeIndex !== oldValue) {
                await this.updateComplete;

                if (this.activeTab) {
                    this.removePreviousActiveTab(); /* 1 */
                }

                this.activeTab = this._Cre8TabItems[this.activeIndex];
                this.setActiveTab(); /* 2 */
            }
        });
    }

    /**
     * Handle Resize
     * 1. On resize, if position from left is greater than 0, set isStart to false. Otherwise set isStart to true.
     * 2. On resize, If last child is fully in the viewport, set isEnd to true. Otherwise, set isEnd to false.
     * @fires resize
     */
    handleResize() {
        this.setIsStart(); /* 1 */
        this.setIsEnd(); /* 2 */
    }

    /**
     * Handle Scroll
     * 1. On scroll, if position from left is greater than 0, set isStart to false. Otherwise set isStart to true.
     * 2. On scroll, If last child is fully in the viewport, set isEnd to true. Otherwise, set isEnd to false.
     * @fires scroll
     */
    handleScroll() {
        this.setIsStart(); /* 1 */
        this.setIsEnd(); /* 2 */
    }

    /**
     * Set isStart State
     * 1. If position from left is greater than 0, set isStart to false. Otherwise set isStart to true.
     */
    setIsStart() {
        if (this.isRTL) {
            if (this._Cre8TabsHeaderList.scrollLeft > 0) {
                this.isStart = true;
            } else {
                this.isStart = false;
            }
        } else if (this._Cre8TabsHeaderList.scrollLeft > 0) {
            this.isStart = false;
        } else {
            this.isStart = true;
        }
    }

    /**
     * Set isEnd State
     * 1. If last child is fully in the viewport, set isEnd to true. Otherwise, set isEnd to false.
     */
    setIsEnd() {
        if (this.isInViewport() === true) {
            this.isEnd = true;
        } else {
            this.isEnd = false;
        }
    }

    /**
     * Check if last overflow list item is in the viewport
     * 1. Get children of the overflow list inner container and get bounding client rectangle of last child
     * 2. Return true if the left property is greater than or equal to 0 and if the right property is less
     * than or equal to the window inner width or document client width
     */
    isInViewport() {
        const lastChild = this._Cre8TabItems[this._Cre8TabItems.length - 1];
        const tabElement = lastChild.shadowRoot?.querySelector('.cre8-c-tab');
        if (!tabElement) {
            return false; // Return false if the tab element is not found
        }

        const rect = tabElement.getBoundingClientRect(); /* 1 */
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;
        return rect.left >= 0 && rect.right <= windowWidth; /* 2 */
    }

    /**
     * Set Tab Variant
     * 1. Loop through all the cre8-tab Components and set the size to 'sm' if the parent has size 'sm'.
     */
    setTabVariant() {
        if (this.size === 'sm') {
            this._Cre8TabItems.forEach((tab: Cre8Tab) => {
                tab.size = 'sm';
            });
        }
    }

    /**
     * Set the attributes on tab and tab panel
     * 1. Sets the index value on the tab items.
     * 2. Sets the `aria-labelledby` on the tab items.
     * 3. Set the index and id on the tab-panel to match the tab.
     */
    setTabAttributes() {
        this._Cre8TabItems.forEach((tab, index) => {
            /* 1 */
            tab.index = index;

            /* 2 */
            const ariaLabelledBy = tab.ariaLabelledBy;
            const id = ariaLabelledBy || nanoid();
            tab.ariaLabelledBy = id;


            /* 3 */
            const tabPanel = this._Cre8TabPanels[index];
            tabPanel.index = index;
        });
    }

    /**
     * Set Active Tab
     * 1. Sets the active state for the selected tab.
     * 2. Sets the active state for the tab panel with the same index value as the selected tab.
     */
    setActiveTab() {
        /* 1 */
        this.activeTab.isActive = true;

        /* 2 */
        const activeTabPanel = this._Cre8TabPanels.find((tabPanel) => tabPanel.index === this.activeTab.index);
        if (activeTabPanel) {
            activeTabPanel.isActive = true;
        }
    }

    /**
     * Set Active Tab Focus
     */
    setActiveTabFocus() {
        this.activeTab.shadowRoot?.querySelector<HTMLElement>('.cre8-c-tab').focus();
    }

    /**
     * Handle Tab Selected
     * 1. Only continue if event target is a tab
     * 2. If tab is active, make the previous selected tab inactive.
     * 3. Set the clicked tab active.
     * 4. Emit the custom event.
     * @fires tabSelected
     */
    handleTabSelected(event: MouseEvent) {
        const { target } = event;

        /* 1 */
        if (this._Cre8TabItems.includes(target as Cre8Tab)) {
            /* 2 */
            if (this.activeTab) {
                this.removePreviousActiveTab();
            }

            /* 3 */
            this.activeTab = target as Cre8Tab;
            const activeIndex = this._Cre8TabItems.findIndex((tab) => tab === this.activeTab);
            this.activeIndex = activeIndex;
            this.setActiveTab();

            /* 4 */
            this.emitEvent();
        }
    }

    /**
     * Handle Keydown
     * 1. If the active tab is not focused then handle the keydown events.
     * 2. On keydown of the right arrow, make the next tab active.
     * 3. On keydown of the left arrow, make the previous tab active.
     * 4. On keydown of the home key, make the first tab active.
     * 5. On keydown of the end key, make the last tab active.
     * 6. On keydown of the escape key, remove the focus.
     * @fires keydown
     */
    handleKeydown(event: KeyboardEvent) {
        /* 1 */
        const { target } = event;
        const focused = document.activeElement as Cre8Tab;
        if (!focused.matches('cre8-tab')) {
            return;
        }
        switch (event.key) {
            /* 2 */
            case 'ArrowRight':
                event.preventDefault();
                this.setSelectedToNextTab(target as Cre8Tab);
                break;
            /* 3 */
            case 'ArrowLeft':
                event.preventDefault();
                this.setSelectedToPreviousTab(target as Cre8Tab);
                break;
            /* 4 */
            case 'Home':
                event.preventDefault();
                this.setSelectedToNextTab(this._Cre8TabItems[this._Cre8TabItems.length - 1]);
                break;
            /* 5 */
            case 'End':
                event.preventDefault();
                this.setSelectedToPreviousTab(this._Cre8TabItems[0]);
                break;
            /* 6 */
            case 'Escape':
                this.activeTab.blur();
                break;
            default:
                // no default
        }
    }

    /**
     * Set Selected To Previous Tab
     * 1. Get current selected Tab index then deactivate previously selected tab.
     * 2. If current activeIndex is in first position then move the tab focus to last tab.
     * 3. Set the active tab and focus.
     * 4. Emit custom event.
     * @fires tabChange
     */
    setSelectedToPreviousTab(currentTab: Cre8Tab) {
        /* 1 */
        const activeIndex = currentTab.index;
        this.removePreviousActiveTab();

        /* 2 */
        const tabListLength = this._Cre8TabItems.length - 1;
        if (activeIndex === 0) {
            this.activeIndex = tabListLength;
            this.activeTab = this._Cre8TabItems[tabListLength];
        } else {
            const previousIndex = activeIndex - 1;
            this.activeIndex = previousIndex;
            this.activeTab = this._Cre8TabItems[previousIndex];
        }

        /* 3 */
        this.setActiveTab();
        this.setActiveTabFocus();

        /* 4 */
        this.emitEvent();
    }

    /**
     * Set Selected To Next Tab
     * 1. Get current selected Tab index then deactivate previously selected tab.
     * 2. If current activeIndex is in last position then move the tab focus to first tab.
     * 3. Set the active tab and focus.
     * 4. Emit custom event.
     * @fires tabChange
     */
    setSelectedToNextTab(currentTab: Cre8Tab) {
        /* 1 */
        const activeIndex = currentTab.index;
        this.removePreviousActiveTab();

        /* 2 */
        const tabListLength = this._Cre8TabItems.length - 1;
        if (activeIndex === tabListLength) {
            this.activeIndex = 0;
            this.activeTab = this._Cre8TabItems[0];
        } else {
            const nextIndex = activeIndex + 1;
            this.activeIndex = nextIndex;
            this.activeTab = this._Cre8TabItems[nextIndex];
        }

        /* 3 */
        this.setActiveTab();
        this.setActiveTabFocus();

        /* 4 */
        this.emitEvent();
    }

    /**
     * Remove Active from Previous Tab
     * 1. Get current selected Tab index then deactivate previously selected tab
     * 2. If current activeIndex is in first position then move the tab focus to last tab
     */
    removePreviousActiveTab() {
        /* 1 */
        this.activeTab.isActive = false;

        /* 2 */
        const activeTabPanel = this._Cre8TabPanels.find((tabPanel) => tabPanel.index === this.activeTab.index);
        if (activeTabPanel) {
            activeTabPanel.isActive = false;
        }
    }

    /**
     * Emit custom event
     */
    emitEvent() {
        const customEvent = new CustomEvent('tabChange', {
            detail: {
                value: this.activeTab,
                activeTabIndex: this.activeIndex,
            },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(customEvent);
    }

    render() {
        const componentClassNames = this.componentClassNames('cre8-c-tabs', {
            'cre8-is-start': this.isStart === true,
            'cre8-is-end': this.isEnd === true,
            'cre8-c-tabs--full-width': this.fullWidth,
        });

        return html`
        <div class="${componentClassNames}">
            <div class="cre8-c-tabs__header">
                <div
                    class="cre8-c-tabs__list"
                    role="tablist"
                    tabindex=0
                    @scroll=${this.handleScroll}
                    @keydown=${this.handleKeydown}
                    @click=${this.handleTabSelected}
                >
                    <slot></slot>
                </div>
            </div>
            <div class="cre8-c-tabs__body">
                <slot name="panel"></slot>
            </div>
        </div>
    `;
    }
}

if (customElements.get('cre8-tabs') === undefined) {
    customElements.define('cre8-tabs', Cre8Tabs);
}

declare global {
    interface HTMLElementTagNameMap {
        'cre8-tabs': Cre8Tabs;
    }
}

export default Cre8Tabs;
