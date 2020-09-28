import faker from 'faker'
const baseUrl: string = Cypress.config().baseUrl

describe('Signup', () => {
  beforeEach(() => {
    cy.server()
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

  it('should present valid state if form is valid', () => {
    cy.get('[data-testid="name"]').focus().type(faker.name.findName())
    cy.get('[data-testid="name-status"]')
      .should('have.attr', 'title', 'Tudo certo')
      .should('contain.text', '🟢')

    cy.get('[data-testid="email"]').focus().type(faker.internet.email())
    cy.get('[data-testid="email-status"]')
      .should('have.attr', 'title', 'Tudo certo')
      .should('contain.text', '🟢')

    const password = faker.random.alphaNumeric(6)

    cy.get('[data-testid="password"]').focus().type(password)
    cy.get('[data-testid="password-status"]')
      .should('have.attr', 'title', 'Tudo certo')
      .should('contain.text', '🟢')

    cy.get('[data-testid="passwordConfirmation"]').focus().type(password)
    cy.get('[data-testid="passwordConfirmation-status"]')
      .should('have.attr', 'title', 'Tudo certo')
      .should('contain.text', '🟢')

    cy.get('[data-testid="submit"]').should('not.have.attr', 'disabled')

    cy.get('[data-testid="error-wrap"]').should('not.have.descendants')
  })
  it('should present InvalidCredentialsError  on 403', () => {
    cy.route({
      method: 'POST',
      url: /signup/,
      status: 403,
      response: {
        error: faker.random.words()
      }
    })
    cy.get('[data-testid="name"]').focus().type(faker.name.findName())
    cy.get('[data-testid="name-status"]')
      .should('have.attr', 'title', 'Tudo certo')
      .should('contain.text', '🟢')

    cy.get('[data-testid="email"]').focus().type(faker.internet.email())
    cy.get('[data-testid="email-status"]')
      .should('have.attr', 'title', 'Tudo certo')
      .should('contain.text', '🟢')

    const password = faker.random.alphaNumeric(6)

    cy.get('[data-testid="password"]').focus().type(password)
    cy.get('[data-testid="password-status"]')
      .should('have.attr', 'title', 'Tudo certo')
      .should('contain.text', '🟢')

    cy.get('[data-testid="passwordConfirmation"]').focus().type(password)
    cy.get('[data-testid="passwordConfirmation-status"]')
      .should('have.attr', 'title', 'Tudo certo')
      .should('contain.text', '🟢')

    cy.get('[data-testid="submit"]').click()

    cy.get('[data-testid="spinner"]').should('not.exist')

    cy.get('[data-testid="main-error"]').should(
      'contain.text',
      'Esse e-mail já esta em uso'
    )
    cy.url().should('eq', `${baseUrl}/signup`)
  })
})
