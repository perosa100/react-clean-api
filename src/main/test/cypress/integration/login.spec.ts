import faker from 'faker'
const baseUrl: string = Cypress.config().baseUrl
describe('Login', () => {
  beforeEach(() => {
    cy.server()
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

  it('should present UnexpecetedError on 400', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 401,
      response: {
        error: faker.random.words()
      }
    })
    cy.get('[data-testid="email"]').focus().type(faker.internet.email())

    cy.get('[data-testid="password"]')
      .focus()
      .type(faker.random.alphaNumeric(5))

    cy.get('[data-testid="submit"]').click()

    cy.get('[data-testid="spinner"]').should('not.exist')

    cy.get('[data-testid="main-error"]').should(
      'contain.text',
      'Credenciais Inválidas'
    )
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('should present InvalidCredentialsError  on 401', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 400,
      response: {
        error: faker.random.words()
      }
    })
    cy.get('[data-testid="email"]').focus().type(faker.internet.email())

    cy.get('[data-testid="password"]')
      .focus()
      .type(faker.random.alphaNumeric(5))

    cy.get('[data-testid="submit"]').click()

    cy.get('[data-testid="spinner"]').should('not.exist')

    cy.get('[data-testid="main-error"]').should(
      'contain.text',
      'Algo de errado aconteceu. Tente novamente em breve.'
    )
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('should  present UnexpecetedError if invalid data is returned', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 200,
      response: {
        invalidProperty: faker.random.uuid()
      }
    })

    cy.get('[data-testid="email"]').focus().type(faker.internet.email())

    cy.get('[data-testid="password"]')
      .focus()
      .type(faker.random.alphaNumeric(5))
      .type('{enter}')

    cy.get('[data-testid="spinner"]').should('not.exist')

    cy.get('[data-testid="main-error"]').should(
      'contain.text',
      'Algo de errado aconteceu. Tente novamente em breve.'
    )
    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('should  prevent save accessToken if valid credentials are provided', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 200,
      response: {
        accessToken: faker.random.uuid()
      }
    })

    cy.get('[data-testid="email"]').focus().type(faker.internet.email())

    cy.get('[data-testid="password"]')
      .focus()
      .type(faker.random.alphaNumeric(5))

    cy.get('[data-testid="submit"]').click()

    cy.get('[data-testid="main-error"]').should('not.exist')
    cy.get('[data-testid="spinner"]').should('not.exist')

    cy.url().should('eq', `${baseUrl}/`)
    cy.window().then((window) =>
      assert.isOk(window.localStorage.getItem('accessToken'))
    )
  })

  it('should  prevent multiple submits', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 200,
      response: {
        accessToken: faker.random.uuid()
      }
    }).as('request')

    cy.get('[data-testid="email"]').focus().type(faker.internet.email())

    cy.get('[data-testid="password"]')
      .focus()
      .type(faker.random.alphaNumeric(5))

    cy.get('[data-testid="submit"]').dblclick()
    cy.get('@request.all').should('have.length', 1)
  })

  it('should  not call submit if form is invalid', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 200,
      response: {
        accessToken: faker.random.uuid()
      }
    }).as('request')

    cy.get('[data-testid="email"]')
      .focus()
      .type(faker.internet.email())
      .type('{enter}')

    cy.get('@request.all').should('have.length', 0)
  })
})
