// / <reference types="cypress" />
context("Basket", () =>
{
    beforeEach(() =>
    {
        cy.visit("/warenkorb");
        cy.location("pathname").should("eq", "/warenkorb/");
    });

    it("Should add an item to the basket", () =>
    {});
    it("Should update the basket item quantity", () =>
    {});
    it("Should delete the basket item", () =>
    {});
    it("Should link to the correct single item", () =>
    {});
    // TODO move to own spec
    it("Should add coupon", () =>
    {});
    it("Should display the correct shipping costs", () =>
    {});
});
