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

    it("Should change payment providers as user", () =>
    {
        visitCheckoutAsUser();
        cy.get(`[data-id='${PRE_PAYMENT_ID}']`).click();
        cy.get(`[data-id='${PRE_PAYMENT_ID}']`).find("input").should("have.be.checked");
        cy.wait(500);
        cy.getStore().then((store) =>
        {
            expect(store.state.checkout.payment.methodOfPaymentId).to.be.equal(PRE_PAYMENT_ID);
        });
        cy.get(`[data-id='${INVOICE_ID}']`).click();
        cy.get(`[data-id='${INVOICE_ID}']`).find("input").should("have.be.checked");
        cy.wait(500);
        cy.getStore().then((store) =>
        {
            expect(store.state.checkout.payment.methodOfPaymentId).to.be.equal(INVOICE_ID);
        });
        cy.get(`[data-id='${CASH_ON_DELIVERY}']`).click();
        cy.get(`[data-id='${CASH_ON_DELIVERY}']`).find("input").should("have.be.checked");
        cy.wait(500);
        cy.getStore().then((store) =>
        {
            expect(store.state.checkout.payment.methodOfPaymentId).to.be.equal(CASH_ON_DELIVERY);
        });
        cy.get(`[data-id='${PAY_PAL_ID}']`).click();
        cy.get(`[data-id='${PAY_PAL_ID}']`).find("input").should("have.be.checked");
        cy.getStore().then((store) =>
        {
            expect(store.state.checkout.payment.methodOfPaymentId).to.be.equal(PAY_PAL_ID);
        });
    });

    it("Should change payment providers as guest", () =>
    {
        visitCheckoutAsGuest();
        cy.get(`[data-id='${PRE_PAYMENT_ID}']`).click();
        cy.get(`[data-id='${PRE_PAYMENT_ID}']`).find("input").should("have.be.checked");
        cy.wait(500);
        cy.getStore().then((store) =>
        {
            expect(store.state.checkout.payment.methodOfPaymentId).to.be.equal(PRE_PAYMENT_ID);
        });
        cy.get(`[data-id='${INVOICE_ID}']`).click();
        cy.get(`[data-id='${INVOICE_ID}']`).find("input").should("have.be.checked");
        cy.wait(500);
        cy.getStore().then((store) =>
        {
            expect(store.state.checkout.payment.methodOfPaymentId).to.be.equal(INVOICE_ID);
        });
        cy.get(`[data-id='${CASH_ON_DELIVERY}']`).click();
        cy.get(`[data-id='${CASH_ON_DELIVERY}']`).find("input").should("have.be.checked");
        cy.wait(500);
        cy.getStore().then((store) =>
        {
            expect(store.state.checkout.payment.methodOfPaymentId).to.be.equal(CASH_ON_DELIVERY);
        });
        cy.get(`[data-id='${PAY_PAL_ID}']`).click();
        cy.get(`[data-id='${PAY_PAL_ID}']`).find("input").should("have.be.checked");
        cy.getStore().then((store) =>
        {
            expect(store.state.checkout.payment.methodOfPaymentId).to.be.equal(PAY_PAL_ID);
        });
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
        cy.visit("/checkout/");
        cy.location("pathname").should("eq", "/checkout/");
    }

    function visitCheckoutAsGuest()
    {
        cy.loginAsGuest();
        cy.addBasketItem(1014);
        cy.visit("/checkout/");
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
        // Force Modal
        cy.getByTestingAttr("billing-address-select-add").click({ force: true });

        cy.getByTestingAttr("billing-address-de-name-inputs").find(`input[name="firstName"]`).type("x").clear().type("Plenty", { delay: 40 });
        cy.getByTestingAttr("billing-address-de-name-inputs").find(`input[name="lastName"]`).type("Test");
        cy.getByTestingAttr("billing-address-de-street-inputs").find(`input[name="street"]`).type("Abby Road");
        cy.getByTestingAttr("billing-address-de-street-inputs").find(`input[name="housenumber"]`).type("1337");
        cy.getByTestingAttr("billing-address-de-zip").type("12345");
        cy.getByTestingAttr("billing-address-de-town").type("Kassel");
        cy.getByTestingAttr("modal-submit").first().click();
    }
});
