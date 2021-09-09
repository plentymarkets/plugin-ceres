// / <reference types="cypress" />
context("Header topbar registration", () =>
{
    beforeEach(() =>
    {
        cy.visit("/");
    });

    it("should open quick registration modal", () =>
    {
        cy.clickElement("register-select");
    });

    it("should register a new user successfuly", () =>
    {

        cy.clickElement("register-select");

        const mail = `user${new Date().valueOf()}@plentye2etest.de`;

        const password = "Testuser1234";

        cy.getByTestingAttr("mail-register").type(mail, { delay: 40 });
        cy.getByTestingAttr("password-register").type(password, { delay: 30 });
        cy.getByTestingAttr("repeat-password-register").type(password, { delay: 30 });
        cy.getByTestingAttr("privacy-policy-accept-register").click();

        // add alias to register function
        cy.server().route("POST", "/rest/io/customer/").as("registerUser");

        cy.getByTestingAttr("register-submit").click();

        cy.wait("@registerUser").then((xhr) =>
        {

            expect(xhr.status).to.eql(200);

            // wait for vue store to init after page reload
            cy.wait(1500);
            cy.getStore().then((store) =>
            {
                expect(store.getters.isLoggedIn).to.be.true;
            });
        });

    });

    it("should fail to register a new user | mail already in use", () =>
    {

        cy.clickElement("register-select");

        const password = "Testuser1234";

        cy.getByTestingAttr("mail-register").type("x").clear().type("plentytest@plenty.de", { delay: 40 });
        cy.getByTestingAttr("password-register").type(password, { delay: 30 });
        cy.getByTestingAttr("repeat-password-register").type(password, { delay: 30 });
        cy.getByTestingAttr("privacy-policy-accept-register").click();

        // add alias to register function
        cy.server().route("POST", "/rest/io/customer/").as("registerUser");

        cy.getByTestingAttr("register-submit").click();

        cy.wait("@registerUser").then((xhr) =>
        {
            // email already in use
            expect(xhr.status).to.eql(226);
        });

    });

    it("should fail to register a new user | passwords dont match", () =>
    {

        cy.clickElement("register-select");

        const mail = "plentytest@plenty.de";
        const password = "Testuser1234";

        cy.getByTestingAttr("mail-register").type(mail, { delay: 40 });
        cy.getByTestingAttr("password-register").type(password, { delay: 30 });
        cy.getByTestingAttr("repeat-password-register").type("wrongPassword1337", { delay: 30 });
        cy.getByTestingAttr("privacy-policy-accept-register").click();
        cy.getByTestingAttr("register-submit").click();

        cy.getByTestingAttr("repeat-password-register").parent().should("have.class", "error");
    });

    it("should fail to register a new user | privacy policy not accepted", () =>
    {

        cy.clickElement("register-select");

        const mail = "plentytest@plenty.de";

        const password = "Testuser1234";

        cy.getByTestingAttr("mail-register").type(mail, { delay: 30 });
        cy.getByTestingAttr("password-register").type(password, { delay: 30 });
        cy.getByTestingAttr("repeat-password-register").type(password, { delay: 30 });
        cy.getByTestingAttr("register-submit").click();

        cy.getByTestingAttr("privacy-policy-accept-register").parent().should("have.class", "error");

    });

    it("should fail to register a new user | no vaild mail pattern", () =>
    {

        cy.clickElement("register-select");

        const mail = "plentytest@plenty";

        const password = "Testuser1234";

        cy.getByTestingAttr("mail-register").type(mail, { delay: 40 });
        cy.getByTestingAttr("password-register").type(password, { delay: 30 });
        cy.getByTestingAttr("repeat-password-register").type(password, { delay: 30 });
        cy.getByTestingAttr("privacy-policy-accept-register").click();

        cy.getByTestingAttr("register-submit").click();

        cy.getByTestingAttr("mail-register").parent().should("have.class", "error");

    });
});
