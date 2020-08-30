import {After, Given, Then, When} from 'cucumber';
import {fw} from '../../../app/Fw';
import {envString} from '@byot/common/test/helpers/EnvString';
import {Screens} from '@byot-frontend/native-app/src/navigation/Screens';
import {MailtrapClient, Message} from 'mailtrap-client';

const client: MailtrapClient = new MailtrapClient(fw.env('MAILTRAP_API_KEY'));

// user will always receive email within this scenario
Given(/^user has been registered with email (.*)$/, email => {
  const pass = '123-ABcc';
  fw.visit(Screens.Register.Uri());
  fw.$('~registrationForm-root').waitForDisplayed();
  fw.get('~registrationForm-email').type(envString(email, fw.env));
  fw.get('~registrationForm-password').type(envString(pass, fw.env));
  fw.get('~registrationForm-passwordRepeat').type(envString(pass, fw.env));
  fw.press('~registrationForm-consent');
  fw.get('~registrationForm-submit').press();
  fw.$('~homepage-main-titleLabel').waitForDisplayed();
  fw.clearStorage();
  fw.$('~loginForm-root').waitForDisplayed();
});

Given(/^user tries to reset his password$/, () => {
  fw.$('~auth-loginFormFooter-forgotPassword').press();
  fw.$('~requestResetPasswordForm-email-input').waitForDisplayed();
});

When(/^user enters email (.*)$/, email => {
  fw.$('~requestResetPasswordForm-email-input').type(envString(email, fw.env));
});

When(/^user requests new password$/, () => {
  fw.$('~requestResetPasswordForm-submit').press();
  browser.waitUntil(() => !!browser.getAlertText());
  browser.acceptAlert();
});

let token: string;

Then(/^user should receive email with link$/, () => {
  const idInbox = parseInt(fw.env('MAILTRAP_INBOX_ID'));
  // email needs to be processed.. even user sometimes have to wait
  fw.wait(2000);
  fw.browser.call(async () => {
    const messages: Message[] = await client.messages.getMessages(idInbox);
    const content: string = await client.messages.getMessageBodyHtml(idInbox, messages[0].id);
    const regex = new RegExp('".*\\/reset-password\\/(.*)"');
    token = regex.exec(content)?.[1];
    expect(token).not.toBeUndefined();
  });
});

When(/^user visits link from email$/, () => {
  fw.visit(Screens.PasswordReset.Uri({token}));
  fw.$('~resetPassword-submit').waitForDisplayed();
});

When(/^user enters password to reset (.*)$/, password => {
  fw.$('~resetPassword-newPassword').type(envString(password, fw.env));
});

When(/^user confirms password (.*)$/, passwordRepeat => {
  fw.$('~resetPassword-passwordRepeat').type(envString(passwordRepeat, fw.env));
  fw.$('~resetPassword-submit').press();
});

Then(/^the result should be (.*)$/, state => {
  if (state == 'successful') {
    browser.waitUntil(() => !!browser.getAlertText());
    browser.acceptAlert();
    fw.$('~loginForm-root').waitForDisplayed();
  } else {
    expect(fw.$$('~textField-helperText').length).toBeGreaterThan(0);
  }
});

When(/^user with email (.*) tries to login with new password (.*)$/, (email, password) => {
  fw.visit(Screens.Login.Uri());
  fw.$('~loginForm-root').waitForDisplayed();
  fw.$('~loginForm-usernameEmail-input').type(envString(email, fw.env));
  fw.$('~loginForm-password-input').type(envString(password, fw.env));
  fw.press('~loginForm-submitButton');
});

Then(/^login after password change should be (.*)$/, loginState => {
  if (loginState == 'successful') {
    fw.$('~homepage-main-titleLabel').waitForDisplayed();
  } else {
    browser.waitUntil(() => !!browser.getAlertText());
    browser.acceptAlert();
  }
});

// user will never receive email within this scenario
When(/^user enters wrong email (.*)$/, forgotPasswordEmail => {
  fw.$('~requestResetPasswordForm-email-input').type(forgotPasswordEmail);
  fw.$('~requestResetPasswordForm-submit').press();
});

let d: Date;

When(/^form (.*) submitted$/, isOrIsNot => {
  d = new Date();
  if (isOrIsNot == 'is') {
    browser.waitUntil(() => !!browser.getAlertText());
    browser.acceptAlert();
  } else {
    expect(fw.$$('~textField-helperText').length).toBeGreaterThan(0);
  }
});

Then(/^user should not receive email with link$/, () => {
  const idInbox = parseInt(fw.env('MAILTRAP_INBOX_ID'));
  fw.browser.call(async () => {
    const messages: Message[] = await client.messages.getMessages(idInbox);
    expect(messages.filter(msg => new Date(msg.created_at) > d).length).toEqual(0);
  });
});

After(() => {
  fw.clearStorage();
  fw.tearDown('/cleaner/test/user');
});
