import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHero, Section, meta } from "@/components/site/Layout";
import { site } from "@/content/site";

export const Route = createFileRoute("/contact")({
  head: () => meta("Contact", "Get in touch about a new website, a redesign, or custom business software."),
  component: Page,
});

function Page() {
  const items = [
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: Phone, label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/\D/g, "")}` },
    { icon: MapPin, label: "Location", value: site.location },
    { icon: Clock, label: "Hours", value: site.hours },
  ];
  return (
    <>
      <PageHero eyebrow="Contact" title="Let's talk about your business." intro="Reach out directly, or send a project request and we'll follow up with next steps." />
      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, label, value, href }) => (
            <div key={label} className="rounded-xl border border-border bg-card p-6">
              <Icon className="text-accent" size={20} />
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
              {href ? <a href={href} className="mt-1 block font-medium hover:text-accent">{value}</a> : <p className="mt-1 font-medium">{value}</p>}
            </div>
          ))}
        </div>
        <div className="mt-12">
          <Link to="/quote" className="btn-primary">Request a Quote</Link>
        </div>
      </Section>
    </>
  );
}
