import {Given, And, Then} from 'cypress-cucumber-preprocessor/steps';

// update training by adding a new media
Given(/^existing training$/, () => {});

And(/^user visits training form$/, () => {});

And(/^adds media (.*)$/, media => {});

Then(/^the training should contain the media$/, () => {});

// update training by removing an existing media
Given(/^existing training$/, () => {});

And(/^user visits training form$/, () => {});

And(/^removes media (.*)$/, media => {});

Then(/^the training should not contain removed media$/, () => {});

// update training by removing an existing media and adding a new media
Given(/^existing training$/, () => {});

And(/^user visits training form$/, () => {});

And(/^removes media (.*)$/, toRemove => {});

And(/^adds media (.*)$/, toAdd => {});

Then(/^the training should not contain removed media$/, () => {});
