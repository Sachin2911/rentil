import type { ReactNode } from "react";

type Variant = "cream" | "teal" | "ghost-light" | "ghost-dark";

const variants: Record<Variant, string> = {
  cream:
    "bg-cream text-teal-dark hover:bg-paper focus-visible:outline-cream",
  teal: "bg-teal text-cream hover:bg-teal-deep focus-visible:outline-teal",
  "ghost-light":
    "border border-cream/40 text-cream hover:border-cream/80 hover:bg-cream/10 focus-visible:outline-cream",
  "ghost-dark":
    "border border-teal/30 text-teal-dark hover:border-teal/70 hover:bg-teal/5 focus-visible:outline-teal",
};

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

export function ButtonLink({
  href,
  variant = "teal",
  children,
  className = "",
}: ButtonLinkProps) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
