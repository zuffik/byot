import {Given, When, Then} from 'cucumber';

// fail create empty training with activity
Given(/^created training set$/, () => {});

Given(/^user visits "create training" form$/, () => {});

When(/^user enters name of training$/, () => {});

When(/^user creates media in training$/, () => {});

When(/^user deletes all media from training$/, () => {});

When(/^user submits the form$/, () => {});

Then(/^the training should not be created$/, () => {});

// fail create empty training without activity
Given(/^created training set$/, () => {});

Given(/^user visits "create training" form$/, () => {});

When(/^user enters name of training$/, () => {});

When(/^user submits the form$/, () => {});

Then(/^the training should not be created$/, () => {});

// create training and test searching for media
Given(/^created training set$/, () => {});

Given(/^user visits "create training" form$/, () => {});

When(/^user enters name of training$/, () => {});

When(/^user creates media with following sources (.*)$/, sources => {});

When(/^user creates media with following fulltext search (.*)$/, search => {});

When(/^user submits the form$/, () => {});

Then(/^the training should be created containing the (.*)$/, media => {});
