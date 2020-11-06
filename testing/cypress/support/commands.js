// ***********************************************
// This example commands.js shows you how to
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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })

// Override visit to add our testing env
Cypress.Commands.overwrite("visit", (originalFn, url, options = {}) =>
{
    options.qs = { env: "testing", ...options.qs };
    return originalFn(url, options);
});

Cypress.Commands.add("getByTestingAttr", (attr) =>
{
    return cy.get(`[data-testing='${attr}']`);
});

Cypress.Commands.add("getStore", (attr) =>
{
    return cy.window().its("vueApp.$store");
});

Cypress.Commands.add("clickElement", (attr) =>
{
    cy.getByTestingAttr(attr).should("exist");
    return cy.getByTestingAttr(attr).click();
});

Cypress.Commands.add("login", (attr) =>
{
    cy.request(
        "POST",
        "/rest/io/customer/login",
        {
            email: "plentytest@plenty.de",
            password: "Testuser1234"
        }
    );
});
