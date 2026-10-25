import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/content/site";
import logoPrimary from "@/assets/caldren-logo-primary.png.asset.json";
import logoWhite from "@/assets/caldren-logo-white.png.asset.json";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="container-site flex h-16 items-center justify-between">
        <Link to="/" aria-label={`${site.name} — home`} className="flex shrink-0 items-center">
          <img src={logoPrimary.url} alt="" width={1294} height={269} className="h-11 w-auto max-w-full sm:h-12 md:h-14" />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "text-foreground" }}>
              {n.label}
            </Link>
          ))}
          <Link to="/quote" className="btn-primary whitespace-nowrap !py-2 !px-4 text-sm">Get a Free Quote</Link>
        </nav>
        <Button variant="ghost" size="icon" className="min-h-11 min-w-11 lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls={open ? "mobile-navigation" : undefined} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && (
        <nav id="mobile-navigation" aria-label="Mobile" className="container-site flex flex-col gap-1 pb-5 lg:hidden">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="flex min-h-11 items-center py-2 text-base font-medium">{n.label}</Link>
          ))}
          <Link to="/quote" onClick={() => setOpen(false)} className="btn-primary mt-2">Get a Free Quote</Link>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="container-site grid gap-10 py-14 md:grid-cols-3">
        <div>
          <img src={logoWhite.url} alt={site.name} width={1256} height={267} loading="lazy" className="h-12 w-auto max-w-full md:h-14" />
          <p className="mt-3 max-w-xs text-sm text-ink-muted">{site.tagline} for small and medium-sized businesses.</p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-2 text-sm">
          {nav.map((n) => <Link key={n.to} to={n.to} className="text-ink-muted hover:text-ink-foreground">{n.label}</Link>)}
          <Link to="/quote" className="text-ink-muted hover:text-ink-foreground">Request a Quote</Link>
        </nav>
        <div className="text-sm text-ink-muted">
          <p><a href={`mailto:${site.email}`} className="hover:underline">{site.email}</a></p><p><a href={`tel:${site.phone.replace(/\D/g, "")}`} className="hover:underline">{site.phone}</a></p><p>{site.location}</p>
        </div>
      </div>
      <div className="border-t border-ink-border">
        <p className="container-site py-5 text-xs text-ink-muted">© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}

export function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return (
    <section className="border-b border-border">
      <div className="container-site fade-up py-20 md:py-28">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-medium leading-[1.05] md:text-6xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{intro}</p>
      </div>
    </section>
  );
}

export function FeatureGrid({ items }: { items: { title: string; body: string }[] }) {
  return (
    <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
      {items.map((i) => (
        <div key={i.title} className="bg-card p-7 transition-colors hover:bg-background">
          <h2 className="text-xl font-medium">{i.title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{i.body}</p>
        </div>
      ))}
    </div>
  );
}

export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`container-site py-20 md:py-24 ${className}`}>{children}</section>;
}

export function CtaBand() {
  return (
    <section className="bg-ink text-ink-foreground">
      <div className="container-site flex flex-col items-start justify-between gap-8 py-20 md:flex-row md:items-center">
        <div>
          <h2 className="max-w-xl text-3xl font-medium md:text-5xl">Ready to look as good online as you are in person?</h2>
          <p className="mt-4 text-ink-muted">Tell us about your project. We'll reply with a clear, no-pressure quote.</p>
        </div>
        <Link to="/quote" className="btn-primary shrink-0">Get a Free Quote</Link>
      </div>
    </section>
  );
}

export function meta(title: string, description: string, path?: string) {
  const full = `${title} | ${site.name}`;
  const url = path === undefined ? undefined : new URL(path, "https://caldrentech.com").href;
  return {
    links: url ? [{ rel: "canonical", href: url }] : [],
    meta: [
      { title: full },
      { name: "description", content: description },
      { property: "og:title", content: full },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      ...(url ? [{ property: "og:url", content: url }] : []),
    ],
  };
}
