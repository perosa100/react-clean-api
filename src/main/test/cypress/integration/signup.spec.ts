describe('Signup', () => {
  beforeEach(() => {
    cy.visit('signup')
  })
  it('should signup loads with correct initial state', () => {
    cy.get('[data-testid="name"]').should('have.attr', 'readOnly')

    cy.get('[data-testid="name-status"]')
      .should('have.attr', 'title', 'Campo Obrigatório')
      .should('contain.text', '🔴')

    cy.get('[data-testid="email"]').should('have.attr', 'readOnly')

    cy.get('[data-testid="email-status"]')
      .should('have.attr', 'title', 'Campo Obrigatório')
      .should('contain.text', '🔴')

    cy.get('[data-testid="password"]').should('have.attr', 'readOnly')
    cy.get('[data-testid="password-status"]')
      .should('have.attr', 'title', 'Campo Obrigatório')
      .should('contain.text', '🔴')

    cy.get('[data-testid="passwordConfirmation"]').should(
      'have.attr',
      'readOnly'
    )

    cy.get('[data-testid="passwordConfirmation-status"]')
      .should('have.attr', 'title', 'Campo Obrigatório')
      .should('contain.text', '🔴')

    cy.get('[data-testid="submit"]').should('have.attr', 'disabled')

    cy.get('[data-testid="error-wrap"]').should('not.have.descendants')
  })
})
