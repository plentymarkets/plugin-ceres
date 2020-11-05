// / <reference types="cypress" />
context("Checkout shipping", () =>
{
    const DHLID = 6;
    const GLSID = 7;


    function visitCheckoutAsUser()
    {
        cy.visit("/");

        cy.clickElement("login-select");

        // set login data into inputs and submit form
        cy.getByTestingAttr("email-login").type("plentytest@plenty.de", { delay: 30 });
        cy.getByTestingAttr("password-login").type("Testuser1234", { delay: 30 });

        cy.server().route("POST", "/rest/io/customer/login").as("loginUser");

        cy.getByTestingAttr("submit-login").click();

        // wait for login call
        cy.wait("@loginUser").then((xhr) =>
        {
            const itemUrl = "/wohnzimmer/sessel-sofas/loungesessel-herkules_116_1014/";

            cy.visit(itemUrl);

            cy.wait(500);

            cy.get(".add-to-basket-container > button").should("exist");
            cy.get(".add-to-basket-container > button").click();

            cy.visit("/checkout");

            cy.wait(500);
            cy.location("pathname").should("eq", "/checkout/");
        });
    }

    function getShippingProfile(id)
    {
        return cy.get(`[data-id='${id}']`);
    }

    beforeEach(() =>
    {
        cy.visit("/");
    });

    it("should verify that GLS profile and DHL profile exist as User", () =>
    {
        visitCheckoutAsUser();
        getShippingProfile(DHLID).should("exist");
        getShippingProfile(GLSID).should("exist");
    });

    it.only("should verify that GLS profile and DHL profile exist as Guest", () =>
    {
        cy.loginAsGuest();
        getShippingProfile(DHLID).should("exist");
        getShippingProfile(GLSID).should("exist");
    });


    it("should switch between shipping profiles", () =>
    {
        visitCheckoutAsUser();
        getShippingProfile(DHLID).scrollIntoView();

        getShippingProfile(GLSID).click();
        cy.wait(500);
        getShippingProfile(DHLID).click();
        cy.wait(500);
        getShippingProfile(GLSID).click();
    });

    it("should change the shipping costs", () =>
    {
        visitCheckoutAsUser();
        getShippingProfile(DHLID).scrollIntoView();

        getShippingProfile(GLSID).click();

        cy.wait(500);
        cy.getByTestingAttr("shipping-gross").invoke("text").then((text) =>
        {
            const shippingGross = text.replace(/(\r\n|\n|\r|\s)/gm, "");

            expect(shippingGross).to.eql("2,99EUR");
        });
    });

    it("should change shipping profile when address changes", () =>
    {
        visitCheckoutAsUser();
        cy.get("#addressMultiSelect14 > .item-inner").click();
        cy.wait(100);
        cy.get(":nth-child(2) > .item-inner").click();
        cy.wait(500);
        getShippingProfile(DHLID).should("not.exist");
        getShippingProfile(GLSID).should("exist");
        cy.getByTestingAttr("shipping-gross").invoke("text").then((text) =>
        {
            const shippingGross = text.replace(/(\r\n|\n|\r|\s)/gm, "");

            expect(shippingGross).to.eql("10,00EUR");
        });

    });
});
