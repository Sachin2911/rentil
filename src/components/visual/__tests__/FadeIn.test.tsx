import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FadeIn } from "@/components/visual/FadeIn";

describe("FadeIn (motion enabled)", () => {
  it("renders its children", () => {
    render(
      <FadeIn>
        <p>Reveal me</p>
      </FadeIn>,
    );
    expect(screen.getByText("Reveal me")).toBeInTheDocument();
  });

  it("starts hidden so the scroll reveal has something to animate", () => {
    render(
      <FadeIn>
        <p>Reveal me</p>
      </FadeIn>,
    );
    const wrapper = screen.getByText("Reveal me").parentElement;
    expect(wrapper).not.toBeNull();
    expect(wrapper!.style.opacity).toBe("0");
  });

  it("passes className through to the wrapper", () => {
    render(
      <FadeIn className="test-class">
        <p>Reveal me</p>
      </FadeIn>,
    );
    expect(screen.getByText("Reveal me").parentElement).toHaveClass(
      "test-class",
    );
  });
});
