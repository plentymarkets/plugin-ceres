// / <reference types="cypress" />
context("my-account", () =>
{
    beforeEach(() =>
    {
        cy.login("stefan.standard@plentye2etest.de");
        cy.visit("/myaccount/");
    });

    it("should logout", () =>
    {
        cy.intercept("POST", "/rest/io/customer/logout").as("logoutUser");

        cy.get(".widget-logout-button").click();

        cy.wait("@logoutUser").then((res) =>
        {
            expect(res.response.statusCode).to.eql(200);

            // wait for vue store to init after page reload
            cy.wait(500);
            cy.getStore().then((store) =>
            {
                expect(store.getters.isLoggedIn).to.be.false;
            });
        });
    });

    it("should display user name", () =>
    {
        cy.get(".widget-greeting").should("contain", "Hallo, Stefan Standard");
    });

    it("should change mail address", () =>
    {
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
        cy.get(".widget-account-settings").find(".add-item").children().first().click();
        cy.intercept("POST", "/rest/io/customer/mail/").as("resetMail");
        cy.getByTestingAttr("change-mail").type("bernd.business@plentye2etest.de", { delay: 40 });
        cy.getByTestingAttr("change-mail-repeat").type("bernd.business@plentye2etest.de", { delay: 40 });
        cy.getByTestingAttr("change-mail-submit").click();

        cy.get(".notification-wrapper").children().first().should("contain", "Für diese E-Mail-Adresse existiert bereits ein Konto.");
        cy.wait("@resetMail").its("response.statusCode").should("eq", 400);
    });

    it("should change password", () =>
    {
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

    it("should add bank information", () =>
    {
        cy.getByTestingAttr("add-bank-data").click();
        cy.get(".modal.show").should("exist");
        cy.getByTestingAttr("address-account-owner").type("g", { delay: 40 });
        cy.getByTestingAttr("address-bank-name").type("g", { delay: 40 });
        cy.getByTestingAttr("address-iban").type("NL06INGB7948612920", { delay: 40 });
        cy.getByTestingAttr("address-bic").type("GENODE51KS1", { delay: 40 });

        cy.intercept("POST", "/rest/io/customer/bank_data/").as("addBankData");
        cy.getByTestingAttr("address-bank-submit").click();
        cy.get(".notification-wrapper").children().first().should("contain", "Bankdaten hinzugefügt");
        cy.wait("@addBankData").its("response.statusCode").should("eq", 201);
    });

    it("should delete bank data", () =>
    {
        cy.get("#bankData").click();

        cy.getByTestingAttr("bank-data-set").invoke("attr", "for").then(($for) => {
            cy.intercept("DELETE", "/rest/io/customer/bank_data/" + $for).as("deleteBankData");

            cy.getByTestingAttr("bank-data-set").find(".item-remove").click();

            cy.get(".modal.show").should("exist");
            cy.getByTestingAttr("bank-data-delete-confirm").wait(100).click();
            cy.wait("@deleteBankData").its("response.statusCode").should("eq", 200);

            cy.get(".notification-wrapper").children().first().should("contain", "Bankdaten gelöscht");
        })
    });

    it("should validate bank information", () =>
    {
        cy.getByTestingAttr("add-bank-data").click();
        cy.getByTestingAttr("address-bank-submit").click();
        cy.getByTestingAttr("address-account-owner").parent().should("have.class", "error");
        cy.getByTestingAttr("address-iban").type("g", { delay: 40 });
        cy.getByTestingAttr("address-iban").parent().should("have.class", "error");
        cy.getByTestingAttr("address-bic").type("g", { delay: 40 });
        cy.getByTestingAttr("address-bic").parent().should("have.class", "error");
    });
});
