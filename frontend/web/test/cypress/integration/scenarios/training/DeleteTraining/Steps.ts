import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps';

// delete training by explicit command
Given(/^existing training$/, () => {});

When(/^user commands to delete training$/, () => {});

Then(/^the training should not exists$/, () => {});

// delete training by removing all its media
Given(/^existing training$/, () => {});

When(/^user removes all media it contains$/, () => {});

Then(/^the training should not exists$/, () => {});
