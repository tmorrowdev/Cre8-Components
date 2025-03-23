import type { StoryObj } from '@storybook/react';
import React from 'react';
import { cre8Table, cre8TableBody, cre8TableCell, cre8TableHeader, cre8TableHeaderCell, cre8TableRow } from '../..';
import { excludeRegexArray } from '../../../.storybook/preview';

export default {
  title: 'cre8 Components/Table/Table',
  component: cre8Table,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    }
  },
};

export const Default: StoryObj<typeof cre8Table> = { args: {
  children: (
    <>
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
    </>
  )
} };

export const VisibleCaption: StoryObj<typeof cre8Table> = { args: {
  caption: "Example Table",
  children: (
    <>
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
    </>
  )
} };

export const Striped: StoryObj<typeof cre8Table> = { args: {
  variant: "striped",
  children: (
    <>
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
    </>
  )
} };

export const Hoverable: StoryObj<typeof cre8Table> = { args: {
  isHoverable: true,
  children: (
    <>
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
    </>
  )
} };

export const HoverableStriped: StoryObj<typeof cre8Table> = { args: {
  isHoverable: true,
  variant: "striped",
  children: (
    <>
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
    </>
  )
} };

export const ResponsiveStacked: StoryObj<typeof cre8Table> = { args: {
  behavior: "responsive",
  children: (
    <>
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
          <cre8TableCell dataHeader="Product Name">Product 1</cre8TableCell>
          <cre8TableCell dataHeader="Price">$10.00</cre8TableCell>
          <cre8TableCell dataHeader="Quantity">2</cre8TableCell>
          <cre8TableCell dataHeader="Total">$20.00</cre8TableCell>
        </cre8TableRow>
        <cre8TableRow>
          <cre8TableCell dataHeader="Product Name">Product 2</cre8TableCell>
          <cre8TableCell dataHeader="Price">$15.00</cre8TableCell>
          <cre8TableCell dataHeader="Quantity">1</cre8TableCell>
          <cre8TableCell dataHeader="Total">$15.00</cre8TableCell>
        </cre8TableRow>
        <cre8TableRow>
          <cre8TableCell dataHeader="Product Name">Product 3</cre8TableCell>
          <cre8TableCell dataHeader="Price">$20.00</cre8TableCell>
          <cre8TableCell dataHeader="Quantity">3</cre8TableCell>
          <cre8TableCell dataHeader="Total">$60.00</cre8TableCell>
        </cre8TableRow>
        <cre8TableRow>
          <cre8TableCell dataHeader="Product Name">Product 4</cre8TableCell>
          <cre8TableCell dataHeader="Price">$5.00</cre8TableCell>
          <cre8TableCell dataHeader="Quantity">4</cre8TableCell>
          <cre8TableCell dataHeader="Total">$20.00</cre8TableCell>
        </cre8TableRow>
      </cre8TableBody>
    </>
  )
} };
