import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import './portfolio-landing';

const meta: Meta = {
  title: 'Pages/Portfolio Landing',
  component: 'portfolio-landing',
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      disable: true,
    },
    docs: {
      description: {
        component: `
# Neobrutalism Portfolio Landing Page

A bold, striking portfolio landing page featuring:

- **Pixelated Background Animation**: Interactive floating pixels that respond to mouse movement
- **Neobrutalism Design**: Bold borders, chunky shadows, vibrant colors
- **Typography Focus**: Showcasing "Tyler Morrow - Software Engineer & AI Solutions Architect"
- **Responsive Design**: Adapts beautifully to all screen sizes
- **Interactive Elements**: Hover effects on buttons and cards

## Design Principles

This page follows the neobrutalism design aesthetic:
- Thick black borders (4-6px)
- Hard offset shadows (no blur)
- High contrast color palette
- Raw, playful typography
- Intentionally bold and striking visuals
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <portfolio-landing></portfolio-landing>
  `,
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: '100vh',
      },
    },
  },
};

export const Mobile: Story = {
  render: () => html`
    <portfolio-landing></portfolio-landing>
  `,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      story: {
        inline: false,
        iframeHeight: '667px',
      },
    },
  },
};

export const Tablet: Story = {
  render: () => html`
    <portfolio-landing></portfolio-landing>
  `,
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      story: {
        inline: false,
        iframeHeight: '1024px',
      },
    },
  },
};
