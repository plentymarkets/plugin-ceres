// / <reference types="cypress" />
context("prices", () =>
{

    const url = "/wohnzimmer/sessel-sofas/loungesessel-herkules_116_1014/";

    beforeEach(() =>
    {
        cy.visit("/");
    });

    it("should change the item price for b2b class", () =>
    {
        cy.visit(url);
        cy.get(".price").should("contain", "0,70");
        cy.get(".crossprice").should("contain", "0,80");
        cy.login("bernd.business@plentye2etest.de", "Testuser1234");
        cy.reload();
        cy.get(".crossprice").should("contain", "0,61");
        cy.get(".price").should("contain", "0,53");

    });

    it("should change graduated prices for b2b customer", () =>
    {
        cy.login("bernd.business@plentye2etest.de", "Testuser1234");
        cy.visit(url);
        cy.get(".graduated-prices-table").children().first().children().last().should("contain", "0,38");
        cy.get(".graduated-prices-table").children().last().children().last().should("contain", "0,08");
    });

    it("should display netto price for b2b class", () =>
    {
        cy.login("bernd.business@plentye2etest.de", "Testuser1234");
        cy.visit(url);
        cy.get(".price").should("contain", "0,53");
        cy.get(".crossprice").should("contain", "0,61");
    });

    it("should display brutto price for b2c class", () =>
    {
        cy.login("stefan.standard@plentye2etest.de", "Testuser1234");
        cy.visit(url);
        cy.get(".price").should("contain", "0,70");
        cy.get(".crossprice").should("contain", "0,80");
    });

    it("should show dhl b2b shipping profile for b2b class", () =>
    {
        cy.login("bernd.business@plentye2etest.de", "Testuser1234");
        cy.addBasketItem("1014");
        cy.visit("/checkout");
        cy.get(`[data-id="${8}"]`).should("exist");
    });

    it("should show correct price for dhl b2b profile", () =>
    {
        cy.login("bernd.business@plentye2etest.de", "Testuser1234");
        cy.addBasketItem("1014");
        cy.visit("/checkout");
        cy.get(`[data-id="${8}"]`).find(".content").should("contain", "1,68");
    });

    it("should show shipping profiles for b2c class", () =>
    {
        cy.login("stefan.standard@plentye2etest.de", "Testuser1234");
        cy.addBasketItem("1014");
        cy.visit("/checkout");
        cy.get(`[data-id="${8}"]`).should("not.exist");
    });

    it("should apply correct shipping price for item with postage (porto) for b2c", () =>
    {
        cy.login("stefan.standard@plentye2etest.de", "Testuser1234");
        // item with 10€ postage
        cy.addBasketItem("1031");
        cy.visit("/checkout");
        cy.get(`[data-id="${7}"]`).should("contain", "10,00");

    });

    it("should apply correct shipping price for item with postage (porto) for b2b", () =>
    {
        cy.login("bernd.business@plentye2etest.de", "Testuser1234");
        // item with 10€ postage
        cy.addBasketItem("1031");
        cy.visit("/checkout");
        cy.get(`[data-id="${7}"]`).should("contain", "8,40");

    });

    it("should display correct graduated prices at basket preview", () =>
    {
        cy.addBasketItem("1014", 5);
        cy.reload();
        cy.get(".control-basket > a").should("exist").scrollIntoView().click();
        cy.getByTestingAttr("item-sum").should("contain", "2,50");
    });
});
