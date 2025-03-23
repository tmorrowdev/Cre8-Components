import React from 'react';
import { createComponent, EventName } from '@lit-labs/react';
import { cre8SelectTile as cre8SelectTileElement } from '@cre8/cre8-wc/lib/components/select-tile/select-tile';
import { cre8DomEvent } from '../../util/cre8DomEvent';

export const cre8SelectTile = createComponent({
    react: React,
    tagName: 'cre8-select-tile',
    elementClass: cre8SelectTileElement,
    events: {
        onBlur: 'blur' as EventName<cre8DomEvent<cre8SelectTileElement> & FocusEvent>,
        onChange: 'change' as EventName<cre8DomEvent<cre8SelectTileElement>>,
        onClick: 'click' as EventName<cre8DomEvent<cre8SelectTileElement> & PointerEvent>,
        onFocus: 'focus' as EventName<cre8DomEvent<cre8SelectTileElement> &FocusEvent>,
        onInput: 'input' as EventName<cre8DomEvent<cre8SelectTileElement>>,
    },
});
