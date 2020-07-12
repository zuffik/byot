import {Given, And, When, Then} from 'cypress-cucumber-preprocessor/steps';

// user will always receive email within this scenario
Given(/^user has been registered with email (.*)$/, email => {});

And(/^user tries to reset his password$/, () => {});

When(/^user enters email (.*)$/, email => {});

And(/^form is submitted$/, () => {});

Then(/^user should receive email with link$/, () => {});

When(/^user visits link from email$/, () => {});

And(/^user enters password (.*)$/, password => {});

And(/^user confirms password (.*)$/, passwordRepeat => {});

Then(/^the result should be (.*)$/, state => {});

// user will never receive email within this scenario
Given(/^user has been registered with email (.*)$/, registerEmail => {});

And(/^user tries to reset his password$/, () => {});

When(/^user enters email (.*)$/, forgotPasswordEmail => {});

And(/^form (.*) submitted$/, isOrIsNot => {});

Then(/^user should not receive email with link$/, () => {});
