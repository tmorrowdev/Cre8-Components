import React from 'react';
import { createComponent } from '@lit-labs/react';
import { cre8Table as cre8TableElement } from '@cre8/cre8-wc/lib/components/table/table';

export const cre8Table = createComponent({
    react: React,
    tagName: 'cre8-table',
    elementClass: cre8TableElement,

});
