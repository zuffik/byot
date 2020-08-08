import {Given, When, Then, And} from 'cypress-cucumber-preprocessor/steps';

// view profile
Given(/^registered user$/, () => {});

When(/^user visits profile$/, () => {});

Then(/^he should see his data$/, () => {});

// update profile
Given(/^registered user$/, () => {});

When(/^user visits profile form$/, () => {});

And(/^user update values$/, () => {});

Then(/^profile should contain new values$/, () => {});

// update password
Given(/^registered user with (.*)$/, registerPass => {});

When(/^user visits profile form$/, () => {});

And(/^user enters his old password (.*)$/, oldPass => {});

And(/^user enters new password (.*)$/, newPass => {});

And(/^user repeats password (.*)$/, repeatPass => {});

And(/^user submits the form$/, () => {});

Then(/^the form (.*) submitted$/, isOrIsNot => {});

And(/^user (.*) be able to login with new password$/, shouldOrShouldNot => {});
