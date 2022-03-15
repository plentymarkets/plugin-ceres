// / <reference types="cypress" />
context("new order properties", () =>
{

    /**
    *     The new order property feature has to be activated in the plentyShop wizard->webshop
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

    it("should preselect a preselected property and add price to totals", () =>
    {
        cy.visit("/wohnzimmer/sofas/couch-purple-dreams_134_1032");
        cy.getByTestingAttr("order-property-label-checkbox").eq(1).parent().find("input").should("be.checked");
        cy.get(".price").should("contain", "20,01");
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

    it("should add item to basket with all required properties", () =>
    {
        cy.visit("/wohnzimmer/sofas/couch-purple-dreams_134_1032");
        cy.getByTestingAttr("order-property-label-checkbox").eq(2).parent().find("input").check();
        cy.getByTestingAttr("order-property-label-checkbox").eq(3).parent().find("input").check();
        cy.getByTestingAttr("single-add-to-basket-button").click();
        cy.get("#add-item-to-basket-overlay").should("contain", "30,01");
    });

    it("should fail to add properties to basket", () =>
    {
        cy.visit("/wohnzimmer/sofas/couch-purple-dreams_134_1032");
        cy.getByTestingAttr("single-add-to-basket-button").click();
        cy.getByTestingAttr("order-property-label-checkbox").eq(2).parent().should("have.class", "error");
        cy.getByTestingAttr("order-property-label-checkbox").eq(3).parent().should("have.class", "error");
    });
});
