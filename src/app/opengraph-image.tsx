import { ImageResponse } from "next/og";
export const alt =
  "Do Tran Nhu Ngoc — Heritage in Motion, student communication portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#F7F2EA",
        color: "#17171C",
        padding: 70,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ fontSize: 26, display: "flex" }}>
        DO TRAN NHU NGOC · STUDENT PORTFOLIO
      </div>
      <div
        style={{
          fontSize: 112,
          fontWeight: 700,
          letterSpacing: -6,
          lineHeight: 1,
          display: "flex",
        }}
      >
        Heritage in motion.
      </div>
      <div style={{ fontSize: 28, color: "#344BC4", display: "flex" }}>
        Communication / Culture / Illustration
      </div>
    </div>,
    size,
  );
}
