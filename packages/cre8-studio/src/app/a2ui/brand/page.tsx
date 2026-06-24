import Link from "next/link";
import BrandExtractor from "@/components/a2ui-demo/brand-extractor";

export default function BrandPage() {
  return (
    <main className="a2ui-page">
      <header className="header">
        <h1>Connect your brand</h1>
        <span className="subtitle">extract a palette → cre8 token overrides</span>
        <Link href="/a2ui" className="header-nav-link">← A2UI</Link>
        <Link href="/a2ui/workspace" className="header-nav-link">Workspace →</Link>
      </header>
      <BrandExtractor />
    </main>
  );
}
