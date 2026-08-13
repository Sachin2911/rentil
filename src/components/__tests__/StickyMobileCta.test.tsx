import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StickyMobileCta } from "@/components/StickyMobileCta";
import { cta, site } from "@/lib/content";

function setScroll(y: number) {
  Object.defineProperty(window, "scrollY", {
    value: y,
    writable: true,
    configurable: true,
  });
  fireEvent.scroll(window);
}

describe("StickyMobileCta", () => {
  it("stays hidden at the top of the page", () => {
    setScroll(0);
    render(<StickyMobileCta />);
    expect(
      screen.queryByRole("link", { name: cta.primaryCta }),
    ).not.toBeInTheDocument();
  });

  it("appears after the hero scrolls away and links to the form", () => {
    render(<StickyMobileCta />);
    setScroll(2000);
    const link = screen.getByRole("link", { name: cta.primaryCta });
    expect(link).toHaveAttribute("href", site.demoHref);
  });

  it("hides again when the form section is visible", () => {
    const demo = document.createElement("div");
    demo.id = "demo";
    demo.getBoundingClientRect = () =>
      ({ top: 100, bottom: 500, height: 400 }) as DOMRect;
    document.body.appendChild(demo);

    render(<StickyMobileCta />);
    setScroll(2000);
    expect(
      screen.queryByRole("link", { name: cta.primaryCta }),
    ).not.toBeInTheDocument();

    demo.remove();
  });
});
