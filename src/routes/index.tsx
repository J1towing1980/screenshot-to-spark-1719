import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CtaBand, Section, meta } from "@/components/site/Layout";
import { process, projects, reasons, softwareServices, websiteServices } from "@/content/site";

export const Route = createFileRoute("/")({
  head: () => meta("Websites & Business Software for Small Businesses", "Professional, mobile-friendly websites and custom business software for contractors, auto shops, towing, cleaning, restaurants, and more."),
  component: Home,
});

function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="container-site grid gap-12 py-20 md:py-32 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div className="fade-up">
            <p className="eyebrow">Web development & business software</p>
            <h1 className="mt-5 text-5xl font-medium leading-[1.02] md:text-7xl">
              Websites that win customers. <em className="text-accent">Software</em> that runs the rest.
            </h1>
            <p className="mt-7 max-w-xl text-lg text-muted-foreground">
              We build professional websites and practical tools for small and medium-sized businesses — so you can get found, look credible, and spend less time on paperwork.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/quote" className="btn-primary">Get a Free Quote <ArrowRight size={16} /></Link>
              <Link to="/portfolio" className="btn-outline">View Our Work</Link>
            </div>
          </div>
          <div className="fade-up rounded-xl border border-border bg-card p-7 [animation-delay:150ms]">
            <p className="text-sm font-semibold">Built for businesses like</p>
            <ul className="mt-4 space-y-3 font-display text-2xl">
              {["Towing companies", "Auto repair shops", "Cleaning services", "Contractors", "Restaurants"].map((x) => (
                <li key={x} className="border-b border-border pb-3 last:border-0">{x}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="container-site grid gap-12 py-20 md:grid-cols-2">
          {[
            { eyebrow: "Service 01", title: "Business websites", body: "Modern, mobile-first websites, redesigns, and ongoing maintenance.", items: websiteServices, to: "/websites" as const },
            { eyebrow: "Service 02", title: "Business software", body: "Custom tools for receipts, scheduling, time tracking, invoicing, and more.", items: softwareServices, to: "/software" as const },
          ].map((s) => (
            <div key={s.title}>
              <p className="eyebrow">{s.eyebrow}</p>
              <h2 className="mt-3 text-3xl font-medium md:text-4xl">{s.title}</h2>
              <p className="mt-3 text-muted-foreground">{s.body}</p>
              <ul className="mt-6 grid grid-cols-2 gap-2 text-sm">
                {s.items.map((i) => <li key={i.title} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-accent" />{i.title}</li>)}
              </ul>
              <Link to={s.to} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold hover:text-accent">Learn more <ArrowRight size={14} /></Link>
            </div>
          ))}
        </div>
      </section>

      <Section>
        <p className="eyebrow">Why us</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-medium md:text-5xl">A partner focused on what moves your business forward.</h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r) => (
            <div key={r.title} className="border-t-2 border-foreground pt-5">
              <h3 className="text-xl font-medium">{r.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{r.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-secondary">
        <Section>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2 className="mt-3 text-3xl font-medium md:text-5xl">Current projects</h2>
            </div>
            <Link to="/portfolio" className="btn-outline">View portfolio</Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {projects.map((p) => (
              <article key={p.name} className="rounded-xl border border-border bg-card p-7">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{p.category}</p>
                <h3 className="mt-3 text-2xl font-medium">{p.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.summary}</p>
                <p className="mt-5 text-xs font-semibold text-accent">{p.status}</p>
              </article>
            ))}
          </div>
        </Section>
      </section>

      <Section>
        <p className="eyebrow">How it works</p>
        <h2 className="mt-3 text-3xl font-medium md:text-5xl">A simple, transparent process</h2>
        <ol className="mt-12 grid gap-8 md:grid-cols-4">
          {process.map((s) => (
            <li key={s.step}>
              <span className="font-display text-5xl text-accent">{s.step}</span>
              <h3 className="mt-3 text-xl font-medium">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <CtaBand />
    </>
  );
}
