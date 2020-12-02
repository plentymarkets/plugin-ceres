// / <reference types="cypress" />
context("Basket", () =>
{
    const ITEM_PRICE_NET = 0.59;
    const ITEM_PRICE = 0.70;
    const SHIPPING_COST_NET = 5.03;
    const SHIPPING_COST = 5.99;

    beforeEach(() =>
    {
        cy.addBasketItem(1014);
        cy.visit("/warenkorb");
        cy.location("pathname").should("eq", "/warenkorb/");
    });

    // TODO move to own spec
    it("Should add coupon", () =>
    {
        checkTotals();
    });

    // should fail on invalid coupon code
    // should remove coupon

    function checkTotals(itemQuantity = 1)
    {
        cy.getByTestingAttr("item-sum-net").should("contain", (ITEM_PRICE_NET * itemQuantity).toLocaleString("de"));
        cy.getByTestingAttr("item-sum").should("contain", (ITEM_PRICE * itemQuantity).toLocaleString("de"));
        cy.getByTestingAttr("shipping-amount-net").should("contain", SHIPPING_COST_NET.toLocaleString("de"));
        cy.getByTestingAttr("shipping-amount").should("contain", SHIPPING_COST.toLocaleString("de"));
        // cy.getByTestingAttr("promotion-coupon");
        cy.getByTestingAttr("basket-amount-net").should("contain", (SHIPPING_COST_NET + ITEM_PRICE_NET * itemQuantity).toLocaleString("de"));
        cy.getByTestingAttr("vat-amount");
        cy.getByTestingAttr("basket-amount").should("contain", (SHIPPING_COST + ITEM_PRICE * itemQuantity).toLocaleString("de"));
        // cy.getByTestingAttr("sales-coupon");
        // cy.getByTestingAttr("open-amount");
    }
});
