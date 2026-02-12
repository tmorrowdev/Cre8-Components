/**
 * T.MORROW Portfolio Application
 * JSON-driven portfolio using cre8 web components
 */

import { render, setBasePath } from '../../marketing-dashboard/js/renderer.js';

/**
 * Portfolio Application Class
 */
class Portfolio {
  constructor() {
    this.appContainer = document.getElementById('app');
    this.loadingContainer = document.getElementById('loading');
    this.isInitialized = false;
  }

  /**
   * Initialize the portfolio
   */
  async init() {
    try {
      console.log('Initializing T.MORROW Portfolio...');

      // Set the base path for JSON config files
      setBasePath('./config/');

      // Wait for web components to be defined
      await this.waitForComponents();

      // Render the portfolio from JSON config
      await this.renderPortfolio();

      // Hide loading state
      this.hideLoading();

      // Setup smooth scroll for nav links
      this.setupSmoothScroll();

      // Mark as initialized
      this.isInitialized = true;

      console.log('T.MORROW Portfolio initialized successfully!');
    } catch (error) {
      console.error('Failed to initialize portfolio:', error);
      this.showError(error.message);
    }
  }

  /**
   * Wait for critical web components to be defined
   */
  async waitForComponents() {
    const criticalComponents = [
      'cre8-layout',
      'cre8-layout-section',
      'cre8-layout-container',
      'cre8-header',
      'cre8-footer',
      'cre8-button',
      'cre8-heading',
      'cre8-card',
      'cre8-grid',
    ];

    const timeout = 10000;
    const startTime = Date.now();

    for (const tagName of criticalComponents) {
      while (!customElements.get(tagName)) {
        if (Date.now() - startTime > timeout) {
          throw new Error(`Timeout waiting for component: ${tagName}`);
        }
        await new Promise(resolve => setTimeout(resolve, 50));
      }
    }

    await new Promise(resolve => setTimeout(resolve, 100));
  }

  /**
   * Render the portfolio from JSON configuration
   */
  async renderPortfolio() {
    await render('portfolio.json', this.appContainer);
  }

  /**
   * Setup smooth scrolling for navigation links
   */
  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  /**
   * Hide the loading indicator
   */
  hideLoading() {
    if (this.loadingContainer) {
      this.loadingContainer.classList.add('hidden');
    }
  }

  /**
   * Show loading indicator
   */
  showLoading() {
    if (this.loadingContainer) {
      this.loadingContainer.classList.remove('hidden');
    }
  }

  /**
   * Show error message
   */
  showError(message) {
    this.hideLoading();

    this.appContainer.innerHTML = `
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 50vh;
        color: #00D4E0;
        text-align: center;
        padding: 2rem;
      ">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <h2 style="margin: 1rem 0 0.5rem; font-family: 'Manrope', sans-serif;">Failed to Load</h2>
        <p style="color: rgba(255,255,255,0.6); margin: 0;">${message}</p>
        <button onclick="location.reload()" style="
          margin-top: 1rem;
          padding: 0.75rem 1.5rem;
          background: #00D4E0;
          color: #1A1A2E;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 600;
        ">
          Retry
        </button>
      </div>
    `;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const portfolio = new Portfolio();
  portfolio.init();

  // Expose for debugging
  window.portfolio = portfolio;
});

export { Portfolio };
