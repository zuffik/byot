import {Then, When, After} from 'cucumber';
import {envString} from '@byot/common/test/helpers/EnvString';
import {fw} from '../../../app/Fw';

// logging in
When(/^user visits login form$/, () => {
  fw.$('~loginForm-root').waitForDisplayed();
});

When(/^user enters username (.*)$/, username => {
  fw.$('~loginForm-usernameEmail-input').type(username);
});

When(/^user enters password for login(.*)$/, password => {
  fw.$('~loginForm-password-input').type(envString(password));
});

When(/^user tries to login$/, () => {
  fw.press('~loginForm-submitButton');
});

Then(/^login should be (.*)$/, state => {
  if (state == 'successful') {
    fw.$('~homepage-main-titleLabel').waitForDisplayed();
  } else {
    browser.waitUntil(() => !!browser.getAlertText());
    browser.acceptAlert();
  }
});

After(() => fw.clearStorage());
