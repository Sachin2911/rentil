import { ImageResponse } from "next/og";
import { hero, site } from "@/lib/content";

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#0d4f55",
          backgroundImage:
            "radial-gradient(700px 400px at 90% -10%, rgba(24,118,128,0.6), rgba(13,79,85,0))",
          color: "#f2e6d3",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              backgroundColor: "#f2e6d3",
              color: "#062e33",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              fontWeight: 600,
            }}
          >
            R
          </div>
          <div style={{ fontSize: 42 }}>{site.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 78, lineHeight: 1.08 }}>{hero.headingA}</div>
          <div
            style={{
              fontSize: 78,
              lineHeight: 1.08,
              fontStyle: "italic",
              opacity: 0.85,
            }}
          >
            {hero.headingB}
          </div>
          <div
            style={{
              fontSize: 28,
              opacity: 0.75,
              marginTop: 22,
              fontFamily: "Arial, sans-serif",
            }}
          >
            {hero.eyebrow}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
