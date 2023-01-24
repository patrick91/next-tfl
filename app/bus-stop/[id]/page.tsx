import { gql } from "@apollo/client";
import { BusStop } from "../../../components/bus-stop";
import { client } from "../../../lib/client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
      ...BusStopFragment @defer
    }
  }
`;

export default async function Stop({ params }: { params: { id: string } }) {
  const { data } = await client.query({
    query: QUERY,
    variables: {
      busStopId: params.id,
    },
  });

  return <BusStop stop={data.busStop} />;
}
