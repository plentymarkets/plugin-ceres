// / <reference types="cypress" />
context("Header Topbar", () =>
{
    beforeEach(() =>
    {
        cy.visit("/");
    });

    it("loads the homepage", () =>
    {
        cy.location("pathname").should("eq", "/");
        // checks if the logo exists
        cy.get(".brand-wrapper").should("exist");
    });

    it("should open languages and list languages", () =>
    {
        cy.getByTestingAttr("languageToggle").should("exist");
        cy.getByTestingAttr("languageToggle").click();
        cy.get('#countrySettings').should("have.class", "show");
        cy.getByTestingAttr("lang-select-de").should("exist")
    });

    it("should change language to 'en'", () => 
    {
        // open lang list
        cy.getByTestingAttr("languageToggle").click();
        cy.get('#countrySettings').should("have.class", "show");

        // select en as shop language
        cy.getByTestingAttr("lang-select-en").click();
        cy.location("pathname").should("eq", "/en");

        // lang icon in topbar should be en
        cy.getByTestingAttr("languageToggle").children().first().should("have.class", "flag-icon-en");
    });


    it("should open currencies on click", () =>
    {
        cy.getByTestingAttr("currencySelect").should("exist");
        cy.getByTestingAttr("currencySelect").click();
    });

    it("should open currencies and select USD as currency", () =>
    {
        cy.getByTestingAttr("currencySelect").should("exist");
        cy.getByTestingAttr("currencySelect").click();
        cy.getByTestingAttr("USD").should("exist");
        cy.getByTestingAttr("USD").click();
        cy.url().should('include', 'currency=USD');
    });

    it("should open login modal", () =>
    {
        cy.getByTestingAttr("loginSelect").should("exist");
        cy.getByTestingAttr("loginSelect").click();
    });

    it.only("should open login modal", () =>
    {

        cy.server()
        cy.getByTestingAttr("loginSelect").should("exist");
        cy.getByTestingAttr("loginSelect").click();
        cy.getByTestingAttr('emailLogin').type('minecrafteminem@gmail.com', {delay: 20});
        cy.getByTestingAttr('passwordLogin').type('Testuser1234', {delay: 20});

        cy.getByTestingAttr('submitLogin').click();

        cy.wait(15000).then((xhr) => {

            cy.wait(5000);
            cy.getStore().then((store) =>
            {
                console.log(store);

                expect(store.getters.isLoggedIn).to.be.true;
            });
        })

    });

    it("should open registration modal", () => 
    {
        cy.getByTestingAttr("registerSelect").should("exist");
        cy.getByTestingAttr("registerSelect").click();
    });

    it("should check for search bar", () => 
    {
    });

    it("should open basket preview", () => 
    {
    });

    it("should open wishlist", () => 
    {
    });



});
