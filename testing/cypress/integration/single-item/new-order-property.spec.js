// / <reference types="cypress" />
context("new order properties", () =>
{

    /**
     * The new order property feature has to be activate in the plentyShop wizard->webshop
     */

    it("should not show checkbox for preselected / required property", () =>
    {
        cy.visit("/wohnzimmer/sofas/couch-purple-dreams_134_1032");
        cy.getByTestingAttr("order-property-label-checkbox").eq(0).parent().find("input").should("not.exist");
    });

    it("should show checkbox when property is type 'empty' (checkbox)", () =>
    {
        cy.visit("/wohnzimmer/sofas/couch-purple-dreams_134_1032");
        cy.getByTestingAttr("order-property-label-checkbox").eq(1).parent().find("input").should("exist");
    });

    it("should not show '**' for preselected / required property", () =>
    {
        cy.visit("/wohnzimmer/sofas/couch-purple-dreams_134_1032");
        cy.getByTestingAttr("order-property-label-checkbox").eq(0).should("not.contain", "**");
    });

    it("should preselect a preselected property", () =>
    {
        cy.visit("/wohnzimmer/sofas/couch-purple-dreams_134_1032");
        cy.getByTestingAttr("order-property-label-checkbox").eq(1).parent().find("input").should("be.checked");
    });

    it("should only show one '*' when it has surcharge and not required", () =>
    {
        cy.visit("/wohnzimmer/sofas/couch-purple-dreams_134_1032");
        cy.getByTestingAttr("order-property-label-checkbox").eq(1).should("contain", "*");
    });

    it("should only show '*, **' when required and has surcharge larger 0", () =>
    {
        cy.visit("/wohnzimmer/sofas/couch-purple-dreams_134_1032");
        cy.getByTestingAttr("order-property-label-checkbox").eq(2).should("contain", "*, **");
    });

    it("should NOT show '*' for property without surcharge and preselected + required", () =>
    {
        cy.visit("/wohnzimmer/sofas/couch-purple-dreams_134_1032");
        cy.getByTestingAttr("order-property-label-checkbox").eq(4).should("not.contain", "*");
    });
});
