import { createFileRoute } from "@tanstack/react-router";
import { CtaBand, PageHero, Section, meta } from "@/components/site/Layout";
import { reasons } from "@/content/site";

export const Route = createFileRoute("/about")({
  staticData: { sitemap: true },
  head: () => meta("About Us", "Our mission: help businesses establish a professional online presence and simplify operations through modern, affordable technology.", "/about"),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero eyebrow="About" title="Modern technology, made practical for small business." intro="We're a web development and software company built to give local businesses the same quality online presence and tools as much larger competitors." />
      <Section>
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
          <h2 className="text-3xl font-medium md:text-4xl">Our mission</h2>
          <p className="font-display text-2xl leading-snug md:text-3xl">
            To help businesses establish a professional online presence and simplify business operations through modern, affordable technology.
          </p>
        </div>
      </Section>
      <Section className="!pt-0">
        <div className="grid gap-8 sm:grid-cols-2">
          {reasons.map((r) => (
            <div key={r.title} className="border-t border-border pt-5">
              <h3 className="text-xl font-medium">{r.title}</h3>
              <p className="mt-2 text-muted-foreground">{r.body}</p>
            </div>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
