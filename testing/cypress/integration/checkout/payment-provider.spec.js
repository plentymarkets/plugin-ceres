// / <reference types="cypress" />
context("Homepage", () =>
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
        cy.get(`[data-id='${INVOICE_ID}']`).click();
        cy.get(`[data-id='${INVOICE_ID}']`).find("input").should("have.be.checked");
        cy.wait(500);
        cy.get(`[data-id='${CASH_ON_DELIVERY}']`).click();
        cy.get(`[data-id='${CASH_ON_DELIVERY}']`).find("input").should("have.be.checked");
        cy.wait(500);
        cy.get(`[data-id='${PAY_PAL_ID}']`).click();
        cy.get(`[data-id='${PAY_PAL_ID}']`).find("input").should("have.be.checked");
    });

    it("Should change payment providers as guest", () =>
    {

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

    });

    // it("Should pay with paypal as user", () =>
    // {
    //     visitCheckoutAsUser();
    //     cy.get(`[data-id='${PAY_PAL_ID}']`).click();
    //     cy.get(`[data-id='${PAY_PAL_ID}']`).find("input").should("have.be.checked");
    //     completeOrder();
    //     cy.get(`[id*=payment_name]`).should("contain", "PayPal");
    // });

    it("Should pay with paypal as guest", () =>
    {

    });

    function visitCheckoutAsUser()
    {
        cy.login();
        cy.addBasketItem(1014);
        cy.visit("/checkout");
        cy.location("pathname").should("eq", "/checkout/");
    }

    function completeOrder()
    {
        cy.get("input[id^=gtc-accept]").click();
        cy.getByTestingAttr("place-order").click();
        cy.location("pathname").should("eq", "/bestellbestaetigung/");
    }
});
