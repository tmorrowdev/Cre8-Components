import type { StoryObj } from '@storybook/react';
import { Cre8Breadcrumbs, Cre8BreadcrumbsItem, Cre8Link } from '../..';
import { excludeRegexArray } from '../../../.storybook/preview';
import React from 'react';

export default {
  title: 'Cre8 Components/Breadcrumbs',
  component: Cre8Breadcrumbs,
  subcomponents: { Cre8BreadcrumbsItem },
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}|^renderCre8BreadcrumbsItems$|^navigateToByMobile$|^navigateToByMobile$|^emitPathChangedEvent$`)
    }
  },
};

export const Default: StoryObj<typeof Cre8Breadcrumbs> = { args: {
  children: (
    <>
      <Cre8BreadcrumbsItem> <Cre8Link href="#">Grandparent</Cre8Link></Cre8BreadcrumbsItem>
      <Cre8BreadcrumbsItem> <Cre8Link href="#">Parent</Cre8Link></Cre8BreadcrumbsItem>
      <Cre8BreadcrumbsItem>Current</Cre8BreadcrumbsItem>
    </>
  )
} };
