import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ count: 0, limitError: null as object | null, insertError: null as object | null, insert: vi.fn(), notify: vi.fn() }));
vi.mock("@tanstack/react-start", () => ({ createServerFn: () => {
  let validate = (data: unknown) => data;
  const builder = {
    inputValidator: (fn: typeof validate) => { validate = fn; return builder; },
    middleware: () => builder,
    handler: (fn: (args: { data: unknown }) => unknown) => (args: { data: unknown }) => fn({ data: validate(args.data) }),
  };
  return builder;
} }));
vi.mock("@tanstack/react-start/server", () => ({ getRequestHeader: () => "127.0.0.1" }));
vi.mock("@/integrations/supabase/auth-middleware", () => ({ requireSupabaseAuth: {} }));
vi.mock("@/integrations/supabase/client.server", () => ({ supabaseAdmin: { from: () => ({
  select: () => ({ eq: () => ({ gte: async () => ({ count: mocks.count, error: mocks.limitError }) }) }),
  insert: (data: unknown) => { mocks.insert(data); return { select: () => ({ single: async () => ({ data: mocks.insertError ? null : { id: "saved-id" }, error: mocks.insertError }) }) }; },
}) } }));
vi.mock("./quote-notification.server", () => ({ notifyQuoteOwner: mocks.notify }));
import { submitQuote } from "./quote.functions";

const request = { businessName: "Launch audit", contactName: "Owner", email: "joelshop1900@hotmail.com", service: "New business website", description: "A complete quote request for the business." };
describe("quote persistence safeguards", () => {
  beforeEach(() => { vi.clearAllMocks(); mocks.count = 0; mocks.limitError = null; mocks.insertError = null; mocks.notify.mockResolvedValue({ sent: true }); });
  it("does not confirm or notify when database save fails", async () => {
    mocks.insertError = {};
    expect((await submitQuote({ data: request })).ok).toBe(false);
    expect(mocks.notify).not.toHaveBeenCalled();
  });
  it("keeps a saved quote successful when notification fails", async () => {
    mocks.notify.mockRejectedValue(new Error("Notification unavailable"));
    expect((await submitQuote({ data: request })).ok).toBe(true);
    expect(mocks.insert).toHaveBeenCalledTimes(1);
    expect(mocks.notify).toHaveBeenCalledWith("saved-id", expect.objectContaining(request));
  });
  it("does not accept a request if spam-limit lookup fails", async () => {
    mocks.limitError = {};
    expect((await submitQuote({ data: request })).ok).toBe(false);
    expect(mocks.insert).not.toHaveBeenCalled();
  });
  it("blocks a sixth request within the existing five-per-hour limit", async () => {
    mocks.count = 5;
    expect((await submitQuote({ data: request })).ok).toBe(false);
    expect(mocks.insert).not.toHaveBeenCalled();
  });
});