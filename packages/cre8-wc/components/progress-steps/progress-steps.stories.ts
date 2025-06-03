import { html } from 'lit';
import { spread } from '../../directives/spread';
import './progress-steps';
import '../progress-steps-item/progress-steps-item';
import '../divider/divider';
import svgCheckCircle from '/Users/tylersmbp/Projects/cre8-web-components/packages/cre8-wc/icons/System/Filled/Check.svg?raw';
import svgError from '/Users/tylersmbp/Projects/cre8-web-components/packages/cre8-wc/icons/System/Filled/Error.svg?raw';
import svgFilledCircleTwo from '/Users/tylersmbp/Projects/cre8-web-components/packages/cre8-wc/icons/System/Filled/Circle_Two.svg?raw';
import svgFilledCircleFive from '/Users/tylersmbp/Projects/cre8-web-components/packages/cre8-wc/icons/System/Filled/Circle_Five.svg?raw';
import svgRegularCircleThree from '/Users/tylersmbp/Projects/cre8-web-components/packages/cre8-wc/icons/System/Regular/Circle_Three.svg?raw';
import svgRegularCircleSix from '/Users/tylersmbp/Projects/cre8-web-components/packages/cre8-wc/icons/System/Regular/Circle_Six.svg?raw';
import svgWarning from '/Users/tylersmbp/Projects/cre8-web-components/packages/cre8-wc/icons/System/Filled/Warning.svg?raw';

export default {
  title: 'In Development/Progress Steps',
  component: 'cre8-progress-steps',
};
export const shortExample = (args) => html`<cre8-progress-steps ${spread(args)}>
  <cre8-progress-steps-item svg="${svgCheckCircle}" message="Optional step message should be succinct" name="Step One Name" state="complete"></cre8-progress-steps-item>
  <cre8-progress-steps-item svg="${svgFilledCircleTwo}" message="Optional step message should be succinct" name="Step Two Name" state="current"></cre8-progress-steps-item>
  <cre8-progress-steps-item svg="${svgRegularCircleThree}" message="Optional step message should be succinct" name="Step Three Name" state="incomplete"></cre8-progress-steps-item>
</cre8-progress-steps>`;

export const longExample = (args) => html`<cre8-progress-steps ${spread(args)}>
  <cre8-progress-steps-item svg="${svgCheckCircle}" message="A step message should be succinct" name="Step One Name" state="complete"></cre8-progress-steps-item>
  <cre8-progress-steps-item svg="${svgCheckCircle}" message="A step message should be succinct" name="Step Two Name" state="complete"></cre8-progress-steps-item>
  <cre8-progress-steps-item svg="${svgCheckCircle}" message="A step message should be succinct" name="Step Three Name" state="complete"></cre8-progress-steps-item>
  <cre8-progress-steps-item svg="${svgCheckCircle}" message="A step message should be succinct" name="Step Four Name" state="complete"></cre8-progress-steps-item>
  <cre8-progress-steps-item svg="${svgFilledCircleFive}" message="A step message should be succinct" name="Step Five Name" state="current"></cre8-progress-steps-item>
  <cre8-progress-steps-item svg="${svgRegularCircleSix}" message="A step message should be succinct" name="Step Six Name" state="incomplete"></cre8-progress-steps-item>
</cre8-progress-steps>`;

export const Error = (args) => html`<cre8-progress-steps ${spread(args)}>
  <cre8-progress-steps-item svg="${svgCheckCircle}" message="A step message should be succinct" name="Step One Name" state="complete"></cre8-progress-steps-item>
  <cre8-progress-steps-item svg="${svgError}" message="A step message should be succinct" name="Step Two Name" state="error"></cre8-progress-steps-item>
  <cre8-progress-steps-item svg="${svgRegularCircleThree}" message="A step message should be succinct" name="Step Three Name" state="incomplete"></cre8-progress-steps-item>
</cre8-progress-steps>`;

export const Warning = (args) => html`<cre8-progress-steps ${spread(args)}>
  <cre8-progress-steps-item svg="${svgCheckCircle}" message="A step message should be succinct" name="Step One Name" state="complete"></cre8-progress-steps-item>
  <cre8-progress-steps-item svg="${svgWarning}" message="A step message should be succinct" name="Step Two Name" state="warning"></cre8-progress-steps-item>
  <cre8-progress-steps-item svg="${svgRegularCircleThree}" message="A step message should be succinct" name="Step Three Name" state="incomplete"></cre8-progress-steps-item>
</cre8-progress-steps>`;
