/**
 * SENTIENT Portfolio - Motion-First Interactivity
 * Intelligence in Motion
 */

// ========================================
// CUSTOM CURSOR
// ========================================
class CustomCursor {
  constructor() {
    this.glow = document.getElementById('cursor-glow');
    this.dot = document.getElementById('cursor-dot');
    this.mouseX = 0;
    this.mouseY = 0;
    this.glowX = 0;
    this.glowY = 0;
    this.dotX = 0;
    this.dotY = 0;

    this.init();
  }

  init() {
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });

    // Add hover effect to interactive elements
    const interactives = document.querySelectorAll('a, button, input, .capability-card');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => this.dot.classList.add('hover'));
      el.addEventListener('mouseleave', () => this.dot.classList.remove('hover'));
    });

    this.animate();
  }

  animate() {
    // Smooth follow for glow (slower)
    this.glowX += (this.mouseX - this.glowX) * 0.08;
    this.glowY += (this.mouseY - this.glowY) * 0.08;

    // Faster follow for dot
    this.dotX += (this.mouseX - this.dotX) * 0.2;
    this.dotY += (this.mouseY - this.dotY) * 0.2;

    this.glow.style.transform = `translate(${this.glowX - 200}px, ${this.glowY - 200}px)`;
    this.dot.style.transform = `translate(${this.dotX - 4}px, ${this.dotY - 4}px)`;

    requestAnimationFrame(() => this.animate());
  }
}


// ========================================
// NEURAL NETWORK CANVAS
// ========================================
class NeuralCanvas {
  constructor() {
    this.canvas = document.getElementById('neural-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.connections = [];
    this.mouseX = window.innerWidth / 2;
    this.mouseY = window.innerHeight / 2;
    this.particleCount = 80;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });

    this.createParticles();
    this.animate();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
  }

  drawParticle(particle) {
    this.ctx.beginPath();
    this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    this.ctx.fillStyle = `rgba(0, 212, 224, ${particle.opacity})`;
    this.ctx.fill();
  }

  drawConnection(p1, p2, distance) {
    const opacity = Math.max(0, 1 - distance / 150) * 0.3;
    this.ctx.beginPath();
    this.ctx.moveTo(p1.x, p1.y);
    this.ctx.lineTo(p2.x, p2.y);
    this.ctx.strokeStyle = `rgba(0, 212, 224, ${opacity})`;
    this.ctx.lineWidth = 1;
    this.ctx.stroke();
  }

  updateParticle(particle) {
    // Mouse attraction
    const dx = this.mouseX - particle.x;
    const dy = this.mouseY - particle.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 200) {
      const force = (200 - dist) / 200 * 0.02;
      particle.vx += dx * force * 0.01;
      particle.vy += dy * force * 0.01;
    }

    // Apply velocity with damping
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.vx *= 0.99;
    particle.vy *= 0.99;

    // Boundary wrap
    if (particle.x < 0) particle.x = this.width;
    if (particle.x > this.width) particle.x = 0;
    if (particle.y < 0) particle.y = this.height;
    if (particle.y > this.height) particle.y = 0;
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Update and draw particles
    this.particles.forEach(particle => {
      this.updateParticle(particle);
      this.drawParticle(particle);
    });

    // Draw connections
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          this.drawConnection(this.particles[i], this.particles[j], distance);
        }
      }
    }

    // Draw connection to mouse
    this.particles.forEach(particle => {
      const dx = this.mouseX - particle.x;
      const dy = this.mouseY - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 120) {
        const opacity = Math.max(0, 1 - distance / 120) * 0.5;
        this.ctx.beginPath();
        this.ctx.moveTo(particle.x, particle.y);
        this.ctx.lineTo(this.mouseX, this.mouseY);
        this.ctx.strokeStyle = `rgba(0, 212, 224, ${opacity})`;
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
      }
    });

    requestAnimationFrame(() => this.animate());
  }
}


// ========================================
// SCROLL REVEAL
// ========================================
class ScrollReveal {
  constructor() {
    this.reveals = document.querySelectorAll('.reveal');
    this.init();
  }

  init() {
    this.checkReveals();
    window.addEventListener('scroll', () => this.checkReveals());
  }

  checkReveals() {
    const windowHeight = window.innerHeight;
    const revealPoint = 100;

    this.reveals.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;

      if (elementTop < windowHeight - revealPoint) {
        element.classList.add('visible');

        // Trigger code animation if it's the agent card
        if (element.querySelector('.code-window')) {
          this.animateCode(element);
        }
      }
    });
  }

  animateCode(card) {
    const codeLines = card.querySelectorAll('.code-line');
    codeLines.forEach((line, index) => {
      const delay = parseInt(line.dataset.delay) || index * 400;
      setTimeout(() => {
        line.classList.add('visible');
      }, delay);
    });
  }
}


// ========================================
// INTERACTIVE TERMINAL
// ========================================
class Terminal {
  constructor() {
    this.output = document.getElementById('terminal-output');
    this.input = document.getElementById('terminal-input');
    this.responses = {
      hello: [
        'Hello, visitor.',
        'I am an autonomous system designed to augment human capability.',
        'What would you like to know?'
      ],
      capabilities: [
        'SYSTEM CAPABILITIES:',
        '├── Generative UI Design',
        '├── Autonomous Code Generation',
        '├── Multi-Agent Orchestration',
        '├── Real-time Context Analysis',
        '└── Adaptive Learning Systems',
        '',
        'All modules operational.'
      ],
      status: [
        'SYSTEM STATUS CHECK...',
        '● Neural cores: ACTIVE',
        '● Memory banks: 99.7% optimal',
        '● Response latency: 0.003ms',
        '● Creative modules: ENGAGED',
        '',
        'All systems nominal.'
      ],
      help: [
        'Available commands:',
        '  hello       - Initiate greeting protocol',
        '  capabilities - View system modules',
        '  status      - Run diagnostics',
        '  clear       - Clear terminal',
        '  about       - Learn about the creator'
      ],
      about: [
        'CREATOR PROFILE:',
        '',
        'Tyler Morrow | T.MORROW',
        'AI Orchestrator & Digital Architect',
        '',
        'Specializing in the intersection of human creativity',
        'and artificial intelligence.',
        '',
        'This interface was generated through human-AI collaboration.'
      ],
      clear: 'CLEAR'
    };

    this.init();
  }

  init() {
    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.handleCommand(this.input.value.trim().toLowerCase());
        this.input.value = '';
      }
    });

    // Focus input on click anywhere in terminal
    document.querySelector('.terminal-container').addEventListener('click', () => {
      this.input.focus();
    });
  }

  handleCommand(cmd) {
    if (!cmd) return;

    // Echo user command
    this.addLine(`visitor@sentient:~$ ${cmd}`, 'user');

    if (cmd === 'clear') {
      this.output.innerHTML = '';
      this.addLine('Terminal cleared.', 'system');
      return;
    }

    const response = this.responses[cmd];

    if (response) {
      this.typeResponse(response);
    } else {
      this.addLine(`Command not recognized: "${cmd}"`, 'system');
      this.addLine('Type "help" for available commands.', 'system');
    }
  }

  typeResponse(lines) {
    lines.forEach((line, index) => {
      setTimeout(() => {
        this.addLine(line, 'response');
        this.scrollToBottom();
      }, index * 100);
    });
  }

  addLine(text, type = 'system') {
    const line = document.createElement('div');
    line.className = `terminal-line ${type}`;
    line.textContent = text;
    this.output.appendChild(line);
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.output.scrollTop = this.output.scrollHeight;
  }
}


// ========================================
// INITIALIZE
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Initialize cursor (desktop only)
  if (window.innerWidth > 768) {
    new CustomCursor();
  }

  // Initialize neural canvas (skip if reduced motion)
  if (!prefersReducedMotion) {
    new NeuralCanvas();
  }

  // Initialize scroll reveal
  new ScrollReveal();

  // Initialize terminal
  new Terminal();

  // Log initialization
  console.log('%c SENTIENT ', 'background: #00D4E0; color: #030712; font-weight: bold; padding: 4px 8px;');
  console.log('%c Intelligence in Motion ', 'color: #94A3B8;');
});


// ========================================
// PERFORMANCE: Pause animations when tab is hidden
// ========================================
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Could pause expensive animations here
  }
});
