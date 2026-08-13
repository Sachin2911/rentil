import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ButtonLink } from "@/components/ui/Button";

describe("ButtonLink", () => {
  it("opens external links in a new tab with a safe rel", () => {
    render(<ButtonLink href="https://example.com">External</ButtonLink>);
    const link = screen.getByRole("link", { name: "External" });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link.getAttribute("rel")).toContain("noopener");
  });

  it("leaves mailto links in the same tab", () => {
    render(<ButtonLink href="mailto:hi@example.com">Mail</ButtonLink>);
    const link = screen.getByRole("link", { name: "Mail" });
    expect(link).not.toHaveAttribute("target");
  });

  it("leaves anchor links in the same tab", () => {
    render(<ButtonLink href="#how">Anchor</ButtonLink>);
    expect(screen.getByRole("link", { name: "Anchor" })).not.toHaveAttribute(
      "target",
    );
  });
});
