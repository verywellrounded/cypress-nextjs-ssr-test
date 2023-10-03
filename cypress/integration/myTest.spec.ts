/// <reference types="cypress" />

describe('example to-do app', () => {
    beforeEach(() => {
      cy.task('clearNock');
    })

    it('Simple test', () => {
        cy.visit('http://localhost:3000/')
        // doesnt matter we are statically mocking there
        cy.task('nock',{}).then(() => {
          cy.get('.myButton').children().first().click();
        } 
        )
        cy.get('[data-cy="resultsBox"]').should('have.value', 'I am mocked')
    })

    it('Simple test non mocked', () => {
      cy.visit('http://localhost:3000/')
      // Can fix so it is resilient to different page load times
      cy.get('.myButton', ).children().first().click();
  })
})