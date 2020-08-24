import {Given, Then} from 'cucumber';

// update training by adding a new media
Given(/^existing training$/, () => {});

Given(/^user visits training form$/, () => {});

Given(/^adds media (.*)$/, media => {});

Then(/^the training should contain the media$/, () => {});

// update training by removing an existing media
Given(/^existing training with all media created$/, () => {});

Given(/^user visits training form$/, () => {});

Given(/^removes media (.*)$/, media => {});

Then(/^the training should not contain removed media$/, () => {});

// update training by removing an existing media and adding a new media
Given(/^existing training with all media created$/, () => {});

Given(/^user visits training form$/, () => {});

Given(/^user removes media keeping form open (.*)$/, toRemove => {});

Given(/^adds media (.*)$/, toAdd => {});

Then(/^the training should not contain removed media$/, () => {});
