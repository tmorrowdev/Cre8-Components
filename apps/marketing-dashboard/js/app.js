/**
 * Marketing Dashboard Application
 *
 * Initializes the JSON-driven dashboard using the cre8 web components.
 */

import { render, setBasePath } from './renderer.js';

/**
 * Main application class
 */
class MarketingDashboard {
  constructor() {
    this.appContainer = document.getElementById('app');
    this.loadingContainer = document.getElementById('loading');
    this.isInitialized = false;
  }

  /**
   * Initialize the dashboard
   */
  async init() {
    try {
      console.log('Initializing Marketing Dashboard...');

      // Set the base path for JSON config files
      setBasePath('./config/');

      // Wait for web components to be defined
      await this.waitForComponents();

      // Render the dashboard from JSON config
      await this.renderDashboard();

      // Hide loading state
      this.hideLoading();

      // Mark as initialized
      this.isInitialized = true;

      console.log('Marketing Dashboard initialized successfully!');
    } catch (error) {
      console.error('Failed to initialize dashboard:', error);
      this.showError(error.message);
    }
  }

  /**
   * Wait for critical web components to be defined
   */
  async waitForComponents() {
    const criticalComponents = [
      'cre8-layout',
      'cre8-header',
      'cre8-tabs',
      'cre8-tab',
      'cre8-tab-panel',
      'cre8-card',
      'cre8-heading',
      'cre8-chart',
      'cre8-grid',
      'cre8-table',
    ];

    const timeout = 10000; // 10 second timeout
    const startTime = Date.now();

    for (const tagName of criticalComponents) {
      while (!customElements.get(tagName)) {
        if (Date.now() - startTime > timeout) {
          throw new Error(`Timeout waiting for component: ${tagName}`);
        }
        await new Promise(resolve => setTimeout(resolve, 50));
      }
    }

    // Additional delay to ensure components are fully ready
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  /**
   * Render the dashboard from JSON configuration
   */
  async renderDashboard() {
    await render('dashboard.json', this.appContainer);

    // Setup tab click handlers (workaround for cre8-tabs component issue)
    this.setupTabs();
  }

  /**
   * Setup manual tab switching (workaround for component issue)
   */
  setupTabs() {
    const tabsContainer = this.appContainer.querySelector('cre8-tabs');
    if (!tabsContainer) return;

    const tabs = tabsContainer.querySelectorAll('cre8-tab');
    const panels = tabsContainer.querySelectorAll('cre8-tab-panel');

    // Set initial state - first tab active
    if (tabs.length > 0 && panels.length > 0) {
      tabs[0].setAttribute('isActive', '');
      panels.forEach((panel, i) => {
        panel.hidden = i !== 0;
      });
    }

    // Add click handlers
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        // Update tab active states
        tabs.forEach((t, i) => {
          if (i === index) {
            t.setAttribute('isActive', '');
          } else {
            t.removeAttribute('isActive');
          }
        });

        // Show/hide panels
        panels.forEach((panel, i) => {
          panel.hidden = i !== index;
        });
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
        color: #dc2626;
        text-align: center;
        padding: 2rem;
      ">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <h2 style="margin: 1rem 0 0.5rem;">Failed to Load Dashboard</h2>
        <p style="color: #6b7280; margin: 0;">${message}</p>
        <button onclick="location.reload()" style="
          margin-top: 1rem;
          padding: 0.5rem 1rem;
          background: #0066b3;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.875rem;
        ">
          Retry
        </button>
      </div>
    `;
  }

  /**
   * Refresh the dashboard
   */
  async refresh() {
    this.showLoading();
    this.appContainer.innerHTML = '';

    try {
      await this.renderDashboard();
      this.hideLoading();
    } catch (error) {
      console.error('Failed to refresh dashboard:', error);
      this.showError(error.message);
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const dashboard = new MarketingDashboard();
  dashboard.init();

  // Expose dashboard instance for debugging
  window.dashboard = dashboard;
});

// Export for potential external use
export { MarketingDashboard };
