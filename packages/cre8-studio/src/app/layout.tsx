import type { Metadata } from "next";
import "./globals.css";
import AppShell from "@/components/shell/app-shell";

export const metadata: Metadata = {
  title: "cre8 studio",
  description: "A2UI chat powered by Claude + cre8-wc",
};

// Set the theme attribute before first paint to avoid a flash. Defaults to dark.
const THEME_BOOT = `(function(){try{var t=localStorage.getItem('cre8-ui-theme');document.documentElement.dataset.theme=(t==='light'?'light':'dark');}catch(e){document.documentElement.dataset.theme='dark';}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
      </head>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
