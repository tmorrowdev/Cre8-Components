import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('contact-section')
export class ContactSection extends LitElement {
  static styles = css`
    :host {
      display: block;
      background-color: var(--cre8-color-bg-default);
      color: var(--cre8-color-content-default);
      padding: var(--cre8-spacing-96) 0;
    }

    .contact-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 var(--cre8-spacing-24);
    }

    .section-title {
      font-size: var(--cre8-font-size-8);
      font-weight: var(--cre8-font-weights-bold);
      margin-bottom: var(--cre8-spacing-48);
      position: relative;
      display: inline-block;
    }

    .section-title::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 80px;
      height: 4px;
      background-color: var(--accent-color);
    }

    .contact-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--cre8-spacing-64);
      align-items: center;
    }

    .contact-info {
      max-width: 500px;
    }

    .contact-text {
      font-size: var(--cre8-font-size-3);
      line-height: 1.7;
      color: var(--cre8-color-content-subtle);
      margin-bottom: var(--cre8-spacing-32);
    }

    .contact-methods {
      display: flex;
      flex-direction: column;
      gap: var(--cre8-spacing-24);
    }

    .contact-method {
      display: flex;
      align-items: center;
      gap: var(--cre8-spacing-16);
    }

    .contact-icon {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background-color: rgba(37, 99, 235, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--accent-color);
      flex-shrink: 0;
    }

    .contact-details {
      display: flex;
      flex-direction: column;
    }

    .contact-method-title {
      font-size: var(--cre8-font-size-2);
      font-weight: var(--cre8-font-weights-semibold);
      color: var(--cre8-color-content-default);
      margin-bottom: var(--cre8-spacing-6);
    }

    .contact-method-value {
      font-size: var(--cre8-font-size-2);
      color: var(--cre8-color-content-subtle);
    }

    .contact-method-value a {
      color: var(--accent-color);
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .contact-method-value a:hover {
      color: var(--accent-hover-color);
    }

    .social-links {
      display: flex;
      gap: var(--cre8-spacing-16);
      margin-top: var(--cre8-spacing-32);
    }

    .social-link {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: var(--cre8-color-bg-subtle);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--cre8-color-content-default);
      transition: all 0.2s ease;
    }

    .social-link:hover {
      background-color: var(--accent-color);
      color: white;
      transform: translateY(-3px);
    }

    .contact-form {
      background-color: var(--cre8-color-bg-subtle);
      border-radius: var(--cre8-border-radius-default);
      padding: var(--cre8-spacing-32);
      box-shadow: var(--cre8-shadow-default);
    }

    .form-title {
      font-size: var(--cre8-font-size-4);
      font-weight: var(--cre8-font-weights-semibold);
      margin-bottom: var(--cre8-spacing-24);
      color: var(--cre8-color-content-default);
    }

    .form-group {
      margin-bottom: var(--cre8-spacing-24);
    }

    .form-label {
      display: block;
      font-size: var(--cre8-font-size-2);
      font-weight: var(--cre8-font-weights-medium);
      margin-bottom: var(--cre8-spacing-8);
      color: var(--cre8-color-content-default);
    }

    .form-input,
    .form-textarea {
      width: 100%;
      padding: var(--cre8-spacing-12) var(--cre8-spacing-16);
      font-size: var(--cre8-font-size-2);
      border: 1px solid var(--cre8-color-border-default);
      border-radius: var(--cre8-border-radius-field);
      background-color: var(--cre8-color-bg-default);
      color: var(--cre8-color-content-default);
      transition: border-color 0.2s ease;
    }

    .form-input:focus,
    .form-textarea:focus {
      outline: none;
      border-color: var(--accent-color);
    }

    .form-textarea {
      min-height: 150px;
      resize: vertical;
    }

    .submit-button {
      background-color: var(--accent-color);
      color: white;
      font-size: var(--cre8-font-size-2);
      font-weight: var(--cre8-font-weights-medium);
      padding: var(--cre8-spacing-12) var(--cre8-spacing-24);
      border: none;
      border-radius: var(--cre8-border-radius-button);
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .submit-button:hover {
      background-color: var(--accent-hover-color);
    }

    @media (max-width: 992px) {
      .contact-content {
        grid-template-columns: 1fr;
        gap: var(--cre8-spacing-48);
      }

      .contact-info {
        max-width: 100%;
      }
    }

    @media (max-width: 768px) {
      :host {
        padding: var(--cre8-spacing-64) 0;
      }
    }
  `;

  render() {
    return html`
      <section id="contact">
        <div class="contact-container">
          <h2 class="section-title">Get In Touch</h2>
          
          <div class="contact-content">
            <div class="contact-info">
              <p class="contact-text">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out using any of the methods below.
              </p>
              
              <div class="contact-methods">
                <div class="contact-method">
                  <div class="contact-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div class="contact-details">
                    <div class="contact-method-title">Email</div>
                    <div class="contact-method-value">
                      <a href="mailto:tyler.morrow@example.com">tyler.morrow@example.com</a>
                    </div>
                  </div>
                </div>
                
                <div class="contact-method">
                  <div class="contact-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div class="contact-details">
                    <div class="contact-method-title">Location</div>
                    <div class="contact-method-value">Fort Lauderdale, Florida, USA</div>
                  </div>
                </div>
                
                <div class="contact-method">
                  <div class="contact-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
                      <line x1="2" y1="10" x2="22" y2="10"></line>
                    </svg>
                  </div>
                  <div class="contact-details">
                    <div class="contact-method-title">Availability</div>
                    <div class="contact-method-value">Open to consulting & contract work</div>
                  </div>
                </div>
              </div>
              
              <div class="social-links">
                <a href="https://linkedin.com/in/tylermorrow" class="social-link" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a href="https://github.com/" class="social-link" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
                <a href="https://twitter.com/" class="social-link" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
                <a href="https://dribbble.com/" class="social-link" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"></path>
                  </svg>
                </a>
              </div>
            </div>
            
            <div class="contact-form">
              <h3 class="form-title">Send a Message</h3>
              
              <form id="contact-form">
                <div class="form-group">
                  <label for="name" class="form-label">Name</label>
                  <input type="text" id="name" class="form-input" required />
                </div>
                
                <div class="form-group">
                  <label for="email" class="form-label">Email</label>
                  <input type="email" id="email" class="form-input" required />
                </div>
                
                <div class="form-group">
                  <label for="subject" class="form-label">Subject</label>
                  <input type="text" id="subject" class="form-input" required />
                </div>
                
                <div class="form-group">
                  <label for="message" class="form-label">Message</label>
                  <textarea id="message" class="form-textarea" required></textarea>
                </div>
                
                <button type="submit" class="submit-button">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
