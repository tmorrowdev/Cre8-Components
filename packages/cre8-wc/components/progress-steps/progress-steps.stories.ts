import { html } from 'lit';
import { spread } from '../../directives/spread';
import './progress-steps';
import '../progress-steps-item/progress-steps-item';
import '../divider/divider';
import svgCheckCircle from '@cre8_dev/cre8-icons/lib/icons/System/Filled/Check.svg?raw';
import svgError from '@cre8_dev/cre8-icons/lib/icons/System/Filled/Error.svg?raw';
import svgFilledCircleTwo from '@cre8_dev/cre8-icons/lib/icons/System/Filled/Circle Two.svg?raw';
import svgFilledCircleFive from '@cre8_dev/cre8-icons/lib/icons/System/Filled/Circle Five.svg?raw';
import svgRegularCircleThree from '@cre8_dev/cre8-icons/lib/icons/System/Regular/Circle Three.svg?raw';
import svgRegularCircleSix from '@cre8_dev/cre8-icons/lib/icons/System/Regular/Circle Six.svg?raw';
import svgWarning from '@cre8_dev/cre8-icons/lib/icons/System/Filled/Warning.svg?raw';

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
