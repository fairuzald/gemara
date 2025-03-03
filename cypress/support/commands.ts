Cypress.Commands.add('dataCy', (value) => {
  return cy.get(`[data-cy=${value}]`);
});
// cypress/support/index.ts
declare global {
  namespace Cypress {
    interface Chainable {
      dataCy(value: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}
export {};
