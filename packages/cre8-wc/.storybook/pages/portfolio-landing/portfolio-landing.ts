import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import styles from './portfolio-landing.scss?inline';

/**
 * Neobrutalism Portfolio Landing Page
 * A bold, striking landing page with pixelated background animation
 */
@customElement('portfolio-landing')
export class PortfolioLanding extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  @state()
  private pixels: Array<{ x: number; y: number; size: number; opacity: number; speed: number; hue: number }> = [];

  @state()
  private mouseX = 0;

  @state()
  private mouseY = 0;

  private animationFrame: number | null = null;
  private canvasRef: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.initPixels();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('resize', this.handleResize);
  }

  firstUpdated() {
    this.canvasRef = this.shadowRoot?.querySelector('#pixelCanvas') as HTMLCanvasElement;
    if (this.canvasRef) {
      this.ctx = this.canvasRef.getContext('2d');
      this.handleResize();
      this.animate();
    }
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('resize', this.handleResize);
  }

  private handleMouseMove = (e: MouseEvent) => {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  };

  private handleResize = () => {
    if (this.canvasRef) {
      this.canvasRef.width = window.innerWidth;
      this.canvasRef.height = window.innerHeight;
      this.initPixels();
    }
  };

  private initPixels() {
    const pixelCount = Math.floor((window.innerWidth * window.innerHeight) / 8000);
    this.pixels = Array.from({ length: pixelCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.floor(Math.random() * 12) + 4,
      opacity: Math.random() * 0.6 + 0.2,
      speed: Math.random() * 0.5 + 0.1,
      hue: Math.random() * 60 + 320, // Pink to purple range
    }));
  }

  private animate = () => {
    if (!this.ctx || !this.canvasRef) return;

    this.ctx.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height);

    this.pixels.forEach((pixel, index) => {
      // Calculate distance from mouse
      const dx = this.mouseX - pixel.x;
      const dy = this.mouseY - pixel.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Repel pixels from mouse
      if (distance < 150) {
        const force = (150 - distance) / 150;
        pixel.x -= (dx / distance) * force * 3;
        pixel.y -= (dy / distance) * force * 3;
      }

      // Gentle floating movement
      pixel.y -= pixel.speed;
      pixel.x += Math.sin(Date.now() * 0.001 + index) * 0.3;

      // Reset pixel if it goes off screen
      if (pixel.y < -pixel.size) {
        pixel.y = this.canvasRef!.height + pixel.size;
        pixel.x = Math.random() * this.canvasRef!.width;
      }
      if (pixel.x < -pixel.size) pixel.x = this.canvasRef!.width;
      if (pixel.x > this.canvasRef!.width + pixel.size) pixel.x = 0;

      // Draw pixelated square
      this.ctx!.fillStyle = `hsla(${pixel.hue}, 80%, 65%, ${pixel.opacity})`;
      this.ctx!.fillRect(
        Math.floor(pixel.x / 4) * 4,
        Math.floor(pixel.y / 4) * 4,
        pixel.size,
        pixel.size
      );
    });

    this.animationFrame = requestAnimationFrame(this.animate);
  };

  render() {
    return html`
      <div class="portfolio-landing">
        <canvas id="pixelCanvas" class="pixel-canvas"></canvas>

        <div class="noise-overlay"></div>

        <main class="content">
          <div class="hero">
            <div class="hero-card">
              <span class="greeting">hello</span>
              <h1 class="name">
                my name is
                <span class="highlight">Tyler Morrow</span>
              </h1>
              <div class="role-container">
                <p class="role">
                  I'm a <span class="role-highlight">Software Engineer</span>
                </p>
                <p class="role">
                  and <span class="role-highlight">AI Solutions Architect</span>
                </p>
              </div>

              <div class="cta-buttons">
                <button class="btn btn-primary">
                  View My Work
                  <span class="btn-arrow">→</span>
                </button>
                <button class="btn btn-secondary">
                  Get In Touch
                </button>
              </div>
            </div>

            <div class="decorative-elements">
              <div class="shape shape-1"></div>
              <div class="shape shape-2"></div>
              <div class="shape shape-3"></div>
              <div class="pixel-art">
                <div class="pixel-row">
                  <span></span><span></span><span></span>
                </div>
                <div class="pixel-row">
                  <span></span><span></span><span></span><span></span><span></span>
                </div>
                <div class="pixel-row">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
          </div>

          <nav class="bottom-nav">
            <a href="#about" class="nav-link">About</a>
            <a href="#projects" class="nav-link">Projects</a>
            <a href="#skills" class="nav-link">Skills</a>
            <a href="#contact" class="nav-link">Contact</a>
          </nav>

          <div class="scroll-indicator">
            <span class="scroll-text">Scroll</span>
            <div class="scroll-arrow">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </main>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'portfolio-landing': PortfolioLanding;
  }
}
