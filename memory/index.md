# cre8-web-components Memory

Session notes and project context for Claude Code conversations.

## Sessions

| Date | Topic | File |
|------|-------|------|
| 2026-02-01 | T.MORROW Portfolio + Frost Theme | [2026-02-01-tmorrow-portfolio.md](./2026-02-01-tmorrow-portfolio.md) |
| 2026-02-01 | SENTIENT Motion-First Portfolio | [2026-02-01-sentient-portfolio.md](./2026-02-01-sentient-portfolio.md) |

## Quick Reference

### Project Structure

```
cre8-web-components/
├── apps/
│   ├── marketing-dashboard/   # JSON-driven dashboard demo
│   └── tmorrow-portfolio/     # T.MORROW portfolio (Frost theme)
├── packages/
│   └── cre8-wc/
│       ├── components/        # Web component source
│       ├── cdn/               # Built CDN bundle
│       └── design-tokens/
│           └── brands/
│               └── tmorrow/   # T.MORROW theme tokens
└── memory/                    # Session notes (this directory)
```

### Key Components

| Component | Key Props | Notes |
|-----------|-----------|-------|
| `cre8-button` | `text`, `variant`, `size` | Use `text` prop for label |
| `cre8-heading` | `tagVariant`, `type` | `tagVariant` = h1-h6, `type` = visual style |
| `cre8-card` | various | Supports glassmorphism with backdrop-filter |
| `cre8-layout` | - | Container for page structure |
| `cre8-header` | - | Sticky header component |

### Theme Usage

```html
<!-- Apply theme to entire page -->
<html data-theme="tmorrow-frost">

<!-- Or per-section -->
<section data-theme="tmorrow-neon">
```

### Running Apps

```bash
npx http-server -p 8080 -c-1
# Marketing Dashboard: http://localhost:8080/apps/marketing-dashboard/
# T.MORROW Portfolio: http://localhost:8080/apps/tmorrow-portfolio/
```
