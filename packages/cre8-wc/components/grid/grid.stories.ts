import { html } from 'lit';
import '../../.storybook/components/f-po/f-po';
import { spread } from '../../directives/spread';
import '../grid-item/grid-item';
import './grid';

export default {
  title: 'DEPRECATED/DO NOT USE/Grid',
  component: 'cre8-grid',
  parameters: { status: { type: 'inProgress' } }
};

export const Default = (args) => html`<cre8-grid ${spread(args)}>
  <cre8-grid-item>
    <f-po>Grid Item 1</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 2</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 3</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 4</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 5</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 6</f-po>
  </cre8-grid-item>
</cre8-grid>`;

export const SideBySide = () => html`<cre8-grid variant="side-by-side">
  <cre8-grid-item>
    <f-po>Grid Item 1</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 2</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 3</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 4</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 5</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 6</f-po>
  </cre8-grid-item>
</cre8-grid>`;

export const TwoUp = () => html`<cre8-grid variant="2up">
  <cre8-grid-item>
    <f-po>Grid Item 1</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 2</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 3</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 4</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 5</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 6</f-po>
  </cre8-grid-item>
</cre8-grid>`;

export const TwoUpBreakFaster = () => html`<cre8-grid variant="2up" break="faster">
  <cre8-grid-item>
    <f-po>Grid Item 1</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 2</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 3</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 4</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 5</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 6</f-po>
  </cre8-grid-item>
</cre8-grid>`;

export const TwoUpBreakSlower = () => html`<cre8-grid variant="2up" break="slower">
  <cre8-grid-item>
    <f-po>Grid Item 1</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 2</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 3</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 4</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 5</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 6</f-po>
  </cre8-grid-item>
</cre8-grid>`;

export const ThreeUp = () => html`<cre8-grid variant="3up">
  <cre8-grid-item>
    <f-po>Grid Item 1</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 2</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 3</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 4</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 5</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 6</f-po>
  </cre8-grid-item>
</cre8-grid>`;

export const OneToThreeUp = () => html`<cre8-grid variant="1-3up">
  <cre8-grid-item>
    <f-po>Grid Item 1</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 2</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 3</f-po>
  </cre8-grid-item>
</cre8-grid>`;

export const OneToThreeUpBreakFaster = () => html`<cre8-grid variant="1-3up" break="faster">
  <cre8-grid-item>
    <f-po>Grid Item 1</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 2</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 3</f-po>
  </cre8-grid-item>
</cre8-grid>`;

export const OneToThreeUpBreakSlower = () => html`<cre8-grid variant="1-3up" break="slower">
  <cre8-grid-item>
    <f-po>Grid Item 1</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 2</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 3</f-po>
  </cre8-grid-item>
</cre8-grid>`;

export const OneToFourUp = () => html`<cre8-grid variant="1-4up">
  <cre8-grid-item>
    <f-po>Grid Item 1</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 2</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 3</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 4</f-po>
  </cre8-grid-item>
</cre8-grid>`;

export const OneToTwoToFourUp = () => html`<cre8-grid variant="1-2-4up">
  <cre8-grid-item>
    <f-po>Grid Item 1</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 2</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 3</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 4</f-po>
  </cre8-grid-item>
</cre8-grid>`;

export const FourUp = () => html`<cre8-grid variant="4up">
  <cre8-grid-item>
    <f-po>Grid Item 1</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 2</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 3</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 4</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 5</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 6</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 7</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 8</f-po>
  </cre8-grid-item>
</cre8-grid>`;

export const GapNoneFourUp = () => html`<cre8-grid variant="4up" gap="none">
  <cre8-grid-item>
    <f-po>Grid Item 1</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 2</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 3</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 4</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 5</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 6</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 7</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 8</f-po>
  </cre8-grid-item>
</cre8-grid>`;

export const GapSmallFourUp = () => html`<cre8-grid variant="4up" gap="sm">
  <cre8-grid-item>
    <f-po>Grid Item 1</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 2</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 3</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 4</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 5</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 6</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 7</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 8</f-po>
  </cre8-grid-item>
</cre8-grid>`;

export const GapLargeFourUp = () => html`<cre8-grid variant="4up" gap="lg">
  <cre8-grid-item>
    <f-po>Grid Item 1</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 2</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 3</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 4</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 5</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 6</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 7</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 8</f-po>
  </cre8-grid-item>
</cre8-grid>`;

export const TwoTo4to6Up = () => html`<cre8-grid variant="2-4-6up">
  <cre8-grid-item>
    <f-po>Grid Item 1</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 2</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 3</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 4</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 5</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 6</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 7</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 8</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 9</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 10</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 11</f-po>
  </cre8-grid-item>
  <cre8-grid-item>
    <f-po>Grid Item 12</f-po>
  </cre8-grid-item>
</cre8-grid>`;
