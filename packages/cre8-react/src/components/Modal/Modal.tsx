import React from 'react';
import { EventName, createComponent } from '@lit-labs/react';
import { cre8Modal as cre8ModalElement, type CloseModalEvent } from '@cre8/cre8-wc/lib/components/modal/modal';

export const cre8Modal = createComponent({
    react: React,
    tagName: 'cre8-modal',
    elementClass: cre8ModalElement,
    events: {
         /** Event emitted when the close button is clicked. Use this
          * when managing `isActive`'s state.
         */
        onClose: 'close-modal' as EventName<CloseModalEvent>,
    },
});
