// / <reference types="cypress" />
context("Default Login Page", () =>
{
    beforeEach(() =>
    {
        cy.visit("/login/");
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

    it("should login successfully", () =>
    {
        cy.getByTestingAttr("email-login").type("ceres-testing@opentrash.com", { delay: 30 });
        cy.getByTestingAttr("password-login").type("8#TfhMB@QVd668T", { delay: 30 });

        cy.server().route("POST", "/rest/io/customer/login").as("loginUser");

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
    });

    it("should check guest login form for error if required fields are empty", () =>
    {
        cy.getByTestingAttr("guest-login-button").click();
        cy.getByTestingAttr("guest-login-input").parent().should("have.class", "error");
        cy.get(".error-msg").should("contain", "Bitte geben Sie eine gültige E-Mail-Adresse an.");
    });

    it("should check if link to guest login page works", () =>
    {
        cy.getByTestingAttr("guest-login-input").type("ceres-testing@opentrash.com", { delay: 30 });
        cy.getByTestingAttr("guest-login-button").click();

        cy.server().route("POST", "/");
    });

    // it("should check for valid email at guest login", () =>
    // {
    //     const $input = cy.get(".login-pwd-reset input")
    //     cy.get($input).type("blablabla");
    //     cy.get(".btn.btn-primary.btn-appearance.btn-medium.float-right").click(); =>
    //     {
    //         if ($btn.hasClass('active'))
    //         {
    //             cy.get
    //         }
    //         else
    //         {
    //             cy.get(".error-msg").should("contain", "Bitte geben Sie eine gültige E-Mail-Adresse an.");
    //         }
    //     }
    // });

    //'Passwort vergessen' ist ein Overlay Fenster. Test muss noch angepasst werden
    // it("should check if forgotten password link works", () =>
    // {
    //     cy.get(".small.text-appearance")
    //         .should('have.attr', 'href')
    //         .and('include', 'javascript:void(0)')
    //         .then((href) => {
    //             cy.visit(href)
    //         })
    // });
});
