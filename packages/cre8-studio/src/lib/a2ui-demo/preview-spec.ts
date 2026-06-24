import type { ComponentSpec } from "@tmorrow/cre8-wc/a2ui";

// A compact showcase spec used to preview a brand theme — exercises the most
// color-sensitive surfaces: a branded band, headings, buttons (primary +
// secondary), a card and a notification.
export const BRAND_PREVIEW_SPEC: ComponentSpec = {
  component: "cre8-layout-section",
  children: [
    {
      component: "cre8-band",
      props: { variant: "branded" },
      children: [
        {
          component: "cre8-hero",
          props: { align: "center" },
          children: [
            {
              component: "cre8-heading",
              props: { type: "display-default", tagVariant: "h1" },
              children: ["Your brand, themed"],
            },
            {
              component: "cre8-text-passage",
              props: { size: "large" },
              children: [
                "Every cre8 component picks up your palette through design tokens.",
              ],
            },
            {
              component: "cre8-button-group",
              children: [
                {
                  component: "cre8-button",
                  props: { text: "Primary action", variant: "primary" },
                  events: { click: "preview-primary" },
                },
                {
                  component: "cre8-button",
                  props: { text: "Secondary", variant: "secondary" },
                  events: { click: "preview-secondary" },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      component: "cre8-grid",
      props: { variant: "2up" },
      children: [
        {
          component: "cre8-card",
          slots: {
            header: [
              {
                component: "cre8-heading",
                props: { type: "title-default", tagVariant: "h3" },
                children: ["Card title"],
              },
            ],
            default: [
              {
                component: "cre8-text-passage",
                children: ["Cards, links and accents all derive from the same ramp."],
              },
              {
                component: "cre8-link",
                props: { href: "#" },
                slots: { default: ["A themed link"] },
              },
            ],
          },
        },
        {
          component: "cre8-alert",
          props: { status: "info", variant: "standalone", headerText: "Heads up" },
          slots: { default: ["Alerts use the brand's informational tones."] },
        },
      ],
    },
  ],
};
