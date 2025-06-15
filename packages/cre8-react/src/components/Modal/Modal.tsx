import React from 'react';
import { EventName, createComponent } from '@lit/react';
import { Cre8Modal as Cre8ModalElement, type CloseModalEvent } from '@cre8_dev/cre8-wc/lib/components/modal/modal';

export const Cre8Modal = createComponent({
    react: React,
    tagName: 'cre8-modal',
    elementClass: Cre8ModalElement,
    events: {
         /** Event emitted when the close button is clicked. Use this
          * when managing `isActive`'s state.
         */
        onClose: 'close-modal' as EventName<CloseModalEvent>,
    },
});
