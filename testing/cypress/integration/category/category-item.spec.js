// / <reference types="cypress" />
context("category-item", () =>
{
    it("should display the lowest price", () =>
    {
        cy.visit("/suche/?query=202");
        cy.get("article[data-testing='1138'] .category-lowest-price").should("exist");
    });

    it("should not display the lowest price, because item has no rrp", () =>
    {
        cy.visit("/suche/?query=202");
        cy.get("article[data-testing='1144'] .category-lowest-price").should("not.exist");
    });
});
