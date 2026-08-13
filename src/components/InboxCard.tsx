import { Check } from "lucide-react";
import { inbox } from "@/lib/content";

export function InboxCard() {
  return (
    <div className="overflow-hidden rounded-2xl bg-paper shadow-2xl shadow-teal-dark/40 ring-1 ring-teal-dark/10">
      <div className="flex items-center justify-between border-b border-sand bg-cream/60 px-5 py-4">
        <p className="text-sm font-semibold text-teal-dark">{inbox.title}</p>
        <span className="inline-flex items-center gap-1.5 text-xs text-ink-soft">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-teal-bright opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-teal-bright" />
          </span>
          {inbox.caption}
        </span>
      </div>

      <ul className="px-5">
        {inbox.items.map((item) => (
          <li
            key={item.time}
            className="flex items-center gap-3 border-b border-sand/60 py-3.5 last:border-b-0"
          >
            <span className="w-11 shrink-0 font-mono text-xs text-ink-soft">
              {item.time}
            </span>
            <span className="flex-1 text-sm text-ink">{item.text}</span>
            <Check className="size-4 shrink-0 text-teal-bright" aria-hidden />
          </li>
        ))}
      </ul>

      <div className="m-4 rounded-xl border border-sand bg-cream p-4">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-amber">
          {inbox.waiting.label}
        </p>
        <p className="mt-2 font-display text-2xl text-teal-dark">
          {inbox.waiting.amount}
        </p>
        <p className="mt-1 text-sm text-ink-soft">{inbox.waiting.text}</p>
        <div className="mt-3 flex gap-2" aria-hidden>
          <span className="rounded-full bg-teal px-4 py-1.5 text-xs font-medium text-cream">
            {inbox.waiting.approve}
          </span>
          <span className="rounded-full border border-teal/30 px-4 py-1.5 text-xs font-medium text-teal-dark">
            {inbox.waiting.hold}
          </span>
        </div>
      </div>
    </div>
  );
}
