import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Nav } from "@/components/Nav";
import { nav, site } from "@/lib/content";

function setScroll(y: number) {
  Object.defineProperty(window, "scrollY", {
    value: y,
    writable: true,
    configurable: true,
  });
  fireEvent.scroll(window);
}

describe("Nav", () => {
  it("renders every navigation link", () => {
    render(<Nav />);
    for (const link of nav.links) {
      const el = screen.getByRole("link", { name: link.label });
      expect(el).toHaveAttribute("href", link.href);
    }
  });

  it("books a demo via the on-page form anchor", () => {
    render(<Nav />);
    const demo = screen.getByRole("link", { name: "Book a demo" });
    expect(demo).toHaveAttribute("href", site.demoHref);
  });

  it("shows the brand name", () => {
    render(<Nav />);
    expect(screen.getByText(site.name)).toBeInTheDocument();
  });

  it("switches from transparent to paper chrome on scroll", () => {
    render(<Nav />);
    const header = screen.getByRole("banner");
    expect(header.className).toContain("bg-transparent");

    setScroll(100);
    expect(header.className).toContain("bg-paper/90");

    setScroll(0);
    expect(header.className).toContain("bg-transparent");
  });

  it("opens and closes the mobile menu", () => {
    const { container } = render(<Nav />);
    expect(container.querySelector("#mobile-menu")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    const menu = container.querySelector("#mobile-menu");
    expect(menu).not.toBeNull();

    for (const link of nav.links) {
      expect(
        within(menu as HTMLElement).getByRole("link", { name: link.label }),
      ).toHaveAttribute("href", link.href);
    }

    fireEvent.click(
      within(menu as HTMLElement).getByRole("link", {
        name: nav.links[0].label,
      }),
    );
    expect(container.querySelector("#mobile-menu")).toBeNull();
  });

  it("closes the mobile menu on Escape", () => {
    const { container } = render(<Nav />);
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    expect(container.querySelector("#mobile-menu")).not.toBeNull();

    fireEvent.keyDown(window, { key: "Escape" });
    expect(container.querySelector("#mobile-menu")).toBeNull();
  });
});
