import type { Metadata } from "next";
import ThemeBoot from "@/components/a2ui-demo/theme-boot";

export const metadata: Metadata = {
  title: "cre8 A2UI",
  description: "Connect your brand and build apps with cre8-wc + A2UI",
};

export default function A2uiLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeBoot />
      {children}
    </>
  );
}
