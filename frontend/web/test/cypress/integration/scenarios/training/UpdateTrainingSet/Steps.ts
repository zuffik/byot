import {After, And, Given, Then, When} from 'cypress-cucumber-preprocessor/steps';

let tsName: string;

// update name of training set
Given(/^created training with name (.*)$/, originalName => {
  cy.login();
  cy.visit(Cypress.env('PUBLIC_APP_URL') + '/training/set/create');
  cy.get('[data-testid="training-set-form-label"]').type(originalName);
  cy.get('[data-testid="training-set-form-form"] button[type="submit"]').click();
});

And(/^user visits form with this training set$/, () => {
  // user should be redirected to TS detail
  cy.get('[data-testid="app-elements-controls-edit"]').click();
  cy.url().should('match', /\/training\/set\/[A-Za-z0-9\-]+\/edit/);
});

When(/^user enters new name of training set (.*)$/, newName => {
  cy.get('[data-testid="training-set-form-label"] input').clear();
  if (newName) {
    cy.get('[data-testid="training-set-form-label"]').type(newName);
  }
  tsName = newName;
});

And(/^user submits the form$/, () => {
  cy.get('[data-testid="training-set-form-form"] button[type="submit"]').click();
});

Then(/^the training set (.*) be updated$/, shouldOrShouldNot => {
  if (shouldOrShouldNot == 'should') {
    cy.url().should('match', /\/training\/set\/[A-Za-z0-9\-]+\/?$/);
  } else {
    cy.url().then(url => {
      const id = /\/training\/set\/([A-Za-z0-9\-]+)\/edit/.exec(url)?.[1];
      expect(id).not.to.be.undefined;
      cy.visit(Cypress.env('PUBLIC_APP_URL') + '/training/set/' + id);
    });
  }
});

And(/^the training set should have name (.*)$/, updatedName => {
  cy.get('[data-testid="app-controlPanel-title"]').should('have.text', updatedName);
});

After(() => {
  cy.request('DELETE', Cypress.env('PUBLIC_API_URL') + '/cleaner/test/training-set/update');
});
