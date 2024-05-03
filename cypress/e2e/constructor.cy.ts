describe('Ingredient Constructor Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('');
  });

  it('adds a bun ingredient to the constructor', () => {
    cy.contains('.text', 'булка')
      .parents('li')
      .within(() => {
        cy.get('button').contains('Добавить').click();
      });

    cy.get('.constructor-element__row').should('contain', 'булка');
  });

  it('adds an ingredient to the constructor', () => {
    cy.contains('.text', 'Биокотлета')
      .parents('li')
      .within(() => {
        cy.get('button').contains('Добавить').click();
      });

    cy.get('.pI008xZIIooxWwNA5NJT').should('contain', 'Биокотлета');
  });

  it('opens and closes an ingredient modal window', () => {
    cy.contains('.text', 'булка').parents('a').click();
    cy.get('div[data-info="ingredient-modal"]').should('be.visible');
    cy.get('button[data-info="modal-close"]').click();
    cy.get('div[data-info="ingredient-modal"]').should('not.exist');
  });
});
