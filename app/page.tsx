"use client";

import { gql, useQuery } from "@apollo/client";
import { BusStop, Stop } from "../components/bus-stop";
import { client } from "../lib/client";

const QUERY = gql`
  fragment BusStopFragment on BusStop {
    arrivals {
      id
      lineName
      timeToStation
    }
  }

  query FindBusStop {
    findBusStop(latitude: 51.554471, longitude: 0.005304) {
      id
      commonName
      buses
      stopLetter
      towards
      ...BusStopFragment @defer
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(QUERY, { client });

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error :(</p>;

  return (
    <div>
      <ul>
        {/* TODO: use codegen here */}
        {data.findBusStop.map((stop: Stop) => (
          <BusStop key={stop.id} stop={stop} />
        ))}
      </ul>
    </div>
  );
}
