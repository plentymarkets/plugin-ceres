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
        cy.get(".widget-contact-details").should("exist");
    });

    it("should check for Google Maps iFrame", () =>
    {
        cy.get(".widget-google-maps").should("exist");
    });

    it("should check form for error if recquired fields are empty and privacy policy isn't checked", () =>
    {
        cy.getByTestingAttr("contact-form-mail").type("");
        cy.getByTestingAttr("contact-form-subject").type("");
        cy.getByTestingAttr("contact-form-message").type("");
        cy.getByTestingAttr("contact-form-prpol-check").uncheck();
        cy.get(".btn-primary").click();
    });
});
