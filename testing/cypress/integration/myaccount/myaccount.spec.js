const { iteratee } = require("lodash");

// / <reference types="cypress" />
context("Myaccount", () =>
{

    beforeEach(() =>
    {

    });

    it("should logut", () =>
    {
        cy.login("stefan.standard@plentye2etest.de");
        cy.visit("/myaccount");
        cy.server().route("POST", "/rest/io/customer/logout").as("logoutUser");

        cy.get(".widget-logout-button").click();

        cy.wait("@logoutUser").then((xhr) =>
        {
            expect(xhr.status).to.eql(200);

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
    });

    it.only("should change password address", () =>
    {
        cy.login("stefan.standard@plentye2etest.de");
        cy.visit("/myaccount");

        cy.server().route("POST", "/rest/io/customer/password/").as("resetPassword");

        cy.get(".widget-account-settings").find(".add-item").children().last().click();
        cy.getByTestingAttr("old-password").type("Testuser1234", { delay: 40 });
        cy.getByTestingAttr("new-password").type("Testuser1234", { delay: 40 });
        cy.getByTestingAttr("new-password-repeat").focus();
        cy.getByTestingAttr("new-password-repeat").type("Testuser1234", { delay: 40 });
        cy.getByTestingAttr("new-password-submit").click();
        cy.get(".widget-logout-button").click();

        cy.get(".notification-wrapper").children().first().should("contain", "Das Passwort wurde erfolgreich geändert.");

        cy.wait("@resetPassword").then((xhr) =>
        {
            expect(xhr.status).to.eql(200);
        });
    });


});
