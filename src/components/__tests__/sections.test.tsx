import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CtaSection } from "@/components/CtaSection";
import { Faq } from "@/components/Faq";
import { FounderNote } from "@/components/FounderNote";
import { HowItWorks } from "@/components/HowItWorks";
import { Problem } from "@/components/Problem";
import { Visibility } from "@/components/Visibility";
import { WhoItsFor } from "@/components/WhoItsFor";
import {
  audiences,
  chat,
  cta,
  faq,
  flow,
  founder,
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
  it("renders all three steps in order", () => {
    render(<HowItWorks />);
    expect(
      screen.getByRole("heading", { name: how.heading }),
    ).toBeInTheDocument();
    const titles = screen
      .getAllByRole("heading", { level: 3 })
      .map((h) => h.textContent);
    expect(titles).toEqual(how.steps.map((s) => s.title));
  });

  it("draws the flow diagram from channels to outcomes", () => {
    render(<HowItWorks />);
    for (const source of flow.sources) {
      expect(screen.getByText(source)).toBeInTheDocument();
    }
    expect(screen.getByText(flow.hub)).toBeInTheDocument();
    for (const outcome of flow.outcomes) {
      expect(screen.getByText(outcome.label)).toBeInTheDocument();
    }
  });

  it("shows the tenant chat answered by Rentil", () => {
    render(<HowItWorks />);
    expect(screen.getByText(chat.heading)).toBeInTheDocument();
    for (const message of chat.messages) {
      expect(screen.getByText(message.text)).toBeInTheDocument();
    }
    expect(screen.getByText(chat.caption)).toBeInTheDocument();
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
      expect(screen.getByText(segment.body)).toBeInTheDocument();
    }
  });
});

describe("FounderNote", () => {
  it("renders every paragraph and the signature", () => {
    render(<FounderNote />);
    for (const paragraph of founder.body) {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    }
    expect(screen.getByText(founder.name)).toBeInTheDocument();
    expect(screen.getByText(founder.role)).toBeInTheDocument();
  });
});

describe("Faq", () => {
  it("renders every question and answer", () => {
    render(<Faq />);
    for (const item of faq.items) {
      expect(screen.getByText(item.q)).toBeInTheDocument();
      expect(screen.getByText(item.a)).toBeInTheDocument();
    }
  });
});

describe("CtaSection", () => {
  it("renders the closing pitch with the lead form, trust note and email", () => {
    const { container } = render(<CtaSection />);
    expect(
      screen.getByRole("heading", { name: cta.heading }),
    ).toBeInTheDocument();
    expect(container.querySelector("#demo")).not.toBeNull();
    expect(
      screen.getByRole("button", { name: lead.submit }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(lead.emailLabel)).toBeRequired();
    expect(screen.getByText(cta.trustNote)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: site.email })).toHaveAttribute(
      "href",
      `mailto:${site.email}`,
    );
  });
});
