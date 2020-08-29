import {After, Then, When} from 'cucumber';
import {envString} from '@byot/common/test/helpers/EnvString';
import {fw} from '../../../app/Fw';
import {Screens} from '@byot-frontend/native-app/src/navigation/Screens';

// registering user
When(/^user visits sign-up page$/, () => {
  fw.visit(Screens.Register.Uri());
  fw.$('~registrationForm-root').waitForDisplayed();
});

When(/^enters firstName (.*)$/, firstName => {
  fw.get('~registrationForm-firstName').type(firstName);
});

When(/^enters lastName (.*)$/, lastName => {
  fw.get('~registrationForm-lastName').type(lastName);
});

When(/^enters email (.*)$/, (email: string) => {
  fw.get('~registrationForm-email').type(envString(email, fw.env));
});

When(/^enters password (.*)$/, (password: string) => {
  fw.get('~registrationForm-password').type(envString(password, fw.env));
});

When(/^enters passwordRepeat (.*)$/, (passwordRepeat: string) => {
  fw.get('~registrationForm-passwordRepeat').type(envString(passwordRepeat, fw.env));
});

When(/^(.*) consent to data storage$/, does => {
  if (does == 'does') {
    fw.press('~registrationForm-consent');
  }
});

When(/^clicks register$/, () => {
  fw.get('~registrationForm-submit').press();
});

Then(/^user register should be (.*)$/, result => {
  if (result == 'successful') {
    fw.$('~homepage-main-titleLabel').waitForDisplayed();
  } else {
    expect(fw.$$('~textField-helperText').length).toBeGreaterThan(0);
  }
});

After(() => {
  fw.clearStorage();
  fw.tearDown('/cleaner/test/user');
});
