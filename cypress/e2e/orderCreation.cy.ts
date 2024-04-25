describe('Order creation tests', () => {
  it('logs in and creates an order', () => {
    cy.visit('http://localhost:4000/login');
    cy.get('.input__textfield[type="email"]').type('makarova@gmail.com');
    cy.get('.input__textfield[type="password"]').type('qwerty');
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

    cy.get('div[data-info="order-modal"]', { timeout: 50000 }).should(
      'be.visible'
    );
  });
});
