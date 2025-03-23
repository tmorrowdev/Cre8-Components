import React from 'react';
import { createComponent } from '@lit-labs/react';
import { cre8BreadcrumbsItem as cre8BreadcrumbsItemElement } from '@cre8/cre8-wc/lib/components/breadcrumbs-item/breadcrumbs-item';

export const cre8BreadcrumbsItem = createComponent({
    react: React,
    tagName: 'cre8-breadcrumbs-item',
    elementClass: cre8BreadcrumbsItemElement,

});
