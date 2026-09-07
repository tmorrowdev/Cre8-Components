# SENTIENT Portfolio - Motion-First Design

**Date:** 2026-02-01
**Project:** cre8-web-components

## Summary

Created a motion-first portfolio landing page that serves as a live demonstration of AI/agentic capability. The homepage IS the portfolio piece - visitors experience AI capability through the interface itself.

## Design Process

1. **Gemini 3 Pro** generated the UI specification via the `ui-designer` skill
2. **Claude Opus 4.5** implemented the full design with custom animations

Design spec saved at: `memory/gemini-portfolio-design.json`

## Key Concept

> "I don't just build interfaces. I engineer intelligence."

The visitor EXPERIENCES AI capability through:
- Neural network canvas that responds to cursor movement
- Morphing shapes animation
- Interactive terminal they can play with
- Animated process flow visualization

## Files Created

```
apps/sentient-portfolio/
├── index.html       # Main page structure
├── css/
│   └── styles.css   # Motion-first styling (~600 lines)
└── js/
    └── main.js      # Interactive features (~300 lines)
```

## Motion Features Implemented

1. **Custom Cursor**
   - Large glow that follows mouse (lag effect)
   - Small dot cursor with hover states
   - Disabled on mobile

2. **Neural Network Canvas**
   - 80 particles with physics
   - Mouse attraction effect
   - Dynamic connections between nearby particles
   - Connections to cursor position

3. **Hero Section**
   - Animated text reveal (staggered lines)
   - Gradient text shift animation
   - Bouncing scroll indicator

4. **Capability Cards**
   - Morphing shapes (generative visual)
   - Code typing animation (agent visual)
   - Network SVG with connection drawing (neural visual)
   - Hover: lift, glow, color shift

5. **Process Flow Visualization**
   - RAW DATA → INTELLIGENCE → SOLUTION
   - Spinning rings on core node
   - Pulsing effects
   - Flowing particles on connectors

6. **Interactive Terminal**
   - Mac-style window chrome
   - Blinking cursor
   - Commands: `hello`, `capabilities`, `status`, `about`, `help`, `clear`
   - Typed response animation

7. **Scroll Animations**
   - Reveal on scroll with staggered delays
   - `IntersectionObserver`-style triggers

## Color Palette

```css
--color-bg-deep: #030712
--color-bg-base: #050A14
--color-cyan: #00D4E0
--color-purple: #7C3AED
--color-magenta: #F472B6
```

## Typography

- Headings: Manrope (800 weight)
- Body: DM Sans
- Code: JetBrains Mono

## Terminal Commands

| Command | Response |
|---------|----------|
| `hello` | Greeting + description |
| `capabilities` | System capabilities tree |
| `status` | System diagnostics |
| `about` | Creator profile |
| `help` | Available commands |
| `clear` | Clears terminal |

## Performance Considerations

- Custom cursor disabled on mobile
- Respects `prefers-reduced-motion`
- Tab visibility API for pausing animations
- Efficient canvas rendering with requestAnimationFrame

## Running Locally

```bash
cd /Users/tylersmbp/Projects/cre8-web-components
npx http-server -p 8080 -c-1
# Visit: http://localhost:8080/apps/sentient-portfolio/
```

## Future Enhancements

- Three.js for 3D particle effects
- GSAP ScrollTrigger for timeline animations
- Sound design for interactions
- WebGL shaders for visual effects
- About/Contact pages
