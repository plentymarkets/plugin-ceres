// / <reference types="cypress" />
context("new order properties", () =>
{

    it("should not show checkbox for preselected / required property", () =>
    {
        cy.visit("https://2x3z2pucy2z9.c01-16.plentymarkets.com'/wohnzimmer/sofas/couch-purple-dreams_134_1032");

        cy.get(".widget-order-property").find(".active")
    });

    it("should show checkbox when property is type 'empty' (checkbox)", () =>
    {
        cy.visit("https://2x3z2pucy2z9.c01-16.plentymarkets.com'/wohnzimmer/sofas/couch-purple-dreams_134_1032");
    });

    it("should not show '**' for preselected / required property", () =>
    {
        cy.visit("https://2x3z2pucy2z9.c01-16.plentymarkets.com'/wohnzimmer/sofas/couch-purple-dreams_134_1032");
    });

    it("should preselect a preselected property", () =>
    {
        cy.visit("https://2x3z2pucy2z9.c01-16.plentymarkets.com'/wohnzimmer/sofas/couch-purple-dreams_134_1032");
    });

    it("should preselect a preselected property", () =>
    {
        cy.visit("https://2x3z2pucy2z9.c01-16.plentymarkets.com'/wohnzimmer/sofas/couch-purple-dreams_134_1032");

        // check if price has been updated
    });

    it("should only show one '*' when it has surcharge and not required", () =>
    {
        cy.visit("https://2x3z2pucy2z9.c01-16.plentymarkets.com'/wohnzimmer/sofas/couch-purple-dreams_134_1032");
    });

    it("should only show one '*, **' when required and has surcharge larger 0", () =>
    {
        cy.visit("https://2x3z2pucy2z9.c01-16.plentymarkets.com'/wohnzimmer/sofas/couch-purple-dreams_134_1032");
    });
});
