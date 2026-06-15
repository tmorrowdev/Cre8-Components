import { createComponent } from '@lit/react';
import { Cre8Modal as Cre8ModalElement } from '@tmorrow/cre8-wc/lib/components/modal/modal';
import React from 'react';

export interface Cre8ModalProps {
  /** Is Active attribute */
  isActive?: boolean | undefined;
  /** Status Types <cre8-text-passage size="sm"> <ul> <li>**default (no value)** renders a default modal</li> <li>**error** renders an error modal</li> <li>**warning** renders a warning modal</li> <li>**success** renders a success modal</li> <li>**info** renders an info modal</li> <li>**help** renders an help modal</li> </ul> </cre8-text-passage> */
  status?: any;
  /** Utility Modal Heading (String) */
  utilityModalTitle?: string;
  /** Not dismissible modal */
  notDismissible?: boolean | undefined;
  /** Close Button Text */
  closeButtonText?: string;
  /** Close Button Icon */
  closeButtonIcon?: string;
  /** Modal Aria Label - This is required for accessibility and provides context of the entire modal! */
  ariaLabel?: string;
  children?: React.ReactNode;
  onCloseModal?: (event: CustomEvent) => void;
}

/**
 * Modal component should be used in all modal situations.
 */
export const Cre8Modal = createComponent({
  react: React,
  tagName: 'cre8-modal',
  elementClass: Cre8ModalElement,
  events: {
    onCloseModal: 'close-modal'
  }
});

export default Cre8Modal;
