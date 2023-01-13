"use client";

import { gql, useQuery } from "@apollo/client";
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
    findBusStop(latitude: 51.506169, longitude: -0.088411) {
      id
      commonName
      buses
      stopLetter
      towards
      ...BusStopFragment @defer
    }
  }
`;

const StopLetter = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-red-600 rounded-full font-bold text-white flex w-8 h-8 text-base items-center justify-center">
      {children}
    </div>
  );
};

const BusStop = ({
  stop,
}: {
  stop: {
    id: string;
    commonName: string;
    buses: string[];
    stopLetter?: string;
    towards?: string;
    arrivals?: {
      id: string;
      lineName: string;
      timeToStation: number;
    }[];
  };
}) => {
  return (
    <li
      key={stop.id}
      className="grid items-start gap-4 grid-cols-[32px,1fr] mb-4"
    >
      <div className="self-center">
        <StopLetter>{stop.stopLetter}</StopLetter>
      </div>
      <div>
        <h1 className="font-bold text-2xl">
          <div>
            <p>{stop.commonName}</p>
            <p className="text-sm">Towards: {stop.towards}</p>
          </div>
        </h1>
        {stop.arrivals === undefined && <p>Loading...</p>}
        {stop.arrivals !== undefined && stop.arrivals.length === 0 && (
          <p>No arrival...</p>
        )}
      </div>
      <div></div>
      <div>
        {stop.arrivals !== undefined && stop.arrivals.length > 0 && (
          <ul>
            {stop.arrivals.map((arrival, index) => (
              <li key={index}>
                <strong>{arrival.lineName}</strong> in {arrival.timeToStation}
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
};

export default function Home() {
  const { loading, error, data } = useQuery(QUERY, { client });

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error :(</p>;

  return (
    <div>
      <ul>
        {/* TODO: use codegen here */}
        {data.findBusStop.map((stop: any) => (
          <BusStop key={stop.id} stop={stop} />
        ))}
      </ul>
    </div>
  );

  return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
}
