import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {NormalizedCacheObject} from 'apollo-cache-inmemory/lib/types';
import {ApolloLink} from 'apollo-link';
import * as _ from 'lodash';
import {GraphQLResponse} from '../../redux-system/data-structures/responses/GraphQLResponse';

export const createApolloClient = (
  uri: string,
  token: () => string | undefined
): ApolloClient<NormalizedCacheObject> => {
  const httpLink = new HttpLink({uri});
  const authMiddleware = new ApolloLink((operation, forward) => {
    const t = token();
    if (t) {
      operation.setContext({
        headers: {
          Authorization: `Bearer ${t}`,
        },
      });
    }
    return forward(operation);
  });
  const formatAndErrorsAfterWare = new ApolloLink((operation, forward) => {
    return forward(operation).map(r => {
      r.data = _.mapValues(r.data, value => new GraphQLResponse(value, []));
      r.errors?.forEach(e => {
        const key = e.path?.[0] as any;
        if (!r.data?.[key]) {
          r.data![key] = new GraphQLResponse(undefined, []);
        }
        r.data![key].errors.push(e);
        if (e.extensions?.exception?.status) {
          r.data![key].status = e.extensions?.exception?.status;
        }
      });
      return r;
    });
  });

  const cache = new InMemoryCache();
  return new ApolloClient<NormalizedCacheObject>({
    link: formatAndErrorsAfterWare.concat(ApolloLink.from([authMiddleware, httpLink])),
    cache,
    defaultOptions: {
      query: {
        errorPolicy: 'ignore',
      },
      mutate: {
        errorPolicy: 'ignore',
      },
    },
  });
};
