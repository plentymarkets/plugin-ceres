// / <reference types="cypress" />
context("Single Item", () =>
{
    beforeEach(() =>
    {
        cy.visit("/");
    });

    it("should check for article name", () =>
    {
        cy.get("widget widget-text widget-none title-outer").should("exist");
    });

    it("should check for article producer", () =>
    {
        cy.get("producertag h6 producer text-muted").should("exist");
    });

    it("should check for seperator between article name and article number", () =>
    {
        cy.get("widget-separator").should("exist");
    });

});

