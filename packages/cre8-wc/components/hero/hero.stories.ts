import { html } from 'lit';
import '../heading/heading';
import '../text-passage/text-passage';
import './hero';

export default {
  title: 'Cre8 Components/Hero',
  component: 'cre8-hero',
  parameters: { status: { type: 'notStarted' } }
};

export const Default = (args) => html`
  <cre8-hero imgSrc="https://via.placeholder.com/1200x650" imgAlt="Hero Alt Text">
    <cre8-heading headingTagName="h2">Hero title</cre8-heading>
    <cre8-text-passage>This is the hero description</cre8-text-passage>
  </cre8-hero>
`;

export const AlignTopLeft = (args) => html`
  <cre8-hero align="top-left" imgSrc="https://via.placeholder.com/1200x650" imgAlt="Hero Alt Text">
    <cre8-heading headingTagName="h2">Hero title</cre8-heading>
    <cre8-text-passage>This is the hero description</cre8-text-passage>
  </cre8-hero>
`;

export const AlignLeft = (args) => html`
  <cre8-hero align="left" imgSrc="https://via.placeholder.com/1200x650" imgAlt="Hero Alt Text">
    <cre8-heading headingTagName="h2">Hero title</cre8-heading>
    <cre8-text-passage>This is the hero description</cre8-text-passage>
  </cre8-hero>
`;

export const AlignTopCenter = (args) => html`
  <cre8-hero align="top-center" imgSrc="https://via.placeholder.com/1200x650" imgAlt="Hero Alt Text">
    <cre8-heading headingTagName="h2">Hero title</cre8-heading>
    <cre8-text-passage>This is the hero description</cre8-text-passage>
  </cre8-hero>
`;

export const AlignCenter = (args) => html`
  <cre8-hero align="center" imgSrc="https://via.placeholder.com/1200x650" imgAlt="Hero Alt Text">
    <cre8-heading headingTagName="h2">Hero title</cre8-heading>
    <cre8-text-passage>This is the hero description</cre8-text-passage>
  </cre8-hero>
`;

export const AlignBottomCenter = (args) => html`
  <cre8-hero align="bottom-center" imgSrc="https://via.placeholder.com/1200x650" imgAlt="Hero Alt Text">
    <cre8-heading headingTagName="h2">Hero title</cre8-heading>
    <cre8-text-passage>This is the hero description</cre8-text-passage>
  </cre8-hero>
`;

export const AlignTopRight = (args) => html`
  <cre8-hero align="top-right" imgSrc="https://via.placeholder.com/1200x650" imgAlt="Hero Alt Text">
    <cre8-heading headingTagName="h2">Hero title</cre8-heading>
    <cre8-text-passage>This is the hero description</cre8-text-passage>
  </cre8-hero>
`;

export const AlignRight = (args) => html`
  <cre8-hero align="right" imgSrc="https://via.placeholder.com/1200x650" imgAlt="Hero Alt Text">
    <cre8-heading headingTagName="h2">Hero title</cre8-heading>
    <cre8-text-passage>This is the hero description</cre8-text-passage>
  </cre8-hero>
`;

export const AlignBottomRight = (args) => html`
  <cre8-hero align="bottom-right" imgSrc="https://via.placeholder.com/1200x650" imgAlt="Hero Alt Text">
    <cre8-heading headingTagName="h2">Hero title</cre8-heading>
    <cre8-text-passage>This is the hero description</cre8-text-passage>
  </cre8-hero>
`;
