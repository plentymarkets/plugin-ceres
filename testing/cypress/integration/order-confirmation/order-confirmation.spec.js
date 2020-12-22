// / <reference types="cypress" />
context("Order confirmation", () =>
{
    const ITEM_PRICE_NET = 0.59;
    const ITEM_PRICE = 0.70;
    const SHIPPING_COST_NET = 5.03;
    const SHIPPING_COST = 5.99;
    const ITEMQUANTITY = 1;

    before(() =>
    {
        cy.visit("/");
        cy.login();
        cy.visit("/bestellbestaetigung/?orderId=437");
    });

    it("Should check for order ID", () =>
    {
        cy.get(".h3").should("contain", "437");
        cy.url().should("include", "orderId=437");
    });

    it("Should check for correct data", () =>
    {
        cy.get(".h2").should("contain", "Vielen Dank!");

        cy.getByTestingAttr("item-sum-net").should("contain", (ITEM_PRICE_NET * ITEMQUANTITY).toLocaleString("de"));
        cy.getByTestingAttr("item-sum").should("contain", (ITEM_PRICE * ITEMQUANTITY).toLocaleString("de"));
        cy.getByTestingAttr("shipping-amount-net").should("contain", SHIPPING_COST_NET.toLocaleString("de"));
        cy.getByTestingAttr("shipping-amount").should("contain", SHIPPING_COST.toLocaleString("de"));
        cy.getByTestingAttr("basket-amount-net").should("contain", (SHIPPING_COST_NET + ITEM_PRICE_NET * ITEMQUANTITY).toLocaleString("de"));
        cy.getByTestingAttr("vat-amount");
        cy.getByTestingAttr("basket-amount").should("contain", (SHIPPING_COST + ITEM_PRICE * ITEMQUANTITY).toLocaleString("de"));
    });

    // it("Should check for correct data", () =>
    // {
    //     cy.getByTestingAttr("order-confirmation-price-per-piece").should("exist");
    // });
});
