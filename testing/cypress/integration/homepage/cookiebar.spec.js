// / <reference types="cypress" />
context("Cookiebar", () =>
{
    beforeEach(() =>
    {
        cy.visit("/");
    });

    it("Should show the cookie bar", () =>
    {
        cy.location("pathname").should("eq", "/");
        cy.getByTestingAttr("cookieBar").should("exist");
    });

    it("Should close the cookie bar on saving", () =>
    {
        cy.location("pathname").should("eq", "/");
        cy.getByTestingAttr("cookieBarSave").click();
        cy.getByTestingAttr("cookieBar").should("have.class", "cookie-bar");
        cy.getByTestingAttr("cookieBar").should("have.class", "out");
    });

    it("Should close the cookie bar on accept all", () =>
    {
        cy.location("pathname").should("eq", "/");
        cy.getByTestingAttr("cookieBarAcceptAll").click();
        cy.getByTestingAttr("cookieBar").should("have.class", "cookie-bar");
        cy.getByTestingAttr("cookieBar").should("have.class", "out");
    });

    it("Should close the cookie bar on accept all and stay closed after reload", () =>
    {
        cy.location("pathname").should("eq", "/");
        cy.getByTestingAttr("cookieBarAcceptAll").click();
        cy.reload();
        cy.getByTestingAttr("cookieBar").should("have.class", "cookie-bar");
        cy.getByTestingAttr("cookieBar").should("have.class", "out");
    });

    it("Should close the cookie bar on save and stay closed after reload", () =>
    {
        cy.location("pathname").should("eq", "/");
        cy.getByTestingAttr("cookieBarSave").click();
        cy.reload();
        cy.getByTestingAttr("cookieBar").should("have.class", "cookie-bar");
        cy.getByTestingAttr("cookieBar").should("have.class", "out");
    });
});
