import { html } from 'lit-html';
import type { Meta, StoryObj } from '@storybook/web-components';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';
import '../field-note/field-note';
import './select-tile-list';
import '../select-tile/select-tile';
import type { Cre8SelectTileList } from './select-tile-list';

// `getStorybookHelpers` derives controls from the Custom Elements Manifest,
// including the `--cre8-select-tile-list-item-width` design token this
// component exposes. See https://wc-toolkit.com/integrations/storybook/
const { args, argTypes, template } = getStorybookHelpers('cre8-select-tile-list');

type Story = StoryObj<Cre8SelectTileList>;

// Reusable slotted tiles used to demonstrate the token-driven layout.
const tiles = html`
  <cre8-select-tile name="t1" align="center" value="1">
    <cre8-icon-legacy slot="header" name="find-drug" style=" --cre8-icon-width: 56px;  --cre8-icon-height: 56px;"></cre8-icon-legacy>
    <span slot="title">Heading text</span>
    <span slot="body">Nunc amet vitae sit interdum non morbi fames ac sed</span>
  </cre8-select-tile>
  <cre8-select-tile ?isError=${true} name="t1" align="center" value="2">
    <cre8-icon-legacy slot="header" name="find-drug" style=" --cre8-icon-width: 56px;  --cre8-icon-height: 56px;"></cre8-icon-legacy>
    <span slot="title">Heading text</span>
    <span slot="body">Nunc amet vitae sit interdum non morbi fames ac sed</span>
  </cre8-select-tile>
  <cre8-select-tile ?isSuccess=${true} name="t1" align="center" value="3">
    <cre8-icon-legacy slot="header" name="find-drug" style=" --cre8-icon-width: 56px;  --cre8-icon-height: 56px;"></cre8-icon-legacy>
    <span slot="title">Heading text</span>
    <span slot="body">Nunc amet vitae sit interdum non morbi fames ac sed</span>
  </cre8-select-tile>
  <cre8-select-tile ?disabled=${true} name="t1" align="center" value="4">
    <cre8-icon-legacy slot="header" name="find-drug" style=" --cre8-icon-width: 56px;  --cre8-icon-height: 56px;"></cre8-icon-legacy>
    <span slot="title">Heading text</span>
    <span slot="body">Nunc amet vitae sit interdum non morbi fames ac sed</span>
  </cre8-select-tile>
`;

const meta: Meta<Cre8SelectTileList> = {
  title: 'In Development/Select Tile List',
  component: 'cre8-select-tile-list',
  args: {
    ...args,
    label: 'Legend',
    fieldNote: 'This is a Field Note!',
  },
  argTypes,
  parameters: { status: { type: 'beta' } },
  decorators: [(story) => html`<form>\n${story()}\n</form>`],
  // Render through the helper template so the `--cre8-select-tile-list-item-width`
  // design token control is wired up live.
  render: (args) => template(args, tiles),
};

export default meta;

export const SelectTileList: Story = {};

export const SelectTileListHorizontal = () => html`<cre8-select-tile-list variant="rows" label="Legend" fieldNote="This is a Field Note!">
  <cre8-select-tile name="t1" align="center" value="1" variant="horizontal">
    <cre8-icon-legacy slot="header" name="find-drug" style=" --cre8-icon-width: 56px;  --cre8-icon-height: 56px;"></cre8-icon-legacy>
    <span slot="title">Heading text</span>
    <span slot="body">Nunc amet vitae sit interdum non morbi fames ac sed</span>
  </cre8-select-tile>

  <cre8-select-tile ?isError=${true} name="t1" align="center" value="2"  variant="horizontal">
    <cre8-icon-legacy slot="header" name="find-drug" style=" --cre8-icon-width: 56px;  --cre8-icon-height: 56px;"></cre8-icon-legacy>
    <span slot="title">Heading text</span>
    <span slot="body">Nunc amet vitae sit interdum non morbi fames ac sed</span>
  </cre8-select-tile>

  <cre8-select-tile ?isSuccess=${true} name="t1" align="center" value="3"  variant="horizontal">
    <cre8-icon-legacy slot="header" name="find-drug" style=" --cre8-icon-width: 56px;  --cre8-icon-height: 56px;"></cre8-icon-legacy>
    <span slot="title">Heading text</span>
    <span slot="body">Nunc amet vitae sit interdum non morbi fames ac sed</span>
  </cre8-select-tile>
  <cre8-select-tile ?disabled=${true} name="t1" align="center" value="4"  variant="horizontal">
    <cre8-icon-legacy slot="header" name="find-drug" style=" --cre8-icon-width: 56px;  --cre8-icon-height: 56px;"></cre8-icon-legacy>
    <span slot="title">Heading text</span>
    <span slot="body">Nunc amet vitae sit interdum non morbi fames ac sed</span>
  </cre8-select-tile>
</cre8-select-tile-list>`;

export const SelectTileListChecks = () => html`<cre8-select-tile-list label="Legend" fieldNote="This is a Field Note!">
  <cre8-select-tile name="t1" align="center" value="1" type="checkbox">
    <cre8-icon-legacy slot="header" name="find-drug" style=" --cre8-icon-width: 56px;  --cre8-icon-height: 56px;"></cre8-icon-legacy>
    <span slot="title">Heading text</span>
    <span slot="body">Nunc amet vitae sit interdum non morbi fames ac sed</span>
  </cre8-select-tile>

  <cre8-select-tile ?isError=${true} name="t2" align="center" value="2" type="checkbox">
    <cre8-icon-legacy slot="header" name="find-drug" style=" --cre8-icon-width: 56px;  --cre8-icon-height: 56px;"></cre8-icon-legacy>
    <span slot="title">Heading text</span>
    <span slot="body">Nunc amet vitae sit interdum non morbi fames ac sed</span>
  </cre8-select-tile>

  <cre8-select-tile ?isSuccess=${true} name="t3" align="center" value="3" type="checkbox">
    <cre8-icon-legacy slot="header" name="find-drug" style=" --cre8-icon-width: 56px;  --cre8-icon-height: 56px;"></cre8-icon-legacy>
    <span slot="title">Heading text</span>
    <span slot="body">Nunc amet vitae sit interdum non morbi fames ac sed</span>
  </cre8-select-tile>
  <cre8-select-tile ?disabled=${true} name="t4" align="center" value="4" type="checkbox">
    <cre8-icon-legacy slot="header" name="find-drug" style=" --cre8-icon-width: 56px;  --cre8-icon-height: 56px;"></cre8-icon-legacy>
    <span slot="title">Heading text</span>
    <span slot="body">Nunc amet vitae sit interdum non morbi fames ac sed</span>
  </cre8-select-tile>
</cre8-select-tile-list>`;

export const SelectTileListChecksHorizontal = () => html`<cre8-select-tile-list variant="rows" label="Legend" fieldNote="This is a Field Note!">
  <cre8-select-tile variant="horizontal" name="t1" align="center" value="1" type="checkbox">
    <cre8-icon-legacy slot="header" name="find-drug" style=" --cre8-icon-width: 56px;  --cre8-icon-height: 56px;"></cre8-icon-legacy>
    <span slot="title">Heading text</span>
    <span slot="body">Nunc amet vitae sit interdum non morbi fames ac sed</span>
  </cre8-select-tile>

  <cre8-select-tile variant="horizontal" ?isError=${true} name="t2" align="center" value="2" type="checkbox">
    <cre8-icon-legacy slot="header" name="find-drug" style=" --cre8-icon-width: 56px;  --cre8-icon-height: 56px;"></cre8-icon-legacy>
    <span slot="title">Heading text</span>
    <span slot="body">Nunc amet vitae sit interdum non morbi fames ac sed</span>
  </cre8-select-tile>

  <cre8-select-tile variant="horizontal" ?isSuccess=${true} name="t3" align="center" value="3" type="checkbox">
    <cre8-icon-legacy slot="header" name="find-drug" style=" --cre8-icon-width: 56px;  --cre8-icon-height: 56px;"></cre8-icon-legacy>
    <span slot="title">Heading text</span>
    <span slot="body">Nunc amet vitae sit interdum non morbi fames ac sed</span>
  </cre8-select-tile>
  <cre8-select-tile variant="horizontal" ?disabled=${true} name="t4" align="center" value="4" type="checkbox">
    <cre8-icon-legacy slot="header" name="find-drug" style=" --cre8-icon-width: 56px;  --cre8-icon-height: 56px;"></cre8-icon-legacy>
    <span slot="title">Heading text</span>
    <span slot="body">Nunc amet vitae sit interdum non morbi fames ac sed</span>
  </cre8-select-tile>
</cre8-select-tile-list>`;
