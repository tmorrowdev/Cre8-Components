import classnames from 'classnames';
import {LitElement, html, unsafeCSS} from 'lit';
import {property} from 'lit/decorators.js';
import '../../../components/modal/modal';
import '../../../components/button-group/button-group';
import '../../../components/button/button';
import '../../../components/heading/heading';
import styles from './sample-modal.scss';
import {ifDefined} from 'lit-html/directives/if-defined.js';

/**
 * An example element.
 */
export class SampleModal extends LitElement {
  static get styles() {
    return unsafeCSS(styles.toString());
  }

  /**
   * Modal is active toggle
   */
  @property({type: Boolean, reflect: true})
  modalIsActive = false;

  /**
   * Status Types
   * <cre8-text-passage size="sm">
   * <ul>
   * <li>**default (no value)** renders a default modal</li>
   * <li>**error** renders an error modal</li>
   * <li>**warning** renders a warning modal</li>
   * <li>**success** renders a success modal</li>
   * <li>**info** renders an info modal</li>
   * <li>**help** renders an help modal</li>
   * </ul>
   * </cre8-text-passage>
   */
  @property()
  status?: 'error' | 'warning' | 'success' | 'info' | 'help';

   /**
   *  Not dismissible modal
   */
   @property({type: Boolean})
   notDismissible?: boolean;

  /* Toggle the Modal */
  toggleModal() {
    this.modalIsActive = !this.modalIsActive;
    if (!this.modalIsActive) {
      const triggerButton = this.shadowRoot
        ?.querySelector<HTMLElement>('cre8-button')
        ?.shadowRoot?.querySelector<HTMLButtonElement | HTMLAnchorElement>('.cre8-c-button');
      if (triggerButton) {
        triggerButton.focus();
      }
    }
  }

  render() {
    const componentClassName = classnames('c-sample-modal', {});

    return html` <div class="${componentClassName}">
      <cre8-button text="Open Modal" @click="${() => this.toggleModal()}"></cre8-button>
      <cre8-modal
        status="${ifDefined(this.status)}"
        utilityModalTitle="Modal Heading"
        notDismissible="${ifDefined(this.notDismissible)}"
        ?isActive=${this.modalIsActive}
        @close-modal="${() => this.toggleModal()}"
        ariaLabel="This text describes modal to screen reader when focused on"
      >
        <cre8-heading variant="title-large" ?brandColor=${true} slot="header">Modal Heading</cre8-heading>
        <cre8-text-passage>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque netus nulla accumsan placerat. DEFAULT DESKTOP WIDTH:544
        </cre8-text-passage>
        <cre8-button-group slot="footer" orientation="responsive-full-width">
          <cre8-button variant="primary" text="Button"></cre8-button>
          <cre8-button variant="tertiary" text="Button"></cre8-button>
        </cre8-button-group>
      </cre8-modal>
    </div>`;
  }
}

if (customElements.get('sample-modal') === undefined) {
  customElements.define('sample-modal', SampleModal);
}

declare global {
  interface HTMLElementTagNameMap {
    'sample-modal': SampleModal;
  }
}
