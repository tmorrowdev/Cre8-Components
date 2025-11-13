import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Elements Demo",
  description: "Demo application showcasing AI Elements with cre8-react components",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
