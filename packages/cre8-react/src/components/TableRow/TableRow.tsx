import React from 'react';
import { createComponent } from '@lit-labs/react';
import { cre8TableRow as cre8TableRowElement } from '@cre8/cre8-wc/lib/components/table-row/table-row';

export const cre8TableRow = createComponent({
    react: React,
    tagName: 'cre8-table-row',
    elementClass: cre8TableRowElement,

});
