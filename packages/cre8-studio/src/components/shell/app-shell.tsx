"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV, activeRoute } from "@/lib/nav";
import ThemeToggle from "./theme-toggle";
import { ToastViewport } from "./toast";

// Persistent chrome for every studio route: a slim icon rail + a thin top bar.
// Pages render only their content; titles come from the route registry.
export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "/";
  const active = activeRoute(pathname);

  return (
    <div className="shell">
      <nav className="rail" aria-label="Primary">
        <Link href="/" className="rail-brand" aria-label="cre8 studio home">
          <span className="rail-brand-mark">c8</span>
        </Link>
        <div className="rail-nav">
          {NAV.map((r) => {
            const isActive = r.href === active.href;
            return (
              <Link
                key={r.href}
                href={r.href}
                className={`rail-item${isActive ? " active" : ""}`}
                aria-label={r.label}
                aria-current={isActive ? "page" : undefined}
                data-tip={r.label}
              >
                {r.icon}
              </Link>
            );
          })}
        </div>
        <div className="rail-foot">
          <ThemeToggle />
        </div>
      </nav>

      <div className="shell-main">
        <header className="topbar">
          <div className="topbar-titles">
            <h1 className="topbar-title">{active.title}</h1>
            <span className="topbar-subtitle">{active.subtitle}</span>
          </div>
          <div className="topbar-actions">
            <a
              className="topbar-link"
              href="https://github.com/tmorrowdev/Cre8-Components"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
        </header>
        <div className="shell-content">{children}</div>
      </div>

      <ToastViewport />
    </div>
  );
}
