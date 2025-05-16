import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('skills-section')
export class SkillsSection extends LitElement {
  static styles = css`
    :host {
      display: block;
      background-color: var(--cre8-color-bg-subtle);
      color: var(--cre8-color-content-default);
      padding: var(--cre8-spacing-96) 0;
    }

    .skills-container {
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

    .skill-intro {
      max-width: 800px;
      margin-bottom: var(--cre8-spacing-48);
      font-size: var(--cre8-font-size-3);
      line-height: 1.7;
      color: var(--cre8-color-content-subtle);
    }

    .skill-categories {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: var(--cre8-spacing-32);
    }

    .skill-category {
      background-color: var(--cre8-color-bg-default);
      border-radius: var(--cre8-border-radius-default);
      padding: var(--cre8-spacing-24);
      box-shadow: var(--cre8-shadow-default);
    }

    .category-title {
      font-size: var(--cre8-font-size-4);
      font-weight: var(--cre8-font-weights-semibold);
      margin-bottom: var(--cre8-spacing-16);
      color: var(--cre8-color-content-default);
      display: flex;
      align-items: center;
      gap: var(--cre8-spacing-12);
    }

    .category-title svg {
      color: var(--accent-color);
    }

    .skill-list {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }

    .skill-item {
      margin-bottom: var(--cre8-spacing-16);
    }

    .skill-name {
      font-weight: var(--cre8-font-weights-medium);
      margin-bottom: var(--cre8-spacing-6);
      display: flex;
      justify-content: space-between;
    }

    .skill-level {
      color: var(--cre8-color-content-subtle);
      font-size: var(--cre8-font-size-1);
    }

    .skill-bar {
      height: 6px;
      background-color: var(--cre8-color-border-default);
      border-radius: var(--cre8-border-radius-round);
      overflow: hidden;
    }

    .skill-progress {
      height: 100%;
      background-color: var(--accent-color);
      border-radius: var(--cre8-border-radius-round);
    }

    .advanced { width: 90%; }
    .proficient { width: 75%; }
    .intermediate { width: 60%; }
    .familiar { width: 40%; }

    @media (max-width: 768px) {
      :host {
        padding: var(--cre8-spacing-64) 0;
      }
      
      .skill-categories {
        grid-template-columns: 1fr;
      }
    }
  `;

  render() {
    return html`
      <section id="skills">
        <div class="skills-container">
          <h2 class="section-title">Skills & Expertise</h2>
          
          <div class="skill-intro">
            With a background in both engineering and design, I've developed a diverse skill set that enables me to create seamless, user-centered digital experiences. Here's a comprehensive overview of my technical proficiencies and areas of expertise.
          </div>
          
          <div class="skill-categories">
            <div class="skill-category">
              <h3 class="category-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
                Frontend Development
              </h3>
              <ul class="skill-list">
                <li class="skill-item">
                  <div class="skill-name">
                    JavaScript/TypeScript
                    <span class="skill-level">Advanced</span>
                  </div>
                  <div class="skill-bar">
                    <div class="skill-progress advanced"></div>
                  </div>
                </li>
                <li class="skill-item">
                  <div class="skill-name">
                    Web Components
                    <span class="skill-level">Advanced</span>
                  </div>
                  <div class="skill-bar">
                    <div class="skill-progress advanced"></div>
                  </div>
                </li>
                <li class="skill-item">
                  <div class="skill-name">
                    React.js
                    <span class="skill-level">Advanced</span>
                  </div>
                  <div class="skill-bar">
                    <div class="skill-progress advanced"></div>
                  </div>
                </li>
                <li class="skill-item">
                  <div class="skill-name">
                    HTML5/CSS3
                    <span class="skill-level">Advanced</span>
                  </div>
                  <div class="skill-bar">
                    <div class="skill-progress advanced"></div>
                  </div>
                </li>
              </ul>
            </div>
            
            <div class="skill-category">
              <h3 class="category-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18"></path>
                </svg>
                Design & UX
              </h3>
              <ul class="skill-list">
                <li class="skill-item">
                  <div class="skill-name">
                    User Experience Design
                    <span class="skill-level">Proficient</span>
                  </div>
                  <div class="skill-bar">
                    <div class="skill-progress proficient"></div>
                  </div>
                </li>
                <li class="skill-item">
                  <div class="skill-name">
                    Design Systems
                    <span class="skill-level">Advanced</span>
                  </div>
                  <div class="skill-bar">
                    <div class="skill-progress advanced"></div>
                  </div>
                </li>
                <li class="skill-item">
                  <div class="skill-name">
                    Wireframing/Prototyping
                    <span class="skill-level">Proficient</span>
                  </div>
                  <div class="skill-bar">
                    <div class="skill-progress proficient"></div>
                  </div>
                </li>
                <li class="skill-item">
                  <div class="skill-name">
                    User Research
                    <span class="skill-level">Intermediate</span>
                  </div>
                  <div class="skill-bar">
                    <div class="skill-progress intermediate"></div>
                  </div>
                </li>
              </ul>
            </div>
            
            <div class="skill-category">
              <h3 class="category-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                Best Practices
              </h3>
              <ul class="skill-list">
                <li class="skill-item">
                  <div class="skill-name">
                    Web Accessibility (WCAG)
                    <span class="skill-level">Advanced</span>
                  </div>
                  <div class="skill-bar">
                    <div class="skill-progress advanced"></div>
                  </div>
                </li>
                <li class="skill-item">
                  <div class="skill-name">
                    Responsive Design
                    <span class="skill-level">Advanced</span>
                  </div>
                  <div class="skill-bar">
                    <div class="skill-progress advanced"></div>
                  </div>
                </li>
                <li class="skill-item">
                  <div class="skill-name">
                    Performance Optimization
                    <span class="skill-level">Proficient</span>
                  </div>
                  <div class="skill-bar">
                    <div class="skill-progress proficient"></div>
                  </div>
                </li>
                <li class="skill-item">
                  <div class="skill-name">
                    Testing & Documentation
                    <span class="skill-level">Proficient</span>
                  </div>
                  <div class="skill-bar">
                    <div class="skill-progress proficient"></div>
                  </div>
                </li>
              </ul>
            </div>
            
            <div class="skill-category">
              <h3 class="category-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="4" y1="21" x2="4" y2="14"></line>
                  <line x1="4" y1="10" x2="4" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12" y2="3"></line>
                  <line x1="20" y1="21" x2="20" y2="16"></line>
                  <line x1="20" y1="12" x2="20" y2="3"></line>
                  <line x1="1" y1="14" x2="7" y2="14"></line>
                  <line x1="9" y1="8" x2="15" y2="8"></line>
                  <line x1="17" y1="16" x2="23" y2="16"></line>
                </svg>
                Tools & Technologies
              </h3>
              <ul class="skill-list">
                <li class="skill-item">
                  <div class="skill-name">
                    Git/GitHub
                    <span class="skill-level">Advanced</span>
                  </div>
                  <div class="skill-bar">
                    <div class="skill-progress advanced"></div>
                  </div>
                </li>
                <li class="skill-item">
                  <div class="skill-name">
                    Modern Build Tools
                    <span class="skill-level">Proficient</span>
                  </div>
                  <div class="skill-bar">
                    <div class="skill-progress proficient"></div>
                  </div>
                </li>
                <li class="skill-item">
                  <div class="skill-name">
                    CI/CD Pipelines
                    <span class="skill-level">Intermediate</span>
                  </div>
                  <div class="skill-bar">
                    <div class="skill-progress intermediate"></div>
                  </div>
                </li>
                <li class="skill-item">
                  <div class="skill-name">
                    Containerization
                    <span class="skill-level">Familiar</span>
                  </div>
                  <div class="skill-bar">
                    <div class="skill-progress familiar"></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
