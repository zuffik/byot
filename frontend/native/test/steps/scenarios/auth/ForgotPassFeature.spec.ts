import {Given, When, Then} from 'cucumber';

// user will always receive email within this scenario
Given(/^user has been registered with email (.*)$/, email => {});

Given(/^user tries to reset his password$/, () => {});

When(/^user enters email (.*)$/, email => {});

When(/^form is submitted$/, () => {});

Then(/^user should receive email with link$/, () => {});

When(/^user visits link from email$/, () => {});

When(/^user enters password to reset (.*)$/, password => {});

When(/^user confirms password (.*)$/, passwordRepeat => {});

Then(/^the result should be (.*)$/, state => {});

When(/^user with email (.*)$/, (email, password) => {});

Then(/^password reset request should be (.*)$/, loginState => {});

// user will never receive email within this scenario
Given(/^user has been registered with email (.*)$/, email => {});

Given(/^user tries to reset his password$/, () => {});

When(/^user enters wrong email (.*)$/, forgotPasswordEmail => {});

When(/^form (.*) submitted$/, isOrIsNot => {});

Then(/^user should not receive email with link$/, () => {});
