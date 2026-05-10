import Link from "next/link";
import AppBuilder from "@/components/app-builder";

export default function BuildPage() {
  return (
    <main className="app">
      <header className="header">
        <h1>cre8 apps</h1>
        <span className="subtitle">describe an app → live canvas + Supabase schema</span>
        <Link href="/" className="header-nav-link">← Studio</Link>
<Link href="/stack" className="header-nav-link">Stack →</Link>
      </header>
      <AppBuilder />
    </main>
  );
}
