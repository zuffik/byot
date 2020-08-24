import {Given, When, Then} from 'cucumber';

// create named training set
Given(/^user visits "create training set" form$/, () => {});

When(/^user enters name of training set (.*)$/, name => {});

When(/^user submits the form$/, () => {});

Then(/^the training set (.*) be created$/, shouldOrShouldNot => {});
