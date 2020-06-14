import {When, Then, BeforeAll} from 'cucumber';
import {envString} from '../../../helpers/EnvString';

// logging in
When(/^user visits login form$/, () => {
  $('~loginForm-root').waitForDisplayed(11000, false);
});

When(/^user enters username (.*)$/, username => {
  $('~loginForm-usernameEmail-input').setValue(username);
});

When(/^user enters password (.*)$/, password => {
  $('~loginForm-password-input').setValue(envString(password));
});

When(/^user tries to login$/, () => {
  $('~element-button').click();
});

Then(/^it should be (.*)$/, state => {
  // todo check state
});
