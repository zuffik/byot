import {Given, And, When, Then} from 'cypress-cucumber-preprocessor/steps';

// update name of training set
Given(/^created training with name (.*)$/, originalName => {});

And(/^user visits form with this training set$/, () => {});

When(/^user enters new name of training set (.*)$/, newName => {});

And(/^user submits the form$/, () => {});

Then(/^the training set (.*) be updated$/, shouldOrShouldNot => {});

And(/^the training set should have name (.*)$/, newName => {});
