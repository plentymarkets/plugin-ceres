// / <reference types="cypress" />

context("Actions", () =>
{
    beforeEach(() =>
    {
        cy.visit("http://master.plentymarkets.com/");
    });

    it("loads the homepage", () =>
    {
        cy.get(".brand-wrapper").should("exist");
    });
});
