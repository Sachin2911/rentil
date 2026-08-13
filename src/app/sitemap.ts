import type { MetadataRoute } from "next";
import { baseUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
