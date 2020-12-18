// / <reference types="cypress" />
context("Live shopping", () =>
{
    beforeEach(() =>
    {
        cy.visit("/live-shopping");
        // to prevent timing problems with accessing not yet rendered vue comps
        cy.wait(300);
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
        // check if item name links correctly
        cy.get(".live-shopping-item-name > a")
            .first()
            .should("have.attr", "href")
            .and("include", "/wohnzimmer/sessel-sofas/loungesessel-herkules_116_1014/");

        // check if image links correctly
        cy.get(".widget-live-shopping .thumb-image a")
            .first()
            .should("have.attr", "href")
            .and("include", "/wohnzimmer/sessel-sofas/loungesessel-herkules_116_1014/");
    });

    it("Should show the correct price in the basket", () =>
    {
        cy.get(".add-to-basket-lg-container").first().click();
        cy.get(".toggle-basket-preview").should("contain", "0,60");
    });
});
