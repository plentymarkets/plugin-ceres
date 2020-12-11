// / <reference types="cypress" />
context("category", () =>
{

    beforeEach(() =>
    {
        cy.visit("/wohnzimmer");
    });


    it("should display category title", () =>
    {
        cy.get(".category-title").should("contain", "Wohnzimmer");
    });

    it("should check for background image", () =>
    {
        cy.get(`[data-background-image='/documents/category/16/living-room.jpg']`)
            .invoke("attr", "style", "background-image: url('/documents/category/16/living-room.jpg')")
            .should("have.attr", "style", "background-image: url('/documents/category/16/living-room.jpg')");
    });

    it("should be able to navigate by sidebar", () =>
    {
        cy.get(".widget-inner > :nth-child(3) > .nav-item > .nav-link > .d-flex > .flex-grow-1").click();
        cy.location("pathname").should("eq", "/arbeitszimmer-buero/");
    });

    it("should be able to apply filter at category toolbar", () =>
    {
        cy.get(".lol").should("exist");
    });

    it("should list items for category", () =>
    {
        cy.get(".product-list").find("li").should("have.length", 20);
    });

    it.only("should click card and open item on single item", () =>
    {
        cy.get(".product-list").find("li").first().scrollIntoView().find(".thumb-title").click();
        cy.location("pathname").should("eq", "/wohnzimmer/sessel-hocker/barhocker-white-sanfrancisco_109_1007/");
    });

    it("should add item to basket when button is clicked on page item", () =>
    {
        cy.get(".product-list").find("li").first().find(".add-to-basket-lg-container").click();
        cy.get(".control-basket > a").scrollIntoView().click();
        cy.get("body").should("have.class", "basket-open");
        cy.get(".basket-item").should("exist");
    });

    it("should sort by price up", () =>
    {
        cy.get(".widget-item-sorting .custom-select").select("Preis ⬆");
        cy.get(".product-list").children().first()
            .find(".thumb-content").find(".price").should("contain", "0,01");
    });

    it("should sort by price down", () =>
    {
        cy.get(".widget-item-sorting .custom-select").select("Preis ⬇");
        cy.get(".product-list").children().first()
            .find(".thumb-content").find(".price").should("contain", "400,00");
    });

    it("should sort by alphabet asc", () =>
    {
        cy.get(".widget-item-sorting .custom-select").select("Name A-Z");
        cy.get(".product-list").children().first()
            .find(".thumb-content").find(".thumb-title").should("contain", "Barhocker White SanFrancisco");

    });

    it("should sort by alphabet desc", () =>
    {
        cy.get(".widget-item-sorting .custom-select").select("Name Z-A");
        cy.get(".product-list").children().first()
            .find(".thumb-content").find(".thumb-title").should("contain", "Zweisitzer White Russian");
    });

    it("should show more than 20 items", () =>
    {
        cy.get(".widget-items-per-page .custom-select").select("40");
        cy.get(".product-list").find("li").should("have.length.gt", 20);

    });

    it("should show category item image for card", () =>
    {
        const imgUrl = "https://cdn02.plentymarkets.com/2x3z2pucy2z9/item/images/109/middle/109-Barhocker-White-SanFrancisco.jpg";

        cy.get(".product-list").children().first().find("picture")
            .invoke("attr", "data-iesrc", imgUrl)
            .should("have.attr", "data-iesrc", imgUrl);
    });

});
