export const createTraining = (idTrainingSet: string, sources: string[], name: string = 'Training') => {
  cy.visit(Cypress.env('PUBLIC_APP_URL') + '/training/set/' + idTrainingSet);
  cy.getByTestId('app-components-training-create').click();
  cy.getByTestId('training-form-name').type(name);
  cy.createMedia(sources);
  cy.getByTestId('training-form-form').find('button[type="submit"]').click({force: true});
};

export type CreateTrainingCommand = typeof createTraining;
