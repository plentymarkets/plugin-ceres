// / <reference types="cypress" />
context("Checkout payment provider", () =>
{
    const CASH_ON_DELIVERY = 1;
    const INVOICE_ID = 2;
    const PRE_PAYMENT_ID = 6000;
    const PAY_PAL_ID = 6001;

    it("Should visit the checkout as user", () =>
    {
        visitCheckoutAsUser();
    });

    it("Should visit the checkout as guest", () =>
    {
        cy.login();
    });

    // TODO check vuex store after every change
    it("Should change payment providers as user", () =>
    {
        visitCheckoutAsUser();
        cy.get(`[data-id='${PRE_PAYMENT_ID}']`).click();
        cy.get(`[data-id='${PRE_PAYMENT_ID}']`).find("input").should("have.be.checked");
        cy.wait(500);
        cy.get(`[data-id='${INVOICE_ID}']`).click();
        cy.get(`[data-id='${INVOICE_ID}']`).find("input").should("have.be.checked");
        cy.wait(500);
        cy.get(`[data-id='${CASH_ON_DELIVERY}']`).click();
        cy.get(`[data-id='${CASH_ON_DELIVERY}']`).find("input").should("have.be.checked");
        cy.wait(500);
        cy.get(`[data-id='${PAY_PAL_ID}']`).click();
        cy.get(`[data-id='${PAY_PAL_ID}']`).find("input").should("have.be.checked");
    });

    // TODO check vuex store after every change
    it("Should change payment providers as guest", () =>
    {
        visitCheckoutAsGuest();
        cy.get(`[data-id='${PRE_PAYMENT_ID}']`).click();
        cy.get(`[data-id='${PRE_PAYMENT_ID}']`).find("input").should("have.be.checked");
        cy.wait(500);
        cy.get(`[data-id='${INVOICE_ID}']`).click();
        cy.get(`[data-id='${INVOICE_ID}']`).find("input").should("have.be.checked");
        cy.wait(500);
        cy.get(`[data-id='${CASH_ON_DELIVERY}']`).click();
        cy.get(`[data-id='${CASH_ON_DELIVERY}']`).find("input").should("have.be.checked");
        cy.wait(500);
        cy.get(`[data-id='${PAY_PAL_ID}']`).click();
        cy.get(`[data-id='${PAY_PAL_ID}']`).find("input").should("have.be.checked");
    });

    it("Should have every payment provider visible as user", () =>
    {
        visitCheckoutAsUser();
        cy.get(`[data-id='${INVOICE_ID}']`).should("exist");
        cy.get(`[data-id='${PRE_PAYMENT_ID}']`).should("exist");
        cy.get(`[data-id='${CASH_ON_DELIVERY}']`).should("exist");
        cy.get(`[data-id='${PAY_PAL_ID}']`).should("exist");
    });

    it("Should have every payment provider visible as guest", () =>
    {
        visitCheckoutAsGuest();
        cy.get(`[data-id='${INVOICE_ID}']`).should("exist");
        cy.get(`[data-id='${PRE_PAYMENT_ID}']`).should("exist");
        cy.get(`[data-id='${CASH_ON_DELIVERY}']`).should("exist");
        cy.get(`[data-id='${PAY_PAL_ID}']`).should("exist");
    });

    it("Should pay with cash on delivery as user", () =>
    {
        visitCheckoutAsUser();
        cy.get(`[data-id='${CASH_ON_DELIVERY}']`).click();
        cy.get(`[data-id='${CASH_ON_DELIVERY}']`).find("input").should("have.be.checked");
        completeOrder();
        cy.get(`[id*=payment_name]`).should("contain", "Nachnahme");
    });

    it("Should pay with cash on delivery as guest", () =>
    {
        visitCheckoutAsGuest();
        cy.get(`[data-id='${CASH_ON_DELIVERY}']`).click();
        cy.get(`[data-id='${CASH_ON_DELIVERY}']`).find("input").should("have.be.checked");
        completeOrder();
        cy.get(`[id*=payment_name]`).should("contain", "Nachnahme");
    });

    it("Should pay with invoice as user", () =>
    {
        visitCheckoutAsUser();
        cy.get(`[data-id='${INVOICE_ID}']`).click();
        cy.get(`[data-id='${INVOICE_ID}']`).find("input").should("have.be.checked");
        completeOrder();
        cy.get(`[id*=payment_name]`).should("contain", "Rechnung");
    });

    it("Should pay with invoice as guest", () =>
    {
        visitCheckoutAsGuest();
        cy.get(`[data-id='${INVOICE_ID}']`).click();
        cy.get(`[data-id='${INVOICE_ID}']`).find("input").should("have.be.checked");
        completeOrder();
        cy.get(`[id*=payment_name]`).should("contain", "Rechnung");
    });

    it("Should pay with pre payment as user", () =>
    {
        visitCheckoutAsUser();
        cy.get(`[data-id='${PRE_PAYMENT_ID}']`).click();
        cy.get(`[data-id='${PRE_PAYMENT_ID}']`).find("input").should("have.be.checked");
        completeOrder();
        cy.get(`[id*=payment_name]`).should("contain", "Vorkasse");
    });

    it("Should pay with pre payment as guest", () =>
    {
        visitCheckoutAsGuest();
        cy.get(`[data-id='${PRE_PAYMENT_ID}']`).click();
        cy.get(`[data-id='${PRE_PAYMENT_ID}']`).find("input").should("have.be.checked");
        completeOrder();
        cy.get(`[id*=payment_name]`).should("contain", "Vorkasse");
    });

    // it("Should pay with paypal as user", () =>
    // {
    // TODO
    // visitCheckoutAsUser();
    // cy.get(`[data-id='${PAY_PAL_ID}']`).click();
    // cy.get(`[data-id='${PAY_PAL_ID}']`).find("input").should("have.be.checked");
    // cy.get("input[id^=gtc-accept]").click();
    // cy.getByTestingAttr("place-order").click();
    // cy.visit("/bestellbestaetigung");
    // cy.location("pathname").should("eq", "/bestellbestaetigung/");
    // cy.get(`[id*=payment_name]`).should("contain", "PayPal");
    // });

    // it.only("Should pay with paypal as guest", () =>
    // {

    // });

    function visitCheckoutAsUser()
    {
        cy.login();
        cy.addBasketItem(1014);
        cy.visit("/checkout");
        cy.location("pathname").should("eq", "/checkout/");
    }

    function visitCheckoutAsGuest()
    {
        cy.loginAsGuest();
        cy.addBasketItem(1014);
        cy.visit("/checkout");
        cy.location("pathname").should("eq", "/checkout/");
        addAddress();
    }

    function completeOrder()
    {
        cy.get("input[id^=gtc-accept]").click();
        cy.getByTestingAttr("place-order").click();
        cy.location("pathname").should("eq", "/bestellbestaetigung/");
    }

    function addAddress()
    {
        cy.wait(1000);
        cy.getByTestingAttr("invoice-addresses-name-select-de").find(`input[name="firstName"]`).type("Plenty", { delay: 40 });
        cy.getByTestingAttr("invoice-addresses-name-select-de").find(`input[name="lastName"]`).type("Test");
        cy.getByTestingAttr("invoice-addresses-street-select-de").find(`input[name="street"]`).type("Abby Road");
        cy.getByTestingAttr("invoice-addresses-street-select-de").find(`input[name="housenumber"]`).type("1337");
        cy.getByTestingAttr("invoice-addresses-zip-select-de").find(`input[name="zip"]`).type("12345");
        cy.getByTestingAttr("invoice-addresses-town-select-de").find(`input[name="town"]`).type("Kassel");
        cy.getByTestingAttr("modal-submit").first().click();
    }
});
