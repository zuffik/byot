type Operations = Record<string, any | (() => any)>;

/**
 * https://github.com/cypress-io/cypress-documentation/issues/122#issuecomment-372760320
 */
const responseStub = result =>
  Promise.resolve({
    json() {
      return Promise.resolve(result);
    },
    text() {
      return Promise.resolve(JSON.stringify(result));
    },
    ok: true,
  });

export const graphQLRequest = (operations: Operations) => {
  cy.on('window:before:load', win => {
    const originalFunction = win.fetch;

    function fetch(path, {body, method}) {
      const b = typeof body == 'string' ? JSON.parse(body) : body;
      if (path.includes('/graphql') && method === 'POST' && b.operationName in operations) {
        const data =
          typeof operations[b.operationName] == 'function'
            ? operations[b.operationName]()
            : operations[b.operationName];
        return responseStub(data);
      }

      return originalFunction.apply(this, arguments);
    }

    cy.stub(win, 'fetch', fetch);
  });
};

export type GraphQLRequestCommand = typeof graphQLRequest;
