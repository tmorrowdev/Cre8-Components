import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('header-component')
export class HeaderComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: sticky;
      top: 0;
      z-index: 100;
      background-color: var(--cre8-color-header-bg-default);
      border-bottom: 1px solid var(--cre8-color-border-default);
    }

    .header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--cre8-spacing-16) var(--cre8-spacing-24);
      max-width: 1200px;
      margin: 0 auto;
    }

    .logo {
      font-weight: var(--cre8-font-weights-bold);
      font-size: var(--cre8-font-size-4);
      color: var(--cre8-color-content-default);
      text-decoration: none;
      display: flex;
      align-items: center;
    }

    .logo span {
      color: var(--accent-color);
    }

    nav {
      display: flex;
      gap: var(--cre8-spacing-32);
    }

    .nav-link {
      color: var(--cre8-color-content-subtle);
      text-decoration: none;
      font-size: var(--cre8-font-size-2);
      font-weight: var(--cre8-font-weights-medium);
      transition: color 0.2s ease;
    }

    .nav-link:hover {
      color: var(--cre8-color-content-default);
    }

    .nav-link.active {
      color: var(--accent-color);
    }

    .mobile-menu-button {
      display: none;
      background: none;
      border: none;
      color: var(--cre8-color-content-default);
      font-size: var(--cre8-font-size-6);
      cursor: pointer;
    }

    @media (max-width: 768px) {
      nav {
        display: none;
      }

      .mobile-menu-button {
        display: block;
      }

      .mobile-nav {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background-color: var(--cre8-color-header-bg-default);
        padding: var(--cre8-spacing-16);
        gap: var(--cre8-spacing-16);
        border-bottom: 1px solid var(--cre8-color-border-default);
      }
    }
  `;

  render() {
    return html`
      <div class="header-container">
        <a href="#" class="logo">Tyler<span>Morrow</span></a>
        
        <nav>
          <a href="#about" class="nav-link">About</a>
          <a href="#experience" class="nav-link">Experience</a>
          <a href="#skills" class="nav-link">Skills</a>
          <a href="#projects" class="nav-link">Projects</a>
          <a href="#certifications" class="nav-link">Certifications</a>
          <a href="#contact" class="nav-link">Contact</a>
        </nav>
        
        <button class="mobile-menu-button" aria-label="Toggle mobile menu">
          ☰
        </button>
      </div>
    `;
  }
}
