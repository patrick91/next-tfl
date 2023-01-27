import { ImageResponse } from "@vercel/og";
import { gql } from "@apollo/client";

import { NextRequest } from "next/server";
import { client } from "../../lib/client";

export const config = {
  runtime: "experimental-edge",
};

const Row = ({ number, inTime }: { number: number; inTime: string }) => (
  <div style={{ fontSize: 16, display: "flex", marginBottom: 4 }}>
    <span style={{ fontWeight: 700, marginRight: "0.4em" }}>{number}</span> in{" "}
    {inTime}
  </div>
);

const QUERY = gql`
  fragment BusStopFragment on BusStop {
    arrivals {
      lineName
      timeToStation
    }
  }

  query FindBusStop($busStopId: ID!) {
    busStop(id: $busStopId) {
      id
      commonName
      buses
      stopLetter
      towards
      ...BusStopFragment
    }
  }
`;

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const stop = searchParams.get("stop");

  const response = await fetch(
    "https://main--strawberry-graphql-e6z1v7.apollographos.net/graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: QUERY.loc!.source.body,
        variables: {
          busStopId: stop,
        },
      }),
    }
  ).then((res) => res.json());

  const data = response.data;

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
            <div>{data.busStop.commonName}</div>
            <div style={{ fontSize: 16 }}>{data.busStop.towards}</div>
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
            {data.busStop.arrivals.map((arrival: any) => (
              <Row
                key={arrival.lineName}
                number={arrival.lineName}
                inTime={arrival.timeToStation}
              />
            ))}
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
