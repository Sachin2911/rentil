import { Landmark, Layers, MessageCircle, ShieldCheck } from "lucide-react";
import { FadeIn } from "@/components/visual/FadeIn";
import { assurances } from "@/lib/content";

const icons = [ShieldCheck, Landmark, Layers, MessageCircle];

export function Assurances() {
  return (
    <section
      aria-label="Compliance and rollout"
      className="border-y border-sand/70 bg-parchment"
    >
      <div className="mx-auto grid max-w-6xl gap-x-8 gap-y-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {assurances.items.map((item, i) => {
          const Icon = icons[i];
          return (
            <FadeIn key={item.title} delay={i * 0.06}>
              <div className="flex items-start gap-4">
                <span className="mt-0.5 grid size-11 shrink-0 place-items-center rounded-xl bg-cream text-teal">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-teal-dark">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                    {item.body}
                  </p>
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
