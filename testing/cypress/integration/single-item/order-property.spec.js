// / <reference types="cypress" />
context("Single Item", () =>
{
    beforeEach(() =>
    {
        cy.visit("/testartikel/merkmale_145_1134/");
    });

    it("should display order properties", () =>
    {
        cy.getByTestingAttr("order-property-previous-slide").should("be.visible");
        cy.getByTestingAttr("order-property-next-slide").should("be.visible");
        cy.getByTestingAttr("order-property-input-radio").should("be.visible");
    });

    it("should go to next order property page", () =>
    {
        cy.getByTestingAttr("order-property-next-slide").click();
        cy.getByTestingAttr("order-property-input-checkbox").should("be.visible").should("have.attr", "value").and("include", "8");

        cy.getByTestingAttr("order-property-next-slide").click();
        cy.getByTestingAttr("order-property-input-checkbox").eq(3).should("be.visible").should("have.attr", "value").and("include", "4");

        cy.getByTestingAttr("order-property-next-slide").click();
        cy.get(".input-unit.file-input.order-property-input").eq(0).should("be.visible");
        cy.getByTestingAttr("order-property-selection").eq(0).should("be.visible");
        cy.getByTestingAttr("order-property-selection-option").eq(0).should("be.visible");
        cy.getByTestingAttr("order-property-input-text").eq(0).should("be.visible");
        cy.getByTestingAttr("order-property-input-int").eq(0).should("be.visible");

        cy.getByTestingAttr("order-property-next-slide").click();
        cy.get(".input-unit.file-input.order-property-input").eq(1).should("be.visible");
        cy.getByTestingAttr("order-property-selection").eq(1).should("be.visible");
        cy.getByTestingAttr("order-property-selection-option").eq(1).should("be.visible");
        cy.getByTestingAttr("order-property-input-text").eq(1).should("be.visible");
        cy.getByTestingAttr("order-property-input-int").eq(1).should("be.visible");
    });

    it("should go to previous order property page", () =>
    {

    });

    it("should select single choice", () =>
    {

    });

    it("should select multiple choice", () =>
    {

    });

    it("should select label", () =>
    {

    });

    it("should fill file upload input", () =>
    {

    });

    it("should fill selection input", () =>
    {

    });

    it("should fill text input", () =>
    {

    });

    it("should fill float number input", () =>
    {

    });

    it("should fill int input", () =>
    {

    });

    it("should fill file upload input with extra costs", () =>
    {

    });

    it("should fill selection input with extra costs", () =>
    {

    });

    it("should fill text input with extra costs", () =>
    {

    });

    it("should fill float number input with extra costs", () =>
    {

    });

    it("should fill int input with extra costs", () =>
    {

    });
});
