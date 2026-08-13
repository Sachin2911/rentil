import { Building2, KeyRound, Users } from "lucide-react";
import { FadeIn } from "@/components/visual/FadeIn";
import { audiences } from "@/lib/content";

const icons = [KeyRound, Building2, Users];

export function WhoItsFor() {
  return (
    <section id="who" className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
      <FadeIn>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-bright">
          {audiences.eyebrow}
        </p>
        <h2 className="mt-4 max-w-4xl font-display text-[clamp(2rem,4vw,3rem)] leading-[1.08] tracking-tight text-teal-dark">
          {audiences.heading}
        </h2>
      </FadeIn>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {audiences.items.map((item, i) => {
          const Icon = icons[i];
          return (
            <FadeIn key={item.title} delay={i * 0.1} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-sand bg-parchment p-8">
                <span className="grid size-11 place-items-center rounded-xl bg-cream text-teal">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-6 text-lg font-semibold text-teal-dark">
                  {item.title}
                </h3>
                <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-ink-soft">
                  {item.body}
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full bg-cream px-3 py-1 text-xs font-medium text-teal-dark"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
