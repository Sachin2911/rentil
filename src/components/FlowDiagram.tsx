import {
  ArrowDown,
  ArrowRight,
  Check,
  Mail,
  MessageCircle,
  Phone,
  User,
} from "lucide-react";
import { FadeIn } from "@/components/visual/FadeIn";
import { flow } from "@/lib/content";

const sourceIcons = [MessageCircle, Mail, Phone];
const outcomeIcons = [Check, User];

/** Channels in, one layer, two ways out. The mental model in one glance. */
export function FlowDiagram() {
  return (
    <FadeIn className="mt-12">
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-sand bg-paper p-6 sm:p-8 md:flex-row md:justify-between md:gap-6">
        <ul className="flex w-full flex-col gap-2.5 md:w-auto">
          {flow.sources.map((source, i) => {
            const Icon = sourceIcons[i];
            return (
              <li
                key={source}
                className="flex items-center gap-2.5 rounded-full border border-sand bg-parchment px-4 py-2 text-sm font-medium text-ink"
              >
                <Icon className="size-4 text-teal-bright" aria-hidden />
                {source}
              </li>
            );
          })}
        </ul>

        <ArrowRight
          className="hidden size-5 shrink-0 text-teal-bright md:block"
          aria-hidden
        />
        <ArrowDown className="size-5 text-teal-bright md:hidden" aria-hidden />

        <div className="w-full rounded-2xl bg-teal px-10 py-7 text-center shadow-lg shadow-teal/25 md:w-auto">
          <p className="font-display text-3xl text-cream">{flow.hub}</p>
          <p className="mt-1 text-xs font-medium uppercase tracking-[0.18em] text-mist">
            one layer
          </p>
        </div>

        <ArrowRight
          className="hidden size-5 shrink-0 text-teal-bright md:block"
          aria-hidden
        />
        <ArrowDown className="size-5 text-teal-bright md:hidden" aria-hidden />

        <ul className="flex w-full flex-col gap-2.5 md:w-auto">
          {flow.outcomes.map((outcome, i) => {
            const Icon = outcomeIcons[i];
            return (
              <li
                key={outcome.label}
                className="flex items-center gap-3 rounded-xl border border-sand bg-parchment px-4 py-3"
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-cream text-teal">
                  <Icon className="size-4" aria-hidden />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-teal-dark">
                    {outcome.label}
                  </span>
                  <span className="block text-xs text-ink-soft">
                    {outcome.detail}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </FadeIn>
  );
}
