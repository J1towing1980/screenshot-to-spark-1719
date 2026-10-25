import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { CtaBand, PageHero, Section, meta } from "@/components/site/Layout";
import { projects } from "@/content/site";

export const Route = createFileRoute("/portfolio")({
  staticData: { sitemap: true },
  head: () => meta("Portfolio", "Website and software projects for local businesses, including towing, auto repair, and receipt management.", "/portfolio"),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Portfolio" title="Our work" intro="A look at the websites and software we're building. Live links and full case studies will be added as each project launches." />
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <article key={p.name} className="group flex flex-col rounded-xl border border-border bg-card">
              <div className="flex aspect-[16/9] items-center justify-center rounded-t-xl bg-secondary">
                <span aria-hidden="true" className="font-display text-6xl text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider">
                  <span className="text-muted-foreground">{p.category}</span>
                  <span className="text-accent">{p.status}</span>
                </div>
                <h2 className="mt-3 text-3xl font-medium">{p.name}</h2>
                <p className="mt-2 text-muted-foreground">{p.summary}</p>
                {p.url && (
                  <a href={p.url} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold hover:text-accent">
                    Visit project <ArrowUpRight size={14} />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
