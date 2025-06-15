import React from 'react';
import { createComponent } from '@lit/react';
import { Cre8TableRow as Cre8TableRowElement } from '@cre8_dev/cre8-wc/lib/components/table-row/table-row';

export const Cre8TableRow = createComponent({
    react: React,
    tagName: 'cre8-table-row',
    elementClass: Cre8TableRowElement,

});
