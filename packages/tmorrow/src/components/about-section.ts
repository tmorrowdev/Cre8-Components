import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('about-section')
export class AboutSection extends LitElement {
  static styles = css`
    :host {
      display: block;
      background-color: var(--cre8-color-bg-subtle);
      color: var(--cre8-color-content-default);
      padding: var(--cre8-spacing-96) 0;
    }

    .about-container {
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

    .about-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--cre8-spacing-48);
      align-items: center;
    }

    .about-content {
      line-height: 1.7;
    }

    .about-content p {
      margin-bottom: var(--cre8-spacing-24);
      font-size: var(--cre8-font-size-3);
      color: var(--cre8-color-content-subtle);
    }

    .about-content strong {
      color: var(--cre8-color-content-default);
      font-weight: var(--cre8-font-weights-semibold);
    }

    .about-image {
      position: relative;
    }

    .about-image img {
      width: 100%;
      border-radius: var(--cre8-border-radius-default);
      box-shadow: var(--cre8-shadow-default);
    }

    .highlight {
      color: var(--accent-color);
    }

    .skills-container {
      margin-top: var(--cre8-spacing-32);
      display: flex;
      flex-wrap: wrap;
      gap: var(--cre8-spacing-16);
    }

    .skill-tag {
      background-color: rgba(37, 99, 235, 0.1);
      color: var(--accent-color);
      padding: var(--cre8-spacing-8) var(--cre8-spacing-16);
      border-radius: var(--cre8-border-radius-default);
      font-size: var(--cre8-font-size-1);
      font-weight: var(--cre8-font-weights-medium);
    }

    @media (max-width: 768px) {
      :host {
        padding: var(--cre8-spacing-64) 0;
      }
      
      .about-grid {
        grid-template-columns: 1fr;
      }

      .about-image {
        order: -1;
        margin-bottom: var(--cre8-spacing-32);
      }
    }
  `;

  render() {
    return html`
      <section id="about">
        <div class="about-container">
          <h2 class="section-title">About Me</h2>
          
          <div class="about-grid">
            <div class="about-content">
              <p>
                I'm a <strong>Senior Frontend Engineer</strong> at <span class="highlight">Annalect</span>, where I power Omnicom Media Group's digital experiences with modern web technologies. With a passion for creating intuitive and accessible user interfaces, I specialize in building scalable web applications that deliver exceptional user experiences.
              </p>
              
              <p>
                My journey in technology began at <span class="highlight">Emory University</span>, and I've since refined my skills through dedicated professional development. I've earned certifications in <strong>User Experience Design</strong> from General Assembly and completed various courses in frontend development technologies.
              </p>

              <p>
                I'm particularly interested in the intersection of design and code, bringing both aesthetic sensibility and technical expertise to my work. My approach is rooted in user-centered design principles, ensuring that the products I build not only function flawlessly but also delight their users.
              </p>

              <div class="skills-container">
                <div class="skill-tag">React.js</div>
                <div class="skill-tag">TypeScript</div>
                <div class="skill-tag">Web Components</div>
                <div class="skill-tag">UX Design</div>
                <div class="skill-tag">Design Systems</div>
                <div class="skill-tag">Accessibility</div>
              </div>
            </div>
            
            <div class="about-image">
              <img src="https://via.placeholder.com/500x400" alt="Tyler Morrow working on code" />
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
