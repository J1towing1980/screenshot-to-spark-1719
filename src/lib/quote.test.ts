import { describe, expect, it } from "vitest";
import { validateQuote } from "./quote";

const ok = { businessName: "J1 Towing", contactName: "Joel", email: "a@b.com", service: "Landing page", description: "We need a new website for our towing company." };

describe("validateQuote", () => {
  it("accepts a complete request without optional fields", () => expect(validateQuote(ok)).toEqual({}));
  it("requires a valid email", () => expect(validateQuote({ ...ok, email: "nope" }).email).toBeDefined());
  it("phone is optional but validated when given", () => expect(validateQuote({ ...ok, phone: "123" }).phone).toBeDefined());
  it("requires a service type", () => expect(validateQuote({ ...ok, service: "" }).service).toBeDefined());
});
