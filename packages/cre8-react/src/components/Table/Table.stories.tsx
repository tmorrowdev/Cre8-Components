import type { StoryObj } from '@storybook/react';
import React from 'react';
import { Cre8Table, Cre8TableBody, Cre8TableCell, Cre8TableHeader, Cre8TableHeaderCell, Cre8TableRow } from '../..';
import { excludeRegexArray } from '../../../.storybook/preview';

export default {
  title: 'Cre8 Components/Table/Table',
  component: Cre8Table,
  parameters: {
    status: { type: 'inProgress' },
    controls: {
      exclude: new RegExp(`${excludeRegexArray.join('|')}`)
    }
  },
};

export const Default: StoryObj<typeof Cre8Table> = { args: {
  children: (
    <>
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
    </>
  )
} };

export const VisibleCaption: StoryObj<typeof Cre8Table> = { args: {
  caption: "Example Table",
  children: (
    <>
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
    </>
  )
} };

export const Striped: StoryObj<typeof Cre8Table> = { args: {
  variant: "striped",
  children: (
    <>
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
    </>
  )
} };

export const Hoverable: StoryObj<typeof Cre8Table> = { args: {
  isHoverable: true,
  children: (
    <>
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
    </>
  )
} };

export const HoverableStriped: StoryObj<typeof Cre8Table> = { args: {
  isHoverable: true,
  variant: "striped",
  children: (
    <>
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
    </>
  )
} };

export const ResponsiveStacked: StoryObj<typeof Cre8Table> = { args: {
  behavior: "responsive",
  children: (
    <>
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
          <Cre8TableCell dataHeader="Product Name">Product 1</Cre8TableCell>
          <Cre8TableCell dataHeader="Price">$10.00</Cre8TableCell>
          <Cre8TableCell dataHeader="Quantity">2</Cre8TableCell>
          <Cre8TableCell dataHeader="Total">$20.00</Cre8TableCell>
        </Cre8TableRow>
        <Cre8TableRow>
          <Cre8TableCell dataHeader="Product Name">Product 2</Cre8TableCell>
          <Cre8TableCell dataHeader="Price">$15.00</Cre8TableCell>
          <Cre8TableCell dataHeader="Quantity">1</Cre8TableCell>
          <Cre8TableCell dataHeader="Total">$15.00</Cre8TableCell>
        </Cre8TableRow>
        <Cre8TableRow>
          <Cre8TableCell dataHeader="Product Name">Product 3</Cre8TableCell>
          <Cre8TableCell dataHeader="Price">$20.00</Cre8TableCell>
          <Cre8TableCell dataHeader="Quantity">3</Cre8TableCell>
          <Cre8TableCell dataHeader="Total">$60.00</Cre8TableCell>
        </Cre8TableRow>
        <Cre8TableRow>
          <Cre8TableCell dataHeader="Product Name">Product 4</Cre8TableCell>
          <Cre8TableCell dataHeader="Price">$5.00</Cre8TableCell>
          <Cre8TableCell dataHeader="Quantity">4</Cre8TableCell>
          <Cre8TableCell dataHeader="Total">$20.00</Cre8TableCell>
        </Cre8TableRow>
      </Cre8TableBody>
    </>
  )
} };
