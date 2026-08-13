import { Plus } from "lucide-react";
import { FadeIn } from "@/components/visual/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";
import { faq } from "@/lib/content";

export function Faq() {
  return (
    <section id="faq" className="border-t border-sand/70 bg-parchment">
      <div className="mx-auto max-w-3xl px-6 py-24 sm:py-28">
        <FadeIn>
          <SectionHeading eyebrow={faq.eyebrow} heading={faq.heading} />
        </FadeIn>

        <div className="mt-10 border-y border-sand">
          {faq.items.map((item, i) => (
            <FadeIn key={item.q} delay={i * 0.05}>
              <details className="group border-b border-sand py-5 last:border-b-0">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-semibold text-teal-dark [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <Plus
                    className="size-4 shrink-0 text-teal-bright transition-transform duration-200 group-open:rotate-45"
                    aria-hidden
                  />
                </summary>
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
                  {item.a}
                </p>
              </details>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
