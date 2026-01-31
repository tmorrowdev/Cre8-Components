import React from 'react';
import { Cre8Header } from '../Header';
import { Cre8Hero } from '../Hero';
import { Cre8Band } from '../Band';
import { Cre8Button } from '../Button';
import { Cre8ButtonGroup } from '../ButtonGroup';
import { Cre8Feature } from '../Feature';
import { Cre8Footer } from '../Footer';
import { Cre8Badge } from '../Badge';
import { Cre8Heading } from '../Heading';
import { Cre8TextPassage } from '../TextPassage';
import { Cre8Grid } from '../Grid';
import { Cre8GridItem } from '../GridItem';
import { Cre8LinkList } from '../LinkList';
import { Cre8LinkListItem } from '../LinkListItem';
import { Cre8Icon } from '../Icon';
import { Cre8Section } from '../Section';
import { Cre8Layout } from '../Layout';
import { Cre8LayoutContainer } from '../LayoutContainer';

import './LandingPage.scss';

export interface LandingPageProps {
  /** Logo text or element */
  logoText?: string;
  /** Hero title */
  heroTitle?: string;
  /** Hero subtitle */
  heroSubtitle?: string;
  /** Badge text for beta/new announcements */
  badgeText?: string;
  /** Primary CTA text */
  primaryCtaText?: string;
  /** Secondary CTA text */
  secondaryCtaText?: string;
  /** Features array */
  features?: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  /** Stats array */
  stats?: Array<{
    value: string;
    label: string;
  }>;
  /** Footer links */
  footerLinks?: Array<{
    title: string;
    links: Array<{ text: string; href: string }>;
  }>;
  /** Primary CTA click handler */
  onPrimaryCtaClick?: () => void;
  /** Secondary CTA click handler */
  onSecondaryCtaClick?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  logoText = 'CRE8',
  heroTitle = 'Build Beautiful Interfaces in Record Time',
  heroSubtitle = 'CRE8 is the design system and component library that helps teams ship production-ready interfaces 10x faster. Modern, accessible, and infinitely customizable.',
  badgeText = 'Now in Public Beta',
  primaryCtaText = 'Start Building Free',
  secondaryCtaText = 'View Components',
  features = [
    {
      icon: 'zap',
      title: 'Lightning Fast',
      description: 'Optimized for performance with tree-shaking and minimal bundle sizes',
    },
    {
      icon: 'shield-check',
      title: 'Fully Accessible',
      description: 'WCAG 2.1 compliant with keyboard navigation and screen reader support',
    },
    {
      icon: 'palette',
      title: 'Fully Themeable',
      description: 'Design tokens and CSS variables make customization effortless',
    },
  ],
  stats = [
    { value: '2,500+', label: 'Active Teams' },
    { value: '50K+', label: 'Components Built' },
    { value: '99.9%', label: 'Uptime' },
    { value: '24/7', label: 'Support' },
  ],
  footerLinks = [
    {
      title: 'Product',
      links: [
        { text: 'Features', href: '#features' },
        { text: 'Pricing', href: '#pricing' },
        { text: 'Changelog', href: '#changelog' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { text: 'Documentation', href: '#docs' },
        { text: 'Blog', href: '#blog' },
        { text: 'Community', href: '#community' },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'About', href: '#about' },
        { text: 'Careers', href: '#careers' },
        { text: 'Contact', href: '#contact' },
      ],
    },
  ],
  onPrimaryCtaClick,
  onSecondaryCtaClick,
}) => {
  return (
    <Cre8Layout className="cre8-landing-page">
      {/* Header */}
      <Cre8Header className="cre8-landing-page__header">
        <span slot="logo" className="cre8-landing-page__logo">{logoText}</span>
        <nav slot="nav" className="cre8-landing-page__nav">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#docs">Docs</a>
          <a href="#signin">Sign In</a>
          <Cre8Button variant="primary" text="Get Started" />
        </nav>
      </Cre8Header>

      {/* Hero Section */}
      <Cre8Hero className="cre8-landing-page__hero">
        <div slot="eyebrow">
          <Cre8Badge variant="default">{badgeText}</Cre8Badge>
        </div>
        <Cre8Heading slot="title" type="display-large">
          {heroTitle}
        </Cre8Heading>
        <Cre8TextPassage slot="description" size="lg">
          {heroSubtitle}
        </Cre8TextPassage>
        <Cre8ButtonGroup slot="actions">
          <Cre8Button
            variant="primary"
            text={primaryCtaText}
            onClick={onPrimaryCtaClick}
          />
          <Cre8Button
            variant="secondary"
            text={secondaryCtaText}
            onClick={onSecondaryCtaClick}
          />
        </Cre8ButtonGroup>
        <span slot="trust" className="cre8-landing-page__trust">
          Trusted by 2,500+ teams worldwide
        </span>
      </Cre8Hero>

      {/* Features Section */}
      <Cre8Section className="cre8-landing-page__features">
        <Cre8LayoutContainer>
          <div className="cre8-landing-page__section-header">
            <span className="cre8-landing-page__label">POWERFUL FEATURES</span>
            <Cre8Heading type="title-large">
              Everything you need to ship faster
            </Cre8Heading>
            <Cre8TextPassage>
              Production-ready components, design tokens, and tools that scale with your team
            </Cre8TextPassage>
          </div>

          <Cre8Grid variant="3up">
            {features.map((feature, index) => (
              <Cre8GridItem key={index}>
                <Cre8Feature
                  iconName={feature.icon}
                  heading={feature.title}
                  description={feature.description}
                />
              </Cre8GridItem>
            ))}
          </Cre8Grid>
        </Cre8LayoutContainer>
      </Cre8Section>

      {/* Stats Section */}
      <Cre8Band className="cre8-landing-page__stats">
        <Cre8LayoutContainer>
          <Cre8Heading type="title-large" className="cre8-landing-page__stats-title">
            Trusted by teams everywhere
          </Cre8Heading>

          <Cre8Grid variant="4up" className="cre8-landing-page__stats-grid">
            {stats.map((stat, index) => (
              <Cre8GridItem key={index} className="cre8-landing-page__stat">
                <span className="cre8-landing-page__stat-value">{stat.value}</span>
                <span className="cre8-landing-page__stat-label">{stat.label}</span>
              </Cre8GridItem>
            ))}
          </Cre8Grid>
        </Cre8LayoutContainer>
      </Cre8Band>

      {/* CTA Section */}
      <Cre8Section className="cre8-landing-page__cta">
        <Cre8LayoutContainer>
          <Cre8Heading type="display-medium">
            Ready to ship faster?
          </Cre8Heading>
          <Cre8TextPassage size="lg">
            Join thousands of teams building with CRE8
          </Cre8TextPassage>
          <Cre8ButtonGroup>
            <Cre8Button
              variant="primary"
              text="Get Started Free"
              onClick={onPrimaryCtaClick}
            />
            <Cre8Button
              variant="secondary"
              text="Schedule Demo"
            />
          </Cre8ButtonGroup>
          <span className="cre8-landing-page__cta-trust">
            No credit card required • Free forever
          </span>
        </Cre8LayoutContainer>
      </Cre8Section>

      {/* Footer */}
      <Cre8Footer className="cre8-landing-page__footer">
        <div slot="brand" className="cre8-landing-page__footer-brand">
          <span className="cre8-landing-page__logo">{logoText}</span>
          <Cre8TextPassage size="sm">
            The modern design system for building beautiful interfaces
          </Cre8TextPassage>
        </div>

        <div slot="links" className="cre8-landing-page__footer-links">
          {footerLinks.map((group, index) => (
            <Cre8LinkList key={index} heading={group.title}>
              {group.links.map((link, linkIndex) => (
                <Cre8LinkListItem key={linkIndex} href={link.href}>
                  {link.text}
                </Cre8LinkListItem>
              ))}
            </Cre8LinkList>
          ))}
        </div>

        <div slot="bottom" className="cre8-landing-page__footer-bottom">
          <span>&copy; 2026 CRE8. All rights reserved.</span>
          <div className="cre8-landing-page__social">
            <a href="https://github.com" aria-label="GitHub">
              <Cre8Icon name="github" />
            </a>
            <a href="https://twitter.com" aria-label="Twitter">
              <Cre8Icon name="twitter" />
            </a>
            <a href="https://discord.com" aria-label="Discord">
              <Cre8Icon name="message-circle" />
            </a>
          </div>
        </div>
      </Cre8Footer>
    </Cre8Layout>
  );
};

export default LandingPage;
