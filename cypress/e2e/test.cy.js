/// <reference types="cypress" />

const email='john@super.com';
const password='Admin@1234';

// describe('login test cases (email)', () => {
//   beforeEach(() => {
//     cy.visit('/');
//   })
//   it('Invalid Email (NO @ AND NO .)  with valid password', () => {
//     cy.get('#email')
//     .type('cypresstest ')
//     .should('have.value', 'cypresstest')
//     .get('#password')
//     .type(`${password}`)
//     .type('{enter}')
//     .get('input:invalid')
//     .should('have.length', 1)

//   });

//   it('Invalid Email (WITH @ AND NO .)  with valid password', () => {
//     cy.get('#email')
//     .type('cypresstest@ ')
//     .should('have.value', 'cypresstest@')
//     .get('#password')
//     .type(`${password}`)
//     .type('{enter}')
//     .get('input:invalid')
//     .should('have.length', 1)

//   });

//   it('Invalid Email (WITH . AND NO @) with valid password', () => {
//     cy.get('#email')
//     .type('cypresstest.')
//     .should('have.value', 'cypresstest.')
//     .get('#password')
//     .type(`${password}`)
//     .type('{enter}')
//     .get('input:invalid')
//     .should('have.length', 1)

//   });

//   it('Invalid Email (WITH @ AND . (No strings)) with valid password', () => {
//     cy.get('#email')
//     .type('@.')
//     .should('have.value', '@.')
//     .get('#password')
//     .type(`${password}`)
//     .type('{enter}')
//     .get('input:invalid')
//     .should('have.length', 1)

//   });

//   it('Invalid Email (WITH @ AND . ( string after @)) with valid password', () => {
//     cy.get('#email')
//     .type('@test.')
//     .should('have.value', '@test.')
//     .get('#password')
//     .type(`${password}`)
//     .type('{enter}')
//     .get('input:invalid')
//     .should('have.length', 1)

//   });

//   it('Invalid Email (WITH @ AND . ( string after @ AND after .))  with valid password', () => {
//     cy.get('#email')
//     .type('@test.com')
//     .should('have.value', '@test.com')
//     .get('#password')
//     .type(`${password}`)
//     .type('{enter}')
//     .get('input:invalid')
//     .should('have.length', 1)

//   });

//   it('Invalid Email (WITH @ AND . ( string after .))  with valid password', () => {
//     cy.get('#email')
//     .type('@.com')
//     .should('have.value', '@.com')
//     .get('#password')
//     .type(`${password}`)
//     .type('{enter}')
//     .get('input:invalid')
//     .should('have.length', 1)

//   });

//   it('Valid Email with valid password (user is not exists)', () => {
//     cy.get('#email')
//     .type('cypress@test.com')
//     .should('have.value', 'cypress@test.com')
//     .type('{enter}')
//     .get('input:invalid')
//     .should('have.length', 1)
//     .get('#password')
//     .type(`${password}`)
//     .type('{enter}')
//     .get('p.error-message').should('exist')
//     .should('include.text', 'Invalid email')
//   });

//   it('Valid Email with valid password (user exists)', () => {
//     cy.get('#email')
//     .type('john@super.com')
//     .should('have.value', 'john@super.com')
//     .type('{enter}')
//     .get('input:invalid')
//     .should('have.length', 1)
//     .get('#password')
//     .type(`${password}`)
//     .type('{enter}')
//     .get('p.error-message').should('not.exist')
//     .url().should('eq', 'http://localhost:4002/customers');
//   });
// });


// describe('login test cases (password)', () => {
//   //password must contains at least 1 (digit, lowercase, uppercase), minimum length of 8 characters
//   beforeEach(() => {
//     cy.visit('/');
//   })

//   it('Invalid password (empty) with valid email', () => {
//     cy.get('#email')
//     .type( `${email}`).type('{enter}')
//     .get('input:invalid')
//     .should('have.length', 1)
//   });

//   it('Invalid password (less than 8 characters) with valid email', () => {
//     cy.get('#email')
//     .type( `${email}`)
//     .get('#password')
//     .type("qatest{enter}")
//     .get('p.error-message').should('exist')
//     .should('include.text', 'something went wrong, \nplease check from your input format')
//   });

//   it('Invalid password (1 digit & >=8 characters) with valid email', () => {
//     cy.get('#email')
//     .type( `${email}`)
//     .get('#password')
//     .type("1qatesting{enter}")
//     .get('p.error-message').should('exist')
//     .should('include.text', 'something went wrong, \nplease check from your input format')
//   });

//   it('Invalid password (no lowercase &1 digit & >=8 characters) with valid email', () => {
//     cy.get('#email')
//     .type( `${email}`)
//     .get('#password')
//     .type("1QATESTING{enter}")
//     .get('p.error-message').should('exist')
//     .should('include.text', 'something went wrong, \nplease check from your input format')
//   });

//   it('checking code injection', () => {
//     cy.get('#email')
//     .type( `${email}`)
//     .get('#password')
//     .type("<script> alert(true) </script>{enter}")
//     .get('p.error-message').should('exist')
//     .should('include.text', 'something went wrong, \nplease check from your input format')
//   });
  
// });

describe('login test cases (password)', () => {
  //password must contains at least 1 (digit, lowercase, uppercase), minimum length of 8 characters
  beforeEach(() => {
    // Intercept the login request and stub a successful response
    cy.intercept('POST', '/', { fixture: 'loginResponse.json' }).as('loginRequest');

    // Log in before visiting the "/customers" page
    cy.visit('/');
    cy.get('#email').type('your_username');
    cy.get('#password').type('your_password');
    cy.get('form').submit();
    cy.wait('@loginRequest'); // Wait for the login request to complete
  });

  it('customers page', () => {
        cy.get('.navbar-brand')
      });
});
