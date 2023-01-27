import { ImageResponse } from "@vercel/og";

import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

const Row = ({ number, inTime }: { number: number; inTime: string }) => (
  <div style={{ fontSize: 16, display: "flex", marginBottom: 4 }}>
    <span style={{ fontWeight: 700, marginRight: "0.4em" }}>{number}</span> in{" "}
    {inTime}
  </div>
);

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  let title = searchParams.get("title");

  if (!title) {
    title = "Hello World!";
  } else {
    title = decodeURIComponent(escape(atob(title)));
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          backgroundColor: "#fff",
          fontSize: 20,
          fontWeight: 600,
          padding: 10,
        }}
      >
        <div style={{ fontSize: 24, display: "flex", marginBottom: 20 }}>
          <div
            style={{
              color: "white",
              background: "black",
              borderRadius: "100%",
              width: 24,
              height: 24,
              fontSize: 16,
              display: "flex",
              fontFamily: "sans-serif",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
              marginRight: 4,
              lineHeight: 1.7,
            }}
          >
            Q
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {" "}
            <div>Ranelagh Road</div>
            <div style={{ fontSize: 16 }}>Towards abc</div>
          </div>
        </div>

        <div style={{ fontSize: 24, display: "flex", marginBottom: 20 }}>
          <div
            style={{
              opacity: 0,
              color: "white",
              background: "black",
              borderRadius: "100%",
              width: 24,
              height: 24,
              fontSize: 16,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
              marginRight: 4,
            }}
          >
            Q
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontWeight: "normal",
            }}
          >
            <Row number={1} inTime="1 min" />
            <Row number={2} inTime="2 min" />
          </div>
        </div>
      </div>
    ),
    {
      width: 240,
      height: 300,
      emoji: "twemoji",
    }
  );
}
