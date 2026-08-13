import { FadeIn } from "@/components/visual/FadeIn";
import { SectionHeading } from "@/components/SectionHeading";
import { visibility } from "@/lib/content";

export function Visibility() {
  return (
    <section id="see" className="p-3 sm:p-4">
      <div className="relative overflow-hidden rounded-panel bg-teal-deep">
        {/* Soft radial glows echo the hero without another WebGL canvas */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60rem 30rem at 85% -10%, rgba(24,118,128,0.5), transparent 60%), radial-gradient(50rem 26rem at 0% 110%, rgba(242,230,211,0.12), transparent 55%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 sm:px-10 sm:py-28">
          <FadeIn>
            <SectionHeading
              tone="dark"
              eyebrow={visibility.eyebrow}
              heading={visibility.heading}
              lede={visibility.lede}
            />
          </FadeIn>

          <dl className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Each FadeIn div is a dt/dd group — a valid direct <dl> child.
                The dt stays first in DOM order for assistive tech; order-*
                utilities put the big value on top visually. */}
            {visibility.stats.map((stat, i) => (
              <FadeIn
                key={stat.label}
                delay={i * 0.08}
                className="flex h-full flex-col rounded-2xl border border-cream/15 bg-teal-dark/50 p-8 backdrop-blur-sm"
              >
                <dt className="order-2 mt-4 text-sm font-semibold text-paper">
                  {stat.label}
                </dt>
                <dd className="order-1 font-display text-5xl tracking-tight text-cream">
                  {stat.value}
                </dd>
                <dd className="order-3 mt-1.5 text-sm leading-relaxed text-mist">
                  {stat.detail}
                </dd>
              </FadeIn>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
