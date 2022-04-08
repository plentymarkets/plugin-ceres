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

    // Test additionalcost without tax
    // should have no *
    // should not add to price
    // should be marked as zzgl.
    it("should test additionalcost without tax", () =>
    {
        cy.visit("/testartikel/additionalcost-testing_200_1136/");
        cy.getByTestingAttr("order-property-label-checkbox").eq(0).should("not.contain", "*");
        cy.getByTestingAttr("order-property-label-checkbox").eq(0).should("contain", "zzgl.");
        cy.getByTestingAttr("order-property-label-checkbox").eq(0).parent().find("input").check();
        cy.get(".price").should("contain", "10");
    });

    // Test additionalcost with tax from variation
    // should have *
    // should not add to price
    // should be marked as zzgl.
    it("should test orderproperty additionalcost with tax from variation", () =>
    {
        cy.visit("/testartikel/additionalcost-testing_200_1136/");
        cy.getByTestingAttr("order-property-label-checkbox").eq(1).should("contain", "*");
        cy.getByTestingAttr("order-property-label-checkbox").eq(1).should("contain", "zzgl.");
        cy.getByTestingAttr("order-property-label-checkbox").eq(1).parent().find("input").check();
        cy.get(".price").should("contain", "10");
    });

    // Test additionalcost with tax class B
    // should have *
    // should not add to price
    // should be marked as zzgl.
    it("should test orderproperty additionalcost with tax class B", () =>
    {
        cy.visit("/testartikel/additionalcost-testing_200_1136/");
        cy.getByTestingAttr("order-property-label-checkbox").eq(2).should("contain", "*");
        cy.getByTestingAttr("order-property-label-checkbox").eq(2).should("contain", "zzgl.");
        cy.getByTestingAttr("order-property-label-checkbox").eq(2).parent().find("input").check();
        cy.get(".price").should("contain", "10");
    });

    // Test orderproperty without tax
    // should have no *
    // should not add to price
    // should be marked as zzgl.
    it("should test orderproperty without tax", () =>
    {
        cy.visit("/testartikel/additionalcost-testing_200_1136/");
        cy.getByTestingAttr("order-property-label-checkbox").eq(3).should("not.contain", "*");
        cy.getByTestingAttr("order-property-label-checkbox").eq(3).should("contain", "zzgl.");
        cy.getByTestingAttr("order-property-label-checkbox").eq(3).parent().find("input").check();
        cy.get(".price").should("contain", "10");
    });

    // Test orderproperty with tax from variation
    // should have *
    // should add to price
    // should be marked as inkl.
    it("should test orderproperty with tax from variation", () =>
    {
        cy.visit("/testartikel/additionalcost-testing_200_1136/");
        cy.getByTestingAttr("order-property-label-checkbox").eq(4).should("contain", "*");
        cy.getByTestingAttr("order-property-label-checkbox").eq(4).should("contain", "inkl.");
        cy.getByTestingAttr("order-property-label-checkbox").eq(4).parent().find("input").check();
        cy.get(".price").should("contain", "11");
    });

    // Test orderproperty with tax class B
    // should have *
    // should add to price
    // should be marked as inkl.
    it("should test orderproperty with tax class B", () =>
    {
        cy.visit("/testartikel/additionalcost-testing_200_1136/");
        cy.getByTestingAttr("order-property-label-checkbox").eq(5).should("contain", "*");
        cy.getByTestingAttr("order-property-label-checkbox").eq(5).should("contain", "inkl.");
        cy.getByTestingAttr("order-property-label-checkbox").eq(5).parent().find("input").check();
        cy.get(".price").should("contain", "11");
    });


    // Basket tests
    // move these tests to basket.spec when ordercharacteristics are deprecated

    // Should list additional cost with tax on top

    it("Should list additional cost with tax on top", () =>
    {
        cy.visit("/testartikel/additionalcost-testing_200_1136/");
        addAdditionalItemToBasket();
        cy.visit("/warenkorb/");
        
    });

    // Should list additional cost and orderproperties without tax below vats

    // Test other Totals?

    function addAdditionalItemToBasket()
    {
        cy.getByTestingAttr("order-property-label-checkbox").eq(0).parent().find("input").check();
        cy.getByTestingAttr("order-property-label-checkbox").eq(1).parent().find("input").check();
        cy.getByTestingAttr("order-property-label-checkbox").eq(2).parent().find("input").check();
        cy.getByTestingAttr("order-property-label-checkbox").eq(3).parent().find("input").check();
        cy.getByTestingAttr("order-property-label-checkbox").eq(4).parent().find("input").check();
        cy.getByTestingAttr("order-property-label-checkbox").eq(5).parent().find("input").check();
        cy.getByTestingAttr("single-add-to-basket-button").click();

    }
});
