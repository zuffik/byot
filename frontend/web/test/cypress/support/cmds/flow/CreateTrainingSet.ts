export const createTrainingSet = (name: string = 'Training set') => {
  cy.visit(Cypress.env('PUBLIC_APP_URL') + '/training/set/create');
  cy.getByTestId('training-set-form-label').type(name);
  cy.getByTestId('training-set-form-form').find('button[type="submit"]').click();
};

export type CreateTrainingSetCommand = typeof createTrainingSet;
