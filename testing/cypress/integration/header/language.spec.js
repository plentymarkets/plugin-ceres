// / <reference types="cypress" />
context("Header topbar languages", () =>
{
    const URL = "/en/livingroom/armchair-and-stool/loungesessel-herkules_116_1014/";

    beforeEach(() =>
    {
        cy.visit("/");
    });

    it("should open languages and list languages", () =>
    {
        cy.clickElement("language-select");
        cy.get("#countrySettings").should("have.class", "show");
        cy.getByTestingAttr("lang-select-de").should("exist");
    });

    it("should change language to 'en'", () =>
    {
        cy.clickElement("language-select");

        // select en as shop language
        cy.getByTestingAttr("lang-select-en").click();
        cy.location("pathname").should("eq", "/en/");

        // lang icon in topbar should be en
        cy.getByTestingAttr("language-select").children().first().should("have.class", "flag-icon-en");
    });

    it("should change language text for content at start page to en", () =>
    {
        cy.visit("/en/");
        cy.get("#page-body").should("contain", "It is a period of civil war.")
    });

    it("should change language text on single item to en", () =>
    {
        cy.visit(URL);
        cy.get(".tab-content").should("contain", "The feet made of real wood are inconspicuously and discreetly integrated into the overall appearance of the armchair.")
    });

    it("should change language text for order properties", () =>
    {
        cy.visit(URL);
        cy.get(".widget-order-property").should("contain", "Genuine leather");
    });

    it("should display correct category lang in breadcrumbs", () =>
    {
        cy.visit(URL);
        cy.get(".breadcrumbs").should("contain", "Livingroom")
                              .should("contain", "Armchair & stool")
                              .should("contain", "Loungesessel Herkules");
    });

    it("should display correct translation for add to basket button", () =>
    {
        cy.visit(URL);
        cy.get(".add-to-basket-container").should("contain", "Add to shopping cart");
    });

    it("should display correct availability translation", () =>
    {
        cy.visit(URL);
        cy.get(".availability").should("contain", "Ready for shipping, delivery in 48h");
    });

    it("should display correct item url after lang change", () =>
    {
        cy.visit("/wohnzimmer/sessel-sofas/loungesessel-herkules_116_1014/");
        cy.clickElement("language-select");
        cy.getByTestingAttr("lang-select-en").click();
        cy.location("pathname").should("eq", "/en/livingroom/armchair-and-stool/loungesessel-herkules_116_1014/");
    });

    it("should display correct category name in menu", () =>
    {
        cy.visit("/en/");
        cy.get(".mainmenu").should("contain", "Livingroom");
    });

    it("should display correct category name at category page", () =>
    {
        cy.visit("/en/livingroom/");
        cy.get(".category-title").should("contain", "Livingroom");
    });
});
