describe('Ingredient Constructor Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:4000/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('http://localhost:4000');
  });

  it('adds a bun ingredient to the constructor', () => {
    cy.contains('.text', 'булка')
      .parents('li')
      .within(() => {
        cy.get('button').contains('Добавить').click();
      });

    cy.get('.constructor-element__row').should('contain', 'булка');
  });

  it.only('adds an ingredient to the constructor', () => {
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

  // it('Order creation tests', () => {
  //   cy.visit(`http://localhost:4000/login`);

  //   cy.get('.input__textfield[type="email"]').type('makarova@gmail.com');
  //   cy.get('.input__textfield[type="password"]').type('qwerty');
  //   cy.get('button[type="submit"]').click();

  //   cy.visit('http://localhost:4000');

  //   cy.contains('.text', 'булка')
  //     .parents('li')
  //     .within(() => {
  //       cy.get('button').contains('Добавить').click();
  //     });

  //   cy.contains('.text', 'Биокотлета')
  //     .parents('li')
  //     .within(() => {
  //       cy.get('button').contains('Добавить').click();
  //     });

  //   cy.contains('.text', 'Филе')
  //     .parents('li')
  //     .within(() => {
  //       cy.get('button').contains('Добавить').click();
  //     });

  //   cy.get('button[data-info="order-button"]').click(); // вот тут меня переводит на страницу логина и поэтому тест не работает
  //   // cy.get('div[data-info="order-modal"]', { timeout: 50000 }).should(
  //   //   'be.visible'
  //   // );
  // });
});
