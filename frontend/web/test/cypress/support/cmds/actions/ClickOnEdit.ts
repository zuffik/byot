export const clickOnEdit = () => {
  cy.getByTestId('app-elements-controls-edit').click({force: true});
};

export type ClickOnEditCommand = typeof clickOnEdit;
