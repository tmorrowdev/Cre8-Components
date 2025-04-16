import React from 'react';
import { createComponent } from '@lit/react';
import { Cre8BreadcrumbsItem as Cre8BreadcrumbsItemElement } from '@cre8_dev/cre8-wc/lib/components/breadcrumbs-item/breadcrumbs-item';

export const Cre8BreadcrumbsItem = createComponent({
    react: React,
    tagName: 'Cre8-breadcrumbs-item',
    elementClass: Cre8BreadcrumbsItemElement,

});
