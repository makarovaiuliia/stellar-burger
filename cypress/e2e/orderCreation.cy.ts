// describe('Order creation tests', () => {
//   beforeEach(() => {
//     cy.intercept('GET', 'api/ingredients', {
//       fixture: 'ingredients.json'
//     }).as('getIngredients');

//     cy.intercept('POST', 'api/auth/login', {
//       fixture: 'loginResponse.json'
//     }).as('login');

//     cy.intercept('GET', 'api/orders/*', { fixture: 'orderResponse.json' }).as(
//       'orderData'
//     );

//     cy.intercept('POST', '/api/orders/create', {
//       fixture: 'createOrderResponse.json'
//     }).as('createOrder');

//     localStorage.setItem('auth_token', '12345');

//     cy.visit('http://localhost:4000');

//   });

//   it('logs in and creates an order', () => {
//     cy.visit('http://localhost:4000/login');
//     cy.get('.input__textfield[type="email"]').type('makarova@gmail.com');
//     cy.get('.input__textfield[type="password"]').type('qwerty');
//     cy.get('button[type="submit"]').click();

//     cy.wait('@login');

//     cy.visit('http://localhost:4000');

//     // Add items to the burger
//     cy.contains('.text', 'булка')
//       .parents('li')
//       .within(() => {
//         cy.get('button').contains('Добавить').click();
//       });

//     cy.contains('.text', 'Биокотлета')
//       .parents('li')
//       .within(() => {
//         cy.get('button').contains('Добавить').click();
//       });

//     cy.contains('.text', 'Филе')
//       .parents('li')
//       .within(() => {
//         cy.get('button').contains('Добавить').click();
//       });

//     // Place the order
//     cy.get('button[data-info="order-button"]').click();
//     cy.wait('@createOrder');

//     // Check if the modal with the order appears
//     cy.get('div[data-info="order-modal"]', { timeout: 50000 }).should(
//       'be.visible'
//     );
//     // Check the order number
//     cy.get('div[data-info="order-modal"]').contains('Order number: 12345');

//     // Close the modal and check if it closed successfully
//     cy.get('button[data-info="close-modal"]').click();
//     cy.get('div[data-info="order-modal"]').should('not.exist');

//     // Check if the constructor is empty
//     cy.get('.constructor').should('not.have.descendants', 'li');
//   });
// });
