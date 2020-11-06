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

    it("should check for the RRP", () =>
    {
        cy.get(".crossprice").then(($crossPrice) => {
            expect($crossPrice).to.contain("0,80");
        });
    });

    it("should check for the price", () =>
    {
        cy.get(".price").then(($price) => {
            expect($price).to.contain("0,70");
        });
    });

    it("should check for base price", () =>
    {
        cy.get(".base-price-value").then(($basePrice) => {
            expect($basePrice).to.contain("0,70");
        });
    });

    it("should check for lowest breadcrumb level", () =>
    {
        cy.get(".breadcrumb-item.active").then(($breadcrumbItem) => {
            expect($breadcrumbItem).to.contain("Loungesessel Herkules");
        });
    });
});
