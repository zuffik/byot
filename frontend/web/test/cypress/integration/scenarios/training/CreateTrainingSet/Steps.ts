import {Given, When, And, Then, After} from 'cypress-cucumber-preprocessor/steps';

let trainingSetName: string;
let shouldPerformCleanup: boolean;

// create named training set
Given(/^user visits "create training set" form$/, () => {
  cy.login();
  cy.visit(Cypress.env('PUBLIC_APP_URL') + '/training/set/create');
});

When(/^user enters name of training set (.*)$/, name => {
  trainingSetName = name;
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
    cy.visit(Cypress.env('PUBLIC_APP_URL'));
    cy.get('[data-testid="training-set-list-item"]')
      .first()
      .get('[data-testid="triple-combo-item-text-primary"]')
      .should('contain.text', trainingSetName);
    shouldPerformCleanup = true;
  } else {
    cy.url().should('contain', '/training/set/create');
    shouldPerformCleanup = false;
  }
});

After(() => {
  if (shouldPerformCleanup) {
    cy.request('DELETE', Cypress.env('PUBLIC_API_URL') + '/cleaner/test/training-set/create');
  }
});
