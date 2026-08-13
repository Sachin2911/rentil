import { CtaBackdrop } from "@/components/visual/Backdrops";
import { FadeIn } from "@/components/visual/FadeIn";
import { LeadForm } from "@/components/lead/LeadForm";
import { cta, site } from "@/lib/content";

export function CtaSection() {
  return (
    <section id="demo" className="p-3 sm:p-4">
      <div className="relative overflow-hidden rounded-panel bg-teal-dark">
        <CtaBackdrop />
        <div className="relative z-10 mx-auto max-w-3xl px-6 py-24 text-center sm:py-28">
          <FadeIn>
            <h2 className="font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.06] tracking-tight text-cream">
              {cta.heading}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-mist">
              {cta.lede}
            </p>
          </FadeIn>
          <FadeIn delay={0.12}>
            <div className="mx-auto mt-10 max-w-md rounded-2xl bg-paper p-6 shadow-2xl shadow-teal-dark/50 sm:p-7">
              <LeadForm />
            </div>
            <p className="mx-auto mt-5 max-w-md text-xs leading-relaxed text-mist/90">
              {cta.trustNote}
            </p>
            <p className="mt-4 text-sm text-paper/90">
              {cta.note}{" "}
              <a
                href={`mailto:${site.email}`}
                className="font-medium text-paper underline decoration-paper/50 underline-offset-4 hover:decoration-paper"
              >
                {site.email}
              </a>
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
