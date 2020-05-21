import {createApolloClient} from './CreateApolloClient';

export const apolloClient = createApolloClient(process.env.REACT_APP_GRAPHQL_URL!);
