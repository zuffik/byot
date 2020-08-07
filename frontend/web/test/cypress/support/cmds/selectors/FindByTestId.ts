export const findByTestId = <T>(
  prevSubject: Cypress.Chainable<T>,
  selector: string
): Cypress.Chainable<JQuery> => prevSubject.find(`[data-testid="${selector}"]`);

export type FindByTestIdCommand = (selector: string) => Cypress.Chainable<JQuery>;
