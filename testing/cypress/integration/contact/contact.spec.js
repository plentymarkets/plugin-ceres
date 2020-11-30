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
        cy.get(".widget-contact-form .btn-primary").click().wait(500);

        cy.get(".widget-mail-input.contact-form-mail .input-unit").should('have.class','error').and('have.class','required');
        cy.get(".widget-text-input.contact-form-subject .input-unit").should('have.class','error').and('have.class','required');
        cy.get(".widget-text-area.contact-form-message .input-unit").should('have.class','error').and('have.class','required');
        cy.get(".widget-accept-privacy-policy .select-unit").should('have.class','required');
        cy.get(".widget-accept-privacy-policy .form-check").should('have.class','error');
    });
});
