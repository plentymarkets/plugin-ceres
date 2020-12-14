context("register/ registrierung", () =>
{

    before(() =>
    {
        cy.visit("/");
        cy.login();
        cy.visit("/bestellbestaetigung/?orderID=439");
    });

    it("Should check for order ID", () =>
    {
        cy.get(".h3").should("contain", "439");
    });

});
