// / <reference types="cypress" />
context("Contact Page", () =>
{
    beforeEach(() =>
    {
        cy.visit("/kontakt/");

    });

    it("should check for page title", () =>
    {
        cy.get("h1").should("contain", "Kontakt");
    });

    it("should check for contact data", () =>
    {
        cy.get(".contact-card").should("exist");
    });

    it("should check for the address", () =>
    {
        cy.getByTestingAttr("address").should("contain","Max Mustermann" +
            "Musterstraße 123" +
            "12345 Musterstadt" +
            "Deutschland");
    });

    it("should check for phone number", () =>
    {
        cy.getByTestingAttr("phone").should("contain","+49 1234 56789");
    });

    it("should check for fax number", () =>
    {
        cy.getByTestingAttr("fax").should("contain","+49 1234 567890");
    });

    it("should check for email address", () =>
    {
        cy.getByTestingAttr("email").should("contain","max@mustermann.com");
    });

    it("should check for mail address", () =>
    {
        cy.getByTestingAttr("businessTimes").should("contain","Montag - Freitag, 00:00 - 24:00");
    });


    it("should check for Google Maps iFrame", () =>
    {
        cy.get(".widget-google-maps").should("exist");
    });

    it("should check for form-button", () =>
    {
        cy.getByTestingAttr("labelSubmit").should("exist");
    });




});



