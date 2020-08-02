import {Given, And, Then} from 'cypress-cucumber-preprocessor/steps';

let url: string;

// delete training set with all its trainings
Given(/^existing training set$/, () => {
  cy.login();
  cy.visit(Cypress.env('PUBLIC_APP_URL') + '/training/set/create');
  cy.get('[data-testid="training-set-form-label"]').type('Training set name');
  cy.get('[data-testid="training-set-form-form"] button[type="submit"]').click();
  // todo add a few trainings
});

And(/^user clicks delete button$/, () => {
  cy.get('[data-testid="app-elements-controls-remove"]').click();
  cy.url().then(u => (url = u));
  cy.get('[data-testid="app-elements-controls-confirm-yes"]').click();
});
Then(/^the training set and all its trainings should not exist$/, () => {
  cy.visit(url);
  cy.url().should('not.eq', url);
});
