"use client";

import { motion, useReducedMotion } from "motion/react";

/** Masked line reveal: type settles onto the page like ink on paper. */
export function HeadlineReveal({
  lineA,
  lineB,
}: {
  lineA: string;
  lineB: string;
}) {
  const reduceMotion = useReducedMotion();
  const lines = [
    { text: lineA, className: "", delay: 0.1 },
    { text: lineB, className: "italic text-cream/75", delay: 0.22 },
  ];

  return (
    <h1 className="mt-5 font-display text-[clamp(2.9rem,6.5vw,5.2rem)] leading-[1.02] tracking-tight text-cream">
      {lines.map((line) => (
        <span
          key={line.text}
          className="-mb-[0.12em] block overflow-hidden pb-[0.12em]"
        >
          <motion.span
            className={`block ${line.className}`}
            initial={reduceMotion ? false : { y: "110%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.9,
              delay: line.delay,
              ease: [0.22, 0.61, 0.36, 1],
            }}
          >
            {line.text}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}
