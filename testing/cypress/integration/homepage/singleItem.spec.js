// / <reference types="cypress" />
context("Single Item", () =>
{
    beforeEach(() =>
    {
        cy.visit("/wohnzimmer/sessel-sofas/loungesessel-herkules_116_1014/");

    });

    it("should check for article name", () =>
    {
        cy.get(".item-name").then(($itemName) => {
            expect($itemName).to.contain("Loungesessel Herkules");
        });
    });

    it("should check for article producer", () =>
    {
        cy.get(".producertag").then(($producerName) => {
            expect($producerName).to.contain("A & C Design");
        });
    });

    it("should check for the item price", () =>
    {
        cy.get(".has-crossprice").then(($crossPrice) => {
            const crossPrice = text("0,70"); // Als Zahlenformat vergleichen?
            expect($crossPrice).to.eql(crossPrice);
        });
    });


    it("should check for breadcrumbs", () =>
    {
        cy.get(".breadcrumbs").should("exist");
    });
});

