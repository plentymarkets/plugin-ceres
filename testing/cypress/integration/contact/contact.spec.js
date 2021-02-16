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
        cy.get(".notification-wrapper").children().should("have.class", "show").and("have.class", "alert-danger");
        cy.get(".notification-wrapper").children().first().should("contain", "Bitte folgende Felder überprüfen: E-Mail, Betreff, Nachricht, Hiermit bestätige ich, dass ich die Daten­schutz­erklärung gelesen habe..");
    });

    it("should fill file upload input", () =>
    {
        cy.fixture("test.png").then(fileContent =>
        {
            cy.get(".widget-mail-attachment input").attachFile({
                fileContent: fileContent.toString(),
                fileName: "test.png",
                mimeType: "image/png"
            });
        });

        cy.get(".widget-mail-attachment .input-unit-preview.disabled").should("contain", "test.png");
        
        cy.get(".widget-mail-attachment .fa.fa-times").should("exist");
        cy.get(".widget-mail-attachment .input-unit-btn").click();
        cy.get(".widget-mail-attachment .input-unit-preview").should("not.have.class", "disabled").should('be.empty');
    });

    it("check for error notification after sending form with file attachment that exceeds the upload size limit", () =>
    {
        cy.get(".widget-mail-input").type(`user${new Date().valueOf()}@plentye2etest.de`, { delay: 40 });
        cy.get(".contact-form-subject").type("g", { delay: 40 });
        cy.get(".contact-form-message").type("g", { delay: 40 });

        cy.fixture("xl.jpg").then(fileContent =>
        {
            cy.get(".widget-mail-attachment input").attachFile({
                fileContent: fileContent.toString(),
                fileName: "xl.jpg",
                mimeType: "image/jpg"
            });

            cy.get(".widget-accept-privacy-policy").click();
            cy.intercept("POST", "/rest/io/customer/contact/mail/file/").as("uploadFile");
            cy.get(".widget-contact-form .btn-primary").click().wait(10000);
            cy.get(".notification-wrapper").children().should("have.class", "show").and("have.class", "alert-danger");
            cy.get(".notification-wrapper").children().first().should("contain", "Die Datei konnte nicht hochgeladen werden, da sie die maximale Dateigröße von 10 MB übersteigt.");
            cy.wait("@uploadFile").its("response.statusCode").should("eq", 400);
        });
    });

    it("check for error notification after sending form with file attachment with forbidden MIME type", () =>
    {
        cy.get(".widget-mail-input").type(`user${new Date().valueOf()}@plentye2etest.de`, { delay: 40 });
        cy.get(".contact-form-subject").type("g", { delay: 40 });
        cy.get(".contact-form-message").type("g", { delay: 40 });

        cy.fixture("test.php").then(fileContent =>
        {
            cy.get(".widget-mail-attachment input").attachFile({
                fileContent: fileContent.toString(),
                fileName: "test.php",
                mimeType: "application/x-httpd-php"
            });

            cy.get(".widget-accept-privacy-policy").click();
            cy.intercept("POST", "/rest/io/customer/contact/mail/file/").as("uploadFile");
            cy.get(".widget-contact-form .btn-primary").click();
            cy.get(".notification-wrapper").children().should("have.class", "show").and("have.class", "alert-danger");
            cy.get(".notification-wrapper").children().first().should("contain", "Die Datei konnte nicht hochgeladen werden, da sie die maximale Dateigröße von 10 MB übersteigt.");
            
            cy.wait("@uploadFile").its("response.statusCode").should("eq", 400);
        });
    });

    it("check for notification after successful sending of form", () =>
    {
        cy.get(".widget-mail-input").type(`user${new Date().valueOf()}@plentye2etest.de`, { delay: 40 });
        cy.get(".contact-form-subject").type("g", { delay: 40 });
        cy.get(".contact-form-message").type("g", { delay: 40 });
        cy.get(".widget-accept-privacy-policy").click();
        
        cy.intercept("POST", "/rest/io/customer/contact/mail/").as("sendForm");
        cy.get(".widget-contact-form .btn-primary").click();

        cy.get(".notification-wrapper").children().should("have.class", "show").and("have.class", "alert-success");
        cy.get(".notification-wrapper").children().first().should("contain", "Deine Anfrage wurde erfolgreich gesendet.");

        cy.wait("@sendForm").its("response.statusCode").should("eq", 201);
    });

    it("check for notification after successful sending of form with file attached", () =>
    {
        cy.get(".widget-mail-input").type(`user${new Date().valueOf()}@plentye2etest.de`, { delay: 40 });
        cy.get(".contact-form-subject").type("g", { delay: 40 });
        cy.get(".contact-form-message").type("g", { delay: 40 });
        cy.fixture("test.png").then(fileContent =>
        {
            cy.get(".widget-mail-attachment input").attachFile({
                fileContent: fileContent.toString(),
                fileName: "test.png",
                mimeType: "image/png"
            });
        });
        cy.get(".widget-accept-privacy-policy").click();
        cy.intercept("POST", "/rest/io/customer/contact/mail/file/").as("uploadFile");
        cy.get(".widget-contact-form .btn-primary").click();

        cy.get(".notification-wrapper").children().should("have.class", "show");
        cy.get(".notification-wrapper").children().first().should("contain", "Deine Anfrage wurde erfolgreich gesendet.");

        cy.wait("@uploadFile").its("response.statusCode").should("eq", 201);
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
