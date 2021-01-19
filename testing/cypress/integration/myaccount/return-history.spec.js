// / <reference types="cypress" />
context("my-account return-history", () =>
{
    beforeEach(() =>
    {
        cy.login("stefan.standard@plentye2etest.de");
        cy.visit("/myaccount/");
    });

    it("should have correct return history data", () =>
    {
        cy.getByTestingAttr("return-history-id1").should("contain", "471");
        cy.getByTestingAttr("return-history-id2").should("contain", "470");
        cy.getByTestingAttr("return-history-date").should("contain", "23.12.2020");
        cy.getByTestingAttr("return-history-payment").should("contain", "Vorkasse");
    });

    it("should have return documents", () =>
    {
        cy.getByTestingAttr("return-history-document").eq(0)
            .should("have.attr", "href")
            .and("eq", "/order-document/preview/18");
    });

    it("should open return-history", () =>
    {
        cy.get(".order-return-history-list .container-clickable").should("have.class", "collapsed");
        cy.get(".order-return-history-list .container-clickable").click().wait(100);
        cy.get(".order-return-history-list .container-clickable").not(".collapsed");
    });

    it("should have correct itemlink in return-history", () =>
    {
        cy.get(".order-return-history-list .container-clickable").click();
        cy.getByTestingAttr("return-history-link").eq(0).click();
        cy.location("pathname").should("eq", "/wohnzimmer/sessel-sofas/loungesessel-herkules_116_1014/");
    });

    it("should have correct data in return-history", () =>
    {
        cy.get(".order-return-history-list .container-clickable").click();
        cy.getByTestingAttr("return-history-quantity").eq(0).should("contain", "1");
        cy.get(".order-return-history-list .item img").eq(0)
            .should("have.attr", "src", "https://cdn02.plentymarkets.com/2x3z2pucy2z9/item/images/116/preview/116-Loungesessel-Herkules.jpg");
    });
});
