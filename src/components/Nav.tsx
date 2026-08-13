"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { nav, site } from "@/lib/content";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // The dropdown panel is opaque paper, so dark chrome whenever it is open
  const solid = scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid
          ? "border-b border-sand/70 bg-paper/90 shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
      >
        <a href="#top" aria-label={`${site.name}, back to top`}>
          <Logo tone={solid ? "dark" : "light"} />
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {nav.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  solid
                    ? "text-ink-soft hover:text-teal-dark"
                    : "text-cream/80 hover:text-cream"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={site.demoHref}
            className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              solid
                ? "bg-teal text-cream hover:bg-teal-deep"
                : "bg-cream text-teal-dark hover:bg-paper"
            }`}
          >
            Book a demo
          </a>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
            className={`grid size-9 place-items-center rounded-full transition-colors md:hidden ${
              solid
                ? "text-teal-dark hover:bg-cream"
                : "text-cream hover:bg-cream/15"
            }`}
          >
            {menuOpen ? (
              <X className="size-5" aria-hidden />
            ) : (
              <Menu className="size-5" aria-hidden />
            )}
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <div
          id="mobile-menu"
          className="border-t border-sand/70 bg-paper/95 backdrop-blur-md md:hidden"
        >
          <ul className="space-y-1 px-6 py-4">
            {nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-base font-medium text-ink-soft transition-colors hover:bg-cream hover:text-teal-dark"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
