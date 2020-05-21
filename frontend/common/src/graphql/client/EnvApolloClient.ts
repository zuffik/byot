import {createApolloClient} from './CreateApolloClient';

export const createEnvApolloClient = (token: () => string | undefined) =>
  createApolloClient(process.env.REACT_APP_GRAPHQL_URL!, token);
