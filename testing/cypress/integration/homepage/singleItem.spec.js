// / <reference types="cypress" />
context("Single Item", () =>
{
    beforeEach(() =>
    {
        cy.visit("/wohnzimmer/sessel-sofas/loungesessel-herkules_116_1014/");

    });

    it("should check for article name", () =>
    {
        cy.get(".title-outer").should("exist");
    });

    it("should check for article producer", () =>
    {
        cy.get(".producertag").should("exist");
    });

    it("should check for seperator between article name and article number", () =>
    {
        cy.get(".widget-separator").should("exist");
    });

});

