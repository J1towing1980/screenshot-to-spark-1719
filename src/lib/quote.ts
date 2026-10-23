export type QuoteErrors = Partial<Record<"businessName" | "contactName" | "email" | "phone" | "service" | "description", string>>;

export function validateQuote(d: Record<string, string | undefined>): QuoteErrors {
  const e: QuoteErrors = {};
  const v = (k: string) => (d[k] ?? "").trim();
  if (!v("businessName")) e.businessName = "Please enter your business name.";
  else if (v("businessName").length > 120) e.businessName = "Please keep this under 120 characters.";
  if (!v("contactName")) e.contactName = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email"))) e.email = "Please enter a valid email address.";
  if (v("phone") && v("phone").replace(/\D/g, "").length < 10) e.phone = "Please enter a valid phone number.";
  if (!v("service")) e.service = "Please choose a service.";
  if (v("description").length < 20) e.description = "Please describe your project (at least 20 characters).";
  else if (v("description").length > 3000) e.description = "Please keep this under 3,000 characters.";
  return e;
}
