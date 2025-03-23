import { html } from 'lit';
import { spread } from '../../directives/spread';
import '../tag/tag';
import './tag-list';

export default {
  title: 'In Development/Tag List',
  component: 'cre8-tag-list',
  parameters: { status: { type: 'inProgress' } }
};

export const Default = (args) => html`
<cre8-tag-list label="Fruits" ${spread(args)}>
  <cre8-tag type="checkbox" variant="neutral" shape="round" text="Orange"></cre8-tag>
  <cre8-tag type="checkbox" variant="neutral" shape="round" text="Apple"></cre8-tag>
  <cre8-tag type="checkbox" variant="neutral" shape="round" text="Pear"></cre8-tag>
  <cre8-tag type="checkbox" variant="neutral" shape="round" text="Banana"></cre8-tag>
  <cre8-tag type="checkbox" variant="neutral" shape="round" text="Peach"></cre8-tag>
</cre8-tag-list>`;

export const CheckBox = (args) => html`
<cre8-tag-list label="Animals" ${spread(args)}>
  <cre8-tag type="checkbox" variant="neutral" shape="round" text="Dog"></cre8-tag>
  <cre8-tag type="checkbox" variant="neutral" shape="round" text="Cat"></cre8-tag>
  <cre8-tag type="checkbox" variant="neutral" shape="round" text="Cow"></cre8-tag>
  <cre8-tag type="checkbox" variant="neutral" shape="round" text="Fish"></cre8-tag>
  <cre8-tag type="checkbox" variant="neutral" shape="round" text="Bear"></cre8-tag>
</cre8-tag-list>`;

export const Radio = (args) => html`
<cre8-tag-list label="Emotions" ${spread(args)}>
  <cre8-tag type="radio" variant="neutral" shape="round" text="Happy"></cre8-tag>
  <cre8-tag type="radio" variant="neutral" shape="round" text="Sad"></cre8-tag>
  <cre8-tag type="radio" variant="neutral" shape="round" text="Scared"></cre8-tag>
  <cre8-tag type="radio" variant="neutral" shape="round" text="Angry"></cre8-tag>
  <cre8-tag type="radio" variant="neutral" shape="round" text="Confused"></cre8-tag>
</cre8-tag-list>`;