import { describe, expect, it } from "vitest";
import {
  assurances,
  audiences,
  cta,
  hero,
  how,
  inbox,
  lead,
  nav,
  problem,
  site,
  visibility,
} from "./content";

describe("site content", () => {
  it("has a valid contact email", () => {
    expect(site.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it("uses https for external links", () => {
    expect(site.signInUrl).toMatch(/^https:\/\//);
    expect(site.url).toMatch(/^https:\/\//);
  });

  it("books demos via the contact email", () => {
    expect(site.demoHref).toContain(`mailto:${site.email}`);
  });

  it("names the product category in the tagline", () => {
    expect(site.tagline).toBe("The AI assistant for property managers");
  });

  it("says what the product is in the hero heading", () => {
    expect(`${hero.headingA} ${hero.headingB}`).toBe(
      "AI that answers every tenant message.",
    );
  });
});

function allStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") {
    out.push(value);
  } else if (Array.isArray(value)) {
    for (const item of value) allStrings(item, out);
  } else if (value && typeof value === "object") {
    for (const item of Object.values(value)) allStrings(item, out);
  }
  return out;
}

describe("house style", () => {
  it("contains no em or en dashes anywhere in the copy", () => {
    const everything = {
      site,
      nav,
      hero,
      inbox,
      problem,
      how,
      visibility,
      audiences,
      assurances,
      cta,
      lead,
    };
    for (const text of allStrings(everything)) {
      expect(text).not.toMatch(/[—–]/);
    }
  });
});

describe("section content", () => {
  it("has four nav links that are all anchors", () => {
    expect(nav.links).toHaveLength(4);
    for (const link of nav.links) {
      expect(link.href).toMatch(/^#/);
      expect(link.label.length).toBeGreaterThan(0);
    }
  });

  it("has three client quotes, each with a cause", () => {
    expect(problem.quotes).toHaveLength(3);
    for (const q of problem.quotes) {
      expect(q.quote.length).toBeGreaterThan(0);
      expect(q.cause.length).toBeGreaterThan(0);
    }
  });

  it("describes the product in exactly four steps", () => {
    expect(how.steps).toHaveLength(4);
  });

  it("shows four dashboard stats with values and details", () => {
    expect(visibility.stats).toHaveLength(4);
    for (const stat of visibility.stats) {
      expect(stat.value.length).toBeGreaterThan(0);
      expect(stat.label.length).toBeGreaterThan(0);
      expect(stat.detail.length).toBeGreaterThan(0);
    }
  });

  it("targets three audience segments, each with tags", () => {
    expect(audiences.items).toHaveLength(3);
    for (const segment of audiences.items) {
      expect(segment.tags.length).toBeGreaterThan(0);
    }
  });

  it("lists four assurances", () => {
    expect(assurances.items).toHaveLength(4);
  });

  it("keeps the inbox mock consistent", () => {
    expect(inbox.items.length).toBeGreaterThan(0);
    expect(inbox.waiting.amount).toMatch(/^R\s/);
  });

  it("has CTA copy for both actions", () => {
    expect(cta.primaryCta).toBe("Book a demo");
    expect(cta.secondaryCta).toBe("Sign in");
  });

  it("has complete lead-capture copy", () => {
    expect(lead.portfolioOptions.length).toBeGreaterThanOrEqual(4);
    expect(lead.submit).toBe("Book a demo");
    expect(lead.success.title.length).toBeGreaterThan(0);
    expect(lead.modal.heading.length).toBeGreaterThan(0);
    expect(lead.error).toContain(site.email);
  });
});
