const { createMockClient } = require('mock-apollo-client');

jest.mock('./graphql/client/EnvApolloClient', () => ({
  __esModule: true,
  apolloClient: createMockClient()
}))
