import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";
import {
  audiences,
  cta,
  hero,
  how,
  problem,
  visibility,
} from "@/lib/content";

describe("Home page", () => {
  it("composes every section of the landing page", () => {
    render(<Home />);

    // Hero
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      hero.headingA,
    );

    // Section headings, in one pass
    for (const heading of [
      problem.heading,
      how.heading,
      visibility.heading,
      audiences.heading,
      cta.heading,
    ]) {
      expect(screen.getByRole("heading", { name: heading })).toBeInTheDocument();
    }

    // Chrome
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("anchors every nav target to a real section", () => {
    const { container } = render(<Home />);
    for (const id of ["top", "why", "how", "see", "who"]) {
      expect(container.querySelector(`#${id}`)).not.toBeNull();
    }
  });
});
