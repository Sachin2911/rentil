import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "@/components/Hero";
import { hero, inbox, site } from "@/lib/content";

describe("Hero", () => {
  it("renders the tagline as the main heading", () => {
    render(<Hero />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(hero.headingA);
    expect(heading).toHaveTextContent(hero.headingB);
  });

  it("renders the lede and rollout note", () => {
    render(<Hero />);
    expect(screen.getByText(hero.lede)).toBeInTheDocument();
    expect(screen.getByText(hero.note)).toBeInTheDocument();
  });

  it("has demo and sign-in calls to action", () => {
    render(<Hero />);
    expect(
      screen.getByRole("link", { name: hero.primaryCta }),
    ).toHaveAttribute("href", site.demoHref);
    expect(
      screen.getByRole("link", { name: hero.secondaryCta }),
    ).toHaveAttribute("href", site.signInUrl);
  });

  it("shows the inbox product mock", () => {
    render(<Hero />);
    expect(screen.getByText(inbox.title)).toBeInTheDocument();
    expect(screen.getByText(inbox.waiting.amount)).toBeInTheDocument();
  });
});
