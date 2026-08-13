"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";

// WebGL canvases only make sense in the browser: skip prerendering entirely.
const MeshGradient = dynamic(
  () => import("@paper-design/shaders-react").then((m) => m.MeshGradient),
  { ssr: false },
);
const GrainGradient = dynamic(
  () => import("@paper-design/shaders-react").then((m) => m.GrainGradient),
  { ssr: false },
);

const fill = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
} as const;

export function HeroBackdrop() {
  const reduceMotion = useReducedMotion();
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <MeshGradient
        colors={["#062e33", "#0d4f55", "#187680", "#f2e6d3"]}
        distortion={0.9}
        swirl={0.6}
        grainMixer={0.12}
        grainOverlay={0.08}
        speed={reduceMotion ? 0 : 0.5}
        style={fill}
      />
      {/* Readability scrim: strongest over the left text column, where the
          shader's roaming cream spot would otherwise sink contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-dark/70 via-teal-dark/40 to-teal-dark/20" />
    </div>
  );
}

export function CtaBackdrop() {
  const reduceMotion = useReducedMotion();
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <GrainGradient
        colorBack="#062e33"
        colors={["#0d4f55", "#187680", "#f2e6d3"]}
        shape="wave"
        softness={0.85}
        intensity={0.35}
        noise={0.3}
        speed={reduceMotion ? 0 : 0.7}
        style={fill}
      />
      {/* Deepen toward the bottom, where the shader's cream waves sit under the CTA copy */}
      <div className="absolute inset-0 bg-gradient-to-b from-teal-dark/20 via-teal-dark/35 to-teal-dark/70" />
    </div>
  );
}
