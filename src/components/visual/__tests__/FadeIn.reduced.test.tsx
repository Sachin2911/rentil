import { render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it } from "vitest";
import { FadeIn } from "@/components/visual/FadeIn";

// This file renders FadeIn for the FIRST time with prefers-reduced-motion
// matching, so motion's cached media-query state picks it up. Keep these
// tests isolated from the default-branch tests in FadeIn.test.tsx.
beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    configurable: true,
    value: (query: string) => ({
      matches: query.includes("prefers-reduced-motion"),
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
});

describe("FadeIn (prefers-reduced-motion)", () => {
  it("never hides content behind an opacity animation", () => {
    render(
      <FadeIn>
        <p>Always visible</p>
      </FadeIn>,
    );
    const wrapper = screen.getByText("Always visible").parentElement;
    expect(wrapper).not.toBeNull();
    // With initial={false} the wrapper must not carry the hidden initial style
    expect(wrapper!.style.opacity).not.toBe("0");
  });
});
