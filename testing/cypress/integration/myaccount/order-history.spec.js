// / <reference types="cypress" />
context("my-account order-history", () =>
{
    const ITEM_PRICE_NET = 0.59;
    const ITEM_PRICE = 0.70;
    const SHIPPING_COST_NET = 5.03;
    const SHIPPING_COST = 5.99;
    const ITEMQUANTITY = 1;

    beforeEach(() =>
    {
        cy.login("stefan.standard@plentye2etest.de");
        cy.visit("/myaccount/");
    });

    it("should have correct order history data", () =>
    {
        cy.getByTestingAttr("order-history-id").eq(1).should("contain", "469");
        cy.getByTestingAttr("order-history-id").eq(2).should("contain", "468");
        cy.getByTestingAttr("order-history-sum").eq(1).should("contain", "6,05");
        cy.getByTestingAttr("order-history-sum").eq(2).should("contain", "6,69");
        cy.getByTestingAttr("order-history-date1").eq(1).should("contain", "22.12.2020");
        cy.getByTestingAttr("order-history-date1").eq(2).should("contain", "22.12.2020");
        cy.getByTestingAttr("order-history-date2").eq(2).should("contain", "22.12.2020");
        cy.getByTestingAttr("order-history-status").eq(1).should("contain", "Warten auf Zahlung");
        cy.getByTestingAttr("order-history-status").eq(2).should("contain", "Warenausgang gebucht");

        cy.get(".order-history-list .container-clickable").eq(0).click();

        cy.getByTestingAttr("order-history-price").should("contain", (ITEM_PRICE * ITEMQUANTITY).toLocaleString("de"));
        cy.getByTestingAttr("order-history-quantity").should("contain", (ITEMQUANTITY).toLocaleString("de"));
        cy.getByTestingAttr("order-history-total").should("contain", (ITEM_PRICE * ITEMQUANTITY).toLocaleString("de"));
    });

    it("should have correct itemlink in order-history", () =>
    {
        cy.get(".order-history-list .container-clickable").eq(0).click();

        cy.getByTestingAttr("order-history-link").click();
        cy.location("pathname").should("eq", "/wohnzimmer/sessel-sofas/loungesessel-herkules_116_1014/");
    });

    it("should open order confirmation", () =>
    {
        cy.get(".order-history-list .container-clickable").eq(2).find(".icons a").eq(1)
            .should("have.attr", "href")
            .and("eq", "/bestellbestaetigung/?orderId=468").then((href) =>
            {
                cy.visit(href);
                cy.location("pathname").should("eq", "/bestellbestaetigung/");
            });
    });

    it("should have tracking link", () =>
    {
        cy.get(".order-history-list .container-clickable").eq(2).find(".icons a").eq(0)
            .should("have.attr", "href")
            .should("eq", "http://nolp.dhl.de/nextt-online-public/set_identcodes.do?lang=de&zip=34117&idc=123456");
    });

    it("should open order-history", () =>
    {
        cy.get(".order-history-list .container-clickable").eq(0).should("have.class", "collapsed");
        cy.get(".order-history-list .container-clickable").eq(0).click().wait(100);
        cy.get(".order-history-list .container-clickable").eq(0).not(".collapsed");
    });

    it("should have correct data in order-history", () =>
    {
        cy.get(".order-history-list .container-clickable").eq(0).click();
        cy.getByTestingAttr("order-history-quantity").eq(0).should("contain", "1");
        cy.get(".order-history-list .item img").eq(0)
            .should("have.attr", "src", "https://cdn02.plentymarkets.com/2x3z2pucy2z9/item/images/116/preview/116-Loungesessel-Herkules.jpg");
    });

    it("should check sums", () =>
    {
        cy.get(".order-history-list .container-clickable").eq(2).click();

        cy.getByTestingAttr("item-sum-net").wait(100).should("contain", (ITEM_PRICE_NET * ITEMQUANTITY).toLocaleString("de"));
        cy.getByTestingAttr("item-sum").should("contain", (ITEM_PRICE * ITEMQUANTITY).toLocaleString("de"));
        cy.getByTestingAttr("shipping-amount-net").should("contain", SHIPPING_COST_NET.toLocaleString("de"));
        cy.getByTestingAttr("shipping-amount").should("contain", SHIPPING_COST.toLocaleString("de"));
        cy.getByTestingAttr("basket-amount-net").should("contain", (SHIPPING_COST_NET + ITEM_PRICE_NET * ITEMQUANTITY).toLocaleString("de"));
        cy.getByTestingAttr("vat-amount");
        cy.getByTestingAttr("basket-amount").should("contain", (SHIPPING_COST + ITEM_PRICE * ITEMQUANTITY).toLocaleString("de"));
    });

    it("Should have attached order documents", () =>
    {
        cy.get(".widget-order-history .container-clickable").eq(2).click().wait(100);
        cy.getByTestingAttr("order-history-document").eq(0).find("a")
            .should("have.attr", "href")
            .and("include", "/order-document/preview/15");
        cy.getByTestingAttr("order-history-document").eq(1).find("a")
            .should("have.attr", "href")
            .and("include", "/order-document/preview/16");
        cy.getByTestingAttr("order-history-document").eq(2).find("a")
            .should("have.attr", "href")
            .and("include", "/order-document/preview/17");
    });

    it("Should check for possible payment change", () =>
    {
        cy.get(".order-history-list .container-clickable").eq(1).click();
        cy.getByTestingAttr("change-payment-my-account").click();

        cy.get(".modal.show").should("exist");
        cy.get(".current-payment-text").should("contain", "Vorkasse");
        // prepayment
        cy.get(`[data-id='2']`).should("exist");
        // paypal
        cy.get(`[data-id='6001']`).should("exist");
    });

    it("Should check for possible return", () =>
    {
        cy.get(".order-history-list .container-clickable").eq(2).click().wait(100);
        cy.getByTestingAttr("order-history-return").wait(100).click();
        cy.location("pathname").should("eq", "/returns/468/");
    });
});
