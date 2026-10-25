import { describe, expect, it } from "vitest";
import { getRouter } from "@/router";
import { sitemapStaticPaths, sitemapXML } from "./sitemap";

describe("public sitemap inventory", () => {
  it("includes all seven public pages and excludes admin and sign-in", () => {
    expect(sitemapStaticPaths(getRouter())).toEqual(["/", "/about", "/contact", "/portfolio", "/quote", "/software", "/websites"]);
  });
  it("uses caldrentech.com without fabricated modification dates", () => {
    const xml = sitemapXML("https://caldrentech.com", [{ path: "/quote" }]);
    expect(xml).toContain("<loc>https://caldrentech.com/quote</loc>");
    expect(xml).not.toContain("<lastmod>");
  });
  it("rejects paths that point outside the site", () => {
    expect(() => sitemapXML("https://caldrentech.com", [{ path: "//other.example/" }])).toThrow("Invalid sitemap path");
  });
});