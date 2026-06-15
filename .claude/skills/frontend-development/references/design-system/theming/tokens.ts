// AIDSS Theme for React
// Use with styled-components, emotion, or CSS-in-JS

export const aidssTheme = {
  "colors": {
    "background": {
      "default": "var(--cre8-color-bg-default)",
      "defaultHover": "var(--cre8-color-bg-default-hover)",
      "subtle": "var(--cre8-color-bg-subtle)",
      "strong": "var(--cre8-color-bg-strong)",
      "disabled": "var(--cre8-color-bg-disabled)",
      "transparent": "var(--cre8-color-bg-transparent)",
      "active": "var(--cre8-color-bg-active)",
      "brand": "var(--cre8-color-bg-brand)",
      "brandHover": "var(--cre8-color-bg-brand-hover)",
      "brandStrong": "var(--cre8-color-bg-brand-strong)",
      "brandXstrong": "var(--cre8-color-bg-brand-xstrong)",
      "error": "var(--cre8-color-bg-error)",
      "errorStrong": "var(--cre8-color-bg-error-strong)",
      "warning": "var(--cre8-color-bg-warning)",
      "warningStrong": "var(--cre8-color-bg-warning-strong)",
      "success": "var(--cre8-color-bg-success)",
      "successStrong": "var(--cre8-color-bg-success-strong)",
      "info": "var(--cre8-color-bg-info)",
      "infoStrong": "var(--cre8-color-bg-info-strong)",
      "attention": "var(--cre8-color-bg-attention)",
      "attentionStrong": "var(--cre8-color-bg-attention-strong)"
    },
    "content": {
      "default": "var(--cre8-color-content-default)",
      "subtle": "var(--cre8-color-content-subtle)",
      "strong": "var(--cre8-color-content-strong)",
      "disabled": "var(--cre8-color-content-disabled)",
      "knockout": "var(--cre8-color-content-knockout)",
      "brand": "var(--cre8-color-content-brand)",
      "brandStrong": "var(--cre8-color-content-brand-strong)",
      "brandKnockout": "var(--cre8-color-content-brand-knockout)",
      "link": "var(--cre8-color-content-link)",
      "linkHover": "var(--cre8-color-content-link-hover)",
      "linkActive": "var(--cre8-color-content-link-active)",
      "linkVisited": "var(--cre8-color-content-link-visited)",
      "error": "var(--cre8-color-content-error)",
      "success": "var(--cre8-color-content-success)"
    },
    "border": {
      "default": "var(--cre8-color-border-default)",
      "subtle": "var(--cre8-color-border-subtle)",
      "strong": "var(--cre8-color-border-strong)",
      "disabled": "var(--cre8-color-border-disabled)",
      "transparent": "var(--cre8-color-border-transparent)",
      "knockout": "var(--cre8-color-border-knockout)",
      "brand": "var(--cre8-color-border-brand)",
      "brandStrong": "var(--cre8-color-border-brand-strong)",
      "activeOutline": "var(--cre8-color-border-active-outline)",
      "error": "var(--cre8-color-border-error)",
      "warning": "var(--cre8-color-border-warning)",
      "success": "var(--cre8-color-border-success)",
      "info": "var(--cre8-color-border-info)",
      "attention": "var(--cre8-color-border-attention)"
    },
    "button": {
      "primary": {
        "bg": "--cre8-color-button-primary-bg",
        "bgHover": "--cre8-color-button-primary-bg-hover",
        "border": "--cre8-color-button-primary-border",
        "content": "--cre8-color-button-primary-content"
      },
      "secondary": {
        "bg": "--cre8-color-button-secondary-bg",
        "bgHover": "--cre8-color-button-secondary-bg-hover",
        "border": "--cre8-color-button-secondary-border",
        "content": "--cre8-color-button-secondary-content"
      },
      "tertiary": {
        "bg": "--cre8-color-button-tertiary-bg",
        "bgHover": "--cre8-color-button-tertiary-bg-hover",
        "content": "--cre8-color-button-tertiary-content"
      },
      "danger": {
        "bg": "--cre8-color-button-primary-danger-bg",
        "bgHover": "--cre8-color-button-primary-danger-bg-hover",
        "border": "--cre8-color-button-primary-danger-border",
        "content": "--cre8-color-button-primary-danger-content"
      }
    }
  },
  "spacing": {
    "0": "0",
    "2": "2px",
    "4": "4px",
    "8": "8px",
    "16": "16px",
    "24": "24px"
  },
  "borders": {
    "width": {
      "none": "--cre8-border-width-none",
      "default": "--cre8-border-width-default",
      "focus": "--cre8-border-width-focus"
    },
    "radius": {
      "none": "--cre8-border-radius-none",
      "small": "--cre8-border-radius-small",
      "default": "--cre8-border-radius-default",
      "round": "--cre8-border-radius-round",
      "badge": "--cre8-border-radius-badge",
      "button": "--cre8-border-radius-button",
      "container": "--cre8-border-radius-container"
    }
  },
  "shadows": {
    "default": "--cre8-shadow-default",
    "button": "--cre8-shadow-button",
    "medium": "--cre8-theme-box-shadow-md"
  },
  "animation": {
    "fadeQuick": "--cre8-anim-fade-quick",
    "ease": "--cre8-anim-ease",
    "loading": "--cre8-loading-animation"
  },
  "sizing": {
    "icon": {
      "default": "--cre8-icon-size-default",
      "small": "--cre8-icon-size-small",
      "large": "--cre8-icon-size-large"
    },
    "layout": {
      "maxWidth": "--cre8-l-max-width",
      "linelength": "--cre8-l-linelength-width",
      "sidebar": "--cre8-sidebar-width"
    }
  },
  "status": [
    "error",
    "warning",
    "success",
    "info",
    "attention",
    "neutral"
  ],
  "sizes": [
    "sm",
    "md",
    "lg"
  ]
} as const;

export type AidssTheme = typeof aidssTheme;

// Status type
export type Status = 'error' | 'warning' | 'success' | 'info' | 'attention' | 'neutral';

// Size type
export type Size = 'sm' | 'md' | 'lg';

// Component categories
export const componentCategories = {
  "form": {
    "description": "User input and form controls",
    "count": 15,
    "baseClass": "Cre8FormElement"
  },
  "layout": {
    "description": "Page structure and containers",
    "count": 10,
    "baseClass": "Cre8Element"
  },
  "navigation": {
    "description": "Navigation patterns and links",
    "count": 18,
    "baseClass": "Cre8Element"
  },
  "feedback": {
    "description": "User feedback and status indicators",
    "count": 8,
    "baseClass": "Cre8Element"
  },
  "data-display": {
    "description": "Data visualization and content display",
    "count": 17,
    "baseClass": "Cre8Element"
  },
  "overlay": {
    "description": "Modal and popup content",
    "count": 4,
    "baseClass": "Cre8Element"
  },
  "typography": {
    "description": "Text formatting components",
    "count": 2,
    "baseClass": "Cre8Element"
  },
  "utility": {
    "description": "Supporting and structural components",
    "count": 11,
    "baseClass": "Cre8Element"
  }
};
