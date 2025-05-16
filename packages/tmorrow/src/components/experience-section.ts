import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('experience-section')
export class ExperienceSection extends LitElement {
  static styles = css`
    :host {
      display: block;
      background-color: var(--cre8-color-bg-default);
      color: var(--cre8-color-content-default);
      padding: var(--cre8-spacing-96) 0;
    }

    .experience-container {
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

    .timeline {
      position: relative;
      margin-left: var(--cre8-spacing-16);
    }

    .timeline::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 2px;
      background-color: var(--cre8-color-border-default);
    }

    .timeline-item {
      position: relative;
      padding-left: var(--cre8-spacing-48);
      padding-bottom: var(--cre8-spacing-48);
    }

    .timeline-item:last-child {
      padding-bottom: 0;
    }

    .timeline-dot {
      position: absolute;
      left: -8px;
      top: 0;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background-color: var(--accent-color);
      border: 2px solid var(--cre8-color-bg-default);
    }

    .timeline-content {
      background-color: var(--cre8-color-bg-subtle);
      border-radius: var(--cre8-border-radius-default);
      padding: var(--cre8-spacing-24);
      box-shadow: var(--cre8-shadow-default);
    }

    .job-title {
      font-size: var(--cre8-font-size-4);
      font-weight: var(--cre8-font-weights-semibold);
      margin-bottom: var(--cre8-spacing-8);
      color: var(--cre8-color-content-default);
    }

    .company {
      font-size: var(--cre8-font-size-3);
      font-weight: var(--cre8-font-weights-medium);
      margin-bottom: var(--cre8-spacing-12);
      color: var(--accent-color);
    }

    .period {
      font-size: var(--cre8-font-size-2);
      color: var(--cre8-color-content-subtle);
      margin-bottom: var(--cre8-spacing-16);
      display: flex;
      align-items: center;
      gap: var(--cre8-spacing-6);
    }

    .responsibilities {
      margin-top: var(--cre8-spacing-16);
      color: var(--cre8-color-content-subtle);
    }

    .responsibilities ul {
      list-style-type: none;
      padding-left: 0;
    }

    .responsibilities li {
      position: relative;
      padding-left: var(--cre8-spacing-24);
      margin-bottom: var(--cre8-spacing-12);
      line-height: 1.6;
    }

    .responsibilities li::before {
      content: '';
      position: absolute;
      left: 0;
      top: 10px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: var(--accent-color);
    }

    @media (max-width: 768px) {
      :host {
        padding: var(--cre8-spacing-64) 0;
      }
      
      .timeline {
        margin-left: 0;
      }
      
      .timeline-item {
        padding-left: var(--cre8-spacing-32);
      }
    }
  `;

  render() {
    return html`
      <section id="experience">
        <div class="experience-container">
          <h2 class="section-title">Work Experience</h2>
          
          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <h3 class="job-title">Senior Frontend Engineer</h3>
                <div class="company">Annalect, Omnicom Media Group</div>
                <div class="period">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  Present
                </div>
                <div class="responsibilities">
                  <ul>
                    <li>Lead the development of scalable web applications and digital experiences for Omnicom Media Group clients.</li>
                    <li>Architect and implement design systems using modern web technologies like Web Components and TypeScript.</li>
                    <li>Collaborate with cross-functional teams to create accessible and high-performance user interfaces.</li>
                    <li>Mentor junior developers and contribute to technical decision-making processes.</li>
                    <li>Implement best practices for code quality, testing, and documentation.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <h3 class="job-title">UX Designer (Certification Project)</h3>
                <div class="company">General Assembly</div>
                <div class="period">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  2017
                </div>
                <div class="responsibilities">
                  <ul>
                    <li>Completed intensive User Experience Design certification program.</li>
                    <li>Conducted user research and usability testing to inform design decisions.</li>
                    <li>Created wireframes, prototypes, and user flows for web and mobile applications.</li>
                    <li>Collaborated on a two-week project designing a mobile rewards program.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <h3 class="job-title">Student</h3>
                <div class="company">Emory University</div>
                <div class="period">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  2006 - 2012
                </div>
                <div class="responsibilities">
                  <ul>
                    <li>Graduated with a Bachelor's degree.</li>
                    <li>Developed a strong foundation in critical thinking and problem-solving.</li>
                    <li>Participated in technology-related extracurricular activities and projects.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
