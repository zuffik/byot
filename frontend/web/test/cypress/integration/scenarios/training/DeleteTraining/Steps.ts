import {Given, When, Then} from 'cypress-cucumber-preprocessor/steps';

let url: string;

// delete training by explicit command
Given(/^existing training$/, () => {
  cy.fixture('media/FindMedia').then(findMedia => {
    cy.graphQLRequest({
      findMedia: () => findMedia['UItWltVZZmE'],
    });
    cy.login();
    cy.createTrainingSet();
    cy.url().should('not.contain', 'training/set/create');
    cy.url().then(url => {
      const idTrainingSet = /training\/set\/(.*)$/.exec(url)?.[1];
      expect(idTrainingSet).not.to.be.undefined;
      cy.createTraining(idTrainingSet, ['UItWltVZZmE']);
    });
  });
});

When(/^user commands to delete training$/, () => {
  cy.get('[data-testid="app-elements-controls-remove"]').click();
  cy.url().then(u => (url = u));
  cy.get('[data-testid="app-elements-controls-confirm-yes"]').click();
});

// delete training by removing all its media
When(/^user removes all media it contains$/, () => {
  cy.get('[data-testid="app-elements-controls-edit"]').click();
  // contains only one media
  cy.get('[data-testid="media-list-item-remove"]').click();
  cy.getByTestId('training-form-form').find('button[type="submit"]').click({force: true});
  cy.url().should('not.contain', '/edit');
});

Then(/^the training should not exists$/, () => {
  cy.visit(url);
  cy.url().should('not.eq', url);
});
