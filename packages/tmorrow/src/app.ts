import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import './components/about-section.js';
import './components/experience-section.js';
import './components/skills-section.js';
import './components/projects-section.js';
import './components/certifications-section.js';
import './components/contact-section.js';
import './components/footer-component.js';
import './components/header-component.js';

@customElement('app-root')
export class AppRoot extends LitElement {
 

 onConnectedCallback(){
    super.connectedCallback();
    document.addEventListener('DOMContentLoaded', () => {
        // Implementation for mobile menu toggle if needed
        const header = document.documentElement.shadowRoot!.querySelector('header-component');
        const menuToggle = header?.shadowRoot!.querySelector('.menu-toggle');
        
        if (menuToggle) {
          menuToggle.addEventListener('click', function() {
            // Toggle mobile menu functionality goes here
          });
        }
        
        // Smooth scroll for anchor links
        header?.shadowRoot!.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', (e:Event) => {
            (e as CustomEvent).preventDefault();
            
            const targetElement = (e.target as HTMLLinkElement);

            if (targetElement) {
              window.scrollTo({
                top: (targetElement as HTMLElement).offsetTop - 80, // Adjust offset for header height
                behavior: 'smooth'
              });
            }
          });
        });
      });
    }

    disconnectedCallback(): void {
        super.disconnectedCallback();
        // Clean up event listeners if necessary
        document.removeEventListener('DOMContentLoaded', ()=>{});
    }

render() {
    return html `
      <header-component></header-component>

     <main>
    <hero-section></hero-section>
    <about-section></about-section>
    <experience-section></experience-section>
    <skills-section></skills-section>
    <projects-section></projects-section>
    <certifications-section></certifications-section>
    <contact-section></contact-section>
  </main>
  
  <footer-component></footer-component>
    `
};
}