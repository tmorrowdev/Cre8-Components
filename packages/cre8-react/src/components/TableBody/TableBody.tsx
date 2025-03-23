import React from 'react';
import { createComponent } from '@lit-labs/react';
import { cre8TableBody as cre8TableBodyElement } from '@cre8/cre8-wc/lib/components/table-body/table-body';

export const cre8TableBody = createComponent({
    react: React,
    tagName: 'cre8-table-body',
    elementClass: cre8TableBodyElement,

});
