import { FadeIn } from "@/components/visual/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";
import { how } from "@/lib/content";

export function HowItWorks() {
  return (
    <section id="how" className="border-y border-sand/70 bg-parchment">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
        <FadeIn>
          <SectionHeading
            eyebrow={how.eyebrow}
            heading={how.heading}
            lede={how.lede}
          />
        </FadeIn>

        <ol className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {how.steps.map((step, i) => (
            <FadeIn key={step.title} delay={i * 0.08} className="h-full">
              <li className="flex h-full flex-col rounded-2xl border border-sand bg-paper p-7">
                <span
                  className="font-display text-4xl font-light text-teal-bright"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-lg font-semibold text-teal-dark">
                  {step.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                  {step.body}
                </p>
              </li>
            </FadeIn>
          ))}
        </ol>
      </div>
    </section>
  );
}
