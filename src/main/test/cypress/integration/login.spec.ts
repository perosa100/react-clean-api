describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })
  it('should load with correct initial state', () => {
    cy.get('[data-testid="email-status"]')
      .should('have.attr', 'title', 'Campo Obrigatório')
      .should('contain.text', '🔴')

    cy.get('[data-testid="password-status"]')
      .should('have.attr', 'title', 'Campo Obrigatório')
      .should('contain.text', '🔴')

    cy.get('[data-testid="submit"]').should('have.attr', 'disabled')

    cy.get('[data-testid="error-wrap"]').should('not.have.descendants')
  })
})
