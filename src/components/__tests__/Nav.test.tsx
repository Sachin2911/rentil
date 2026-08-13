import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Nav } from "@/components/Nav";
import { nav, site } from "@/lib/content";

describe("Nav", () => {
  it("renders every navigation link", () => {
    render(<Nav />);
    for (const link of nav.links) {
      const el = screen.getByRole("link", { name: link.label });
      expect(el).toHaveAttribute("href", link.href);
    }
  });

  it("links sign in to the app with a safe rel", () => {
    render(<Nav />);
    const signIn = screen.getByRole("link", { name: "Sign in" });
    expect(signIn).toHaveAttribute("href", site.signInUrl);
    expect(signIn).toHaveAttribute("target", "_blank");
    expect(signIn.getAttribute("rel")).toContain("noopener");
  });

  it("books a demo via email", () => {
    render(<Nav />);
    const demo = screen.getByRole("link", { name: "Book a demo" });
    expect(demo).toHaveAttribute("href", site.demoHref);
  });

  it("shows the brand name", () => {
    render(<Nav />);
    expect(screen.getByText(site.name)).toBeInTheDocument();
  });
});
