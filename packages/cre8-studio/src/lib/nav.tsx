import type { ReactNode } from "react";

// Route registry that drives the shell's nav rail and top bar. Keeping titles
// here lets every page drop its ad-hoc <header> in favour of one consistent bar.
export interface NavRoute {
  href: string;
  label: string; // rail tooltip + a11y label
  title: string; // top bar title
  subtitle: string; // top bar subtitle
  icon: ReactNode;
}

const I = (d: ReactNode) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    {d}
  </svg>
);
const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none",
};

export const NAV: NavRoute[] = [
  {
    href: "/",
    label: "Studio",
    title: "cre8 studio",
    subtitle: "Agent-composed UI · streaming chat",
    icon: I(
      <>
        <path {...stroke} d="M4 7h16M4 12h16M4 17h10" />
      </>,
    ),
  },
  {
    href: "/a2ui",
    label: "A2UI",
    title: "cre8 A2UI",
    subtitle: "Connect a brand · build apps with patterns, components & data",
    icon: I(
      <>
        <rect {...stroke} x="3" y="3" width="7" height="7" rx="1.5" />
        <rect {...stroke} x="14" y="3" width="7" height="7" rx="1.5" />
        <rect {...stroke} x="3" y="14" width="7" height="7" rx="1.5" />
        <rect {...stroke} x="14" y="14" width="7" height="7" rx="1.5" />
      </>,
    ),
  },
  {
    href: "/build",
    label: "App Builder",
    title: "cre8 apps",
    subtitle: "Describe an app → live canvas + schema",
    icon: I(
      <>
        <path {...stroke} d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
        <path {...stroke} d="M12 12l8-4.5M12 12v9M12 12L4 7.5" />
      </>,
    ),
  },
  {
    href: "/stack",
    label: "Stack",
    title: "cre8 stack",
    subtitle: "Chat · build · preview — full stack in one view",
    icon: I(
      <>
        <path {...stroke} d="M12 3l9 5-9 5-9-5 9-5z" />
        <path {...stroke} d="M3 12l9 5 9-5M3 16l9 5 9-5" />
      </>,
    ),
  },
  {
    href: "/data",
    label: "Data Agent",
    title: "cre8 data agent",
    subtitle: "Claude Agent SDK · data → cre8 a2ui",
    icon: I(
      <>
        <ellipse {...stroke} cx="12" cy="6" rx="7" ry="3" />
        <path {...stroke} d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" />
      </>,
    ),
  },
  {
    href: "/explore",
    label: "Explore",
    title: "cre8 explore",
    subtitle: "Agent-driven data exploration · mcp-ui",
    icon: I(
      <>
        <circle {...stroke} cx="11" cy="11" r="7" />
        <path {...stroke} d="M21 21l-4.3-4.3" />
      </>,
    ),
  },
];

// Longest-prefix match so nested routes (e.g. /a2ui/workspace) resolve to /a2ui.
export function activeRoute(pathname: string): NavRoute {
  let best = NAV[0];
  for (const r of NAV) {
    if (r.href === "/") continue;
    if ((pathname === r.href || pathname.startsWith(r.href + "/") || pathname === r.href) && r.href.length > best.href.length) {
      best = r;
    }
  }
  if (pathname === "/") return NAV[0];
  return best;
}
