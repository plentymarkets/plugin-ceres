// Import file upload commands to use attachFile
import "cypress-file-upload";

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

Cypress.Commands.add("login", (email = "plentytest@plenty.de", password = "Testuser1234") =>
{
    cy.request(
        "POST",
        "/rest/io/customer/login/",
        {
            email,
            password
        }
    );
});

Cypress.Commands.add("loginAsGuest", () =>
{
    cy.request(
        "POST",
        "/rest/io/guest/",
        {
            email: `pentyguest${new Date().getTime()}@plenty.de`
        }
    );
});

Cypress.Commands.add("addBasketItem", (variationId, quantity = 1) =>
{
    cy.request(
        "POST",
        "/rest/io/basket/items/",
        {
            variationId,
            quantity
        }
    );
});
