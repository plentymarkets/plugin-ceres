// / <reference types="cypress" />
context("Homepage", () =>
{
    const CASH_ON_DELIVERY = 1;
    const INVOICE_ID = 2;
    const PRE_PAYMENT_ID = 6000;

    it("Should visit the checkout as user", () =>
    {
        visitCheckoutAsUser();
    });

    // it.only("Should visit the checkout as guest", () =>
    // {
    //     visitCheckoutAsUser(true);
    // });

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
        // TODO add paypal here
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
        // TODO add paypal here
    });

    it("Should have every payment provider visible as guest", () =>
    {

    });

    it("Should pay with cash on delivery as user", () =>
    {
        visitCheckoutAsUser();
        cy.get(`[data-id='${PRE_PAYMENT_ID}']`).click();
        cy.get(`[data-id='${PRE_PAYMENT_ID}']`).find("input").should("have.be.checked");
        completeOrder();
        cy.get(`[id*=payment_name]`).should("contain", "Vorkasse");
    });

    it("Should pay with cash on delivery as guest", () =>
    {

    });

    it.only("Should pay with invoice as user", () =>
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

    });

    it("Should pay with pre payment as guest", () =>
    {

    });

    it("Should pay with paypal as user", () =>
    {

    });

    it("Should pay with paypal as guest", () =>
    {

    });

    // Alle Test-Cases 1x als Gast und 1x als angemeldeter Benutzer

    // Wird die Kasse korrekt im Frontend angezeigt?
    // Kann [ohne Fehler] die Zahlungsart gewechselt werden?
    // Sind die Zahlungsarten Barzahlung, Vorkasse, Rechnung und Paypal vorhanden?
    // Kann ich mit jeder Zahlungsart bezahlen, wird diese dann am Auftrag hinterlegt? (Prüfen, was auf der Bestellbestätigung steht) (Bei PayPalzahlung kann ruhig abgebrochen werden, wichtig ist was am Auftrag steht)

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

            cy.get(".add-to-basket-container > button").should("exist");
            cy.get(".add-to-basket-container > button").click();

            cy.visit("/checkout");
            cy.location("pathname").should("eq", "/checkout/");
        });
    }

    function completeOrder()
    {
        cy.get("input[id^=gtc-accept]").click();
        cy.getByTestingAttr("place-order").click();
        cy.location("pathname").should("eq", "/bestellbestaetigung/");
    }
});
