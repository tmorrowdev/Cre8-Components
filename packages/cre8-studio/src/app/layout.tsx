import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "cre8 studio",
  description: "A2UI chat powered by Claude + cre8-wc",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
