// / <reference types="cypress" />
context("address", () =>
{
    it.skip("should add new address", () =>
    {
        cy.login("stefan.standard@plentye2etest.de");
        cy.visit("/myaccount");
        cy.getByTestingAttr("add-address").first().click();

        cy.wait(500);
        cy.getByTestingAttr("invoice-addresses-name-select-de").find(`input[name="firstName"]`).type("Plenty", { delay: 40 });
        cy.getByTestingAttr("invoice-addresses-name-select-de").find(`input[name="lastName"]`).type("Test");
        cy.getByTestingAttr("invoice-addresses-street-select-de").find(`input[name="street"]`).type("Abby Road");
        cy.getByTestingAttr("invoice-addresses-street-select-de").find(`input[name="housenumber"]`).type("1337");
        cy.getByTestingAttr("invoice-addresses-zip-select-de").find(`input[name="zip"]`).type("12345");
        cy.getByTestingAttr("invoice-addresses-town-select-de").find(`input[name="town"]`).type("Kassel");
        cy.getByTestingAttr("modal-submit").first().click();
    });

    it.skip("should add new address", () =>
    {
        cy.login("stefan.standard@plentye2etest.de");
        cy.visit("/myaccount");
        cy.getByTestingAttr("add-address").last().click();

        cy.wait(500);
        cy.getByTestingAttr("invoice-addresses-name-select-de").find(`input[name="firstName"]`).type("Plenty", { delay: 40 });
        cy.getByTestingAttr("invoice-addresses-name-select-de").find(`input[name="lastName"]`).type("Test");
        cy.getByTestingAttr("invoice-addresses-street-select-de").find(`input[name="street"]`).type("Abby Road");
        cy.getByTestingAttr("invoice-addresses-street-select-de").find(`input[name="housenumber"]`).type("1337");
        cy.getByTestingAttr("invoice-addresses-zip-select-de").find(`input[name="zip"]`).type("12345");
        cy.getByTestingAttr("invoice-addresses-town-select-de").find(`input[name="town"]`).type("Kassel");
        cy.getByTestingAttr("modal-submit").last().click();
    });
});
