import {When, And, Then} from 'cypress-cucumber-preprocessor/steps';
import {envString} from '../../../../../shared/EnvString';

// logging in
When(/^user visits login form$/, () => {
  cy.visit(Cypress.env('PUBLIC_APP_URL'));
  cy.url().should('contain', '/login');
});

And(/^user enters username (.*)$/, username => {
  cy.get('[data-testid="common-auth-login-form-username"] input').type(username);
});

And(/^user enters password (.*)$/, password => {
  cy.get('[data-testid="common-auth-login-form-password"] input').type(
    envString(password, key => Cypress.env(key))
  );
});

And(/^user tries to login$/, () => {
  cy.get('[data-testid="common-auth-login-form-form"] [data-testid="common-auth-login-form-button"]').click();
});

Then(/^login should be (.*)$/, (state: 'successful' | 'unsuccessful') => {
  cy.get(
    '[data-testid="common-auth-login-form-form"] [data-testid="common-elementary-button-loader"]'
  ).should('be.visible');
  cy.get(
    '[data-testid="common-auth-login-form-form"] [data-testid="common-elementary-button-loader"]'
  ).should('not.be.visible');

  if (state == 'successful') {
    cy.url().should('not.contain', '/login');
    cy.get('[data-testid="common-auth-login-form-form"]').should('not.exist');
  } else {
    cy.url().should('contain', '/login');
    cy.get('[data-testid="common-elementary-snackbar"]').should('exist');
  }
});
