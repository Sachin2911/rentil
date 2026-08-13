import { ButtonLink } from "@/components/ui/Button";
import { FadeIn } from "@/components/visual/FadeIn";
import { HeroBackdrop } from "@/components/visual/Backdrops";
import { InboxCard } from "@/components/InboxCard";
import { hero, site } from "@/lib/content";

export function Hero() {
  return (
    <section id="top" className="p-3 sm:p-4">
      <div className="relative overflow-hidden rounded-panel bg-teal-dark">
        <HeroBackdrop />
        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-14 px-6 pb-20 pt-36 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:pb-28 lg:pt-44">
          <div>
            <FadeIn>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mist">
                {hero.eyebrow}
              </p>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h1 className="mt-5 font-display text-[clamp(2.9rem,6.5vw,5.2rem)] leading-[1.02] tracking-tight text-cream">
                {hero.headingA}
                <br />
                <span className="italic text-cream/75">{hero.headingB}</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.16}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-mist">
                {hero.lede}
              </p>
            </FadeIn>
            <FadeIn delay={0.24}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <ButtonLink href={site.demoHref} variant="cream">
                  {hero.primaryCta}
                </ButtonLink>
                <ButtonLink href={site.signInUrl} variant="ghost-light">
                  {hero.secondaryCta}
                </ButtonLink>
              </div>
              <p className="mt-5 text-sm text-mist/80">{hero.note}</p>
            </FadeIn>
          </div>

          <FadeIn delay={0.2} y={36}>
            <InboxCard />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
