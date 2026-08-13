type SectionHeadingProps = {
  eyebrow: string;
  heading: string;
  lede?: string;
  tone?: "light" | "dark";
};

/** tone = the background it sits on: "light" paper sections, "dark" teal panels */
export function SectionHeading({
  eyebrow,
  heading,
  lede,
  tone = "light",
}: SectionHeadingProps) {
  const onDark = tone === "dark";
  return (
    <div className="max-w-3xl">
      <p
        className={`text-xs font-semibold uppercase tracking-[0.2em] ${
          onDark ? "text-mist" : "text-teal-bright"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-4 font-display text-[clamp(2rem,4vw,3rem)] leading-[1.08] tracking-tight ${
          onDark ? "text-cream" : "text-teal-dark"
        }`}
      >
        {heading}
      </h2>
      {lede ? (
        <p
          className={`mt-5 max-w-2xl text-lg leading-relaxed ${
            onDark ? "text-mist" : "text-ink-soft"
          }`}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}
