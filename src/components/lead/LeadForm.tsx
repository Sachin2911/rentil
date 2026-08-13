"use client";

import { useId, useState } from "react";
import { Check, LoaderCircle } from "lucide-react";
import { lead } from "@/lib/content";

export const LEAD_STORAGE_KEY = "rentil-lead-capture";

type Status = "idle" | "submitting" | "success" | "error";

export function LeadForm({ onSuccess }: { onSuccess?: () => void }) {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    setStatus("submitting");
    setError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json: { ok?: boolean; error?: string } = await res
        .json()
        .catch(() => ({}));
      if (!res.ok || !json.ok) {
        throw new Error(json.error ?? lead.error);
      }
      setStatus("success");
      try {
        localStorage.setItem(LEAD_STORAGE_KEY, "submitted");
      } catch {
        // storage may be unavailable (private mode): nothing to do
      }
      onSuccess?.();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error && err.message ? err.message : lead.error);
    }
  }

  if (status === "success") {
    return (
      <div className="text-center" role="status">
        <span className="mx-auto grid size-11 place-items-center rounded-full bg-teal text-cream">
          <Check className="size-5" aria-hidden />
        </span>
        <p className="mt-4 font-display text-2xl text-teal-dark">
          {lead.success.title}
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
          {lead.success.body}
        </p>
      </div>
    );
  }

  const inputClasses =
    "w-full rounded-xl border border-sand bg-parchment px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 focus:border-teal focus:outline-2 focus:outline-offset-1 focus:outline-teal/40";

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 text-left" noValidate={false}>
      {/* Honeypot: humans never see or fill this */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div>
        <label
          htmlFor={`${id}-name`}
          className="mb-1.5 block text-sm font-medium text-teal-dark"
        >
          {lead.nameLabel}
        </label>
        <input
          id={`${id}-name`}
          name="name"
          type="text"
          autoComplete="name"
          placeholder={lead.namePlaceholder}
          className={inputClasses}
        />
      </div>

      <div>
        <label
          htmlFor={`${id}-email`}
          className="mb-1.5 block text-sm font-medium text-teal-dark"
        >
          {lead.emailLabel}
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={lead.emailPlaceholder}
          className={inputClasses}
        />
      </div>

      <div>
        <label
          htmlFor={`${id}-portfolio`}
          className="mb-1.5 block text-sm font-medium text-teal-dark"
        >
          {lead.portfolioLabel}
        </label>
        <select
          id={`${id}-portfolio`}
          name="portfolio"
          defaultValue=""
          className={inputClasses}
        >
          <option value="" disabled>
            {lead.portfolioPlaceholder}
          </option>
          {lead.portfolioOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {status === "error" && error ? (
        <p className="text-sm text-[#a03123]" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-teal px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-teal-deep disabled:opacity-70"
      >
        {status === "submitting" ? (
          <>
            <LoaderCircle className="size-4 animate-spin" aria-hidden />
            {lead.submitting}
          </>
        ) : (
          lead.submit
        )}
      </button>
    </form>
  );
}
