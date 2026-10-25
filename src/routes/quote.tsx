import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { PageHero, Section, meta } from "@/components/site/Layout";
import { serviceOptions, site } from "@/content/site";
import { validateQuote, type QuoteErrors } from "@/lib/quote";
import { submitQuote } from "@/lib/quote.functions";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/quote")({
  staticData: { sitemap: true },
  head: () => meta("Request a Free Quote", "Tell us about your website or software project and receive a clear, no-pressure quote.", "/quote"),
  component: Page,
});

function Field({ label, name, error, optional, children }: { label: string; name: string; error?: string | undefined; optional?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold">
        {label} {optional && <span className="font-normal text-muted-foreground">(optional)</span>}
      </label>
      {children}
      {error && <p role="alert" id={`${name}-error`} className="mt-1 text-sm text-destructive">{error}</p>}
    </div>
  );
}

function Page() {
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState("");
  const submit = useServerFn(submitQuote);
  const success = useRef<HTMLDivElement>(null);
  useEffect(() => { if (done) success.current?.focus(); }, [done]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const errs = validateQuote(data);
    setErrors(errs);
    setFormError("");
    if (Object.keys(errs).length) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }
    setBusy(true);
    try {
      const res = await submit({ data });
      if (res.ok) setDone(true);
      else {
        setErrors((res.fieldErrors ?? {}) as QuoteErrors);
        setFormError(res.error);
      }
    } catch {
      setFormError(`Something went wrong sending your request. Please try again or email ${site.email}.`);
    } finally {
      setBusy(false);
    }
  }

  const aria = (n: keyof QuoteErrors) => ({ id: n, name: n, "aria-invalid": !!errors[n], "aria-describedby": errors[n] ? `${n}-error` : undefined });

  return (
    <>
      <PageHero eyebrow="Free quote" title="Tell us about your project." intro="Share a few details and we'll follow up with questions and a clear estimate." />
      <Section>
        {done ? (
          <div ref={success} tabIndex={-1} role="status" className="max-w-2xl rounded-xl border border-border bg-card p-8">
            <h2 className="text-2xl font-medium">Thanks — we received your request</h2>
            <p className="mt-3 text-muted-foreground">
              Your quote request was saved. We'll review your project details and follow up by email.
            </p>
          </div>

        ) : (
          <form noValidate aria-busy={busy} onSubmit={onSubmit} className="grid max-w-3xl gap-6 md:grid-cols-2">
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
              {formError && <p role="alert" className="mb-4 text-sm text-destructive">{formError}</p>}
              <Button type="submit" disabled={busy} className="btn-primary h-auto">{busy ? "Sending…" : "Request my quote"}</Button>
            </div>
          </form>
        )}
      </Section>
    </>
  );
}
