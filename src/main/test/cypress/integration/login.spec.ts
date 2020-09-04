import faker from 'faker'
const baseUrl: string = Cypress.config().baseUrl
describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })
  it('should load with correct initial state', () => {
    cy.get('[data-testid="email"]').should('have.attr', 'readOnly')

    cy.get('[data-testid="email-status"]')
      .should('have.attr', 'title', 'Campo Obrigatório')
      .should('contain.text', '🔴')

    cy.get('[data-testid="password"]').should('have.attr', 'readOnly')
    cy.get('[data-testid="password-status"]')
      .should('have.attr', 'title', 'Campo Obrigatório')
      .should('contain.text', '🔴')

    cy.get('[data-testid="submit"]').should('have.attr', 'disabled')

    cy.get('[data-testid="error-wrap"]').should('not.have.descendants')
  })

  it('should present erro state if form is invalid', () => {
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

    cy.get('[data-testid="submit"]').should('have.attr', 'disabled')

    cy.get('[data-testid="error-wrap"]').should('not.have.descendants')
  })

  it('should present valid state if form is valid', () => {
    cy.get('[data-testid="email"]').focus().type(faker.internet.email())
    cy.get('[data-testid="email-status"]')
      .should('have.attr', 'title', 'Tudo certo')
      .should('contain.text', '🟢')

    cy.get('[data-testid="password"]')
      .focus()
      .type(faker.random.alphaNumeric(5))
    cy.get('[data-testid="password-status"]')
      .should('have.attr', 'title', 'Tudo certo')
      .should('contain.text', '🟢')

    cy.get('[data-testid="submit"]').should('not.have.attr', 'disabled')

    cy.get('[data-testid="error-wrap"]').should('not.have.descendants')
  })

  it('should present error if invalid credentias are provided', () => {
    cy.get('[data-testid="email"]').focus().type(faker.internet.email())

    cy.get('[data-testid="password"]')
      .focus()
      .type(faker.random.alphaNumeric(5))

    cy.get('[data-testid="submit"]').click()

    cy.get('[data-testid="error-wrap"]')
      .get('[data-testid="spinner"]')
      .should('exist')
      .get('[data-testid="main-error"]')
      .should('not.exist')
      .get('[data-testid="spinner"]')
      .should('not.exist')
      .get('[data-testid="main-error"]')
      .should('contain.text', 'Credenciais Inválidas')
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('should  prevent save accessToken if valid credeitnals are provided', () => {
    cy.get('[data-testid="email"]').focus().type('teste@teste.com')

    cy.get('[data-testid="password"]').focus().type('teste@teste.com')

    cy.get('[data-testid="submit"]').click()

    cy.get('[data-testid="error-wrap"]')
      .get('[data-testid="spinner"]')
      .should('exist')
      .get('[data-testid="main-error"]')
      .should('not.exist')
      .get('[data-testid="spinner"]')
      .should('not.exist')

    cy.url().should('eq', `${baseUrl}/`)
    cy.window().then((window) =>
      assert.isOk(window.localStorage.getItem('accessToken'))
    )
  })
})
