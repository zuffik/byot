import {Given, And, When, Then} from 'cypress-cucumber-preprocessor/steps';

// fail create empty training with activity
Given(/^created training set$/, () => {});

And(/^user visits "create training" form$/, () => {});

When(/^user creates media in training$/, () => {});

And(/^user deletes all media from training$/, () => {});

And(/^user submits the form$/, () => {});

Then(/^the training should not be created$/, () => {});

// fail create empty training without activity
Given(/^created training set$/, () => {});

And(/^user visits "create training" form$/, () => {});

When(/^user submits the form$/, () => {});

Then(/^the training should not be created$/, () => {});

// create training and test searching for media
Given(/^created training set$/, () => {});

And(/^user visits "create training" form$/, () => {});

When(/^user creates media with following sources (.*)$/, sources => {});

And(/^user creates media with following fulltext search (.*)$/, search => {});

And(/^user submits the form$/, () => {});

Then(/^the training should be created containing the (.*)$/, media => {});
