import {Given, When, And, Then} from 'cypress-cucumber-preprocessor/steps';

// create named training set
Given(/^user visits "create training set" form$/, () => {});

When(/^user enters name of training set (.*)$/, name => {});

And(/^user submits the form$/, () => {});

Then(/^the training set (.*) be created$/, shouldOrShouldNot => {});
