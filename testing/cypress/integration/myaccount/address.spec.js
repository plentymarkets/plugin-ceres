// / <reference types="cypress" />
context("address", () =>
{
    it.skip("should add new address", () =>
    {
        cy.login("stefan.standard@plentye2etest.de");
        cy.visit("/myaccount");
        cy.getByTestingAttr("add-address").first().click();

        cy.wait(500);
        cy.getByTestingAttr("billing-address-de-name-inputs").find(`input[name="firstName"]`).type("Plenty", { delay: 40 });
        cy.getByTestingAttr("billing-address-de-name-inputs").find(`input[name="lastName"]`).type("Test");
        cy.getByTestingAttr("billing-address-de-street-inputs").find(`input[name="street"]`).type("Abby Road");
        cy.getByTestingAttr("billing-address-de-street-inputs").find(`input[name="housenumber"]`).type("1337");
        cy.getByTestingAttr("billing-address-de-zip").type("12345");
        cy.getByTestingAttr("billing-address-de-town").type("Kassel");
        cy.getByTestingAttr("modal-submit").first().click();
    });

    it.skip("should add new address", () =>
    {
        cy.login("stefan.standard@plentye2etest.de");
        cy.visit("/myaccount");
        cy.getByTestingAttr("add-address").last().click();

        cy.wait(500);
        cy.getByTestingAttr("billing-address-de-name-inputs").find(`input[name="firstName"]`).type("Plenty", { delay: 40 });
        cy.getByTestingAttr("billing-address-de-name-inputs").find(`input[name="lastName"]`).type("Test");
        cy.getByTestingAttr("billing-address-de-street-inputs").find(`input[name="street"]`).type("Abby Road");
        cy.getByTestingAttr("billing-address-de-street-inputs").find(`input[name="housenumber"]`).type("1337");
        cy.getByTestingAttr("billing-address-de-zip").type("12345");
        cy.getByTestingAttr("billing-address-de-town").type("Kassel");
        cy.getByTestingAttr("modal-submit").last().click();
    });
});
