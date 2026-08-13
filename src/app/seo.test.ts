// @vitest-environment node
import { afterEach, describe, expect, it, vi } from "vitest";
import robots from "./robots";
import sitemap from "./sitemap";
import { site } from "@/lib/content";
import { baseUrl } from "@/lib/site-url";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("crawler plumbing", () => {
  it("allows all crawlers and points at the sitemap", () => {
    const result = robots();
    expect(result.rules).toMatchObject({ userAgent: "*", allow: "/" });
    expect(result.sitemap).toMatch(/\/sitemap\.xml$/);
  });

  it("lists the home page in the sitemap", () => {
    const entries = sitemap();
    expect(entries).toHaveLength(1);
    expect(entries[0].url).toBe(baseUrl());
  });

  it("prefers NEXT_PUBLIC_SITE_URL over the brand domain", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://rentil.up.railway.app/");
    expect(baseUrl()).toBe("https://rentil.up.railway.app");
  });

  it("falls back to the brand domain", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    expect(baseUrl()).toBe(site.url);
  });
});
