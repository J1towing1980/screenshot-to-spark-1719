import { createFileRoute } from "@tanstack/react-router";
import { CtaBand, FeatureGrid, PageHero, Section, meta } from "@/components/site/Layout";
import { websiteServices } from "@/content/site";

export const Route = createFileRoute("/websites")({
  head: () => meta("Website Development Services", "Business websites, redesigns, landing pages, mobile optimization, and maintenance for small and medium-sized businesses."),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero eyebrow="Website development" title="A website that works as hard as you do." intro="We design and build fast, mobile-friendly websites that clearly explain your services and make it easy for customers to call, book, or request a quote." />
      <Section><FeatureGrid items={websiteServices} /></Section>
      <CtaBand />
    </>
  );
}
