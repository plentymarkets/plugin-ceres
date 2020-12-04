// / <reference types="cypress" />
context("register / registrierung", () =>
{
    const VALID_PW = "qwe123QWE";
    const MAIL = `user${new Date().valueOf()}@plentye2etest.de`;

    beforeEach(() =>
    {
        cy.visit("/registrierung");
    });

    it("Should check if empty input fields are marked as invalid", () =>
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

    it("Should check if information popper exists, has correct text and is closable", () =>
    {
        cy.get(".btn.btn-icon.btn-secondary.btn-sm").click();
        cy.get(".popover.bs-popover-auto").not('.hidden').find(".popover-body").contains("Durch die Registrierung werden Ihre Adressdaten gespeichert.");
        cy.get(".btn.btn-icon.btn-secondary.btn-sm").click();
        cy.get(".popover.bs-popover-auto").not('.hidden').should('not.exist');
    });

    it("Should check if privacy policy page is linked and can be opened", () =>
    {
        cy.get(".form-check-label a")
            .should('have.attr', 'href')
            .and('include', '/privacy-policy/')
            .then((href) => {
                cy.visit(href)
            })

        cy.url().should("include", "/privacy-policy/");
    });

    it("Should check if registering an existing account is denied", () =>
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

    it("Should check if registering as a person is succesfull", () =>
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

        cy.server().route("POST", "/rest/io/customer").as("registerUser");

        // add alias to register function

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

        cy.location("pathname").should("eq", "/");
    });

    it.only("Should check if registering as a company is succesfull", () =>
    {
        cy.getByTestingAttr("mail-register").type(MAIL);
        cy.getByTestingAttr("password-register").type(VALID_PW);
        cy.getByTestingAttr("repeat-password-register").type(VALID_PW);
        cy.getByTestingAttr("salutation-select").select("company");
        cy.get("[data-model='name1']").type("g");
        cy.get("[data-model='address1']").type("g");
        cy.get("[data-model='address2']").type("g");
        cy.get("[data-model='postalCode']").type("g");
        cy.get("[data-model='town']").type("g");
        cy.getByTestingAttr("privacy-policy-accept-register").click();

        cy.server().route("POST", "/rest/io/customer").as("registerUser");

        // add alias to register function

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

        cy.location("pathname").should("eq", "/");
        cy.get("#accountMenuList")
    });

    it("Should check if form fields are changing after select country to United Kingdom", () =>
    {
        
        cy.get("[data-model='countryId'] .custom-select").select("12");
        cy.getByTestingAttr("addresses").should("exist");
        // cy.get 
        // cy.get(".popover.bs-popover-auto").not('.hidden').should('not.exist');
    });
});
