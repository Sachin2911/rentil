import { FadeIn } from "@/components/visual/FadeIn";
import { founder } from "@/lib/content";

export function FounderNote() {
  return (
    <section className="border-t border-sand/70">
      <div className="mx-auto max-w-2xl px-6 py-24 sm:py-28">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-bright">
            {founder.eyebrow}
          </p>
          <div className="mt-6 space-y-5">
            <p className="font-display text-2xl leading-snug text-teal-dark sm:text-[1.7rem]">
              {founder.body[0]}
            </p>
            {founder.body.slice(1).map((paragraph) => (
              <p key={paragraph} className="text-lg leading-relaxed text-ink-soft">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-8 border-t border-sand pt-5">
            <p className="font-display text-xl italic text-teal-dark">
              {founder.name}
            </p>
            <p className="mt-1 text-sm text-ink-soft">{founder.role}</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
