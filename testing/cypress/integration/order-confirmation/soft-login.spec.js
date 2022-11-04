// / <reference types="cypress" />
context("Order confirmation", () =>
{
    // Orderconfirmation sites for 1392 and 1395 are valid until 2026
    it("Should enter postcode to access order confirmation", () =>
    {
        cy.visit("/bestellbestaetigung/?orderId=1392&accessKey=ILZIIM0MB");
        cy.get(`input[name="postcode"]`).type("12345");
        cy.get(`button[type="submit"]`).click();
        cy.get(".h3").should("contain", "1392");
    });

    it("Should enter login when order is older than 90 days", () =>
    {
        cy.visit("/bestellbestaetigung/?orderId=1396&accessKey=AFVS9ZV92");
        cy.url().should("include", "/login/?backlink=/bestellbestaetigung/?orderId=1396&accessKey=AFVS9ZV92");
    });

    it("Should not to be able to access guest order after 90 days", () =>
    {
        cy.visit("/bestellbestaetigung/?orderId=1397&accessKey=KLHLFNULT", { failOnStatusCode: false });
        cy.get("#page-body").should("contain", "Link generieren");
    });

    it("Should contain robots noindex in head metadata", () =>
    {
        cy.visit("/bestellbestaetigung/?orderId=1392&accessKey=ILZIIM0MB");
        cy.get(`meta[content="NOINDEX"]`).should("exist");
        cy.get(`input[name="postcode"]`).type("12345");
        cy.get(`button[type="submit"]`).click();
        cy.get(".h3").should("contain", "1392");
        cy.get(`meta[content="NOINDEX"]`).should("exist");
    });
});
