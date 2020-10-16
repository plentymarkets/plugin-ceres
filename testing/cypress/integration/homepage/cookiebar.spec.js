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

    it("Should close the cookie bar after saving", () =>
    {
        cy.location("pathname").should("eq", "/");
        cy.getByTestingAttr("cookieBarSave").click();
        cy.getByTestingAttr("cookieBar").should("have.class", "cookie-bar");
        cy.getByTestingAttr("cookieBar").should("have.class", "out");
    });

    it("Should close the cookie bar after accept all", () =>
    {
        cy.location("pathname").should("eq", "/");
        cy.getByTestingAttr("cookieBarAcceptAll").click();
        cy.getByTestingAttr("cookieBar").should("have.class", "cookie-bar");
        cy.getByTestingAttr("cookieBar").should("have.class", "out");
    });
});
