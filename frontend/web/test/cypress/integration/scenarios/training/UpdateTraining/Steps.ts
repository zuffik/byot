import {After, And, Given, Then} from 'cypress-cucumber-preprocessor/steps';

let checkExisting: string[];
let current: string[] = [];

// update training by adding a new media
Given(/^existing training$/, () => {
  cy.fixture('media/FindMedia').then(findMedia => {
    cy.graphQLRequest({
      findMedia: () => findMedia[current.shift()],
    });
    cy.login();
    cy.createTrainingSet();
    cy.url().should('not.contain', 'training/set/create');
    cy.url().then(url => {
      const idTrainingSet = /training\/set\/(.*)$/.exec(url)?.[1];
      expect(idTrainingSet).not.to.be.undefined;
      const medias = 'UItWltVZZmE'.split(',');
      medias.forEach(m => current.push(m));
      cy.createTraining(idTrainingSet, medias);
    });
  });
});
Given(/^existing training with all media created$/, () => {
  cy.fixture('media/FindMedia').then(findMedia => {
    cy.graphQLRequest({
      findMedia: () => findMedia[current.shift()],
    });
    cy.login();
    cy.createTrainingSet();
    cy.url().should('not.contain', 'training/set/create');
    cy.url().then(url => {
      const idTrainingSet = /training\/set\/(.*)$/.exec(url)?.[1];
      expect(idTrainingSet).not.to.be.undefined;
      const medias = 'Z5iWr6Srsj8,IiwGbcd8S7I,5MJcklKwYBQ'.split(',');
      medias.forEach(m => current.push(m));
      cy.createTraining(idTrainingSet, medias);
    });
  });
});

And(/^user visits training form$/, () => {
  cy.clickOnEdit();
});

And(/^adds media (.*)$/, media => {
  checkExisting = media.split(',');
  current = [...checkExisting];
  cy.createMedia(checkExisting);
  cy.get('[data-testid="training-form-form"] button[type="submit"]').click();
});

Then(/^the training should contain the media$/, () => {
  cy.url().should('not.contain', '/edit');
  cy.wrap(checkExisting).each(resource => {
    cy.get(`[data-testid="media-list-item"][data-resource="${resource}"]`).should('exist');
  });
});

// update training by removing an existing media

And(/^removes media (.*)$/, media => {
  cy.wrap(media.split(',')).each(resource =>
    cy
      .get(`[data-testid="media-list-item"][data-resource="${resource}"]`)
      .siblings('[data-testid="media-list-item-remove"]')
      .click()
  );
  cy.get('[data-testid="training-form-form"] button[type="submit"]').click();
});

And(/^user removes media keeping form open (.*)$/, media => {
  cy.wrap(media.split(',')).each(resource =>
    cy
      .get(`[data-testid="media-list-item"][data-resource="${resource}"]`)
      .siblings('[data-testid="media-list-item-remove"]')
      .click()
  );
});

Then(/^the training should not contain removed media$/, () => {
  cy.url().should('not.contain', '/edit');
  cy.wrap(checkExisting).each(resource => {
    cy.get(`[data-testid="media-list-item"][data-resource="${resource}"]`).should('not.exist');
  });
});

After(() => {
  cy.request('DELETE', Cypress.env('PUBLIC_API_URL') + '/cleaner/test/training/update');
});
