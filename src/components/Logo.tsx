import { site } from "@/lib/content";

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const onDark = tone === "light";
  return (
    <span className="inline-flex items-center gap-2.5">
      <span
        className={`grid size-8 place-items-center rounded-lg font-display text-lg font-semibold leading-none ${
          onDark ? "bg-cream text-teal-dark" : "bg-teal text-cream"
        }`}
        aria-hidden
      >
        R
      </span>
      <span
        className={`font-display text-xl font-medium tracking-tight ${
          onDark ? "text-cream" : "text-teal-dark"
        }`}
      >
        {site.name}
      </span>
    </span>
  );
}
