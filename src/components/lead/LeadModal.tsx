"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { LeadForm, LEAD_STORAGE_KEY } from "@/components/lead/LeadForm";
import { lead } from "@/lib/content";

export function LeadModal({ delayMs = 30_000 }: { delayMs?: number }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      if (localStorage.getItem(LEAD_STORAGE_KEY)) return;
    } catch {
      return;
    }
    const timer = setTimeout(() => setOpen(true), delayMs);
    return () => clearTimeout(timer);
  }, [delayMs]);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector("input")?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function dismiss() {
    setOpen(false);
    try {
      // Only remember the dismissal if they haven't already submitted
      if (!localStorage.getItem(LEAD_STORAGE_KEY)) {
        localStorage.setItem(LEAD_STORAGE_KEY, "dismissed");
      }
    } catch {
      // storage unavailable — the modal just won't remember
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]" role="presentation" onClick={dismiss}>
      <div className="absolute inset-0 bg-teal-dark/60 backdrop-blur-sm" />
      <div className="absolute inset-0 grid place-items-center overflow-y-auto p-4">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lead-modal-title"
          onClick={(event) => event.stopPropagation()}
          className="relative w-full max-w-md rounded-2xl bg-paper p-7 shadow-2xl shadow-teal-dark/50 sm:p-8"
        >
          <button
            type="button"
            onClick={dismiss}
            aria-label="Close"
            className="absolute right-4 top-4 grid size-9 place-items-center rounded-full text-ink-soft transition-colors hover:bg-cream hover:text-teal-dark"
          >
            <X className="size-4" aria-hidden />
          </button>

          <h2
            id="lead-modal-title"
            className="pr-8 font-display text-3xl leading-tight tracking-tight text-teal-dark"
          >
            {lead.modal.heading}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            {lead.modal.body}
          </p>

          <div className="mt-6">
            <LeadForm />
          </div>

          <button
            type="button"
            onClick={dismiss}
            className="mx-auto mt-4 block text-sm text-ink-soft underline decoration-sand underline-offset-4 transition-colors hover:text-teal-dark"
          >
            {lead.modal.dismiss}
          </button>
        </div>
      </div>
    </div>
  );
}
