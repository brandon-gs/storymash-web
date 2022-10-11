/// <reference types="cypress" />

import { Method } from "cypress/types/net-stubbing";

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
type SnackbarTypes = "Success" | "Error";

Cypress.Commands.add("seedDB", () => {
  cy.request("POST", "http://localhost:5000/api/v1/test/seed")
    .its("status")
    .should("eq", 200);
});

Cypress.Commands.add("login", (username, password) => {
  cy.request("POST", "http://localhost:5000/api/v1/auth/login", {
    username,
    password,
  });
});

Cypress.Commands.add("interceptDelay", (method, url) => {
  cy.intercept(method, url, (req) => {
    req.on("before:response", (res) => {
      res.setDelay(2000);
    });
  });
});

Cypress.Commands.add("getSnackbar", (variant) => {
  cy.get(`.SnackbarItem-variant${variant}`);
});

Cypress.Commands.add("getInputErrors", () => {
  cy.get(".MuiFormHelperText-root.Mui-error");
});

declare global {
  export namespace Cypress {
    interface Chainable {
      seedDB: () => Chainable<void>;
      login: (username: string, password: string) => Chainable<void>;
      interceptDelay: (method: Method, url: string) => Chainable<void>;
      getSnackbar: (variant: SnackbarTypes) => Chainable<void>;
      getInputErrors: () => Chainable<void>;
    }
  }
}

export default {};
