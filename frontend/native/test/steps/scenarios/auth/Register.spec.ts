import {When, Then} from 'cucumber';

// registering user
When(/^user visits sign-up page$/, () => {});

When(/^enters firstName (.*)$/, firstName => {});

When(/^enters lastName (.*)$/, lastName => {});

When(/^enters email (.*)$/, email => {});

When(/^enters password (.*)$/, password => {});

When(/^enters passwordRepeat (.*)$/, passwordRepeat => {});

When(/^(.*) consent to data storage$/, does => {});

When(/^clicks register$/, () => {});

Then(/^the result should be (.*)$/, result => {});
