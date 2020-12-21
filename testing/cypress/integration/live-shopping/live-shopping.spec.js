// / <reference types="cypress" />
context("Live shopping", () =>
{
    const ACTIVE_LIVE_SHOPPING_PRICE = "50,00";
    const ACTIVE_LIVE_SHOPPING_UVP = "80,00";
    const ACTIVE_LIVE_SHOPPING_REBATE = "38%";
    const ACTIVE_LIVE_SHOPPING_URL = "/live-shopping_136_1071/";

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
        cy.get(".live-shopping-price").first().should("contain", ACTIVE_LIVE_SHOPPING_PRICE);
    });

    it("Should display rebate", () =>
    {
        cy.get(".live-shopping-prices-rebate").first().should("contain", ACTIVE_LIVE_SHOPPING_REBATE);
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
            .and("include", ACTIVE_LIVE_SHOPPING_URL);

        // check if image links correctly
        cy.get(".widget-live-shopping .thumb-image a")
            .first()
            .should("have.attr", "href")
            .and("include", ACTIVE_LIVE_SHOPPING_URL);
    });

    it("Should add the live shopping item to the basket and show the correct price in the basket preview", () =>
    {
        cy.get(".add-to-basket-lg-container").first().click();
        cy.get(".toggle-basket-preview").should("contain", ACTIVE_LIVE_SHOPPING_PRICE);
    });
});
