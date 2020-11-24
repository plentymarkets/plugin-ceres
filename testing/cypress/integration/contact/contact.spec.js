// / <reference types="cypress" />
context("Contact Page", () =>
{
    beforeEach(() =>
    {
        cy.visit("/kontakt/");

    });

    it("should check for page title", () =>
    {
        cy.get("h1").should("contain", "Kontakt");
    });

    it("should check for address icon", () =>
    {
        cy.get(".address").should("exist");
    });

    it("should check for phone icon", () =>
    {
        cy.get(".fa-phone").should("exist");
    });

    it("should check for fax icon", () =>
    {
        cy.get(".fa-fax").should("exist");
    });

    it("should check for envelope icon", () =>
    {
        cy.get(".fa-envelope").should("exist");
    });

    it("should check for clock icon", () =>
    {
        cy.get(".fa-clock-o").should("exist");
    });
});



