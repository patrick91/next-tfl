import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://main--strawberry-graphql-e6z1v7.apollographos.net/graphql",
    // fetch: (url, options) => {
    //   // options.cache = "no-store";

    //   console.log("options", options);

    //   return fetch(url, options);
    // },
  }),

  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  },
});
