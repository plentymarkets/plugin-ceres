// / <reference types="cypress" />
context("Header topbar languages", () =>
{
    beforeEach(() =>
    {
        cy.visit("/");
    });

    it("should open languages and list languages", () =>
    {
        cy.clickElement("languageToggle");
        cy.get('#countrySettings').should("have.class", "show");
        cy.getByTestingAttr("lang-select-de").should("exist")
    });

    it("should change language to 'en'", () => 
    {
        cy.clickElement("languageToggle");

        // select en as shop language
        cy.getByTestingAttr("lang-select-en").click();
        cy.location("pathname").should("eq", "/en/");

        // lang icon in topbar should be en
        cy.getByTestingAttr("languageToggle").children().first().should("have.class", "flag-icon-en");
    });

});
