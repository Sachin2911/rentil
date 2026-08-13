"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { nav, site } from "@/lib/content";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-sand/70 bg-paper/85 shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
      >
        <a href="#top" aria-label={`${site.name} — back to top`}>
          <Logo tone={scrolled ? "dark" : "light"} />
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {nav.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  scrolled
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
            href={site.signInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden text-sm font-medium transition-colors sm:block ${
              scrolled
                ? "text-ink-soft hover:text-teal-dark"
                : "text-cream/80 hover:text-cream"
            }`}
          >
            Sign in
          </a>
          <a
            href={site.demoHref}
            className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              scrolled
                ? "bg-teal text-cream hover:bg-teal-deep"
                : "bg-cream text-teal-dark hover:bg-paper"
            }`}
          >
            Book a demo
          </a>
        </div>
      </nav>
    </header>
  );
}
