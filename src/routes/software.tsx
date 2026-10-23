import { createFileRoute } from "@tanstack/react-router";
import { CtaBand, FeatureGrid, PageHero, Section, meta } from "@/components/site/Layout";
import { softwareServices } from "@/content/site";

export const Route = createFileRoute("/software")({
  head: () => meta("Custom Business Software", "Custom software for business operations: receipt management, employee time tracking, scheduling, invoicing, inventory, and more."),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Business software" title="Less paperwork. More time for real work." intro="We build custom software that fits how your business operates — replacing spreadsheets, paper forms, and repetitive tasks with simple tools." />
      <Section><FeatureGrid items={softwareServices} /></Section>
      <Section className="!pt-0">
        <div className="rounded-xl border border-border bg-card p-8">
          <h2 className="text-2xl font-medium">A note on our products</h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Our own product, Receipt Hub, is currently in development and not yet available for purchase. Today, we build custom solutions for each client's specific needs.
          </p>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
