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

    it("Should add an item to the basket", () =>
    {
        checkSums();
    });
    it("Should update the basket item quantity", () =>
    {
        cy.getByTestingAttr("quantity-btn-increase").click().click();
        cy.getByTestingAttr("quantity-btn-decrease").click();
        checkSums(2);
    });
    it("Should delete the basket item", () =>
    {
        cy.get("basket-item-delete").click();
        checkSums(0);
    });
    it("Should link to the correct single item", () =>
    {
    });
    // TODO move to own spec
    it("Should add coupon", () =>
    {});
    it("Should display the correct shipping costs", () =>
    {});

    function checkSums(itemQuantity = 1)
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
