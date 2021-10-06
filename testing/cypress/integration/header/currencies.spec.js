// / <reference types="cypress" />
context("Header topbar currencies", () =>
{
    beforeEach(() =>
    {
        cy.visit("/");
    });

    it("should open currencies on click", () =>
    {
        cy.clickElement("currency-select");
    });

    it("should open currencies and select USD as currency", () =>
    {
        cy.clickElement("currency-select");
        cy.getByTestingAttr("USD").should("exist");
        cy.getByTestingAttr("USD").click();
        cy.url().should("include", "currency=USD");
    });

});
