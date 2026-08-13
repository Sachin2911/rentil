"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cta, site } from "@/lib/content";

/**
 * Mobile-only bottom bar: appears after the hero scrolls away, hides again
 * whenever the real form is on screen so it never competes with it.
 */
export function StickyMobileCta() {
  const [show, setShow] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const update = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.8;
      const demo = document.getElementById("demo");
      let formVisible = false;
      if (demo) {
        const rect = demo.getBoundingClientRect();
        formVisible =
          rect.top < window.innerHeight && rect.bottom > 0 && rect.height > 0;
      }
      setShow(pastHero && !formVisible);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          initial={reduceMotion ? false : { y: "110%" }}
          animate={{ y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { y: "110%" }}
          transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-sand bg-paper/95 p-3 backdrop-blur-md md:hidden"
        >
          <a
            href={site.demoHref}
            className="flex items-center justify-center rounded-full bg-teal px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-teal-deep"
          >
            {cta.primaryCta}
          </a>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
