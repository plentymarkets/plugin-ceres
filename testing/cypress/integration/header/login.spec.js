// / <reference types="cypress" />
context("Header topbar login", () =>
{
    beforeEach(() =>
    {
        cy.visit("/");
    });

    it("should open login modal", () =>
    {
        cy.clickElement("login-select");
    });

    it("should login successfuly", () =>
    {
        cy.clickElement("login-select");

        // set login data into inputs and submit form
        cy.getByTestingAttr("email-login").type("plentytest@plenty.de", { delay: 30 });
        cy.getByTestingAttr("password-login").type("Testuser1234", { delay: 30 });

        cy.server().route("POST", "/rest/io/customer/login/").as("loginUser");

        cy.getByTestingAttr("submit-login").click();

        // wait for login call
        cy.wait("@loginUser").then((xhr) =>
        {
            expect(xhr.status).to.eql(200);

            // wait for vue store to init after page reload
            cy.wait(1000);
            cy.getStore().then((store) =>
            {
                expect(store.getters.isLoggedIn).to.be.true;
            });
        });
    });

    // it("should fail to login", () =>
    // {
    //     cy.clickElement("login-select");

    //     // set login data into inputs and submit form
    //     cy.getByTestingAttr("email-login").type("plentytest@plenty.de", { delay: 30 });
    //     cy.getByTestingAttr("password-login").type("wrongpassword", { delay: 30 });

    //     cy.server().route("POST", "/rest/io/customer/login").as("loginUser");

    //     cy.getByTestingAttr("submit-login").click();

    //     // wait for login call
    //     cy.wait("@loginUser").then((xhr) =>
    //     {
    //         expect(xhr.status).to.eql(401);
    //     });
    // });
});
