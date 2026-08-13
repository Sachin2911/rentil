import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
});

// jsdom has no WebGL context — replace the shader canvases with inert divs.
vi.mock("@paper-design/shaders-react", () => ({
  MeshGradient: () => <div data-testid="shader-mesh" />,
  GrainGradient: () => <div data-testid="shader-grain" />,
}));

// jsdom lacks the observers and media APIs that motion/react relies on.
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
