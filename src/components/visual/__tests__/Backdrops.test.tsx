import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CtaBackdrop, HeroBackdrop } from "@/components/visual/Backdrops";

// The shader components are loaded through next/dynamic (ssr: false), so they
// only appear after the lazy chunk resolves — findByTestId waits for that.
describe("Backdrops", () => {
  it("mounts the hero mesh gradient shader", async () => {
    render(<HeroBackdrop />);
    expect(await screen.findByTestId("shader-mesh")).toBeInTheDocument();
  });

  it("mounts the CTA grain gradient shader", async () => {
    render(<CtaBackdrop />);
    expect(await screen.findByTestId("shader-grain")).toBeInTheDocument();
  });
});
