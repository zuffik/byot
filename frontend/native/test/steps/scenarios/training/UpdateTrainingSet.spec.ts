import {Given, When, Then} from 'cucumber';

// update name of training set
Given(/^created training with name (.*)$/, originalName => {});

Given(/^user visits form with this training set$/, () => {});

When(/^user enters new name of training set (.*)$/, newName => {});

When(/^user submits the form$/, () => {});

Then(/^the training set (.*) be updated$/, shouldOrShouldNot => {});

Then(/^the training set should have name (.*)$/, updatedName => {});
