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

    it("Should check for correct sums", () =>
    {
        cy.getByTestingAttr("item-sum-net").should("contain", (ITEM_PRICE_NET * ITEMQUANTITY).toLocaleString("de"));
        cy.getByTestingAttr("item-sum").should("contain", (ITEM_PRICE * ITEMQUANTITY).toLocaleString("de"));
        cy.getByTestingAttr("shipping-amount-net").should("contain", SHIPPING_COST_NET.toLocaleString("de"));
        cy.getByTestingAttr("shipping-amount").should("contain", SHIPPING_COST.toLocaleString("de"));
        cy.getByTestingAttr("basket-amount-net").should("contain", (SHIPPING_COST_NET + ITEM_PRICE_NET * ITEMQUANTITY).toLocaleString("de"));
        cy.getByTestingAttr("vat-amount");
        cy.getByTestingAttr("basket-amount").should("contain", (SHIPPING_COST + ITEM_PRICE * ITEMQUANTITY).toLocaleString("de"));
    });

    it("Should check for correct data in purchased-items-widget", () =>
    {
        cy.get(".item-name").should("contain", "Loungesessel Herkules");
        cy.getByTestingAttr("order-confirmation-price-per-piece").should("contain", (ITEM_PRICE).toLocaleString("de"));
        cy.getByTestingAttr("order-confirmation-quantity").should("contain", ITEMQUANTITY);
        cy.getByTestingAttr("order-confirmation-total").should("contain", (ITEM_PRICE * ITEMQUANTITY).toLocaleString("de"));
    });

    it("Should check for correct data in order-data-widget", () =>
    {
        cy.getByTestingAttr("order-confirmation-date").should("contain", "09.12.2020, 12:59");
        cy.getByTestingAttr("order-confirmation-invoice-address").should("contain", "Plenty Test");
        cy.getByTestingAttr("order-confirmation-shipping-address").should("contain", "Lieferadresse gleich Rechnungsadresse");
        cy.getByTestingAttr("order-confirmation-payment-method").should("contain", "Rechnung");
        cy.getByTestingAttr("order-confirmation-payment-status").should("contain", "Nicht bezahlt");
        cy.get(".payment-align-center").should("contain", "nicht möglich");
        cy.getByTestingAttr("order-confirmation-shipping-profile").should("contain", "DHL - Versichertes Paket");
    });

    it("Should check for attached invoice", () =>
    {
        cy.get(".widget-order-documents a")
            .should("have.attr", "href")
            .and("include", "/order-document/preview/6/?orderId=437");
    });

    it("Should check for attached delivery note", () =>
    {
        cy.get(".widget-order-documents a:nth-of-type(2)")
            .should("have.attr", "href")
            .and("include", "/order-document/preview/10/?orderId=437");
    });

    it("Should check for attached order confirmation document", () =>
    {
        cy.get(".widget-order-documents a:nth-of-type(3)")
            .should("have.attr", "href")
            .and("include", "/order-document/preview/11/?orderId=437");
    });

    it("Should check for attached tracking link", () =>
    {
        cy.get(".order-tracking a")
            .should("have.attr", "href")
            .and("include", "http://nolp.dhl.de/nextt-online-public/set_identcodes.do?lang=de&zip=12345&idc=123456");
    });

    it("Should check for back-to-homepage link", () =>
    {
        // class is set in shopbuilder widget as customer class
        cy.get(".homepage a")
            .should("have.attr", "href")
            .and("eq", "/").then((href) =>
            {
                cy.visit(href);
                cy.location("pathname").should("eq", "/");
            });
    });

    it("Should check for my-account link", () =>
    {
        cy.login();
        cy.visit("/bestellbestaetigung/?orderId=437");

        // class is set in shopbuilder widget as customer class
        cy.get(".my-account a")
            .should("have.attr", "href")
            .and("eq", "/myaccount/").then((href) =>
                {
                    cy.visit(href);
                    cy.location("pathname").should("eq", "/myaccount/");
                });
    });

    it("Should check for possible return of item", () =>
    {
        cy.login();
        cy.visit("/bestellbestaetigung/?orderId=437");

        // config value is set to 5000 days after order date
        cy.get(".order-return a")
            .should("have.attr", "href")
            .and("include", "/returns/437/").then((href) =>
            {
                cy.visit(href);
                cy.login();
                cy.visit("/returns/437/");
                cy.location("pathname").should("eq", "/returns/437/");
            });
    });

    it("Should check for possible change of payment", () =>
    {
        cy.login();
        cy.visit("/bestellbestaetigung/?orderId=461");
        cy.get(".payment-link-style")
            .should("contain", "hier klicken")
            .click();

        cy.get(".modal.show").should("exist");
        cy.get(".current-payment-text").should("contain", "Vorkasse");
        cy.get(`[data-id='2']`).should("exist"); // prepayment
        cy.get(`[data-id='6001']`).should("exist"); // paypal
    });
});
