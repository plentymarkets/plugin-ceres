// / <reference types="cypress" />
context("Homepage", () =>
{
    it.only("Should visit the checkout as user", () =>
    {
        visitCheckoutAsUser();
    });

    // it.only("Should visit the checkout as guest", () =>
    // {
    //     visitCheckoutAsUser(true);
    // });

    function visitCheckoutAsUser()
    {
        cy.visit("/");

        cy.server().route("POST", "/rest/io/customer/login").as("loginUser");
        cy.login();

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
});
