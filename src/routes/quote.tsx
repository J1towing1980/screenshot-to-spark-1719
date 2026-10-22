import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { PageHero, Section, meta } from "@/components/site/Layout";
import { serviceOptions, site } from "@/content/site";
import { validateQuote, type QuoteErrors } from "@/lib/quote";

export const Route = createFileRoute("/quote")({
  head: () => meta("Request a Free Quote", "Tell us about your website or software project and receive a clear, no-pressure quote."),
  component: Page,
});

function Field({ label, name, error, optional, children }: { label: string; name: string; error?: string | undefined; optional?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold">
        {label} {optional && <span className="font-normal text-muted-foreground">(optional)</span>}
      </label>
      {children}
      {error && <p id={`${name}-error`} className="mt-1 text-sm text-destructive">{error}</p>}
    </div>
  );
}

function Page() {
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    if (data["website"]) return; // honeypot: bots fill hidden field
    const errs = validateQuote(data);
    setErrors(errs);
    if (Object.keys(errs).length === 0) setDone(true);
  }

  const aria = (n: keyof QuoteErrors) => ({ id: n, name: n, "aria-invalid": !!errors[n], "aria-describedby": errors[n] ? `${n}-error` : undefined });

  return (
    <>
      <PageHero eyebrow="Free quote" title="Tell us about your project." intro="Share a few details and we'll follow up with questions and a clear estimate." />
      <Section>
        {done ? (
          <div role="status" className="max-w-2xl rounded-xl border border-border bg-card p-8">
            <h2 className="text-2xl font-medium">Your details look good — one more step</h2>
            <p className="mt-3 text-muted-foreground">
              Online submissions aren't connected yet, so this form did not send your request. Please email us at{" "}
              <a className="font-semibold text-foreground underline" href={`mailto:${site.email}`}>{site.email}</a> and we'll get right back to you.
            </p>
          </div>
        ) : (
          <form noValidate onSubmit={onSubmit} className="grid max-w-3xl gap-6 md:grid-cols-2">
            <div className="hidden" aria-hidden="true">
              <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
            </div>
            <Field label="Business name" name="businessName" error={errors.businessName}><input className="field" {...aria("businessName")} /></Field>
            <Field label="Contact name" name="contactName" error={errors.contactName}><input className="field" autoComplete="name" {...aria("contactName")} /></Field>
            <Field label="Email address" name="email" error={errors.email}><input className="field" type="email" autoComplete="email" {...aria("email")} /></Field>
            <Field label="Phone number" name="phone" optional error={errors.phone}><input className="field" type="tel" autoComplete="tel" {...aria("phone")} /></Field>
            <div className="md:col-span-2">
              <Field label="Type of service needed" name="service" error={errors.service}>
                <select className="field" defaultValue="" {...aria("service")}>
                  <option value="" disabled>Select a service</option>
                  {serviceOptions.map((o) => <option key={o}>{o}</option>)}
                </select>
              </Field>
            </div>
            <div className="md:col-span-2">
              <Field label="Project description" name="description" error={errors.description}>
                <textarea className="field min-h-36" {...aria("description")} />
              </Field>
            </div>
            <Field label="Estimated budget" name="budget" optional>
              <select className="field" id="budget" name="budget" defaultValue="">
                <option value="">Prefer not to say</option>
                <option>Under $1,000</option><option>$1,000 – $3,000</option><option>$3,000 – $7,500</option><option>$7,500+</option>
              </select>
            </Field>
            <Field label="Desired timeframe" name="timeframe" optional>
              <select className="field" id="timeframe" name="timeframe" defaultValue="">
                <option value="">Flexible</option>
                <option>As soon as possible</option><option>Within 1 month</option><option>1–3 months</option><option>3+ months</option>
              </select>
            </Field>
            <div className="md:col-span-2">
              <button type="submit" className="btn-primary">Request my quote</button>
            </div>
          </form>
        )}
      </Section>
    </>
  );
}
