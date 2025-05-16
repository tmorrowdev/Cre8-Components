import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('footer-component')
export class FooterComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
      background-color: var(--cre8-color-bg-strong);
      color: white;
      padding: var(--cre8-spacing-48) 0 var(--cre8-spacing-24);
    }

    .footer-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 var(--cre8-spacing-24);
    }

    .footer-content {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: var(--cre8-spacing-48);
      margin-bottom: var(--cre8-spacing-48);
    }

    .footer-logo {
      font-size: var(--cre8-font-size-4);
      font-weight: var(--cre8-font-weights-bold);
      margin-bottom: var(--cre8-spacing-16);
      background: linear-gradient(to right, var(--accent-color), white);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      display: inline-block;
    }

    .footer-description {
      color: var(--cre8-color-content-knockout);
      margin-bottom: var(--cre8-spacing-24);
      line-height: 1.7;
      opacity: 0.8;
    }

    .social-links {
      display: flex;
      gap: var(--cre8-spacing-16);
    }

    .social-link {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      transition: all 0.2s ease;
    }

    .social-link:hover {
      background-color: var(--accent-color);
      transform: translateY(-3px);
    }

    .footer-column-title {
      font-size: var(--cre8-font-size-2);
      font-weight: var(--cre8-font-weights-semibold);
      color: white;
      margin-bottom: var(--cre8-spacing-24);
      position: relative;
      display: inline-block;
    }

    .footer-column-title::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 30px;
      height: 2px;
      background-color: var(--accent-color);
    }

    .footer-links {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }

    .footer-link-item {
      margin-bottom: var(--cre8-spacing-12);
    }

    .footer-link {
      color: var(--cre8-color-content-knockout);
      text-decoration: none;
      opacity: 0.8;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: var(--cre8-spacing-8);
    }

    .footer-link:hover {
      color: var(--accent-color);
      opacity: 1;
      transform: translateX(5px);
    }

    .footer-link svg {
      width: 16px;
      height: 16px;
    }

    .copyright {
      text-align: center;
      padding-top: var(--cre8-spacing-24);
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      color: var(--cre8-color-content-knockout);
      opacity: 0.6;
      font-size: var(--cre8-font-size-1);
    }

    .accent {
      color: var(--accent-color);
    }

    @media (max-width: 992px) {
      .footer-content {
        grid-template-columns: 1fr 1fr;
        gap: var(--cre8-spacing-32);
      }
    }

    @media (max-width: 576px) {
      .footer-content {
        grid-template-columns: 1fr;
      }
    }
  `;

  render() {
    return html`
      <footer>
        <div class="footer-container">
          <div class="footer-content">
            <div class="footer-about">
              <div class="footer-logo">Tyler Morrow</div>
              <p class="footer-description">
                Senior Frontend Engineer passionate about creating exceptional digital experiences through clean code and thoughtful design.
              </p>
              <div class="social-links">
                <a href="https://linkedin.com/in/tylermorrow" class="social-link" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a href="https://github.com/" class="social-link" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
                <a href="https://twitter.com/" class="social-link" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
                <a href="https://dribbble.com/" class="social-link" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"></path>
                  </svg>
                </a>
              </div>
            </div>
            
            <div class="footer-links-column">
              <h3 class="footer-column-title">Quick Links</h3>
              <ul class="footer-links">
                <li class="footer-link-item">
                  <a href="#home" class="footer-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                    Home
                  </a>
                </li>
                <li class="footer-link-item">
                  <a href="#about" class="footer-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                    About
                  </a>
                </li>
                <li class="footer-link-item">
                  <a href="#experience" class="footer-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                    Experience
                  </a>
                </li>
                <li class="footer-link-item">
                  <a href="#skills" class="footer-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                    Skills
                  </a>
                </li>
              </ul>
            </div>
            
            <div class="footer-links-column">
              <h3 class="footer-column-title">Portfolio</h3>
              <ul class="footer-links">
                <li class="footer-link-item">
                  <a href="#projects" class="footer-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                    Projects
                  </a>
                </li>
                <li class="footer-link-item">
                  <a href="#certifications" class="footer-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                    Certifications
                  </a>
                </li>
                <li class="footer-link-item">
                  <a href="#contact" class="footer-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            
            <div class="footer-links-column">
              <h3 class="footer-column-title">Contact</h3>
              <ul class="footer-links">
                <li class="footer-link-item">
                  <a href="mailto:tyler.morrow@example.com" class="footer-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    Email Me
                  </a>
                </li>
                <li class="footer-link-item">
                  <a href="https://linkedin.com/in/tylermorrow" class="footer-link" target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                    LinkedIn
                  </a>
                </li>
                <li class="footer-link-item">
                  <a href="#contact" class="footer-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                    Message Me
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div class="copyright">
            © ${new Date().getFullYear()} Tyler Morrow. Made with <span class="accent">♥</span> using Lit Web Components.
          </div>
        </div>
      </footer>
    `;
  }
}
