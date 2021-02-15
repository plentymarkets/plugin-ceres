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
        cy.get(".widget-google-maps iframe").its("0.contentDocument").should("exist");
    });

    it("should check form for error if recquired fields are empty and privacy policy is not checked", () =>
    {
        cy.get(".widget-contact-form .btn-primary").click();
        cy.get(".widget-mail-input .input-unit").should("have.class", "error").and("have.class", "required");
        cy.get(".contact-form-subject .input-unit").should("have.class", "error").and("have.class", "required");
        cy.get(".contact-form-message .input-unit").should("have.class", "error").and("have.class", "required");
        cy.get(".widget-accept-privacy-policy .select-unit").should("have.class", "required");
        cy.get(".widget-accept-privacy-policy .form-check").should("have.class", "error");
        cy.get(".notification-wrapper").children().should("exist");
        cy.get(".notification-wrapper").children().first().should("contain", "Bitte folgende Felder überprüfen: E-Mail, Betreff, Nachricht, Hiermit bestätige ich, dass ich die Daten­schutz­erklärung gelesen habe..");
    });

    it("check for notification after successful sending of form", () =>
    {
        cy.get(".widget-mail-input").type(`user${new Date().valueOf()}@plentye2etest.de`, { delay: 40 });
        cy.get(".contact-form-subject").type("g", { delay: 40 });
        cy.get(".contact-form-message").type("g", { delay: 40 });
        cy.get(".widget-accept-privacy-policy").click();
        cy.get(".widget-contact-form .btn-primary").click();
        cy.get(".notification-wrapper").children().should("exist");
        cy.get(".notification-wrapper").children().first().should("contain", "Deine Anfrage wurde erfolgreich gesendet.");
    });

    it("privacy policy page should be linked and can be opened", () =>
    {
        cy.get(".widget-accept-privacy-policy a")
            .should("have.attr", "href")
            .and("include", "/privacy-policy/")
            .then((href) =>
            {
                cy.visit(href);
            });
    });
});
