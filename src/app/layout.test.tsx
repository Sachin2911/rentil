import { describe, expect, it } from "vitest";
import { metadata } from "./layout";
import { site } from "@/lib/content";

describe("root metadata", () => {
  it("uses the brand tagline as the default title", () => {
    expect(metadata.title).toMatchObject({
      default: `${site.name} — ${site.tagline}`,
      template: `%s — ${site.name}`,
    });
  });

  it("describes the product for search and social", () => {
    expect(metadata.description).toBe(site.description);
    expect(metadata.openGraph?.description).toBe(site.description);
  });

  it("resolves relative URLs against the canonical site URL", () => {
    expect(metadata.metadataBase).toBeInstanceOf(URL);
    expect((metadata.metadataBase as URL).origin).toBe(site.url);
  });
});
