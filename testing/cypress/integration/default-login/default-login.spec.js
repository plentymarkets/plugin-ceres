// / <reference types="cypress" />
context("Default Login Page", () =>
{
    beforeEach(() =>
    {
        cy.visit("/login/");
        cy.wait(100);
    });

    it("should check for module titles", () =>
    {
        cy.get(".h1.user-login-input").should("contain", "Anmelden");
        cy.get(".h1.user-register-input").should("contain", "Sie sind noch kein Kunde?");
        cy.get(".h1.user-guest-input").should("contain", "Als Gast bestellen");
    });

    it("should check login form for error if required fields are empty", () =>
    {
        cy.getByTestingAttr("submit-login").click();
        cy.getByTestingAttr("email-login").parent().should("have.class", "error");
        cy.get(".error-msg").should("contain", "Bitte geben Sie eine gültige E-Mail-Adresse an.");
        cy.getByTestingAttr("password-login").parent().should("have.class","error");
        cy.get(".error-msg").should("contain", "Bitte geben Sie Ihr Passwort ein.");
    });

    it("check for notification after failed login", () =>
    {
        cy.getByTestingAttr("email-login").type(`user${new Date().valueOf()}@plentye2etest.de`, { delay: 40 });
        cy.getByTestingAttr("password-login").type("Test", { delay: 30 });
        cy.getByTestingAttr("submit-login").click();
        cy.get(".notification-wrapper").children().should("exist").should("have.class", "show");
        cy.get(".notification-wrapper").children().first().should("contain", "Die Anmeldedaten sind ungültig.");
    });

    it("should login successfully", () =>
    {
        cy.getByTestingAttr("email-login").type("ceres-testing@opentrash.com", { delay: 30 });
        cy.getByTestingAttr("password-login").type("8#TfhMB@QVd668T", { delay: 30 });

        cy.server().route("POST", "/rest/io/customer/login/").as("loginUser");

        cy.getByTestingAttr("submit-login").click();

        cy.wait("@loginUser").then((xhr) =>
        {
            expect(xhr.status).to.eql(200);

            cy.wait(1000);
            cy.getStore().then((store) =>
            {
                expect(store.getters.isLoggedIn).to.be.true;
            });
        });

        cy.location("pathname").should("eq", "/");
    });

    it("should check guest login form for error if required fields are empty", () =>
    {
        cy.getByTestingAttr("guest-login-button").click();
        cy.getByTestingAttr("guest-login-input").parent().should("have.class", "error");
        cy.get(".error-msg").should("contain", "Bitte geben Sie eine gültige E-Mail-Adresse an.");
    });

    it("should check for valid email at guest login", () =>
    {
        cy.getByTestingAttr("guest-login-input").type("ceres-testingopentrash.com", { delay: 30 });
        cy.getByTestingAttr("guest-login-button").click();
        cy.getByTestingAttr("guest-login-input").parent().should("have.class", "error");
        cy.get(".error-msg").should("contain", "Bitte geben Sie eine gültige E-Mail-Adresse an.");
    });

    it("should check if link to guest login page is working", () =>
    {
        cy.getByTestingAttr("guest-login-input").type("ceres-testing@opentrash.com", { delay: 30 });
        cy.getByTestingAttr("guest-login-button").click();

        cy.wait(1000);
        cy.location("pathname").should("eq", "/");
    });

    it("should check if registration button is working", () =>
    {
        cy.get(".widget-link").click();
        cy.location("pathname").should("eq", "/registrierung/");
    });

    it("should check if forgotten password link is working", () =>
    {
        cy.get(".small.text-appearance").click();
        cy.wait(500);
        cy.get(".modal-content .input-unit").type("ceres-testing@opentrash.com");
        cy.get(".modal-content .btn-primary").click();
        cy.get(".notification-wrapper").should("exist").children().should("have.class", "show");
        cy.get(".notification-wrapper").children().first().should("contain", "E-Mail versendet.");
    });
});
