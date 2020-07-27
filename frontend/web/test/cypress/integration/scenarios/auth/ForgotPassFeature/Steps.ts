import {After, And, Given, Then, When} from 'cypress-cucumber-preprocessor/steps';
import {envString} from '../../../../../shared/EnvString';
import {MailtrapClient, Message} from 'mailtrap-client';
import {CypressMailtrapHttpClient} from '../../../../../helpers/CypressMailtrapHttpClient';

const client: MailtrapClient = new MailtrapClient(Cypress.env('MAILTRAP_API_KEY'), CypressMailtrapHttpClient);
const date = new Date();

// user will always receive email within this scenario
Given(/^user has been registered with email (.*)$/, email => {
  cy.visit(Cypress.env('PUBLIC_APP_URL') + '/sign-up');
  cy.get('[data-testid="common-auth-registration-form-email"] input').type(
    envString(email, key => Cypress.env(key))
  );
  cy.get('[data-testid="common-auth-registration-form-password"] input').type(
    Cypress.env('APP_DEMO_USER_PASS')
  );
  cy.get('[data-testid="common-auth-registration-form-passwordRepeat"] input').type(
    Cypress.env('APP_DEMO_USER_PASS')
  );
  cy.get('[data-testid="common-auth-registration-form-consent"]').click();
  cy.get('[data-testid="common-auth-registration-form-form"] button[type="submit"]').click();
  cy.url().should('not.contain', '/sign-up');
  cy.clearLocalStorage();
});

And(/^user tries to reset his password$/, () => {
  cy.visit(Cypress.env('PUBLIC_APP_URL') + '/reset-password');
});

When(/^user enters email (.*)$/, email => {
  cy.get('[data-testid="common-auth-forgotPassword-form-email"] input').type(
    envString(email, key => Cypress.env(key))
  );
});

And(/^form is submitted$/, () => {
  cy.get('[data-testid="common-auth-forgotPassword-form-form"] button[type="submit"]').click();
});

let link: string;

Then(/^user should receive email with link$/, () => {
  const idInbox = Cypress.env('MAILTRAP_INBOX_ID');
  cy.get('[data-testid="common-elementary-snackbar"]')
    .should('exist')
    .should('not.contain.text', 'Something went wrong');
  cy.wrap(client.messages.getMessages(idInbox)).then((messages: Message[]) => {
    cy.wrap(client.messages.getMessageBodyHtml(idInbox, messages[0].id)).then((content: string) => {
      const regex = new RegExp(`\\"(${Cypress.env('PUBLIC_APP_URL')}\\/reset-password\\/.*)\\"`);
      link = regex.exec(content)?.[1];
      expect(link).not.to.be.undefined;
    });
  });
});

When(/^user visits link from email$/, () => {
  cy.visit(link).then(() => cy.url().should('contain', 'reset-password'));
});

And(/^user enters password (.*)$/, password => {
  cy.get('[data-testid="common-auth-resetPassword-form-newPassword"] input').type(
    envString(password, key => Cypress.env(key))
  );
});

And(/^user confirms password (.*)$/, passwordRepeat => {
  cy.get('[data-testid="common-auth-resetPassword-form-passwordRepeat"] input').type(
    envString(passwordRepeat, key => Cypress.env(key))
  );
});

Then(/^the result should be (.*)$/, state => {
  cy.get('[data-testid="common-auth-resetPassword-form-form"] button[type="submit"]').click();
  if (state == 'successful') {
    cy.get('[data-testid="common-elementary-snackbar"]')
      .should('exist')
      .should('not.contain.text', 'Something went wrong');
  } else {
    cy.get('[data-testid="common-elementary-form-input-helperText"]').should('exist');
  }
});

When(/^user with email (.*) tries to login with new password (.*)$/, (email, password) => {
  cy.visit(Cypress.env('PUBLIC_APP_URL') + '/login');
  cy.get('[data-testid="common-auth-login-form-username"] input').type(
    envString(email, key => Cypress.env(key))
  );
  cy.get('[data-testid="common-auth-login-form-password"] input').type(
    envString(password, key => Cypress.env(key))
  );
  cy.get('[data-testid="common-auth-login-form-form"] button[type="submit"]').click();
});

Then(/^it should be (.*)$/, loginState => {
  if (loginState == 'successful') {
    cy.url().should('not.contain', '/login');
  } else {
    cy.get('[data-testid="common-elementary-snackbar"]').should('exist');
  }
});

// user will never receive email within this scenario
When(/^user enters wrong email (.*)$/, forgotPasswordEmail => {
  cy.get('[data-testid="common-auth-forgotPassword-form-email"] input').type(
    envString(forgotPasswordEmail, key => Cypress.env(key))
  );
});

let d: Date;

And(/^form (.*) submitted$/, isOrIsNot => {
  d = new Date();
  cy.get('[data-testid="common-auth-forgotPassword-form-form"] button[type="submit"]').click();
  if (isOrIsNot == 'is') {
    cy.get('[data-testid="common-elementary-snackbar"]').should('exist');
  } else {
    cy.get('[data-testid="common-elementary-form-input-helperText"]').should('exist');
  }
});

Then(/^user should not receive email with link$/, () => {
  const idInbox = Cypress.env('MAILTRAP_INBOX_ID');
  cy.wrap(client.messages.getMessages(idInbox)).then((messages: Message[]) => {
    expect(messages.filter(msg => new Date(msg.created_at) > d)).to.have.length(0);
  });
});

After(() => {
  cy.request('DELETE', Cypress.env('PUBLIC_API_URL') + '/cleaner/test/user');
});
