import { describe, expect, it } from "vitest";
import {
  audiences,
  chat,
  cta,
  faq,
  flow,
  founder,
  hero,
  how,
  inbox,
  lead,
  nav,
  notFound,
  problem,
  site,
  visibility,
} from "./content";

describe("site content", () => {
  it("has a valid contact email", () => {
    expect(site.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it("uses https for the canonical site URL", () => {
    expect(site.url).toMatch(/^https:\/\//);
  });

  it("books demos via the on-page form anchor", () => {
    expect(site.demoHref).toBe("#demo");
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

describe("section content", () => {
  it("has five nav links that are all anchors", () => {
    expect(nav.links).toHaveLength(5);
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

  it("describes the product in exactly three steps", () => {
    expect(how.steps).toHaveLength(3);
  });

  it("draws the flow with three sources and two outcomes", () => {
    expect(flow.sources).toHaveLength(3);
    expect(flow.outcomes).toHaveLength(2);
  });

  it("shows a tenant chat that Rentil answers", () => {
    expect(chat.messages).toHaveLength(2);
    expect(chat.messages[0].from).toBe("tenant");
    expect(chat.messages[1].from).toBe("rentil");
  });

  it("shows four dashboard stats with values and details", () => {
    expect(visibility.stats).toHaveLength(4);
    for (const stat of visibility.stats) {
      expect(stat.value.length).toBeGreaterThan(0);
      expect(stat.label.length).toBeGreaterThan(0);
      expect(stat.detail.length).toBeGreaterThan(0);
    }
  });

  it("targets three audience segments", () => {
    expect(audiences.items).toHaveLength(3);
  });

  it("signs the founder note", () => {
    expect(founder.body.length).toBeGreaterThanOrEqual(2);
    expect(founder.name).toBe("Rowan");
    expect(founder.role.length).toBeGreaterThan(0);
  });

  it("answers at least five real objections in the FAQ", () => {
    expect(faq.items.length).toBeGreaterThanOrEqual(5);
    for (const item of faq.items) {
      expect(item.q.length).toBeGreaterThan(0);
      expect(item.a.length).toBeGreaterThan(0);
    }
  });

  it("keeps the inbox mock consistent", () => {
    expect(inbox.items.length).toBeGreaterThan(0);
    expect(inbox.waiting.amount).toMatch(/^R\s/);
  });

  it("has CTA copy with a trust note", () => {
    expect(cta.primaryCta).toBe("Book a demo");
    expect(cta.trustNote).toContain("POPIA");
  });

  it("has complete lead-capture copy", () => {
    expect(lead.portfolioOptions.length).toBeGreaterThanOrEqual(4);
    expect(lead.submit).toBe("Book a demo");
    expect(lead.reassure.length).toBeGreaterThan(0);
    expect(lead.success.title.length).toBeGreaterThan(0);
    expect(lead.success.note.length).toBeGreaterThan(0);
    expect(lead.modal.heading.length).toBeGreaterThan(0);
    expect(lead.error).toContain(site.email);
  });

  it("has branded not-found copy", () => {
    expect(notFound.title.length).toBeGreaterThan(0);
    expect(notFound.cta.length).toBeGreaterThan(0);
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
      flow,
      chat,
      visibility,
      audiences,
      founder,
      faq,
      cta,
      lead,
      notFound,
    };
    for (const text of allStrings(everything)) {
      expect(text).not.toMatch(/[—–]/);
    }
  });
});
