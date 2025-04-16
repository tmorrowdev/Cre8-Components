import type { StoryObj } from '@storybook/react';
import React from 'react';
import { excludeRegexArray } from '../../../.storybook/preview';
import { Cre8Table, Cre8TableBody, Cre8TableCell, Cre8TableHeader, Cre8TableHeaderCell, Cre8TableObject, Cre8TableRow } from '../..';
import { Fpo as ForPositionOnly } from '../../../.storybook/components/Fpo/Fpo';


export default {
  title: 'Cre8 Components/Table/TableObject',
  component: Cre8TableObject,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    }
  },
};

export const Default: StoryObj<typeof Cre8TableObject> = { args: {
  children: (
    <>
      <div slot="header">
        <ForPositionOnly>Content above table</ForPositionOnly>
      </div>
      <Cre8Table caption="Example Table">
        <Cre8TableHeader>
          <Cre8TableRow>
            <Cre8TableHeaderCell>Product Name</Cre8TableHeaderCell>
            <Cre8TableHeaderCell>Price</Cre8TableHeaderCell>
            <Cre8TableHeaderCell>Quantity</Cre8TableHeaderCell>
            <Cre8TableHeaderCell>Total</Cre8TableHeaderCell>
          </Cre8TableRow>
        </Cre8TableHeader>
        <Cre8TableBody>
          <Cre8TableRow>
            <Cre8TableCell>Product 1</Cre8TableCell>
            <Cre8TableCell>$10.00</Cre8TableCell>
            <Cre8TableCell>2</Cre8TableCell>
            <Cre8TableCell>$20.00</Cre8TableCell>
          </Cre8TableRow>
          <Cre8TableRow>
            <Cre8TableCell>Product 2</Cre8TableCell>
            <Cre8TableCell>$15.00</Cre8TableCell>
            <Cre8TableCell>1</Cre8TableCell>
            <Cre8TableCell>$15.00</Cre8TableCell>
          </Cre8TableRow>
          <Cre8TableRow>
            <Cre8TableCell>Product 3</Cre8TableCell>
            <Cre8TableCell>$20.00</Cre8TableCell>
            <Cre8TableCell>3</Cre8TableCell>
            <Cre8TableCell>$60.00</Cre8TableCell>
          </Cre8TableRow>
          <Cre8TableRow>
            <Cre8TableCell>Product 4</Cre8TableCell>
            <Cre8TableCell>$5.00</Cre8TableCell>
            <Cre8TableCell>4</Cre8TableCell>
            <Cre8TableCell>$20.00</Cre8TableCell>
          </Cre8TableRow>
        </Cre8TableBody>
      </Cre8Table>
      <div slot="footer">
        <ForPositionOnly>Content below table</ForPositionOnly>
      </div>
    </>
  )
} };
