import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "@/components/Footer";
import { footer, nav, site } from "@/lib/content";

describe("Footer", () => {
  it("renders the motto and blurb", () => {
    render(<Footer />);
    expect(screen.getByText(footer.motto)).toBeInTheDocument();
    expect(screen.getByText(footer.blurb)).toBeInTheDocument();
  });

  it("repeats the product navigation", () => {
    render(<Footer />);
    for (const link of nav.links) {
      expect(screen.getByRole("link", { name: link.label })).toHaveAttribute(
        "href",
        link.href,
      );
    }
  });

  it("links the contact email", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: site.email })).toHaveAttribute(
      "href",
      `mailto:${site.email}`,
    );
  });

  it("shows the current year in the legal line", () => {
    render(<Footer />);
    expect(
      screen.getByText(new RegExp(`© ${new Date().getFullYear()} Rentil`)),
    ).toBeInTheDocument();
  });
});
