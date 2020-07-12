import {Given, Then, And} from 'cypress-cucumber-preprocessor/steps';
import {envString} from '../../../../../../../../common/test/helpers/EnvString';

//
Given(/^successfully logged user$/, () => {
  cy.visit(Cypress.env('PUBLIC_APP_URL'));
  cy.get('[data-testid="common-auth-login-form-username"] input').type('demo-1');
  cy.get('[data-testid="common-auth-login-form-password"] input').type(
    envString('{env.APP_DEMO_USER_PASS}', key => Cypress.env(key))
  );
  cy.get('[data-testid="common-auth-login-form-form"] [data-testid="common-auth-login-form-button"]').click();
});

Then(/^user should see own training sets$/, () => {
  // todo
});

And(/^sidebar with navigation$/, () => {
  // todo
});

And(/^option to logout$/, () => {
  // todo
});
