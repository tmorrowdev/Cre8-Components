import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('certifications-section')
export class CertificationsSection extends LitElement {
  static styles = css`
    :host {
      display: block;
      background-color: var(--cre8-color-bg-subtle);
      color: var(--cre8-color-content-default);
      padding: var(--cre8-spacing-96) 0;
    }

    .certifications-container {
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

    .certifications-intro {
      max-width: 800px;
      margin-bottom: var(--cre8-spacing-48);
      font-size: var(--cre8-font-size-3);
      line-height: 1.7;
      color: var(--cre8-color-content-subtle);
    }

    .certifications-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: var(--cre8-spacing-32);
    }

    .certification-card {
      background-color: var(--cre8-color-bg-default);
      border-radius: var(--cre8-border-radius-default);
      padding: var(--cre8-spacing-24);
      box-shadow: var(--cre8-shadow-default);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      display: flex;
      flex-direction: column;
    }

    .certification-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--cre8-shadow-large);
    }

    .certification-header {
      display: flex;
      align-items: flex-start;
      gap: var(--cre8-spacing-16);
      margin-bottom: var(--cre8-spacing-16);
    }

    .certification-logo {
      width: 60px;
      height: 60px;
      border-radius: var(--cre8-border-radius-small);
      background-color: var(--cre8-color-bg-subtle);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .certification-logo img {
      width: 80%;
      height: 80%;
      object-fit: contain;
    }

    .certification-title-container {
      flex-grow: 1;
    }

    .certification-title {
      font-size: var(--cre8-font-size-3);
      font-weight: var(--cre8-font-weights-semibold);
      margin-bottom: var(--cre8-spacing-6);
      color: var(--cre8-color-content-default);
    }

    .certification-issuer {
      font-size: var(--cre8-font-size-2);
      color: var(--accent-color);
      font-weight: var(--cre8-font-weights-medium);
    }

    .certification-date {
      font-size: var(--cre8-font-size-1);
      color: var(--cre8-color-content-subtle);
      display: flex;
      align-items: center;
      gap: var(--cre8-spacing-6);
      margin-bottom: var(--cre8-spacing-16);
    }

    .credential-id {
      font-size: var(--cre8-font-size-1);
      color: var(--cre8-color-content-subtle);
      margin-bottom: var(--cre8-spacing-16);
    }

    .credential-id strong {
      font-weight: var(--cre8-font-weights-medium);
    }

    .certification-links {
      margin-top: auto;
      display: flex;
    }

    .certification-link {
      display: inline-flex;
      align-items: center;
      gap: var(--cre8-spacing-6);
      color: var(--accent-color);
      font-size: var(--cre8-font-size-2);
      font-weight: var(--cre8-font-weights-medium);
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .certification-link:hover {
      color: var(--accent-hover-color);
    }

    .certification-skills {
      display: flex;
      flex-wrap: wrap;
      gap: var(--cre8-spacing-8);
      margin-bottom: var(--cre8-spacing-16);
    }

    .skill-tag {
      font-size: var(--cre8-font-size-0);
      background-color: rgba(37, 99, 235, 0.1);
      color: var(--accent-color);
      padding: var(--cre8-spacing-4) var(--cre8-spacing-8);
      border-radius: var(--cre8-border-radius-badge);
    }

    @media (max-width: 768px) {
      :host {
        padding: var(--cre8-spacing-64) 0;
      }
      
      .certifications-grid {
        grid-template-columns: 1fr;
      }
    }
  `;

  render() {
    return html`
      <section id="certifications">
        <div class="certifications-container">
          <h2 class="section-title">Certifications</h2>
          
          <div class="certifications-intro">
            I'm committed to continuous learning and professional development. Here are some of the certifications and courses I've completed to enhance my skills and stay current with industry best practices.
          </div>
          
          <div class="certifications-grid">
            <div class="certification-card">
              <div class="certification-header">
                <div class="certification-logo">
                  <img src="https://via.placeholder.com/60x60" alt="General Assembly Logo" />
                </div>
                <div class="certification-title-container">
                  <h3 class="certification-title">Certification in User Experience Design</h3>
                  <div class="certification-issuer">General Assembly</div>
                </div>
              </div>
              <div class="certification-date">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Issued September 2017
              </div>
              <div class="certification-skills">
                <span class="skill-tag">User Experience</span>
                <span class="skill-tag">UI Design</span>
                <span class="skill-tag">Wireframing</span>
                <span class="skill-tag">Prototyping</span>
              </div>
            </div>
            
            <div class="certification-card">
              <div class="certification-header">
                <div class="certification-logo">
                  <img src="https://via.placeholder.com/60x60" alt="Coursera Logo" />
                </div>
                <div class="certification-title-container">
                  <h3 class="certification-title">Front-End Web UI Frameworks and Tools</h3>
                  <div class="certification-issuer">Coursera Course Certificates</div>
                </div>
              </div>
              <div class="certification-date">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Issued December 2016
              </div>
              <div class="credential-id">
                <strong>Credential ID:</strong> A33Z4TQ9H4UQ
              </div>
              <div class="certification-skills">
                <span class="skill-tag">Bootstrap</span>
                <span class="skill-tag">jQuery</span>
                <span class="skill-tag">Responsive Design</span>
              </div>
              <div class="certification-links">
                <a href="https://www.coursera.org/account/accomplishments/verify/A33Z4TQ9H4UQ" class="certification-link" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                  See Credential
                </a>
              </div>
            </div>
            
            <div class="certification-card">
              <div class="certification-header">
                <div class="certification-logo">
                  <img src="https://via.placeholder.com/60x60" alt="Coursera Logo" />
                </div>
                <div class="certification-title-container">
                  <h3 class="certification-title">HTML, CSS and JavaScript</h3>
                  <div class="certification-issuer">Coursera Course Certificates</div>
                </div>
              </div>
              <div class="certification-date">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Issued December 2016
              </div>
              <div class="credential-id">
                <strong>Credential ID:</strong> Q59QFHNWYPHY
              </div>
              <div class="certification-skills">
                <span class="skill-tag">HTML5</span>
                <span class="skill-tag">CSS3</span>
                <span class="skill-tag">JavaScript</span>
                <span class="skill-tag">DOM Manipulation</span>
              </div>
              <div class="certification-links">
                <a href="https://www.coursera.org/account/accomplishments/verify/Q59QFHNWYPHY" class="certification-link" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                  See Credential
                </a>
              </div>
            </div>
            
            <div class="certification-card">
              <div class="certification-header">
                <div class="certification-logo">
                  <img src="https://via.placeholder.com/60x60" alt="SoloLearn Logo" />
                </div>
                <div class="certification-title-container">
                  <h3 class="certification-title">Certificate of Completion: Java Course</h3>
                  <div class="certification-issuer">SoloLearn</div>
                </div>
              </div>
              <div class="certification-date">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Issued May 2016
              </div>
              <div class="credential-id">
                <strong>Credential ID:</strong> 1068-1006732
              </div>
              <div class="certification-skills">
                <span class="skill-tag">Java</span>
                <span class="skill-tag">Object-Oriented Programming</span>
              </div>
              <div class="certification-links">
                <a href="http://www.sololearn.com/Profile/1006732/" class="certification-link" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                  See Credential
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
