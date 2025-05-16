/* eslint-disable import/prefer-default-export */
/* eslint-disable lit/no-template-map */
import {
    html, HTMLTemplateResult, nothing, unsafeCSS,
} from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { property, queryAll, state } from 'lit/decorators.js';
import svgCaretLeft from '@cre8_dev/cre8-icons/lib/icons/System/Regular/Caret Left.svg?raw';
import svgFirstPage from '@cre8_dev/cre8-icons/lib/icons/System/Regular/Caret Double Left.svg?raw';
import svgLastPage from '@cre8_dev/cre8-icons/lib/icons/System/Regular/Caret Double Right.svg?raw';
import svgCaretRight from '@cre8_dev/cre8-icons/lib/icons/System/Regular/Caret Right.svg?raw';
import { Cre8Element } from '../cre8-element';
import { Cre8Button } from '../button/button';
import { isMobile, screenSizes } from '../../utilities/is-mobile';
import './page-counter/page-counter';
import styles from './pagination.scss';
import '@cre8_dev/cre8-icons/lib/wc/Icon';

/**
 * The Pagination component is used to split up a large amount of results
 *  by showing only a certain amount on each page. You can cycle through
 *  the pages using Page Numbers, Next and Previous Buttons, or optional
 *  First Page and Last Page Buttons. This component is also used by Table
 *  to cycle through rows of results. Pagination has 3 display options:
 *
 * **default**:  Can contain up to seven Page Numbers (ellipses included)
 *  at a time flanked by Next and Previous Buttons. When there are more than
 *  seven pages, numbers start getting replaced by ellipses. Use this option
 *  when you have a lot of horizontal space in a layout. It should not be used
 *  for mobile web layouts since its buttons are smaller than the minimum touch target of 44px.
 *  The component has built in responsivity to mobile page size so you dont have tohandle this
 *  seperately
 *
 *
 * **compact** : Best used as a summary of where you are among pages or table rows flanked by
 * Previous and Next Buttons. Use this option when you have limited horizontal space but still
 * need to show where users are among results. Great for mobile layouts.
 *
 *
 * **icon-only** : Use this option in very tight spaces when it’s not required to show users
 * where they are among results. Great for mobile layouts.
 *
 *
 * ## HOW TO USE
 *
 * Select an option from the “display” dropdown depending on layout width
 * Select where your current page is from the “Page” dropdown
 * To show less pages when using Full Numbers, use the "visiblePages” toggles
 * To hide the First Page and Last Page Buttons, turn on the “hideFirstLastButton” toggle
 * To change the states of page numbers or buttons, interact with the buttond to invoke each “State”
 * When using Compact Numbers, you can choose between “compact” and “icon-only” formats
 *
 *
 * ## ACCESSIBILITY NOTE
 *
 * To best orient people using screen readers, push focus to the top of
 * the list of results after any of the pagination buttons have been triggered,
 * **except for the currently selected one**. Focus target could be a visual results heading,
 * or the top heading of the results container of the page selected
 * via a programmatic selector, e.g. < section id=“results” aria-label="results-section" > or
 * < div role= “group” aria-label=“results” >.
 *
 * @dependency cre8-button, cre8-icon, cre8-pagination-counter
 * @csspart icon - distinguishes the page buttons from the icon buttons
 * @cssproperty "--pagination-display" - controls the display css property
 * @cssproperty "--pagination-justify-content" - controls horizontal alignment of pagination
 * @cssproperty "--pagination-align-items" - controls vertical alignment of pagination
 */

export class Cre8Pagination extends Cre8Element {
    static get styles() {
        return unsafeCSS(styles);
    }

    static elementDefinitions = {
        'cre8-button': Cre8Button,
    };

  @state()
      _currentPage: number = 99;

  /**
   * Input the total number of elements are returned from consuming app e.g. search results
   * @attr number
   * @required
   */
  @property({ reflect: true, type: Number })
      totalResults!: number;


  /**
   * how many elements will displayVariant per page, indicated by business to typically be 20
   * @attr number
   */
  @property({ type: Number, reflect: true })
  get pageSize() {
      return this._pageSize;
  }

  set pageSize(newSize: number) {
      const oldSize = this._pageSize;
      this._pageSize = newSize;
      this.requestUpdate('pageSize', oldSize);
  }

  @state()
      _pageSize = 10;


  /**
   * Controls how many page buttons are displayVarianted on the page
   * at once, if container size permits. recommended max = 5 pages
   *
   * @attr number
   */
  @property({ reflect: true, type: Number })
      visiblePages?: number = 5;

  /**
   * (optional) prop that allows for a compact and icon-only variant both
   * for mobile screen-sizes and for use in certain contexts as guided by design,
   * the component size will show 'default' in the absence of a value on desktop and
   * 'compact' on smaller views.
   *
   * @attr 'compact' | 'icon-only' | 'default'
   * @optional
   */
  @property({ type: String, reflect: true })
      display?: 'compact' | 'icon-only'| 'default';

  /**
   *
   *@state watches the width of the window and responds to show the accessibility approved variant.
   */
  @state()
      windowWidth!: number;

  @queryAll('cre8-button')
      buttons: Cre8Button[];

  /**
  *
  * @optional
  */
  @property({ type: Boolean, reflect: true })
      hideLastAndFirstButtons?: boolean;

  @property({ reflect: true, type: Number })
  get currentPage() {
      return this._currentPage;
  }

  set currentPage(newPage: number) {
      const oldPage = this._currentPage;
      this._currentPage = newPage;
      this.requestUpdate('currentPage', oldPage);
  }

  connectedCallBack() {
      super.connectedCallback();
  }

  get maxVisiblePages() {
      const allowedVisiblePages = {
          md: 5,
      };

    // lg and up

      if (!isMobile(screenSizes.lg.toString())) {
          return this.visiblePages;
      }

      if (!isMobile(screenSizes.md.toString())) {
          return Math.min(allowedVisiblePages.md, this.visiblePages);
      }
      return 0;
  }


  private get totalPages(): number {
      return Math.ceil(this.totalResults / this.pageSize);
  }

  private get hasNoPreviousPage() {
      return this._currentPage <= 1;
  }

  private get hasNoNextPage() {
      return this._currentPage >= this.totalPages;
  }

  private _onHandleResize() {
      this.requestUpdate();
  }

  handleResize() {
      this._onHandleResize.bind(this);
  }

  // get range of pages to display [3, 4, 5], [2, 3, 4, 5]
  protected get pageRange():number[] {
      const left = Math.floor(this.maxVisiblePages / 2);
      let startPage = this.currentPage - left;
      startPage = Math.min(startPage, this.totalPages - this.maxVisiblePages + 1);
      startPage = Math.max(startPage, 1);
      const endPage = Math.min(startPage + this.maxVisiblePages - 1, this.totalPages);
      return [...Array(this.totalPages)].map((_, index) => index + 1).slice(startPage - 1, endPage);
  }

  protected async firstUpdated() {
      await this.updateComplete;
      if (this._pageSize !== this.pageSize) {
          const old = this._pageSize;
          this._pageSize = this.pageSize;
          this.requestUpdate('pageSize', old);
      }
      this.windowWidth = window.innerWidth;
      window.addEventListener('resize', () => {
          if (this.windowWidth !== window.innerWidth) {
              const oldWidth = this.windowWidth;
              this.windowWidth = window.innerWidth;
              this.handleResize();
              this.requestUpdate('isResponsive', oldWidth);
          }
      });
      if (this._currentPage !== this.currentPage) {
          const old = this._currentPage;
          this._currentPage = this.currentPage;
          this.requestUpdate('currentPage', old);
      }
  }

  disconnectedCallback() {
      window.removeEventListener('resize', this.handleResize);
      super.disconnectedCallback();
  }

  displayTypes(): HTMLTemplateResult {
      return html`<cre8-page-counter
              currentPage=${this.currentPage}
              style="display:${this.display === 'compact' ? 'flex' : 'none'};"
              totalResults=${this.totalResults}
              pageSize=${this._pageSize}
              display=${this.display}>
              </cre8-page-counter>`;
  }

  private _handleKeydown = (page: number, _buttonName?: string) => (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
          this._goToPage(page, _buttonName); /* 2 */
      }
  };

  private _goToPage = (page: number, _buttonName?: string) => () => {
      const old = this._currentPage;
      let focusButton: Cre8Button;
      this.buttons.forEach((b: Cre8Button) => {
          if (b.hideText && (b.text === _buttonName)) {
              focusButton = b;
              (focusButton.shadowRoot!.querySelector('.cre8-c-button') as HTMLButtonElement).blur();
          }
          return null;
      });
      this._currentPage = page;
      this.currentPage = this._currentPage;
      this.requestUpdate('currentPage', old);
      this.dispatchEvent(new CustomEvent(
          'pagination.click',
          { detail: { buttonName: _buttonName ?? this.currentPage.toString(), value: this.currentPage } }
      ));
  };

  public goToPage(page: number, buttonName?: string) {
      return this._goToPage(page, buttonName).bind(this);
  }

  public handleKeydown(page: number, buttonName?: string) {
      return this._handleKeydown(page, buttonName);
  }

  render() {
      const classNames = this.componentClassNames('cre8-c-pagination', {
          'cre8-c-pagination--compact': this.display !== undefined && this.display === 'compact',
          'cre8-c-pagination--icon-only': this.display !== undefined && this.display === 'icon-only',
      });


      return html`<nav
      aria-label="pagination"
      class=${classNames}>
        <slot></slot>
        ${!this.hideLastAndFirstButtons ? html` <cre8-button
              variant="tertiary"
              size="sm"
              text=""
              hideText
              part="icon"
              aria-disabled="${ifDefined(this.hasNoPreviousPage)}"
              ?disabled=${this.hasNoPreviousPage}
              @click=${this.goToPage(1, 'First Page')}
              @keydown=${this.handleKeydown(1, 'First Page')}

            >
        <span slot="before">
          <cre8-icon
            className="cre8-c-pagination__icon"
            aria-label="First Page"
            svg=${svgFirstPage}
            size="24">
          </cre8-icon>
        </span>
            </cre8-button>` : nothing}
        <cre8-button
          variant="tertiary"
          size="sm"
          hideText
          text=""
          part="icon"
          aria-disabled="${ifDefined(this.hasNoPreviousPage)}"
          ?disabled=${this.hasNoPreviousPage}
          @click=${this.goToPage(this._currentPage - 1, 'Previous Page')}
          @keydown=${this.handleKeydown(this.currentPage - 1, 'Previous Page')}

        >
          <span slot="before">
            <cre8-icon
            className="cre8-c-pagination__icon"
            aria-label="Previous Page"
            slot="before"
            svg=${svgCaretLeft}
            size="24"

            >
            </cre8-icon>
          </span>
        </cre8-button>

      ${this.displayTypes()}
        ${!this.display || this.display === 'default'
        ? html`${this.pageRange[this.pageRange.length - 1] > 1 && this.pageRange[0] !== 1
            ? html`<cre8-button hideText iconName="ellipsis" variant="tertiary" size="sm" aria-disabled="true" inert></cre8-button>`
            : nothing}
            ${this.pageRange.map((page) => (page === this.currentPage
        ? html`<cre8-button variant="tertiary" tab-index="-1" text="${page}"  class="icon-only" size="sm" id="current"></cre8-button>`
        : html`<cre8-button
                      variant="tertiary"
                      size="sm"
                      text="${page}"
                      class="icon-only"
                      id="${page}"
                      @click=${this.goToPage(page, page.toString())}
                      @keydown=${this.handleKeydown(page, page.toString())}>
                      </cre8-button>`
    ))}
            ${this.pageRange[this.pageRange.length - 1] < this.totalPages
        ? html`<cre8-button
                      hideText
                      iconName="ellipsis"
                      text="ellipsis"
                      variant="tertiary"
                      size="sm"
                      aria-disabled="true"
                      inert>
                    </cre8-button>`
        : nothing}`
        : nothing}
        <cre8-button
          variant="tertiary"
          size="sm"
          part="icon"
          hideText
          text=""
          aria-disabled="${ifDefined(this.hasNoNextPage)}"
          ?disabled=${this.hasNoNextPage}
          @click=${this.goToPage(this.currentPage + 1, 'Next Page')}
          @keydown=${this.handleKeydown(this.currentPage + 1, 'Next Page')}

        >
          <span slot="before">
            <cre8-icon
            aria-label="Next Page"
            className="cre8-c-pagination__icon"
            slot="before" svg=${svgCaretRight}
            size="24">
            </cre8-icon>
          </span>
        </cre8-button>

        ${!this.hideLastAndFirstButtons
        ? html` <cre8-button
              variant="tertiary"
              size="sm"
              hideText
              text=""
              part="icon"
              aria-disabled="${ifDefined(this.hasNoNextPage)}"
              ?disabled=${this.hasNoNextPage}
              @click=${this.goToPage(this.totalPages, 'Last Page')}
              @keydown=${this.handleKeydown(this.totalPages, 'Last Page')}

            >
              <span slot="before">
                <cre8-icon
                aria-label="Last Page"
                className="cre8-c-pagination__icon"
                slot="before"
                svg=${svgLastPage}
                size="24"
                >
                </cre8-icon>
              </span>
            </cre8-button>`
        : nothing}

      </nav>`;
  }
}

if (customElements.get('cre8-pagination') === undefined) {
    customElements.define('cre8-pagination', Cre8Pagination);
}

declare global {
  interface HTMLElementTagNameMap {
    'cre8-pagination': Cre8Pagination;
  }
}
