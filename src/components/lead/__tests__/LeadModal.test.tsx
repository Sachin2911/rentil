import {
  act,
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LeadModal } from "@/components/lead/LeadModal";
import { LEAD_STORAGE_KEY } from "@/components/lead/LeadForm";
import { lead } from "@/lib/content";

afterEach(() => {
  vi.useRealTimers();
  localStorage.clear();
});

describe("LeadModal", () => {
  it("stays hidden until the delay elapses, then opens with focus on the name field", () => {
    vi.useFakeTimers();
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
    expect(document.activeElement?.getAttribute("name")).toBe("name");
  });

  it("dismisses, remembers the dismissal, and closes", async () => {
    render(<LeadModal delayMs={10} />);
    await screen.findByRole("dialog");

    fireEvent.click(screen.getByRole("button", { name: lead.modal.dismiss }));
    expect(localStorage.getItem(LEAD_STORAGE_KEY)).toBe("dismissed");
    if (screen.queryByRole("dialog")) {
      await waitForElementToBeRemoved(() => screen.queryByRole("dialog"), {
        timeout: 3000,
      });
    }
  });

  it("closes on Escape", async () => {
    render(<LeadModal delayMs={10} />);
    await screen.findByRole("dialog");

    fireEvent.keyDown(window, { key: "Escape" });
    expect(localStorage.getItem(LEAD_STORAGE_KEY)).toBe("dismissed");
    if (screen.queryByRole("dialog")) {
      await waitForElementToBeRemoved(() => screen.queryByRole("dialog"), {
        timeout: 3000,
      });
    }
  });

  it("never opens for visitors who already submitted or dismissed", () => {
    vi.useFakeTimers();
    localStorage.setItem(LEAD_STORAGE_KEY, "submitted");
    render(<LeadModal delayMs={1000} />);
    act(() => {
      vi.advanceTimersByTime(60_000);
    });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("skips opening when the real form is already on screen", () => {
    vi.useFakeTimers();
    const demo = document.createElement("div");
    demo.id = "demo";
    demo.getBoundingClientRect = () =>
      ({ top: 100, bottom: 500, height: 400 }) as DOMRect;
    document.body.appendChild(demo);

    render(<LeadModal delayMs={1000} />);
    act(() => {
      vi.advanceTimersByTime(60_000);
    });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    demo.remove();
  });
});
