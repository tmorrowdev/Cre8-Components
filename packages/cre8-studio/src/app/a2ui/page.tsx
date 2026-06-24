import Link from "next/link";

export default function A2uiLanding() {
  return (
    <main className="a2ui-landing">
      <div className="a2ui-landing-inner">
        <header className="a2ui-landing-header">
          <span className="a2ui-eyebrow">cre8 · A2UI</span>
          <h1>Build branded apps with agent-composed UI</h1>
          <p>
            Connect your brand to retheme the entire cre8 component system, then
            open a workspace where an agent assembles real cre8-wc interfaces from
            your patterns, components and data.
          </p>
        </header>

        <div className="a2ui-choice-grid">
          <Link href="/a2ui/brand" className="a2ui-choice-card">
            <div className="a2ui-choice-icon" aria-hidden>
              <span className="swatch s1" />
              <span className="swatch s2" />
              <span className="swatch s3" />
            </div>
            <h2>Connect your brand</h2>
            <p>
              Point at a website or pick a color. We extract a palette and font and
              generate cre8 design-token overrides — every component instantly
              themed.
            </p>
            <span className="a2ui-choice-cta">Open brand extractor →</span>
          </Link>

          <Link href="/a2ui/workspace" className="a2ui-choice-card">
            <div className="a2ui-choice-icon a2ui-choice-icon--build" aria-hidden>
              <span className="mention">@components</span>
              <span className="mention">@patterns</span>
              <span className="mention">@data</span>
            </div>
            <h2>Create a workspace</h2>
            <p>
              An app-building workshop: @-mention prepopulated cre8 components,
              patterns and data sources. Chat on the left, a live app renderer on
              the right. Save anything up to a full page as a pattern.
            </p>
            <span className="a2ui-choice-cta">Open workspace →</span>
          </Link>
        </div>

        <footer className="a2ui-landing-footer">
          <Link href="/" className="a2ui-textlink">← cre8 studio</Link>
          <span>Powered by cre8-wc + A2UI</span>
        </footer>
      </div>
    </main>
  );
}
