"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { LeadForm, LEAD_STORAGE_KEY } from "@/components/lead/LeadForm";
import { lead } from "@/lib/content";

export function LeadModal({ delayMs = 30_000 }: { delayMs?: number }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    try {
      if (localStorage.getItem(LEAD_STORAGE_KEY)) return;
    } catch {
      return;
    }
    const timer = setTimeout(() => {
      // Never interrupt someone who is already looking at the real form
      const demo = document.getElementById("demo");
      if (demo) {
        const rect = demo.getBoundingClientRect();
        const formVisible =
          rect.top < window.innerHeight && rect.bottom > 0 && rect.height > 0;
        if (formVisible) return;
      }
      previousFocusRef.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      setOpen(true);
    }, delayMs);
    return () => clearTimeout(timer);
  }, [delayMs]);

  const dismiss = useCallback(() => {
    setOpen(false);
    previousFocusRef.current?.focus?.();
    try {
      // Only remember the dismissal if they haven't already submitted
      if (!localStorage.getItem(LEAD_STORAGE_KEY)) {
        localStorage.setItem(LEAD_STORAGE_KEY, "dismissed");
      }
    } catch {
      // storage unavailable: the modal just won't remember
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    panelRef.current
      ?.querySelector<HTMLInputElement>('input[name="name"]')
      ?.focus();
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dismiss();
        return;
      }
      if (event.key !== "Tab") return;
      // Keep Tab cycling inside the dialog
      const panel = panelRef.current;
      if (!panel) return;
      const focusables = panel.querySelectorAll<HTMLElement>(
        'button, [href], input:not([aria-hidden="true"]), select, textarea',
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, dismiss]);

  return (
    <AnimatePresence>
      {open ? (
        <div
          className="fixed inset-0 z-[60]"
          role="presentation"
          onClick={dismiss}
        >
          <motion.div
            className="absolute inset-0 bg-teal-dark/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
          <div className="absolute inset-0 grid place-items-center overflow-y-auto p-4">
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="lead-modal-title"
              onClick={(event) => event.stopPropagation()}
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 14, scale: 0.98 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.99 }
              }
              transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
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
            </motion.div>
          </div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
