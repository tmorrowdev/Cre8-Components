import { html } from 'lit-html';
import type { Meta } from '@storybook/web-Components';
import '../field-note/field-note';
import './select-tile-list';
import '../select-tile/select-tile';

const meta: Meta = {
  title: 'In Development/Select Tile List',
  component: 'cre8-select-tile-list',
  parameters: { status: { type: 'beta' } },
  decorators: [(story) => html`<form>\n${story()}\n</form>`],
};

export default meta;

export const SelectTileList = () => html`<cre8-select-tile-list label="Legend" fieldNote="This is a Field Note!">
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
</cre8-select-tile-list>`;

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
