import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('projects-section')
export class ProjectsSection extends LitElement {
  static styles = css`
    :host {
      display: block;
      background-color: var(--cre8-color-bg-default);
      color: var(--cre8-color-content-default);
      padding: var(--cre8-spacing-96) 0;
    }

    .projects-container {
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

    .projects-intro {
      max-width: 800px;
      margin-bottom: var(--cre8-spacing-48);
      font-size: var(--cre8-font-size-3);
      line-height: 1.7;
      color: var(--cre8-color-content-subtle);
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: var(--cre8-spacing-32);
    }

    .project-card {
      border-radius: var(--cre8-border-radius-default);
      overflow: hidden;
      background-color: var(--cre8-color-bg-default);
      box-shadow: var(--cre8-shadow-default);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .project-card:hover {
      transform: translateY(-5px);
      box-shadow: var(--cre8-shadow-large);
    }

    .project-image {
      width: 100%;
      height: 200px;
      overflow: hidden;
    }

    .project-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .project-card:hover .project-image img {
      transform: scale(1.05);
    }

    .project-content {
      padding: var(--cre8-spacing-24);
    }

    .project-title {
      font-size: var(--cre8-font-size-4);
      font-weight: var(--cre8-font-weights-semibold);
      margin-bottom: var(--cre8-spacing-8);
      color: var(--cre8-color-content-default);
    }

    .project-category {
      font-size: var(--cre8-font-size-1);
      color: var(--accent-color);
      margin-bottom: var(--cre8-spacing-16);
      font-weight: var(--cre8-font-weights-medium);
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .project-description {
      font-size: var(--cre8-font-size-2);
      color: var(--cre8-color-content-subtle);
      line-height: 1.6;
      margin-bottom: var(--cre8-spacing-16);
    }

    .project-tech {
      display: flex;
      flex-wrap: wrap;
      gap: var(--cre8-spacing-8);
      margin-bottom: var(--cre8-spacing-16);
    }

    .tech-tag {
      font-size: var(--cre8-font-size-0);
      background-color: var(--cre8-color-bg-subtle);
      color: var(--cre8-color-content-subtle);
      padding: var(--cre8-spacing-4) var(--cre8-spacing-8);
      border-radius: var(--cre8-border-radius-badge);
    }

    .project-links {
      display: flex;
      gap: var(--cre8-spacing-16);
    }

    .project-link {
      display: flex;
      align-items: center;
      gap: var(--cre8-spacing-6);
      color: var(--accent-color);
      font-size: var(--cre8-font-size-2);
      font-weight: var(--cre8-font-weights-medium);
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .project-link:hover {
      color: var(--accent-hover-color);
    }

    @media (max-width: 768px) {
      :host {
        padding: var(--cre8-spacing-64) 0;
      }
      
      .projects-grid {
        grid-template-columns: 1fr;
      }
    }
  `;

  render() {
    return html`
      <section id="projects">
        <div class="projects-container">
          <h2 class="section-title">Featured Projects</h2>
          
          <div class="projects-intro">
            Here's a selection of projects that showcase my skills, expertise, and the value I bring to digital experiences. Each project represents my commitment to creating intuitive, accessible, and high-performing user interfaces.
          </div>
          
          <div class="projects-grid">
            <div class="project-card">
              <div class="project-image">
                <img src="https://via.placeholder.com/350x200" alt="Design System Project" />
              </div>
              <div class="project-content">
                <div class="project-category">Design System</div>
                <h3 class="project-title">Enterprise Design System</h3>
                <p class="project-description">
                  Led the development of a comprehensive design system for Omnicom Media Group, improving consistency and development efficiency across digital properties.
                </p>
                <div class="project-tech">
                  <span class="tech-tag">Web Components</span>
                  <span class="tech-tag">TypeScript</span>
                  <span class="tech-tag">Lit</span>
                  <span class="tech-tag">Storybook</span>
                  <span class="tech-tag">Figma</span>
                </div>
                <div class="project-links">
                  <a href="#" class="project-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                    Case Study
                  </a>
                </div>
              </div>
            </div>
            
            <div class="project-card">
              <div class="project-image">
                <img src="https://via.placeholder.com/350x200" alt="Accessibility Toolkit" />
              </div>
              <div class="project-content">
                <div class="project-category">Accessibility</div>
                <h3 class="project-title">Accessibility Toolkit</h3>
                <p class="project-description">
                  Developed an internal toolkit to help teams across the organization implement accessible web experiences that meet WCAG standards.
                </p>
                <div class="project-tech">
                  <span class="tech-tag">JavaScript</span>
                  <span class="tech-tag">ARIA</span>
                  <span class="tech-tag">HTML</span>
                  <span class="tech-tag">CSS</span>
                  <span class="tech-tag">Axe</span>
                </div>
                <div class="project-links">
                  <a href="#" class="project-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    Demo
                  </a>
                </div>
              </div>
            </div>
            
            <div class="project-card">
              <div class="project-image">
                <img src="https://via.placeholder.com/350x200" alt="Mobile App" />
              </div>
              <div class="project-content">
                <div class="project-category">Mobile UX</div>
                <h3 class="project-title">Rewards Program App</h3>
                <p class="project-description">
                  Designed and prototyped a mobile rewards program for The Battery ATL, focusing on user engagement and intuitive navigation.
                </p>
                <div class="project-tech">
                  <span class="tech-tag">React Native</span>
                  <span class="tech-tag">Figma</span>
                  <span class="tech-tag">UX Research</span>
                  <span class="tech-tag">User Testing</span>
                </div>
                <div class="project-links">
                  <a href="#" class="project-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                    Case Study
                  </a>
                </div>
              </div>
            </div>
            
            <div class="project-card">
              <div class="project-image">
                <img src="https://via.placeholder.com/350x200" alt="Web App" />
              </div>
              <div class="project-content">
                <div class="project-category">Web Application</div>
                <h3 class="project-title">Analytics Dashboard</h3>
                <p class="project-description">
                  Built a responsive analytics dashboard with advanced data visualization and real-time updates for monitoring marketing campaigns.
                </p>
                <div class="project-tech">
                  <span class="tech-tag">React</span>
                  <span class="tech-tag">TypeScript</span>
                  <span class="tech-tag">D3.js</span>
                  <span class="tech-tag">WebSockets</span>
                </div>
                <div class="project-links">
                  <a href="#" class="project-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    GitHub
                  </a>
                  <a href="#" class="project-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
