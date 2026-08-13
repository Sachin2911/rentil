import { ButtonLink } from "@/components/ui/Button";
import { FadeIn } from "@/components/visual/FadeIn";
import { HeadlineReveal } from "@/components/visual/HeadlineReveal";
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
            <HeadlineReveal lineA={hero.headingA} lineB={hero.headingB} />
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
                <ButtonLink href={hero.secondaryHref} variant="ghost-light">
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
