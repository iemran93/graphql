import { ApolloClient, InMemoryCache } from "apollo-boost"

const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_URII,
  cache: new InMemoryCache(),
})

export default client
