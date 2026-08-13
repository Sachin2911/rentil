"use client";

import dynamic from "next/dynamic";

// WebGL canvases only make sense in the browser — skip prerendering entirely.
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
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <MeshGradient
        colors={["#062e33", "#0d4f55", "#187680", "#f2e6d3"]}
        distortion={0.9}
        swirl={0.6}
        grainMixer={0.12}
        grainOverlay={0.08}
        speed={0.5}
        style={fill}
      />
      {/* Readability scrim over the moving gradient */}
      <div className="absolute inset-0 bg-teal-dark/35" />
    </div>
  );
}

export function CtaBackdrop() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <GrainGradient
        colorBack="#062e33"
        colors={["#0d4f55", "#187680", "#f2e6d3"]}
        shape="wave"
        softness={0.85}
        intensity={0.35}
        noise={0.3}
        speed={0.7}
        style={fill}
      />
      {/* Deepen toward the bottom, where the shader's cream waves sit under the CTA copy */}
      <div className="absolute inset-0 bg-gradient-to-b from-teal-dark/20 via-teal-dark/35 to-teal-dark/70" />
    </div>
  );
}
