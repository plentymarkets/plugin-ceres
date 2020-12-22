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
        loginAsUser();
        getShippingProfile(DHLID).should("exist");
        getShippingProfile(GLSID).should("exist");
    });

    it("should verify that GLS profile and DHL profile exist as Guest", () =>
    {
        loginAsGuest();
        getShippingProfile(DHLID).should("exist");
        getShippingProfile(GLSID).should("exist");
    });


    it("should switch between shipping profiles", () =>
    {
        loginAsUser();
        getShippingProfile(DHLID).scrollIntoView();
        getShippingProfile(GLSID).click();
        cy.wait(500);
        getShippingProfile(DHLID).click();
        cy.wait(500);
        getShippingProfile(GLSID).click();
    });

    it("should switch between shipping profiles as Guest", () =>
    {
        loginAsGuest();
        getShippingProfile(DHLID).scrollIntoView();
        getShippingProfile(GLSID).click();
        cy.wait(500);
        getShippingProfile(DHLID).click();
        cy.wait(500);
        getShippingProfile(GLSID).click();
    });

    it("should change the shipping costs", () =>
    {
        loginAsUser();
        getShippingProfile(DHLID).scrollIntoView();
        getShippingProfile(GLSID).click();

        cy.wait(500);
        cy.getByTestingAttr("shipping-amount").invoke("text").then((text) =>
        {
            const shippingGross = text.replace(/(\r\n|\n|\r|\s)/gm, "");

            expect(shippingGross).to.eql("2,99EUR");
        });
    });

    it("should change the shipping costs as Guest", () =>
    {
        loginAsGuest();
        getShippingProfile(DHLID).scrollIntoView();
        getShippingProfile(GLSID).click();

        cy.wait(1000);
        cy.getByTestingAttr("shipping-amount").invoke("text").then((text) =>
        {
            const shippingGross = text.replace(/(\r\n|\n|\r|\s)/gm, "");

            expect(shippingGross).to.eql("2,99EUR");
        });
    });

    it("should change shipping profile when address changes", () =>
    {
        loginAsUser();
        cy.get("#addressMultiSelect14 > .item-inner").click();
        cy.wait(100);
        cy.get(":nth-child(2) > .item-inner").click();
        cy.wait(500);
        getShippingProfile(DHLID).should("not.exist");
        getShippingProfile(GLSID).should("exist");
        cy.getByTestingAttr("shipping-amount").invoke("text").then((text) =>
        {
            const shippingGross = text.replace(/(\r\n|\n|\r|\s)/gm, "");

            expect(shippingGross).to.eql("10,00EUR");
        });

    });

    it("should change shipping profile when address changes as Guest", () =>
    {
        cy.loginAsGuest();
        cy.addBasketItem(1014);
        cy.visit("/checkout/");
        cy.wait(1000);

        addAddress(false);
        cy.getByTestingAttr("address-country-select").first().find(".custom-select").select("United Kingdom");
        cy.getByTestingAttr("modal-submit").first().click();

        getShippingProfile(DHLID).should("not.exist");
        getShippingProfile(GLSID).should("exist");
        cy.getByTestingAttr("shipping-amount").invoke("text").then((text) =>
        {
            const shippingGross = text.replace(/(\r\n|\n|\r|\s)/gm, "");

            expect(shippingGross).to.eql("10,00EUR");
        });
    });

    function loginAsUser()
    {
        cy.login();
        cy.addBasketItem(1014);
        cy.visit("/checkout/");
    }

    function loginAsGuest()
    {
        cy.loginAsGuest();
        cy.addBasketItem(1014);
        cy.visit("/checkout/");
        addAddress();
    }

    function addAddress(submit = true)
    {
        cy.wait(1000);
        cy.getByTestingAttr("billing-address-de-name-inputs").find(`input[name="firstName"]`).type("Plenty", { delay: 40 });
        cy.getByTestingAttr("billing-address-de-name-inputs").find(`input[name="lastName"]`).type("Test");
        cy.getByTestingAttr("billing-address-de-street-inputs").find(`input[name="street"]`).type("Abby Road");
        cy.getByTestingAttr("billing-address-de-street-inputs").find(`input[name="housenumber"]`).type("1337");
        cy.getByTestingAttr("billing-address-de-zip").type("12345");
        cy.getByTestingAttr("billing-address-de-town").type("Kassel");
        if (submit)
        {
            cy.getByTestingAttr("modal-submit").first().click();
        }
    }
});
