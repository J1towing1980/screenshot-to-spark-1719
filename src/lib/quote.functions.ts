import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { validateQuote } from "./quote";

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

async function hashIp(ip: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`quote:${ip}`));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export type SubmitResult = { ok: true } | { ok: false; error: string; fieldErrors?: Record<string, string> };

export const submitQuote = createServerFn({ method: "POST" })
  .inputValidator((d: Record<string, unknown>) => ({
    businessName: str(d["businessName"], 200),
    contactName: str(d["contactName"], 200),
    email: str(d["email"], 255),
    phone: str(d["phone"], 40),
    service: str(d["service"], 100),
    description: str(d["description"], 4000),
    budget: str(d["budget"], 50),
    timeframe: str(d["timeframe"], 50),
    website: str(d["website"], 200),
  }))
  .handler(async ({ data }): Promise<SubmitResult> => {
    if (data.website) return { ok: true }; // honeypot: silently drop bots
    const fieldErrors = validateQuote(data);
    if (Object.keys(fieldErrors).length) return { ok: false, error: "Please fix the highlighted fields.", fieldErrors };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const ip = getRequestHeader("cf-connecting-ip") ?? getRequestHeader("x-forwarded-for")?.split(",")[0] ?? "unknown";
    const ipHash = await hashIp(ip);
    const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count } = await supabaseAdmin.from("quote_requests").select("id", { count: "exact", head: true }).eq("ip_hash", ipHash).gte("created_at", since);
    if ((count ?? 0) >= 5) return { ok: false, error: "Too many requests from your connection. Please try again in an hour or email us directly." };

    const { error } = await supabaseAdmin.from("quote_requests").insert({
      business_name: data.businessName,
      contact_name: data.contactName,
      email: data.email,
      phone: data.phone || null,
      service: data.service,
      description: data.description,
      budget: data.budget || null,
      timeframe: data.timeframe || null,
      ip_hash: ipHash,
    });
    if (error) {
      console.error("quote insert failed", error.message);
      return { ok: false, error: "We couldn't save your request right now. Please try again in a moment." };
    }
    // Owner email notification: not wired yet — requires a verified sender domain and recipient address.
    return { ok: true };
  });

export const listQuotes = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
    if (!isAdmin) return { authorized: false as const, quotes: [] };
    const { data, error } = await context.supabase
      .from("quote_requests")
      .select("id, created_at, business_name, contact_name, email, phone, service, budget, timeframe, description")
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) throw new Error("Could not load quote requests.");
    return { authorized: true as const, quotes: data };
  });
