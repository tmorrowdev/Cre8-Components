import { html } from 'lit';
import { spread } from '../../directives/spread';
import './table';
import '../table-row/table-row';
import '../table-header-cell/table-header-cell';
import '../table-cell/table-cell';
import '../table-body/table-body';
import '../table-header/table-header';
import '../button/button';
import '../badge/badge';
import '../text-link/text-link';
import '../text-passage/text-passage';
import '../../.storybook/components/f-po/f-po';

export default {
  title: 'cre8 Components/Table/Table',
  component: 'cre8-table',
  parameters: { status: { type: 'beta' } },
};

export const Default = (args) => html`<cre8-table ${spread(args)}>
  <cre8-table-header>
    <cre8-table-row>
      <cre8-table-header-cell>Product Name</cre8-table-header-cell>
      <cre8-table-header-cell>Price</cre8-table-header-cell>
      <cre8-table-header-cell>Quantity</cre8-table-header-cell>
      <cre8-table-header-cell>Total</cre8-table-header-cell>
    </cre8-table-row>
  </cre8-table-header>
  <cre8-table-body>
    <cre8-table-row>
      <cre8-table-cell>Product 1</cre8-table-cell>
      <cre8-table-cell>$10.00</cre8-table-cell>
      <cre8-table-cell>2</cre8-table-cell>
      <cre8-table-cell>$20.00</cre8-table-cell>
    </cre8-table-row>
    <cre8-table-row>
      <cre8-table-cell>Product 2</cre8-table-cell>
      <cre8-table-cell>$15.00</cre8-table-cell>
      <cre8-table-cell>1</cre8-table-cell>
      <cre8-table-cell>$15.00</cre8-table-cell>
    </cre8-table-row>
    <cre8-table-row>
      <cre8-table-cell>Product 3</cre8-table-cell>
      <cre8-table-cell>$20.00</cre8-table-cell>
      <cre8-table-cell>3</cre8-table-cell>
      <cre8-table-cell>$60.00</cre8-table-cell>
    </cre8-table-row>
    <cre8-table-row>
      <cre8-table-cell>Product 4</cre8-table-cell>
      <cre8-table-cell>$5.00</cre8-table-cell>
      <cre8-table-cell>4</cre8-table-cell>
      <cre8-table-cell>$20.00</cre8-table-cell>
    </cre8-table-row>
  </cre8-table-body>
</cre8-table>`

export const VisibleCaption = () => html`<cre8-table caption='Example Table'>
  <cre8-table-header>
    <cre8-table-row>
      <cre8-table-header-cell>Product Name</cre8-table-header-cell>
      <cre8-table-header-cell>Price</cre8-table-header-cell>
      <cre8-table-header-cell>Quantity</cre8-table-header-cell>
      <cre8-table-header-cell>Total</cre8-table-header-cell>
    </cre8-table-row>
  </cre8-table-header>
  <cre8-table-body>
    <cre8-table-row>
      <cre8-table-cell>Product 1</cre8-table-cell>
      <cre8-table-cell>$10.00</cre8-table-cell>
      <cre8-table-cell>2</cre8-table-cell>
      <cre8-table-cell>$20.00</cre8-table-cell>
    </cre8-table-row>
    <cre8-table-row>
      <cre8-table-cell>Product 2</cre8-table-cell>
      <cre8-table-cell>$15.00</cre8-table-cell>
      <cre8-table-cell>1</cre8-table-cell>
      <cre8-table-cell>$15.00</cre8-table-cell>
    </cre8-table-row>
    <cre8-table-row>
      <cre8-table-cell>Product 3</cre8-table-cell>
      <cre8-table-cell>$20.00</cre8-table-cell>
      <cre8-table-cell>3</cre8-table-cell>
      <cre8-table-cell>$60.00</cre8-table-cell>
    </cre8-table-row>
    <cre8-table-row>
      <cre8-table-cell>Product 4</cre8-table-cell>
      <cre8-table-cell>$5.00</cre8-table-cell>
      <cre8-table-cell>4</cre8-table-cell>
      <cre8-table-cell>$20.00</cre8-table-cell>
    </cre8-table-row>
  </cre8-table-body>
</cre8-table>`

export const Striped = () => html`<cre8-table variant="striped">
  <cre8-table-header>
    <cre8-table-row>
      <cre8-table-header-cell>Product Name</cre8-table-header-cell>
      <cre8-table-header-cell>Price</cre8-table-header-cell>
      <cre8-table-header-cell>Quantity</cre8-table-header-cell>
      <cre8-table-header-cell>Total</cre8-table-header-cell>
    </cre8-table-row>
  </cre8-table-header>
  <cre8-table-body>
    <cre8-table-row>
      <cre8-table-cell>Product 1</cre8-table-cell>
      <cre8-table-cell>$10.00</cre8-table-cell>
      <cre8-table-cell>2</cre8-table-cell>
      <cre8-table-cell>$20.00</cre8-table-cell>
    </cre8-table-row>
    <cre8-table-row>
      <cre8-table-cell>Product 2</cre8-table-cell>
      <cre8-table-cell>$15.00</cre8-table-cell>
      <cre8-table-cell>1</cre8-table-cell>
      <cre8-table-cell>$15.00</cre8-table-cell>
    </cre8-table-row>
    <cre8-table-row>
      <cre8-table-cell>Product 3</cre8-table-cell>
      <cre8-table-cell>$20.00</cre8-table-cell>
      <cre8-table-cell>3</cre8-table-cell>
      <cre8-table-cell>$60.00</cre8-table-cell>
    </cre8-table-row>
    <cre8-table-row>
      <cre8-table-cell>Product 4</cre8-table-cell>
      <cre8-table-cell>$5.00</cre8-table-cell>
      <cre8-table-cell>4</cre8-table-cell>
      <cre8-table-cell>$20.00</cre8-table-cell>
    </cre8-table-row>
  </cre8-table-body>
</cre8-table>`

export const Hoverable = () => html`<cre8-table ?isHoverable=${true}>
  <cre8-table-header>
    <cre8-table-row>
      <cre8-table-header-cell>Product Name</cre8-table-header-cell>
      <cre8-table-header-cell>Price</cre8-table-header-cell>
      <cre8-table-header-cell>Quantity</cre8-table-header-cell>
      <cre8-table-header-cell>Total</cre8-table-header-cell>
    </cre8-table-row>
  </cre8-table-header>
  <cre8-table-body>
    <cre8-table-row>
      <cre8-table-cell>Product 1</cre8-table-cell>
      <cre8-table-cell>$10.00</cre8-table-cell>
      <cre8-table-cell>2</cre8-table-cell>
      <cre8-table-cell>$20.00</cre8-table-cell>
    </cre8-table-row>
    <cre8-table-row>
      <cre8-table-cell>Product 2</cre8-table-cell>
      <cre8-table-cell>$15.00</cre8-table-cell>
      <cre8-table-cell>1</cre8-table-cell>
      <cre8-table-cell>$15.00</cre8-table-cell>
    </cre8-table-row>
    <cre8-table-row>
      <cre8-table-cell>Product 3</cre8-table-cell>
      <cre8-table-cell>$20.00</cre8-table-cell>
      <cre8-table-cell>3</cre8-table-cell>
      <cre8-table-cell>$60.00</cre8-table-cell>
    </cre8-table-row>
    <cre8-table-row>
      <cre8-table-cell>Product 4</cre8-table-cell>
      <cre8-table-cell>$5.00</cre8-table-cell>
      <cre8-table-cell>4</cre8-table-cell>
      <cre8-table-cell>$20.00</cre8-table-cell>
    </cre8-table-row>
  </cre8-table-body>
</cre8-table>`

export const HoverableStriped = () => html`<cre8-table ?isHoverable=${true} variant="striped">
  <cre8-table-header>
    <cre8-table-row>
      <cre8-table-header-cell>Product Name</cre8-table-header-cell>
      <cre8-table-header-cell>Price</cre8-table-header-cell>
      <cre8-table-header-cell>Quantity</cre8-table-header-cell>
      <cre8-table-header-cell>Total</cre8-table-header-cell>
    </cre8-table-row>
  </cre8-table-header>
  <cre8-table-body>
    <cre8-table-row>
      <cre8-table-cell>Product 1</cre8-table-cell>
      <cre8-table-cell>$10.00</cre8-table-cell>
      <cre8-table-cell>2</cre8-table-cell>
      <cre8-table-cell>$20.00</cre8-table-cell>
    </cre8-table-row>
    <cre8-table-row>
      <cre8-table-cell>Product 2</cre8-table-cell>
      <cre8-table-cell>$15.00</cre8-table-cell>
      <cre8-table-cell>1</cre8-table-cell>
      <cre8-table-cell>$15.00</cre8-table-cell>
    </cre8-table-row>
    <cre8-table-row>
      <cre8-table-cell>Product 3</cre8-table-cell>
      <cre8-table-cell>$20.00</cre8-table-cell>
      <cre8-table-cell>3</cre8-table-cell>
      <cre8-table-cell>$60.00</cre8-table-cell>
    </cre8-table-row>
    <cre8-table-row>
      <cre8-table-cell>Product 4</cre8-table-cell>
      <cre8-table-cell>$5.00</cre8-table-cell>
      <cre8-table-cell>4</cre8-table-cell>
      <cre8-table-cell>$20.00</cre8-table-cell>
    </cre8-table-row>
  </cre8-table-body>
</cre8-table>`

export const ResponsiveStacked = () => html`<cre8-table behavior="responsive">
  <cre8-table-header>
    <cre8-table-row>
      <cre8-table-header-cell>Product Name</cre8-table-header-cell>
      <cre8-table-header-cell>Price</cre8-table-header-cell>
      <cre8-table-header-cell>Quantity</cre8-table-header-cell>
      <cre8-table-header-cell>Total</cre8-table-header-cell>
    </cre8-table-row>
  </cre8-table-header>
  <cre8-table-body>
    <cre8-table-row>
      <cre8-table-cell dataHeader="Product Name">Product 1</cre8-table-cell>
      <cre8-table-cell dataHeader="Price">$10.00</cre8-table-cell>
      <cre8-table-cell dataHeader="Quantity">2</cre8-table-cell>
      <cre8-table-cell dataHeader="Total">$20.00</cre8-table-cell>
    </cre8-table-row>
    <cre8-table-row>
      <cre8-table-cell dataHeader="Product Name">Product 2</cre8-table-cell>
      <cre8-table-cell dataHeader="Price">$15.00</cre8-table-cell>
      <cre8-table-cell dataHeader="Quantity">1</cre8-table-cell>
      <cre8-table-cell dataHeader="Total">$15.00</cre8-table-cell>
    </cre8-table-row>
    <cre8-table-row>
      <cre8-table-cell dataHeader="Product Name">Product 3</cre8-table-cell>
      <cre8-table-cell dataHeader="Price">$20.00</cre8-table-cell>
      <cre8-table-cell dataHeader="Quantity">3</cre8-table-cell>
      <cre8-table-cell dataHeader="Total">$60.00</cre8-table-cell>
    </cre8-table-row>
    <cre8-table-row>
      <cre8-table-cell dataHeader="Product Name">Product 4</cre8-table-cell>
      <cre8-table-cell dataHeader="Price">$5.00</cre8-table-cell>
      <cre8-table-cell dataHeader="Quantity">4</cre8-table-cell>
      <cre8-table-cell dataHeader="Total">$20.00</cre8-table-cell>
    </cre8-table-row>
  </cre8-table-body>
</cre8-table>`
