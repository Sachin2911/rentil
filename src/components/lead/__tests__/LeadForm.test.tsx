import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LeadForm, LEAD_STORAGE_KEY } from "@/components/lead/LeadForm";
import { lead } from "@/lib/content";

function fillAndSubmit() {
  fireEvent.change(screen.getByLabelText(lead.nameLabel), {
    target: { value: "Thandi M" },
  });
  fireEvent.change(screen.getByLabelText(lead.emailLabel), {
    target: { value: "thandi@agency.co.za" },
  });
  fireEvent.change(screen.getByLabelText(lead.portfolioLabel), {
    target: { value: lead.portfolioOptions[1] },
  });
  fireEvent.submit(
    screen.getByRole("button", { name: lead.submit }).closest("form")!,
  );
}

afterEach(() => {
  vi.unstubAllGlobals();
  localStorage.clear();
});

describe("LeadForm", () => {
  it("submits the lead and shows the success state", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), { status: 200 }),
    );
    vi.stubGlobal("fetch", fetchMock);

    render(<LeadForm />);
    fillAndSubmit();

    await waitFor(() =>
      expect(screen.getByText(lead.success.title)).toBeInTheDocument(),
    );
    // Success state offers a faster path
    expect(screen.getByRole("link", { name: /hello@rello\.work/ })).toBeInTheDocument();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/leads");
    expect(JSON.parse(init.body)).toMatchObject({
      email: "thandi@agency.co.za",
      name: "Thandi M",
      portfolio: lead.portfolioOptions[1],
    });
    expect(localStorage.getItem(LEAD_STORAGE_KEY)).toBe("submitted");
  });

  it("calls onSuccess after a successful submit", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ ok: true }), { status: 200 }),
      ),
    );
    const onSuccess = vi.fn();

    render(<LeadForm onSuccess={onSuccess} />);
    fillAndSubmit();

    await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1));
  });

  it("surfaces server errors and keeps the form usable", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ ok: false, error: "Nope." }), {
          status: 500,
        }),
      ),
    );

    render(<LeadForm />);
    fillAndSubmit();

    await waitFor(() =>
      expect(screen.getByRole("alert")).toHaveTextContent("Nope."),
    );
    expect(screen.getByRole("button", { name: lead.submit })).toBeEnabled();
    expect(localStorage.getItem(LEAD_STORAGE_KEY)).toBeNull();
  });

  it("includes a hidden honeypot field for bots", () => {
    const { container } = render(<LeadForm />);
    const honeypot = container.querySelector('input[name="company"]');
    expect(honeypot).not.toBeNull();
    expect(honeypot).toHaveAttribute("aria-hidden", "true");
    expect(honeypot).toHaveAttribute("tabindex", "-1");
  });

  it("reassures the visitor about what happens next", () => {
    render(<LeadForm />);
    expect(screen.getByText(lead.reassure)).toBeInTheDocument();
  });
});
