import faker from 'faker'

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

  it('should present erro state if form is invalid', () => {
    cy.get('[data-testid="name"]').focus().type(faker.random.alphaNumeric(3))
    cy.get('[data-testid="name-status"]')
      .should('have.attr', 'title', 'Valor Inválido')
      .should('contain.text', '🔴')

    cy.get('[data-testid="email"]').focus().type(faker.random.word())
    cy.get('[data-testid="email-status"]')
      .should('have.attr', 'title', 'Valor Inválido')
      .should('contain.text', '🔴')

    cy.get('[data-testid="password"]')
      .focus()
      .type(faker.random.alphaNumeric(3))
    cy.get('[data-testid="password-status"]')
      .should('have.attr', 'title', 'Valor Inválido')
      .should('contain.text', '🔴')

    cy.get('[data-testid="passwordConfirmation"]')
      .focus()
      .type(faker.random.alphaNumeric(3))
    cy.get('[data-testid="passwordConfirmation-status"]')
      .should('have.attr', 'title', 'Valor Inválido')
      .should('contain.text', '🔴')

    cy.get('[data-testid="submit"]').should('have.attr', 'disabled')

    cy.get('[data-testid="error-wrap"]').should('not.have.descendants')
  })
})
