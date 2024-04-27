describe('Order creation tests', () => {
  it('logs in and creates an order', () => {
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('GET', 'https://norma.nomoreparties.space/api/auth/user', {
      fixture: 'user.json'
    }).as('getUser');

    cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', {
      fixture: 'orderResponse.json'
    }).as('createOrder');

    cy.visit('http://localhost:4000/login');
    cy.get('.input__textfield[type="email"]').type('makarova@gmail.com');
    cy.get('.input__textfield[type="password"]').type('qwerty');
    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-accessToken');
    cy.get('button[type="submit"]').click();

    cy.visit('http://localhost:4000');

    cy.contains('.text', 'булка')
      .parents('li')
      .within(() => {
        cy.get('button').contains('Добавить').click();
      });

    cy.contains('.text', 'Биокотлета')
      .parents('li')
      .within(() => {
        cy.get('button').contains('Добавить').click();
      });

    cy.contains('.text', 'Филе')
      .parents('li')
      .within(() => {
        cy.get('button').contains('Добавить').click();
      });

    cy.get('button[data-info="order-button"]').click();

    cy.get('div[data-info="order-modal"]').should('be.visible');

    cy.get('h2[data-info="order-number"]').should('contain', '2');

    cy.get('button[data-info="modal-close"]').click();
    cy.get('div[data-info="order-modal"]').should('not.exist');
    cy.get('.R0Ja10_UixREbmJ6qzGV').should('not.have.descendants', 'li');
  });
});
