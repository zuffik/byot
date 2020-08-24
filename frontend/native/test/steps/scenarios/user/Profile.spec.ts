import {Given, When, Then} from 'cucumber';

// view profile
Given(/^registered user$/, () => {});

When(/^user visits profile$/, () => {});

Then(/^he should see his data$/, () => {});

// update profile
Given(/^registered user$/, () => {});

When(/^user visits profile form$/, () => {});

When(/^user update values$/, () => {});

Then(/^profile should contain new values$/, () => {});

// update password
Given(/^registered user with (.*)$/, registerPass => {});

When(/^user visits profile form$/, () => {});

When(/^user enters his old password (.*)$/, oldPass => {});

When(/^user enters new password (.*)$/, newPass => {});

When(/^user repeats password (.*)$/, repeatPass => {});

When(/^user submits the form$/, () => {});

Then(/^the form (.*) submitted$/, isOrIsNot => {});

Then(/^user (.*) be able to login with new password$/, shouldOrShouldNot => {});
