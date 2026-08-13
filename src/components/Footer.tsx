import { Logo } from "@/components/Logo";
import { footer, nav, site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-6 pb-12 pt-16">
      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 font-display text-lg italic text-teal-dark">
            {footer.motto}
          </p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-soft">
            {footer.blurb}
          </p>
        </div>

        <nav aria-label="Product">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-bright">
            {footer.productHeading}
          </h3>
          <ul className="mt-4 space-y-3">
            {nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-ink-soft transition-colors hover:text-teal-dark"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-bright">
            {footer.contactHeading}
          </h3>
          <ul className="mt-4 space-y-3">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="text-sm text-ink-soft transition-colors hover:text-teal-dark"
              >
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.demoHref}
                className="text-sm text-ink-soft transition-colors hover:text-teal-dark"
              >
                Book a demo
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-14 border-t border-sand/70 pt-6">
        <p className="text-xs text-ink-soft">{footer.legal}</p>
      </div>
    </footer>
  );
}
