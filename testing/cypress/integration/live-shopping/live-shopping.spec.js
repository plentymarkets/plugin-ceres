// / <reference types="cypress" />
context("Live shopping", () =>
{
    beforeEach(() =>
    {
        cy.visit("/live-shopping");
    });

    it("Should show the live shopping widgets", () =>
    {
        cy.location("pathname").should("eq", "/live-shopping/");
        cy.get(".widget-live-shopping").should("have.length", 2);
    });

    it("Should show the live shopping widgets", () =>
    {
        cy.get(".live-shopping-countdown-heading").first().should("contain", "Angebot endet in:");
    });

    it("Should display the correct live shopping price", () =>
    {
        cy.get(".live-shopping-price").first().should("contain", "0,60");
    });
    it("Should display rebate", () =>
    {
        cy.get(".live-shopping-price").first().should("contain", "0,60");
    });

    it("Should display next live shopping item", () =>
    {
        cy.get(".live-shopping-countdown-heading").eq(1).should("contain", "Angebot startet in:");
    });

    it("Should link to the correct variation", () =>
    {

    });
});
