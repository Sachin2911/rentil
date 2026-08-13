import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { MotionGlobalConfig } from "motion/react";
import { afterEach, vi } from "vitest";

// jsdom cannot drive real animation frames to completion, which would leave
// AnimatePresence exit animations hanging forever. Resolve them instantly.
MotionGlobalConfig.skipAnimations = true;

afterEach(() => {
  cleanup();
});

// jsdom has no WebGL context — replace the shader canvases with inert divs.
vi.mock("@paper-design/shaders-react", () => ({
  MeshGradient: () => <div data-testid="shader-mesh" />,
  GrainGradient: () => <div data-testid="shader-grain" />,
}));

// next/font/google needs the Next build pipeline — return static class handles.
vi.mock("next/font/google", () => ({
  Fraunces: () => ({ variable: "--font-fraunces", className: "font-fraunces" }),
  Inter: () => ({ variable: "--font-inter", className: "font-inter" }),
}));

// jsdom lacks the observers and media APIs that motion/react relies on.
// Guarded so node-environment test files (API routes) can share this setup.
if (typeof window !== "undefined") {
  class ObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }

  Object.assign(globalThis, {
    IntersectionObserver: ObserverStub,
    ResizeObserver: ObserverStub,
  });

  Object.defineProperty(window, "matchMedia", {
    writable: true,
    configurable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}
