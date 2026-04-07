import { ImageResponse } from "next/og";
import { siteConfig, accentRgbTriple, accentForegroundRgbTriple } from "@/lib/config";

export const runtime = "edge";
export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const accent = `rgb(${accentRgbTriple()})`;
  const fg = `rgb(${accentForegroundRgbTriple()})`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: accent,
          color: fg,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: 28, textTransform: "uppercase", letterSpacing: 4, opacity: 0.8 }}>
          {siteConfig.name}
        </div>
        <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.1, maxWidth: 1000 }}>
          {siteConfig.tagline}
        </div>
      </div>
    ),
    { ...size }
  );
}
