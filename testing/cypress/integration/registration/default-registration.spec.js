// / <reference types="cypress" />
context("register / registrierung", () =>
{
    const VALID_PW = "qwe123QWE";
    const MAIL = `user${new Date().valueOf()}@plentye2etest.de`;

    beforeEach(() =>
    {
        cy.visit("/registrierung");
    });

    it("empty input fields should be marked as invalid", () =>
    {
        cy.getByTestingAttr("register-submit").click();

        cy.getByTestingAttr("mail-register").parent().should("have.class", "error");
        cy.getByTestingAttr("password-register").parent().parent().parent().should("have.class", "error");
        cy.get("[data-model='name2']").should("have.class", "error");
        cy.get("[data-model='name3']").should("have.class", "error");
        cy.get("[data-model='address1']").should("have.class", "error");
        cy.get("[data-model='address2']").should("have.class", "error");
        cy.get("[data-model='postalCode']").should("have.class", "error");
        cy.get("[data-model='town']").should("have.class", "error");
        
        cy.get(".notification-wrapper").children().should("exist").should("have.class", "show");
        cy.get(".notification-wrapper").children().first().should("contain", "Bitte folgende Felder überprüfen: E-Mail, Passwort, Vorname, Nachname, Straße, Nr., PLZ, Ort.");

        cy.get(".form-check").should("have.class", "error");

        cy.get(".notification-wrapper").children().eq( 1 ).should("exist").should("have.class", "show");
        cy.get(".notification-wrapper").children().eq( 1 ).should("contain", "Bitte akzeptieren Sie die Daten­schutz­erklärung.");
    });

    it("information popper exists, has correct text and is closable", () =>
    {
        cy.get(".btn.btn-icon.btn-secondary.btn-sm").click();
        cy.get(".popover.bs-popover-auto").not('.hidden').find(".popover-body").contains("Durch die Registrierung werden Ihre Adressdaten gespeichert.");
        cy.get(".btn.btn-icon.btn-secondary.btn-sm").click();
        cy.get(".popover.bs-popover-auto").not('.hidden').should('not.exist');
    });

    it("privacy policy page should be linked and can be opened", () =>
    {
        cy.get(".form-check-label a")
            .should('have.attr', 'href')
            .and('include', '/privacy-policy/')
            .then((href) => {
                cy.visit(href)
            })

        cy.url().should("include", "/privacy-policy/");
    });

    it("registering an existing account should be denied", () =>
    {
        cy.getByTestingAttr("mail-register").type("ceres-testing@opentrash.com");
        cy.getByTestingAttr("password-register").type(VALID_PW);
        cy.getByTestingAttr("repeat-password-register").type(VALID_PW);
        cy.get("[data-model='name2']").type("g");
        cy.get("[data-model='name3']").type("g");
        cy.get("[data-model='address1']").type("g");
        cy.get("[data-model='address2']").type("g");
        cy.get("[data-model='postalCode']").type("g");
        cy.get("[data-model='town']").type("g");
        cy.getByTestingAttr("privacy-policy-accept-register").click();
        cy.getByTestingAttr("register-submit").click();

        cy.get(".notification-wrapper").children().should("exist").should("have.class", "show");
        cy.get(".notification-wrapper").children().should("contain", "Für diese E-Mail-Adresse existiert bereits ein Konto.");
    });

    it.only("registering should be succesfull", () =>
    {
        cy.getByTestingAttr("mail-register").type(MAIL);
        cy.getByTestingAttr("password-register").type(VALID_PW);
        cy.getByTestingAttr("repeat-password-register").type(VALID_PW);
        cy.get("[data-model='name2']").type("g");
        cy.get("[data-model='name3']").type("g");
        cy.get("[data-model='address1']").type("g");
        cy.get("[data-model='address2']").type("g");
        cy.get("[data-model='postalCode']").type("g");
        cy.get("[data-model='town']").type("g");
        cy.getByTestingAttr("privacy-policy-accept-register").click();
        cy.getByTestingAttr("register-submit").click();

        cy.location("pathname").should("eq", "/");
    });
});
