import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LeadModal } from "@/components/lead/LeadModal";
import { LEAD_STORAGE_KEY } from "@/components/lead/LeadForm";
import { lead } from "@/lib/content";

beforeEach(() => {
  vi.useFakeTimers();
  localStorage.clear();
});

afterEach(() => {
  vi.useRealTimers();
  localStorage.clear();
});

describe("LeadModal", () => {
  it("stays hidden until the delay elapses, then opens", () => {
    render(<LeadModal delayMs={30_000} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(29_999);
    });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(lead.modal.heading)).toBeInTheDocument();
  });

  it("dismisses and remembers the dismissal", () => {
    render(<LeadModal delayMs={1000} />);
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    fireEvent.click(screen.getByRole("button", { name: lead.modal.dismiss }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(localStorage.getItem(LEAD_STORAGE_KEY)).toBe("dismissed");
  });

  it("closes on Escape", () => {
    render(<LeadModal delayMs={1000} />);
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("never opens for visitors who already submitted or dismissed", () => {
    localStorage.setItem(LEAD_STORAGE_KEY, "submitted");
    render(<LeadModal delayMs={1000} />);
    act(() => {
      vi.advanceTimersByTime(60_000);
    });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
