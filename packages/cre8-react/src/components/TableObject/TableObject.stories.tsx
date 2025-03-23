import type { StoryObj } from '@storybook/react';
import React from 'react';
import { excludeRegexArray } from '../../../.storybook/preview';
import { cre8Table, cre8TableBody, cre8TableCell, cre8TableHeader, cre8TableHeaderCell, cre8TableObject, cre8TableRow } from '../..';
import { Fpo as ForPositionOnly } from '../../../.storybook/components/Fpo/Fpo';


export default {
  title: 'cre8 Components/Table/TableObject',
  component: cre8TableObject,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    }
  },
};

export const Default: StoryObj<typeof cre8TableObject> = { args: {
  children: (
    <>
      <div slot="header">
        <ForPositionOnly>Content above table</ForPositionOnly>
      </div>
      <cre8Table caption="Example Table">
        <cre8TableHeader>
          <cre8TableRow>
            <cre8TableHeaderCell>Product Name</cre8TableHeaderCell>
            <cre8TableHeaderCell>Price</cre8TableHeaderCell>
            <cre8TableHeaderCell>Quantity</cre8TableHeaderCell>
            <cre8TableHeaderCell>Total</cre8TableHeaderCell>
          </cre8TableRow>
        </cre8TableHeader>
        <cre8TableBody>
          <cre8TableRow>
            <cre8TableCell>Product 1</cre8TableCell>
            <cre8TableCell>$10.00</cre8TableCell>
            <cre8TableCell>2</cre8TableCell>
            <cre8TableCell>$20.00</cre8TableCell>
          </cre8TableRow>
          <cre8TableRow>
            <cre8TableCell>Product 2</cre8TableCell>
            <cre8TableCell>$15.00</cre8TableCell>
            <cre8TableCell>1</cre8TableCell>
            <cre8TableCell>$15.00</cre8TableCell>
          </cre8TableRow>
          <cre8TableRow>
            <cre8TableCell>Product 3</cre8TableCell>
            <cre8TableCell>$20.00</cre8TableCell>
            <cre8TableCell>3</cre8TableCell>
            <cre8TableCell>$60.00</cre8TableCell>
          </cre8TableRow>
          <cre8TableRow>
            <cre8TableCell>Product 4</cre8TableCell>
            <cre8TableCell>$5.00</cre8TableCell>
            <cre8TableCell>4</cre8TableCell>
            <cre8TableCell>$20.00</cre8TableCell>
          </cre8TableRow>
        </cre8TableBody>
      </cre8Table>
      <div slot="footer">
        <ForPositionOnly>Content below table</ForPositionOnly>
      </div>
    </>
  )
} };
