// / <reference types="cypress" />
context("Header topbar languages", () =>
{
    beforeEach(() =>
    {
        cy.visit("/");
    });

    it("should open languages and list languages", () =>
    {
        cy.clickElement("language-select");
        cy.get('#countrySettings').should("have.class", "show");
        cy.getByTestingAttr("lang-select-de").should("exist")
    });

    it("should change language to 'en'", () => 
    {
        cy.clickElement("language-select");

        // select en as shop language
        cy.getByTestingAttr("lang-select-en").click();
        cy.location("pathname").should("eq", "/en/");

        // lang icon in topbar should be en
        cy.getByTestingAttr("language-select").children().first().should("have.class", "flag-icon-en");
    });

});
