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

Cypress.Commands.add("loginAsGuest", () =>
{
    const itemUrl = "/wohnzimmer/sessel-sofas/loungesessel-herkules_116_1014/";

    cy.visit(itemUrl);
    cy.wait(500);

    cy.get(".add-to-basket-container > button").should("exist");
    cy.get(".add-to-basket-container > button").click();

    cy.visit("/checkout");
    cy.wait(100);
    cy.getByTestingAttr("guest-login-input").type(`user${new Date().valueOf()}@plentye2etest.de`);
    cy.getByTestingAttr("guest-login-button").click();
    cy.wait(100);
    editAddress();
});

function editAddress()
{
    cy.getByTestingAttr("invoice-addresses-name-select-de").find(`input[name="firstName"]`).type("Plenty");
    cy.getByTestingAttr("invoice-addresses-name-select-de").find(`input[name="lastName"]`).type("Test");

    cy.getByTestingAttr("invoice-addresses-street-select-de").find(`input[name="street"]`).type("Abby Road");
    cy.getByTestingAttr("invoice-addresses-street-select-de").find(`input[name="housenumber"]`).type("1337");

    cy.getByTestingAttr("invoice-addresses-zip-select-de").find(`input[name="zip"]`).type("12345");

    cy.getByTestingAttr("invoice-addresses-town-select-de").find(`input[name="town"]`).type("Kassel");
    cy.getByTestingAttr("modal-submit").first().click();
}
