import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('hero-section')
export class HeroSection extends LitElement {
  static styles = css`
    :host {
      display: block;
      background-color: var(--cre8-color-bg-default);
      color: var(--cre8-color-content-default);
    }

    .hero-container {
      display: flex;
      min-height: 85vh;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 var(--cre8-spacing-24);
      align-items: center;
      justify-content: space-between;
      gap: var(--cre8-spacing-48);
    }

    .hero-content {
      flex: 1;
      max-width: 600px;
    }

    .greeting {
      font-size: var(--cre8-font-size-3);
      color: var(--accent-color);
      margin-bottom: var(--cre8-spacing-16);
      font-weight: var(--cre8-font-weights-semibold);
    }

    .name {
      font-size: var(--cre8-font-size-10);
      font-weight: var(--cre8-font-weights-bold);
      line-height: 1.1;
      margin: 0 0 var(--cre8-spacing-16) 0;
      background: linear-gradient(to right, var(--primary-text-color), var(--accent-color));
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .title {
      font-size: var(--cre8-font-size-4);
      color: var(--cre8-color-content-subtle);
      margin-bottom: var(--cre8-spacing-24);
      font-weight: var(--cre8-font-weights-medium);
    }

    .location {
      display: flex;
      align-items: center;
      gap: var(--cre8-spacing-8);
      font-size: var(--cre8-font-size-2);
      color: var(--cre8-color-content-subtle);
      margin-bottom: var(--cre8-spacing-32);
    }

    .description {
      font-size: var(--cre8-font-size-3);
      line-height: 1.6;
      margin-bottom: var(--cre8-spacing-32);
      color: var(--cre8-color-content-subtle);
    }

    .cta-buttons {
      display: flex;
      gap: var(--cre8-spacing-16);
    }

    .cta-button {
      display: inline-block;
      padding: var(--cre8-spacing-12) var(--cre8-spacing-24);
      font-size: var(--cre8-font-size-2);
      font-weight: var(--cre8-font-weights-semibold);
      border-radius: var(--cre8-border-radius-button);
      text-decoration: none;
      transition: all 0.2s ease;
    }

    .primary-cta {
      background-color: var(--accent-color);
      color: white;
    }

    .primary-cta:hover {
      background-color: var(--accent-hover-color);
    }

    .secondary-cta {
      border: 2px solid var(--accent-color);
      color: var(--accent-color);
    }

    .secondary-cta:hover {
      background-color: rgba(37, 99, 235, 0.1);
    }

    .hero-image {
      flex: 1;
      max-width: 450px;
      position: relative;
    }

    .hero-image img {
      width: 100%;
      border-radius: var(--cre8-border-radius-large);
      box-shadow: var(--cre8-shadow-large);
    }

    .image-decoration {
      position: absolute;
      width: 100%;
      height: 100%;
      border: 2px solid var(--accent-color);
      border-radius: var(--cre8-border-radius-large);
      top: var(--cre8-spacing-24);
      left: var(--cre8-spacing-24);
      z-index: -1;
    }

    @media (max-width: 992px) {
      .hero-container {
        flex-direction: column-reverse;
        text-align: center;
        padding: var(--cre8-spacing-64) var(--cre8-spacing-24);
        min-height: auto;
      }

      .hero-content, .hero-image {
        max-width: 100%;
      }

      .cta-buttons {
        justify-content: center;
      }

      .name {
        font-size: var(--cre8-font-size-8);
      }

      .location {
        justify-content: center;
      }
    }
  `;

  render() {
    return html`
      <section id="home">
        <div class="hero-container">
          <div class="hero-content">
            <div class="greeting">Hello, I'm</div>
            <h1 class="name">Tyler Morrow</h1>
            <div class="title">Senior Frontend Engineer</div>
            <div class="location">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              Fort Lauderdale, Florida
            </div>
            <p class="description">
              An innovative Frontend Engineer powering Omnicom Media Group's digital experiences with modern web technologies and a focus on user-centered design.
            </p>
            <div class="cta-buttons">
              <a href="#contact" class="cta-button primary-cta">Get In Touch</a>
              <a href="#projects" class="cta-button secondary-cta">View My Work</a>
            </div>
          </div>
          <div class="hero-image">
            <img src="https://via.placeholder.com/450x600" alt="Tyler Morrow" />
            <div class="image-decoration"></div>
          </div>
        </div>
      </section>
    `;
  }
}
