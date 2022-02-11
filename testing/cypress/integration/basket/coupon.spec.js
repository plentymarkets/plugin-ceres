// / <reference types="cypress" />
context("Coupon", () =>
{
    const ITEM_PRICE_NET = 0.59;
    const ITEM_PRICE = 0.70;
    const SHIPPING_COST_NET = 5.03;
    const SHIPPING_COST = 5.99;
    const COUPON_CODE = "4CDSQS";

    beforeEach(() =>
    {
        cy.addBasketItem(1014);
        cy.visit("/warenkorb/");
        cy.location("pathname").should("eq", "/warenkorb/");
    });

    it("Should add coupon", () =>
    {
        cy.server().route("POST", "/rest/io/coupon/").as("redeemCoupon");
        // make sure basket is loaded proper
        cy.wait(1000);
        cy.getByTestingAttr("coupon-input").type("x").clear().type(COUPON_CODE, { delay: 50 });
        cy.getByTestingAttr("coupon-redeem").click();
        cy.wait("@redeemCoupon").then(() =>
        {
            checkTotals(1, true);
        });
    });

    it("Should remove coupon code", () =>
    {
        cy.server().route("POST", "/rest/io/coupon/").as("redeemCoupon");
        cy.server().route("DELETE", "/rest/io/coupon/4CDSQS/").as("deleteCoupon");
        // make sure basket is loaded proper
        cy.wait(1000);
        cy.getByTestingAttr("coupon-input").type("x").clear().type(COUPON_CODE, { delay: 50 });
        cy.getByTestingAttr("coupon-redeem").click();
        cy.wait("@redeemCoupon");
        cy.getByTestingAttr("coupon-remove").click();
        cy.wait("@deleteCoupon");
        checkTotals();
    });

    it("Should fail on invalid coupon code", () =>
    {
        cy.getByTestingAttr("coupon-input").type("INVALID", { delay: 30 });
        cy.getByTestingAttr("coupon-redeem").click();
        cy.get(".notification-wrapper").children().first().should("have.class", "alert-danger");
        cy.get(".notification-wrapper").children().first().should("contain", "Der Gutschein wurde bereits verwendet oder ist ungültig.");
    });

    function checkTotals(itemQuantity = 1, isFree = false)
    {
        const basketAmountNet = isFree ? 0.0 : (SHIPPING_COST_NET + ITEM_PRICE_NET * itemQuantity);
        const basketAmountRaw = SHIPPING_COST + ITEM_PRICE * itemQuantity;
        const basketAmount = isFree ? 0.0 : basketAmountRaw;

        cy.getByTestingAttr("item-sum-net").should("contain", (ITEM_PRICE_NET * itemQuantity).toLocaleString("de"));
        cy.getByTestingAttr("item-sum").should("contain", (ITEM_PRICE * itemQuantity).toLocaleString("de"));
        cy.getByTestingAttr("shipping-amount-net").should("contain", SHIPPING_COST_NET.toLocaleString("de"));
        cy.getByTestingAttr("shipping-amount").should("contain", SHIPPING_COST.toLocaleString("de"));
        if (isFree)
        {
            cy.getByTestingAttr("promotion-coupon").should("contain", (basketAmountRaw * -1).toLocaleString("de"));
        }
        cy.getByTestingAttr("basket-amount-net").should("contain", basketAmountNet.toLocaleString("de"));
        cy.getByTestingAttr("basket-amount").should("contain", basketAmount.toLocaleString("de"));
    }
});
