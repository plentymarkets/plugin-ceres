// / <reference types="cypress" />
context("Order Property", () =>
{

    it("should display order properties", () =>
    {
        cy.visit("/testartikel/merkmale_145_1134/");
        cy.getByTestingAttr("order-property-previous-slide").should("be.visible");
        cy.getByTestingAttr("order-property-next-slide").should("be.visible");
        cy.getByTestingAttr("order-property-input-radio").should("be.visible");
    });

    it("should go to next order property page", () =>
    {
        cy.visit("/testartikel/merkmale_145_1134/");
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
        cy.visit("/testartikel/merkmale_145_1134/");
        cy.getByTestingAttr("order-property-next-slide").click().click();
        cy.getByTestingAttr("order-property-previous-slide").click();
        cy.getByTestingAttr("order-property-input-checkbox").should("be.visible").should("have.attr", "value").and("include", "8");
    });

    it("should select single choice", () =>
    {
        cy.visit("/testartikel/merkmale_145_1134/");
        cy.getByTestingAttr("order-property-input-radio").first().click();
        cy.getByTestingAttr("single-add-to-basket-button").click();
        cy.get("#add-item-to-basket-overlay").should("contain", "Einfachauswahl +0€");
    });

    it("should select multiple choice", () =>
    {
        cy.visit("/testartikel/merkmale_145_1134/");
        // TODO implement more reliable way to navigate?
        cy.getByTestingAttr("order-property-next-slide").click();
        cy.getByTestingAttr("order-property-input-checkbox").first().click();

        cy.getByTestingAttr("single-add-to-basket-button").click();
        cy.get("#add-item-to-basket-overlay").should("contain", "Mehrfachauswahl +0€");
    });

    it("should select label", () =>
    {
        cy.visit("/testartikel/merkmale_145_1134/");
        cy.getByTestingAttr("order-property-next-slide").click().click();
        cy.getByTestingAttr("order-property-input-checkbox").last().click();

        cy.getByTestingAttr("single-add-to-basket-button").click();
        cy.get("#add-item-to-basket-overlay").should("contain", "Label ohne Aufpreis");
    });

    it("should fill file upload input", () =>
    {
        cy.visit("/testartikel/merkmale_145_1134/");
        cy.getByTestingAttr("order-property-next-slide").click().click().click();

        cy.fixture("test.png").then(fileContent =>
        {
            cy.getByTestingAttr("order-property-input-file").attachFile({
                fileContent: fileContent.toString(),
                fileName: "test.png",
                mimeType: "image/png"
            });
        });
    });

    it("should fill selection input", () =>
    {
        cy.visit("/testartikel/merkmale_145_1134/");
        cy.getByTestingAttr("order-property-next-slide").click().click().click();
        cy.getByTestingAttr("order-property-selection").first().select("Option 1");

        cy.getByTestingAttr("single-add-to-basket-button").click();
        cy.get("#add-item-to-basket-overlay").should("contain", "Auswahl");
        cy.get("#add-item-to-basket-overlay").should("contain", "Option 1");
    });

    it("should fill text input", () =>
    {
        cy.visit("/testartikel/merkmale_145_1134/");
        const value = "Lorem ipsum dolor sit amet consectetur adipisicing elit.";

        cy.getByTestingAttr("order-property-next-slide").click().click().click();
        cy.getByTestingAttr("order-property-input-text").first().type(value);

        cy.getByTestingAttr("single-add-to-basket-button").click();
        cy.get("#add-item-to-basket-overlay").should("contain", "Text");
        cy.get("#add-item-to-basket-overlay").should("contain", value);
    });

    it("should fill float number input", () =>
    {
        cy.visit("/testartikel/merkmale_145_1134/");
        const value = 1.23;

        cy.getByTestingAttr("order-property-next-slide").click().click().click();
        cy.getByTestingAttr("order-property-input-float").first().type(value);

        cy.getByTestingAttr("single-add-to-basket-button").click();
        cy.get("#add-item-to-basket-overlay").should("contain", "Kommazahl");
        cy.get("#add-item-to-basket-overlay").should("contain", "1,23");
    });

    it("should fill int input", () =>
    {
        cy.visit("/testartikel/merkmale_145_1134/");
        const value = 123;

        cy.getByTestingAttr("order-property-next-slide").click().click().click();
        cy.getByTestingAttr("order-property-input-int").first().type(value);

        cy.getByTestingAttr("single-add-to-basket-button").click();
        cy.get("#add-item-to-basket-overlay").should("contain", "Ganze Zahl");
        cy.get("#add-item-to-basket-overlay").should("contain", value);
    });

    it("should fill file upload input with extra costs", () =>
    {
        cy.visit("/testartikel/merkmale_145_1134/");
        cy.getByTestingAttr("order-property-next-slide").click().click().click().click();

        cy.fixture("test.png").then(fileContent =>
        {
            cy.getByTestingAttr("order-property-input-file").last().attachFile({
                fileContent: fileContent.toString(),
                fileName: "test.png",
                mimeType: "image/png"
            });
        });

        cy.get(".price").should("contain", "95");
    });

    it("should fill selection input with extra costs", () =>
    {
        cy.visit("/testartikel/merkmale_145_1134/");
        cy.getByTestingAttr("order-property-next-slide").click().click().click().click();
        cy.getByTestingAttr("order-property-selection").last().select("Option 1");

        cy.getByTestingAttr("single-add-to-basket-button").click();
        cy.get("#add-item-to-basket-overlay").should("contain", "Auswahl +5€");
        cy.get("#add-item-to-basket-overlay").should("contain", "Option 1");
    });

    it("should fill text input with extra costs", () =>
    {
        cy.visit("/testartikel/merkmale_145_1134/");
        const value = "Lorem ipsum dolor sit amet consectetur adipisicing elit.";

        cy.getByTestingAttr("order-property-next-slide").click().click().click().click();
        cy.getByTestingAttr("order-property-input-text").last().type(value);

        cy.getByTestingAttr("single-add-to-basket-button").click();
        cy.get("#add-item-to-basket-overlay").should("contain", "Text +5€");
        cy.get("#add-item-to-basket-overlay").should("contain", value);
    });

    it("should fill float number input with extra costs", () =>
    {
        cy.visit("/testartikel/merkmale_145_1134/");
        const value = 1.23;

        cy.getByTestingAttr("order-property-next-slide").click().click().click().click();
        cy.getByTestingAttr("order-property-input-float").last().type(value);
        cy.getByTestingAttr("single-add-to-basket-button").click();
        cy.get("#add-item-to-basket-overlay").should("contain", "Kommazahl +5€");
        cy.get("#add-item-to-basket-overlay").should("contain", "1,23");

    });

    it("should fill int input with extra costs", () =>
    {
        cy.visit("/testartikel/merkmale_145_1134/");
        const value = 123;

        cy.getByTestingAttr("order-property-next-slide").click().click().click().click();
        cy.getByTestingAttr("order-property-input-int").last().type(value);

        cy.getByTestingAttr("single-add-to-basket-button").click();
        cy.get("#add-item-to-basket-overlay").should("contain", "Ganze Zahl +5€");
        cy.get("#add-item-to-basket-overlay").should("contain", value);
    });

    it("should translate selectbox property name", () =>
    {
        cy.visit("/en/testarticle/properties_145_1134/");
        cy.getByTestingAttr("order-property-next-slide").click().click().click();
        cy.getByTestingAttr("order-property-selection").eq(0).select("Option one");
        cy.getByTestingAttr("order-property-selection").eq(0).should("contain", "Option one");

    });

    it("should translate multiple checkbox property name", () =>
    {
        cy.visit("/en/testarticle/properties_145_1134/");
        cy.getByTestingAttr("order-property-next-slide").click();
        cy.getByTestingAttr("order-property-input-checkbox").eq(0).parent().find("label").should("contain", "Multiplechoice +0€");
    });

    it("should translate radio checkbox property name", () =>
    {
        cy.visit("/en/testarticle/properties_145_1134/");
        cy.getByTestingAttr("order-property-input-radio").eq(0).parent().find("label").should("contain", "Single choice +€0");
    });
});
