import Link from "next/link";
import ExploreCanvasView from "@/components/explore-canvas-view";

export default function ExplorePage() {
  return (
    <div className="app--fullbleed">
      <header className="header" style={{ padding: "12px 20px" }}>
        <h1 style={{ fontSize: 16 }}>cre8 explore</h1>
        <span className="subtitle">Agent-driven data exploration · mcp-ui</span>
        <Link href="/" className="header-nav-link">Studio →</Link>
        <Link href="/data" className="header-nav-link">Data Agent →</Link>
      </header>
      <ExploreCanvasView dataset="ecommerce" />
    </div>
  );
}
