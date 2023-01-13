import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://main--strawberry-graphql-e6z1v7.apollographos.net/graphql",
  cache: new InMemoryCache(),
});
