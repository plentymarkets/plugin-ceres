// / <reference types="cypress" />
context("Checkout shipping", () =>
{
    const DHLID = 6;
    const GLSID = 7;

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
        cy.loginAsUser();
        getShippingProfile(DHLID).should("exist");
        getShippingProfile(GLSID).should("exist");
    });

    it("should verify that GLS profile and DHL profile exist as Guest", () =>
    {
        cy.loginAsGuest();
        getShippingProfile(DHLID).should("exist");
        getShippingProfile(GLSID).should("exist");
    });


    it("should switch between shipping profiles", () =>
    {
        cy.loginAsUser();
        getShippingProfile(DHLID).scrollIntoView();

        getShippingProfile(GLSID).click();
        cy.wait(500);
        getShippingProfile(DHLID).click();
        cy.wait(500);
        getShippingProfile(GLSID).click();
    });

    it("should switch between shipping profiles as Guest", () =>
    {
        cy.loginAsGuest();
        getShippingProfile(DHLID).scrollIntoView();

        getShippingProfile(GLSID).click();
        cy.wait(500);
        getShippingProfile(DHLID).click();
        cy.wait(500);
        getShippingProfile(GLSID).click();
    });

    it("should change the shipping costs", () =>
    {
        cy.loginAsUser();
        getShippingProfile(DHLID).scrollIntoView();

        getShippingProfile(GLSID).click();

        cy.wait(500);
        cy.getByTestingAttr("shipping-gross").invoke("text").then((text) =>
        {
            const shippingGross = text.replace(/(\r\n|\n|\r|\s)/gm, "");

            expect(shippingGross).to.eql("2,99EUR");
        });
    });

    it("should change the shipping costs as Guest", () =>
    {
        cy.loginAsGuest();
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
        cy.loginAsUser();
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

    it("should change shipping profile when address changes as Guest", () =>
    {
        const itemUrl = "/wohnzimmer/sessel-sofas/loungesessel-herkules_116_1014/";

        cy.visit(itemUrl);
        cy.wait(500);

        cy.get(".add-to-basket-container > button").should("exist");
        cy.get(".add-to-basket-container > button").click();

        cy.visit("/checkout");
        cy.wait(100);
        cy.getByTestingAttr("guest-login-input").type(`user${new Date().valueOf()}@plentye2etest.de`);
        cy.getByTestingAttr("guest-login-button").click();
        cy.wait(1000);
        cy.getByTestingAttr("invoice-addresses-name-select-de").find(`input[name="firstName"]`).type("Plenty", { delay: 40 });
        cy.getByTestingAttr("invoice-addresses-name-select-de").find(`input[name="lastName"]`).type("Test");

        cy.getByTestingAttr("invoice-addresses-street-select-de").find(`input[name="street"]`).type("Abby Road");
        cy.getByTestingAttr("invoice-addresses-street-select-de").find(`input[name="housenumber"]`).type("1337");

        cy.getByTestingAttr("invoice-addresses-zip-select-de").find(`input[name="zip"]`).type("12345");

        cy.getByTestingAttr("invoice-addresses-town-select-de").find(`input[name="town"]`).type("Kassel");

        cy.getByTestingAttr("address-country-select").first().find(".custom-select").select("United Kingdom");

        cy.getByTestingAttr("modal-submit").first().click();

        getShippingProfile(DHLID).should("not.exist");
        getShippingProfile(GLSID).should("exist");
        cy.getByTestingAttr("shipping-gross").invoke("text").then((text) =>
        {
            const shippingGross = text.replace(/(\r\n|\n|\r|\s)/gm, "");

            expect(shippingGross).to.eql("10,00EUR");
        });
    });
});
