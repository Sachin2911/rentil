import { describe, expect, it } from "vitest";
import {
  assurances,
  audiences,
  cta,
  hero,
  how,
  inbox,
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

  it("keeps the brand tagline", () => {
    expect(site.tagline).toBe("Handled, or on your desk.");
    expect(`${hero.headingA} ${hero.headingB}`).toBe(site.tagline);
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
});
