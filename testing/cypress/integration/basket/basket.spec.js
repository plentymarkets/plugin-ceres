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
        cy.visit("/warenkorb/");
        cy.location("pathname").should("eq", "/warenkorb/");
    });

    it("Should add an item to the basket", () =>
    {
        checkTotals();
    });

    it("Should update the basket item quantity", () =>
    {
        cy.getByTestingAttr("quantity-btn-increase").click().click();
        cy.getByTestingAttr("quantity-btn-decrease").click();
        checkTotals(2);
    });

    it("Should delete the basket item", () =>
    {
        cy.addBasketItem(1007);
        cy.reload();
        cy.getByTestingAttr("basket-item-delete").eq(1).click();
        checkTotals();
    });

    it("Should link to the correct single item", () =>
    {
        cy.getByTestingAttr("basket-item-name")
            .should("have.attr", "href")
            .and("include", "/wohnzimmer/sessel-sofas/loungesessel-herkules_116_1014/");
        cy.getByTestingAttr("basket-item-name").click();
        cy.location("pathname").should("eq", "/wohnzimmer/sessel-sofas/loungesessel-herkules_116_1014/");
    });

    function checkTotals(itemQuantity = 1)
    {
        cy.getByTestingAttr("item-sum-net").should("contain", (ITEM_PRICE_NET * itemQuantity).toLocaleString("de"));
        cy.getByTestingAttr("item-sum").should("contain", (ITEM_PRICE * itemQuantity).toLocaleString("de"));
        cy.getByTestingAttr("shipping-amount-net").should("contain", SHIPPING_COST_NET.toLocaleString("de"));
        cy.getByTestingAttr("shipping-amount").should("contain", SHIPPING_COST.toLocaleString("de"));
        cy.getByTestingAttr("basket-amount-net").should("contain", (SHIPPING_COST_NET + ITEM_PRICE_NET * itemQuantity).toLocaleString("de"));
        cy.getByTestingAttr("vat-amount");
        cy.getByTestingAttr("basket-amount").should("contain", (SHIPPING_COST + ITEM_PRICE * itemQuantity).toLocaleString("de"));
    }
});
