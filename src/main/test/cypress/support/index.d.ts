declare namespace Cypress {
  interface Chainable {
    getByTextId: (id: string) => Chainable<Element>
  }
}
