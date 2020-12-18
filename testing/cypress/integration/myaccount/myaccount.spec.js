// / <reference types="cypress" />
context("Myaccount", () =>
{

    beforeEach(() =>
    {

    });

    it("should logout", () =>
    {
        cy.login("stefan.standard@plentye2etest.de");
        cy.visit("/myaccount");
        cy.intercept("POST", "/rest/io/customer/logout").as("logoutUser");

        cy.get(".widget-logout-button").click();

        cy.wait("@logoutUser").then((res) =>
        {
            expect(res.response.statusCode).to.eql(200);

            // wait for vue store to init after page reload
            cy.wait(1000);
            cy.getStore().then((store) =>
            {
                expect(store.getters.isLoggedIn).to.be.false;
            });
        });
    });

    it("should display user name", () =>
    {
        cy.login("stefan.standard@plentye2etest.de");
        cy.visit("/myaccount");
        cy.get(".widget-greeting").should("contain", "Hallo, Stefan Standard");
    });

    it("should change mail address", () =>
    {
        cy.login("stefan.standard@plentye2etest.de");
        cy.visit("/myaccount");
        cy.get(".widget-account-settings").find(".add-item").children().first().click();
        cy.intercept("POST", "/rest/io/customer/mail/").as("resetMail");

        cy.getByTestingAttr("change-mail").type("wrongmail@plentye2etest.de", { delay: 40 });
        cy.getByTestingAttr("change-mail-repeat").type("wrongmail@plentye2etest.de", { delay: 40 });
        cy.getByTestingAttr("change-mail-submit").click();

        cy.get(".notification-wrapper").children().first().should("contain", "Eine E-Mail zur Bestätigung der Änderungen wurde an Ihre E-Mail-Adresse gesendet.");

        cy.wait("@resetMail").its("response.statusCode").should("eq", 200);
    });

    it("should NOT change mail address if it already exists", () =>
    {
        cy.login("stefan.standard@plentye2etest.de");
        cy.visit("/myaccount");

        cy.get(".widget-account-settings").find(".add-item").children().first().click();
        cy.intercept("POST", "/rest/io/customer/mail/").as("resetMail");
        cy.getByTestingAttr("change-mail").type("bernd.business@plentye2etest.de", { delay: 40 });
        cy.getByTestingAttr("change-mail-repeat").type("bernd.business@plentye2etest.de", { delay: 40 });
        cy.getByTestingAttr("change-mail-submit").click();

        cy.get(".notification-wrapper").children().first().should("contain", "Für diese E-Mail-Adresse existiert bereits ein Konto.");
        cy.wait("@resetMail").its("response.statusCode").should("eq", 400);
    });

    it("should change password address", () =>
    {
        cy.login("stefan.standard@plentye2etest.de");
        cy.visit("/myaccount");

        cy.intercept("POST", "/rest/io/customer/password/").as("resetPassword");
        cy.get(".widget-account-settings").find(".add-item").children().last().click();
        cy.getByTestingAttr("old-password").type("Testuser1234", { delay: 40 });
        cy.getByTestingAttr("new-password").type("Testuser1234", { delay: 40 });
        cy.getByTestingAttr("new-password-repeat").focus();
        cy.getByTestingAttr("new-password-repeat").type("Testuser1234", { delay: 40 });
        cy.getByTestingAttr("new-password-submit").click();

        cy.get(".notification-wrapper").children().first().should("contain", "Das Passwort wurde erfolgreich geändert.");
        cy.wait("@resetPassword").its("response.statusCode").should("eq", 200);
    });

    it("should NOT change password address if old password is wrong", () =>
    {
        cy.login("stefan.standard@plentye2etest.de");
        cy.visit("/myaccount");

        cy.intercept("POST", "/rest/io/customer/password/").as("resetPassword");
        cy.get(".widget-account-settings").find(".add-item").children().last().click();
        cy.getByTestingAttr("old-password").type("TestuserWrong", { delay: 40 });
        cy.getByTestingAttr("new-password").type("Testuser1234", { delay: 40 });
        cy.getByTestingAttr("new-password-repeat").focus();
        cy.getByTestingAttr("new-password-repeat").type("Testuser1234", { delay: 40 });
        cy.getByTestingAttr("new-password-submit").click();

        cy.get(".notification-wrapper").children().first().should("contain", "Das Passwort konnte nicht geändert werden.");
        cy.wait("@resetPassword").its("response.statusCode").should("eq", 401);
    });

    it("should add new address", () =>
    {
        cy.login("stefan.standard@plentye2etest.de");
        cy.visit("/myaccount");
        cy.getByTestingAttr("add-address").first().click();

        cy.wait(1000);
        cy.getByTestingAttr("invoice-addresses-name-select-de").find(`input[name="firstName"]`).type("Plenty", { delay: 40 });
        cy.getByTestingAttr("invoice-addresses-name-select-de").find(`input[name="lastName"]`).type("Test");
        cy.getByTestingAttr("invoice-addresses-street-select-de").find(`input[name="street"]`).type("Abby Road");
        cy.getByTestingAttr("invoice-addresses-street-select-de").find(`input[name="housenumber"]`).type("1337");
        cy.getByTestingAttr("invoice-addresses-zip-select-de").find(`input[name="zip"]`).type("12345");
        cy.getByTestingAttr("invoice-addresses-town-select-de").find(`input[name="town"]`).type("Kassel");
        cy.getByTestingAttr("modal-submit").first().click();
    });

    it("should add new address", () =>
    {
        cy.login("stefan.standard@plentye2etest.de");
        cy.visit("/myaccount");
        cy.getByTestingAttr("add-address").last().click();

        cy.wait(1000);
        cy.getByTestingAttr("invoice-addresses-name-select-de").find(`input[name="firstName"]`).type("Plenty", { delay: 40 });
        cy.getByTestingAttr("invoice-addresses-name-select-de").find(`input[name="lastName"]`).type("Test");
        cy.getByTestingAttr("invoice-addresses-street-select-de").find(`input[name="street"]`).type("Abby Road");
        cy.getByTestingAttr("invoice-addresses-street-select-de").find(`input[name="housenumber"]`).type("1337");
        cy.getByTestingAttr("invoice-addresses-zip-select-de").find(`input[name="zip"]`).type("12345");
        cy.getByTestingAttr("invoice-addresses-town-select-de").find(`input[name="town"]`).type("Kassel");
        cy.getByTestingAttr("modal-submit").last().click();
    });

    it("should add bank information", () =>
    {
        cy.login("stefan.standard@plentye2etest.de");
        cy.visit("/myaccount");
    });


});
