import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { InboxCard } from "@/components/InboxCard";
import { inbox } from "@/lib/content";

describe("InboxCard", () => {
  it("renders every timeline item with its time", () => {
    render(<InboxCard />);
    for (const item of inbox.items) {
      expect(screen.getByText(item.text)).toBeInTheDocument();
      expect(screen.getByText(item.time)).toBeInTheDocument();
    }
  });

  it("highlights the approval waiting on the user", () => {
    render(<InboxCard />);
    expect(screen.getByText(inbox.waiting.label)).toBeInTheDocument();
    expect(screen.getByText(inbox.waiting.amount)).toBeInTheDocument();
    expect(screen.getByText(inbox.waiting.text)).toBeInTheDocument();
  });
});
