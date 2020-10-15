// / <reference types="cypress" />
context("Homepage", () =>
{
    beforeEach(() =>
    {
        cy.visit("/");
    });

    it("loads the homepage", () =>
    {
        // checks if the logo exists
        cy.get(".brand-wrapper").should("exist");
    });
});
