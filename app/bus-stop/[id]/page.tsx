import { gql } from "@apollo/client";
import { BusStop } from "../../../components/bus-stop";
import { client } from "../../../lib/client";

export const dynamic = "force-static";
// export const revalidate = 0;

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

export default async function Stop({ params }: { params: { id: string } }) {
  // const { data } = await client.query({
  //   query: QUERY,
  //   variables: {
  //     busStopId: params.id,
  //   },
  // });

  const response = await fetch(
    "https://main--strawberry-graphql-e6z1v7.apollographos.net/graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: QUERY.loc.source.body,
        variables: {
          busStopId: params.id,
        },
      }),
    }
  ).then((res) => res.json());

  const data = response.data;

  return <BusStop stop={data.busStop} />;
}
