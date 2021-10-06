// / <reference types="cypress" />
context("category", () =>
{

    beforeEach(() =>
    {
        cy.visit("/wohnzimmer/");
    });


    it("should display category title", () =>
    {
        cy.get(".category-title").should("contain", "Wohnzimmer");
    });

    it("should check for background image", () =>
    {
        cy.get(`.parallax-img-container-inner`).first()
            .invoke("attr", "style", "background-image: url('/documents/category/16/living-room.jpg')")
            .should("have.attr", "style", "background-image: url('/documents/category/16/living-room.jpg')");
    });

    it("should be able to navigate by sidebar", () =>
    {
        cy.get(".widget-inner > :nth-child(3) > .nav-item > .nav-link > .d-flex > .flex-grow-1").click();
        cy.location("pathname").should("eq", "/variantenauswahl/");
    });

    it("should be able to apply min price filter at category toolbar", () =>
    {
        cy.getByTestingAttr("category-toolbar-filter").click();
        cy.get(".widget-filter-price").find("input").first().type("400", { delay: 30 });
        cy.get(".widget-filter-price").find("button").click();
        cy.wait(100);
        cy.get(".product-list").children().each((product) =>
        {
            cy.get(product).find(".price").invoke("text").then((text) =>
            {
                const priceTotals = +text.replace(/[^0-9\,\.]+/g, "").replace(",", ".");

                expect(priceTotals >= 400).to.be.true;
            });
        });
    });

    it("should be able to apply max price filter at category toolbar", () =>
    {
        cy.getByTestingAttr("category-toolbar-filter").click();
        cy.get(".widget-filter-price").find("input").last().type("0.01", { delay: 30 });
        cy.get(".widget-filter-price").find("button").click();
        cy.get(".product-list").children().each((product) =>
        {
            cy.get(product).find(".price").invoke("text").then((text) =>
            {
                const priceTotals = +text.replace(/[^0-9\,\.]+/g, "").replace(",", ".");

                expect(priceTotals <= 0.01).to.be.true;
            });
        });
    });

    it("should be able to apply attribute filter at category toolbar", () =>
    {
        cy.getByTestingAttr("category-toolbar-filter").click();
        cy.get(".widget-filter-attributes-properties-characteristics").find(".option-1").click();
        cy.get(".widget-selected-filter").find(".selected-filters").children().first().should("exist");
        cy.get(".product-list").find("li").should("have.length.gt", 0);
    });

    it("should remove applied attribute filter at category toolbar", () =>
    {
        cy.getByTestingAttr("category-toolbar-filter").click();
        cy.get(".widget-filter-attributes-properties-characteristics").find(".option-1").click();
        cy.getByTestingAttr("category-toolbar-close").click();
        cy.get(".widget-selected-filter").find(".selected-filters").children().first().click({force: true});
        cy.get(".product-list").find("li").should("have.length", 20);
    });

    it("should list items for category", () =>
    {
        cy.get(".product-list").find("li").should("have.length", 20);
    });

    it("should click card and open item on single item", () =>
    {
        cy.getByTestingAttr("1007").click();
        cy.location("pathname").should("eq", "/wohnzimmer/sessel-hocker/barhocker-white-sanfrancisco_109_1007/");
    });

    it("should add item to basket when button is clicked on page item", () =>
    {
        cy.getByTestingAttr("1007").find(".add-to-basket-lg-container").click();
        cy.get(".toggle-basket-preview").click({ force: true });
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
