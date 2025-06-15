import React from 'react';
import { createComponent, EventName } from '@lit/react';
import { Cre8SelectTile as Cre8SelectTileElement } from '@cre8_dev/cre8-wc/lib/components/select-tile/select-tile';
import { Cre8DomEvent } from '../../util/Cre8DomEvent';

export const Cre8SelectTile = createComponent({
    react: React,
    tagName: 'cre8-select-tile',
    elementClass: Cre8SelectTileElement,
    events: {
        onBlur: 'blur' as EventName<Cre8DomEvent<Cre8SelectTileElement> & FocusEvent>,
        onChange: 'change' as EventName<Cre8DomEvent<Cre8SelectTileElement>>,
        onClick: 'click' as EventName<Cre8DomEvent<Cre8SelectTileElement> & PointerEvent>,
        onFocus: 'focus' as EventName<Cre8DomEvent<Cre8SelectTileElement> &FocusEvent>,
        onInput: 'input' as EventName<Cre8DomEvent<Cre8SelectTileElement>>,
    },
});
