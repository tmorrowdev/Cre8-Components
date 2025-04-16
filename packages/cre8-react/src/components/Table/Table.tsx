import React from 'react';
import { createComponent } from '@lit/react';
import { Cre8Table as Cre8TableElement } from '@cre8_dev/cre8-wc/lib/components/table/table';

export const Cre8Table = createComponent({
    react: React,
    tagName: 'Cre8-table',
    elementClass: Cre8TableElement,

});
