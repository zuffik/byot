import {fireEvent} from '@testing-library/react';

export const createMedia = (sources: string[]) => {
  const srcs = cy.wrap(sources);
  srcs.each((src: string) => {
    cy.getByTestId('media-form-autocomplete-input')
      .clear()
      .then($input => {
        fireEvent.change($input[0], {target: {value: `https://www.youtube.com/watch?v=${src}`}});
      });
    cy.get('[data-testid="media-form-autocomplete-suggestions"] [data-testid="media-list-item"]')
      .first()
      .click({force: true});
    cy.getByTestId('media-form-search-button').click();
  });
};

export type CreateMediaCommand = typeof createMedia;
