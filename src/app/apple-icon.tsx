import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0d4f55",
          color: "#f2e6d3",
          fontFamily: "Georgia, serif",
          fontSize: 116,
          fontWeight: 600,
        }}
      >
        R
      </div>
    ),
    { ...size },
  );
}
