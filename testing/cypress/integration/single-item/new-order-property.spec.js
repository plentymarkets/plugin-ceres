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
        cy.get(".price").should("contain", "0,01");
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

    it("should test additionalcost without tax", () =>
    {
        cy.visit("/testartikel/additionalcost-testing_200_1136/");
        cy.getByTestingAttr("order-property-label-checkbox").eq(0).should("not.contain", "*");
        cy.getByTestingAttr("order-property-label-checkbox").eq(0).should("contain", "zzgl.");
        cy.getByTestingAttr("order-property-label-checkbox").eq(0).parent().find("input").check();
        cy.get(".price").should("contain", "10");
    });

    it("should test orderproperty additionalcost with tax from variation", () =>
    {
        cy.visit("/testartikel/additionalcost-testing_200_1136/");
        cy.getByTestingAttr("order-property-label-checkbox").eq(1).should("contain", "*");
        cy.getByTestingAttr("order-property-label-checkbox").eq(1).should("contain", "zzgl.");
        cy.getByTestingAttr("order-property-label-checkbox").eq(1).parent().find("input").check();
        cy.get(".price").should("contain", "10");
    });

    it("should test orderproperty additionalcost with tax class B", () =>
    {
        cy.visit("/testartikel/additionalcost-testing_200_1136/");
        cy.getByTestingAttr("order-property-label-checkbox").eq(2).should("contain", "*");
        cy.getByTestingAttr("order-property-label-checkbox").eq(2).should("contain", "zzgl.");
        cy.getByTestingAttr("order-property-label-checkbox").eq(2).parent().find("input").check();
        cy.get(".price").should("contain", "10");
    });

    it("should test orderproperty without tax", () =>
    {
        cy.visit("/testartikel/additionalcost-testing_200_1136/");
        cy.getByTestingAttr("order-property-label-checkbox").eq(3).should("not.contain", "*");
        cy.getByTestingAttr("order-property-label-checkbox").eq(3).should("contain", "zzgl.");
        cy.getByTestingAttr("order-property-label-checkbox").eq(3).parent().find("input").check();
        cy.get(".price").should("contain", "10");
    });

    it("should test orderproperty with tax from variation", () =>
    {
        cy.visit("/testartikel/additionalcost-testing_200_1136/");
        cy.getByTestingAttr("order-property-label-checkbox").eq(4).should("contain", "*");
        cy.getByTestingAttr("order-property-label-checkbox").eq(4).should("contain", "inkl.");
        cy.getByTestingAttr("order-property-label-checkbox").eq(4).parent().find("input").check();
        cy.get(".price").should("contain", "11");
    });

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

    it("Should display correct order properties and prices at basket", () =>
    {
        cy.visit("/testartikel/additionalcost-testing_200_1136/");
        addAdditionalItemToBasket();
        cy.visit("/warenkorb/");

        cy.getByTestingAttr("additionalcost-with-tax").eq(0).should("contain", "Additionalcost with Tax from variation");
        cy.getByTestingAttr("additionalcost-with-tax").eq(1).should("contain", "Additionalcost Tax B");

        cy.getByTestingAttr("item-sum-net").should("contain", "87,58");
        cy.getByTestingAttr("item-sum").should("contain", "104,00");

        cy.getByTestingAttr("basket-sub-amount").should("contain", "91,78");

        cy.getByTestingAttr("additionalcost-without-tax").eq(0).should("contain", "Additionalcost no Tax");
        cy.getByTestingAttr("additionalcost-without-tax").eq(1).should("contain", "Order property no tax");

        cy.getByTestingAttr("basket-amount-net").should("contain", "93,78");
        cy.getByTestingAttr("basket-amount").should("contain", "110,99");

    });

    it("should list all order properties for the item at basket", () =>
    {
        cy.visit("/testartikel/additionalcost-testing_200_1136/");
        addAdditionalItemToBasket();
        cy.visit("/warenkorb/");
        cy.getByTestingAttr("order-property-list").children().eq(0).should("not.contain", "*");
        cy.getByTestingAttr("order-property-list").children().eq(0).should("contain", "zzgl.");

        cy.getByTestingAttr("order-property-list").children().eq(1).should("contain", "*");
        cy.getByTestingAttr("order-property-list").children().eq(1).should("contain", "zzgl.");

        cy.getByTestingAttr("order-property-list").children().eq(2).should("contain", "*");
        cy.getByTestingAttr("order-property-list").children().eq(2).should("contain", "zzgl.");

        cy.getByTestingAttr("order-property-list").children().eq(3).should("not.contain", "*");
        cy.getByTestingAttr("order-property-list").children().eq(3).should("contain", "zzgl.");

        cy.getByTestingAttr("order-property-list").children().eq(4).should("contain", "*");
        cy.getByTestingAttr("order-property-list").children().eq(4).should("contain", "inkl.");

        cy.getByTestingAttr("order-property-list").children().eq(5).should("contain", "*");
        cy.getByTestingAttr("order-property-list").children().eq(5).should("contain", "inkl.");
    });

    it("Should display correct order properties and prices at orderconfirmation", ()=>
    {
        cy.visit("/bestellbestaetigung/?orderId=xxx");
        cy.getByTestingAttr("additionalcost-with-tax").eq(0).should("contain", "Additionalcost with Tax from variation");
        cy.getByTestingAttr("additionalcost-with-tax").eq(1).should("contain", "Additionalcost Tax B");

        cy.getByTestingAttr("item-sum-net").should("contain", "87,58");
        cy.getByTestingAttr("item-sum").should("contain", "104,00");

        cy.getByTestingAttr("basket-sub-amount").should("contain", "91,78");

        cy.getByTestingAttr("additionalcost-without-tax").eq(0).should("contain", "Additionalcost no Tax");
        cy.getByTestingAttr("additionalcost-without-tax").eq(1).should("contain", "Order property no tax");

        cy.getByTestingAttr("basket-amount-net").should("contain", "93,78");
        cy.getByTestingAttr("basket-amount").should("contain", "110,99");
    });

    it("should list all order properties for the item at orderconfirmation", () =>
    {
        cy.visit("/bestellbestaetigung/?orderId=xxx");

        cy.getByTestingAttr("purchased-order-property").eq(0).should("not.contain", "*");
        cy.getByTestingAttr("purchased-order-property").eq(0).should("contain", "zzgl.");

        cy.getByTestingAttr("purchased-order-property").eq(1).should("contain", "*");
        cy.getByTestingAttr("purchased-order-property").eq(1).should("contain", "zzgl.");

        cy.getByTestingAttr("purchased-order-property").eq(2).should("contain", "*");
        cy.getByTestingAttr("purchased-order-property").eq(2).should("contain", "zzgl.");

        cy.getByTestingAttr("purchased-order-property").eq(3).should("not.contain", "*");
        cy.getByTestingAttr("purchased-order-property").eq(3).should("contain", "zzgl.");

        cy.getByTestingAttr("purchased-order-property").eq(4).should("contain", "*");
        cy.getByTestingAttr("purchased-order-property").eq(4).should("contain", "inkl.");

        cy.getByTestingAttr("purchased-order-property").eq(5).should("contain", "*");
        cy.getByTestingAttr("purchased-order-property").eq(5).should("contain", "inkl.");
    });


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
