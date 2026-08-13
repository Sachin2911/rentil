import { site } from "./content";

/** Canonical origin for the running deployment; falls back to the brand domain. */
export function baseUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");
  return fromEnv || site.url;
}
