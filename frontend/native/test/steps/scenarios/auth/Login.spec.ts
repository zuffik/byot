import {Then, When, After} from 'cucumber';
import {envString} from '@byot/common/test/helpers/EnvString';

// logging in
When(/^user visits login form$/, () => {
  $('~loginForm-root').waitForDisplayed();
});

When(/^user enters username (.*)$/, username => {
  $('~loginForm-usernameEmail-input').setValue(username);
});

When(/^user enters password (.*)$/, password => {
  $('~loginForm-password-input').setValue(envString(password));
});

When(/^user tries to login$/, () => {
  $('~loginForm-submitButton').click();
});

Then(/^login should be (.*)$/, state => {
  if (state == 'successful') {
    $('~homepage-main-titleLabel').waitForDisplayed();
  } else {
    browser.acceptAlert();
  }
});

After(() => $('~testUtils-clearStorage').click());
