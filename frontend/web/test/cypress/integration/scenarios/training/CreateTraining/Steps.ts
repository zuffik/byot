import {After, And, Given, Then, When} from 'cypress-cucumber-preprocessor/steps';
import {GraphQLRequest} from 'apollo-boost';
import {List} from '@byot-frontend/common/src/types/dto/List';

// todo i don't like {force: true} at all!
const currentMedia: string[] = [];
// fail create empty training with activity
Given(/^created training set$/, () => {
  cy.fixture('media/FindMedia').then(findMedia => {
    cy.graphQLRequest({
      findMedia: (body: GraphQLRequest) =>
        (body.variables?.filter?.query || '').trim() !== '' ? findMedia[currentMedia.shift()] : new List(),
    });
    cy.login();
    cy.createTrainingSet();
  });
});

And(/^user visits "create training" form$/, () => {
  cy.getByTestId('app-components-training-create').click();
});

When(/^user enters name of training$/, () => {
  cy.getByTestId('training-form-name').type('Training');
});

And(/^user creates media in training$/, () => {
  cy.wrap(['workout', 'train']).each(media => {
    currentMedia.push(media.toString());
    cy.getByTestId('media-form-autocomplete-input').clear().type(media.toString());
    cy.get('[data-testid="media-form-autocomplete-suggestions"] [data-testid="media-list-item"]')
      .first()
      .click({force: true});
    cy.getByTestId('media-form-search-button').click();
  });
});

And(/^user deletes all media from training$/, () => {
  cy.getByTestId('media-list-item-remove').first().click({force: true});
  cy.getByTestId('media-list-item-remove').first().click({force: true});
});

And(/^user submits the form$/, () => {
  cy.get('[data-testid="training-form-form"] button[type="submit"]').click({force: true});
});

Then(/^the training should not be created$/, () => {
  cy.getByTestId('common-elementary-form-input-helperText').should('exist');
});

// create training and test searching for media
And(/^user creates media with following sources (.*)$/, sources => {
  const srcs = cy.wrap(sources.split(',').filter(Boolean));
  srcs.each((src: string) => {
    currentMedia.push(src);
    cy.getByTestId('media-form-autocomplete-input').clear().type(`https://www.youtube.com/watch?v=${src}`);
    cy.get('[data-testid="media-form-autocomplete-suggestions"] [data-testid="media-list-item"]')
      .first()
      .click({force: true});
    cy.get('#root').scrollTo('bottom');
    cy.getByTestId('media-form-search-button').click();
  });
});

And(/^user creates media with following fulltext search (.*)$/, search => {
  if (search) {
    cy.getByTestId('media-form-autocomplete-input').clear().type(search);
    currentMedia.push('fulltextSearch');
    cy.get('[data-testid="media-form-autocomplete-suggestions"] [data-testid="media-list-item"]')
      .first()
      .click({force: true});
    cy.getByTestId('media-form-search-button').click();
  }
});

Then(/^the training should be created containing the (.*)$/, media => {
  cy.url().should('not.contain', '/create-training');
  cy.wrap(media.split(',')).each(resourceId => {
    cy.get(`[data-testid="media-list-item"][data-resource="${resourceId}"]`).should('exist');
  });
});

After(() => {
  cy.request('DELETE', Cypress.env('PUBLIC_API_URL') + '/cleaner/test/training/create');
});
