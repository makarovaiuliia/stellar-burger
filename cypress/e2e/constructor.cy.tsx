describe('Ingredient Constructor Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000');
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.wait('@getIngredients');
  });

  it('adds a bun ingredient to the constructor', () => {
    cy.contains('.text', 'Булка')
      .parents('li')
      .within(() => {
        cy.get('button').contains('Добавить').click();
      });

    cy.get('.constructor-element__row').should('contain', 'Булка');
  });
});
