import type { Meta, StoryObj } from '@storybook/react-vite';
import { LandingPage } from './LandingPage';

const meta: Meta<typeof LandingPage> = {
  title: 'Pages/LandingPage',
  component: LandingPage,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof LandingPage>;

export const Default: Story = {
  args: {
    logoText: 'CRE8',
    heroTitle: 'Build Beautiful Interfaces in Record Time',
    heroSubtitle: 'CRE8 is the design system and component library that helps teams ship production-ready interfaces 10x faster. Modern, accessible, and infinitely customizable.',
    badgeText: 'Now in Public Beta',
    primaryCtaText: 'Start Building Free',
    secondaryCtaText: 'View Components',
  },
};

export const CustomContent: Story = {
  args: {
    logoText: 'MyApp',
    heroTitle: 'Ship Products Faster Than Ever',
    heroSubtitle: 'The complete toolkit for building modern web applications with beautiful, accessible components.',
    badgeText: 'Version 2.0 Released',
    primaryCtaText: 'Try It Now',
    secondaryCtaText: 'Learn More',
    features: [
      {
        icon: 'rocket',
        title: 'Blazing Fast',
        description: 'Built for speed with optimized performance out of the box',
      },
      {
        icon: 'lock',
        title: 'Secure by Default',
        description: 'Enterprise-grade security with best practices baked in',
      },
      {
        icon: 'code',
        title: 'Developer Friendly',
        description: 'Clean APIs and comprehensive documentation',
      },
    ],
    stats: [
      { value: '10K+', label: 'Users' },
      { value: '100+', label: 'Components' },
      { value: '99%', label: 'Satisfaction' },
      { value: '5min', label: 'Setup Time' },
    ],
  },
};
