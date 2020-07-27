const {ApolloContext} = require("./graphql/context/ApolloContext");
const { createMockClient } = require('mock-apollo-client');

ApolloContext.apolloClient = createMockClient();
