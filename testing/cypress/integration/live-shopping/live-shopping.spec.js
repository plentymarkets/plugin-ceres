// / <reference types="cypress" />
context("Live shopping", () =>
{
    beforeEach(() =>
    {
        cy.visit("/live-shopping");
    });

    it("Should show the live shopping widgets", () =>
    {
        cy.location("pathname").should("eq", "/live-shopping");
        // checks if the logo exists
        cy.get(".brand-wrapper").should("exist");
    });

    // Should display currently active live shopping item
    it("Should show the live shopping widgets", () =>
    {
        cy.get(".live-shopping-countdown-heading").first().should("contains", "Angebot endet in:");
    });
    // Should display the correct live shopping price
    // Should display rebate
    // Should display next live shopping item
    it("Should display next live shopping item", () =>
    {
        cy.get(".live-shopping-countdown-heading").eq(1).should("contains", "Angebot startet in:");
    });
    // Should link to the correct variation
});
