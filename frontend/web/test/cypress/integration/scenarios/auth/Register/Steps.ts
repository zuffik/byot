import {When, And, Then, After} from 'cypress-cucumber-preprocessor/steps';
import {envString} from '../../../../../shared/EnvString';

// registering user
When(/^user visits sign-up page$/, () => {
  cy.visit(Cypress.env('PUBLIC_APP_URL') + '/sign-up');
});

And(/^enters firstName (.*)$/, firstName => {
  if (firstName.trim() != '') {
    cy.get('[data-testid="common-auth-registration-form-firstName"] input').type(firstName);
  }
});

And(/^enters lastName (.*)$/, lastName => {
  if (lastName.trim() != '') {
    cy.get('[data-testid="common-auth-registration-form-lastName"] input').type(lastName);
  }
});

And(/^enters email (.*)$/, email => {
  if (email.trim() != '') {
    cy.get('[data-testid="common-auth-registration-form-email"] input').type(
      envString(email, key => Cypress.env(key))
    );
  }
});

And(/^enters password (.*)$/, password => {
  cy.get('[data-testid="common-auth-registration-form-password"] input').type(
    envString(password, key => Cypress.env(key))
  );
});

And(/^enters passwordRepeat (.*)$/, passwordRepeat => {
  cy.get('[data-testid="common-auth-registration-form-passwordRepeat"] input').type(
    envString(passwordRepeat, key => Cypress.env(key))
  );
});

And(/^(.*) consent to data storage$/, does => {
  if (does == 'does') {
    cy.get('[data-testid="common-auth-registration-form-consent"]').click();
  }
});

And(/^clicks register$/, () => {
  cy.get('[data-testid="common-auth-registration-form-form"] button[type="submit"]').click();
});

Then(/^user register should be (.*)$/, result => {
  if (result == 'successful') {
    cy.url().should('not.contain', '/sign-up');
    cy.get('[data-testid="common-auth-registration-form-form"]').should('not.exist');
  } else {
    cy.url().should('contain', '/sign-up');
    cy.get('[data-testid="common-auth-registration-form-form"]').should('exist');
  }
});

After(() => {
  cy.request('DELETE', Cypress.env('PUBLIC_API_URL') + '/cleaner/test/user');
});
