import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Assurances } from "@/components/Assurances";
import { CtaSection } from "@/components/CtaSection";
import { HowItWorks } from "@/components/HowItWorks";
import { Problem } from "@/components/Problem";
import { Visibility } from "@/components/Visibility";
import { WhoItsFor } from "@/components/WhoItsFor";
import {
  assurances,
  audiences,
  cta,
  how,
  lead,
  problem,
  site,
  visibility,
} from "@/lib/content";

describe("Problem", () => {
  it("renders the heading and every quote with its cause", () => {
    render(<Problem />);
    expect(
      screen.getByRole("heading", { name: problem.heading }),
    ).toBeInTheDocument();
    for (const q of problem.quotes) {
      expect(screen.getByText(`“${q.quote}”`)).toBeInTheDocument();
      expect(screen.getByText(q.cause)).toBeInTheDocument();
    }
  });
});

describe("HowItWorks", () => {
  it("renders all four steps in order", () => {
    render(<HowItWorks />);
    expect(
      screen.getByRole("heading", { name: how.heading }),
    ).toBeInTheDocument();
    const titles = screen
      .getAllByRole("heading", { level: 3 })
      .map((h) => h.textContent);
    expect(titles).toEqual(how.steps.map((s) => s.title));
  });
});

describe("Visibility", () => {
  it("renders each dashboard stat", () => {
    render(<Visibility />);
    for (const stat of visibility.stats) {
      expect(screen.getByText(stat.value)).toBeInTheDocument();
      expect(screen.getByText(stat.label)).toBeInTheDocument();
      expect(screen.getByText(stat.detail)).toBeInTheDocument();
    }
  });
});

describe("WhoItsFor", () => {
  it("renders the qualifier heading and all three segments", () => {
    render(<WhoItsFor />);
    expect(
      screen.getByRole("heading", { name: audiences.heading }),
    ).toBeInTheDocument();
    for (const segment of audiences.items) {
      expect(screen.getByText(segment.title)).toBeInTheDocument();
      for (const tag of segment.tags) {
        expect(screen.getByText(tag)).toBeInTheDocument();
      }
    }
  });
});

describe("Assurances", () => {
  it("renders all four assurance items", () => {
    render(<Assurances />);
    for (const item of assurances.items) {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getByText(item.body)).toBeInTheDocument();
    }
  });
});

describe("CtaSection", () => {
  it("renders the closing pitch with the lead form and contact links", () => {
    render(<CtaSection />);
    expect(
      screen.getByRole("heading", { name: cta.heading }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: lead.submit })).toBeInTheDocument();
    expect(screen.getByLabelText(lead.emailLabel)).toBeRequired();
    expect(
      screen.getByRole("link", { name: cta.secondaryCta }),
    ).toHaveAttribute("href", site.signInUrl);
    expect(screen.getByRole("link", { name: site.email })).toHaveAttribute(
      "href",
      `mailto:${site.email}`,
    );
  });
});
