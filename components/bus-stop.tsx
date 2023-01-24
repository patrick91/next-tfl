import Link from "next/link";
import { StopLetter } from "./stop-letter";

export type Stop = {
  id: string;
  commonName: string;
  buses: string[];
  stopLetter: string;
  towards: string;
  arrivals?: {
    id: string;
    lineName: string;
    timeToStation: number;
  }[];
};

export const BusStop = ({ stop }: { stop: Stop }) => {
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
