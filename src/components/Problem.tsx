import { CornerDownRight } from "lucide-react";
import { FadeIn } from "@/components/visual/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";
import { problem } from "@/lib/content";

export function Problem() {
  return (
    <section id="why" className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
      <FadeIn>
        <SectionHeading
          eyebrow={problem.eyebrow}
          heading={problem.heading}
          lede={problem.lede}
        />
      </FadeIn>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {problem.quotes.map((item, i) => (
          <FadeIn key={item.quote} delay={i * 0.1}>
            <figure className="flex h-full flex-col justify-between rounded-2xl bg-cream p-8">
              <blockquote className="font-display text-2xl leading-snug text-teal-dark">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8 flex items-start gap-2 text-sm leading-relaxed text-ink-soft">
                <CornerDownRight
                  className="mt-0.5 size-4 shrink-0 text-amber"
                  aria-hidden
                />
                {item.cause}
              </figcaption>
            </figure>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
