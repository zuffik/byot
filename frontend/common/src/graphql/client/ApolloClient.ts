import {NormalizedCacheObject, ApolloClient as BaseApolloClient} from 'apollo-boost';

export type ApolloClient = BaseApolloClient<NormalizedCacheObject>;
