import {Given, When, And, Then, After} from 'cypress-cucumber-preprocessor/steps';

// create named training set
Given(/^user visits "create training set" form$/, () => {
  cy.login();
  cy.visit(Cypress.env('PUBLIC_APP_URL') + '/training/set/create');
});

When(/^user enters name of training set (.*)$/, name => {
  if (name) {
    cy.get('[data-testid="training-set-form-label"]').type(name);
  }
});

And(/^user submits the form$/, () => {
  cy.get('[data-testid="training-set-form-form"] button[type="submit"]').click();
});

Then(/^the training set (.*) be created$/, shouldOrShouldNot => {
  if (shouldOrShouldNot == 'should') {
    cy.get('[data-testid="common-elementary-snackbar"]')
      .should('exist')
      .should('not.contain.text', 'Something went wrong');
  } else {
    cy.url().should('contain', '/training/set/create');
  }
});

After(() => {
  cy.request('DELETE', Cypress.env('PUBLIC_API_URL') + '/cleaner/test/training-set/create');
});
