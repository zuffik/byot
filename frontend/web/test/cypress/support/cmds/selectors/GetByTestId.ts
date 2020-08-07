export const getByTestId = (selector: string): Cypress.Chainable<JQuery> =>
  cy.get(`[data-testid="${selector}"]`);
export type GetByTestIdCommand = typeof getByTestId;
