context("register/ registrierung", () =>
{

    before(() =>
    {
        cy.visit("/");
        cy.login();
        cy.visit("/bestellbestaetigung/?orderId=437");
    });

    it("Should check for order ID", () =>
    {
        cy.get(".h3").should("contain", "437");
    });

    it("Should check for Vielen Dank", () =>
    {
        cy.get(".h2").should("contain", "Vielen Dank!");
    });
});
