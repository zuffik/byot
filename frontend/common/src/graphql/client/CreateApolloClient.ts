import ApolloClient, {InMemoryCache} from 'apollo-boost';

export const createApolloClient = (uri: string): ApolloClient<InMemoryCache> =>
  new ApolloClient<InMemoryCache>({
    uri,
  });
