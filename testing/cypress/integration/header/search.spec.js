// / <reference types="cypress" />
context("Header topbar search", () =>
{
    beforeEach(() =>
    {
        cy.visit("/");
    });

    it("should check for search bar", () =>
    {
        cy.clickElement("searchbox-select");
    });

    it("should search for item by name", () =>
    {
        const search = "Loungesessel Herkules";

        cy.clickElement("searchbox-select");
        cy.get(".search-input").type(search, { delay: 35 });

        cy.server().route("GET", "/rest/io/item/search/autocomplete/**").as("autocomplete");
        cy.wait("@autocomplete");

        cy.get(".search-input").type("{enter}", { delay: 15 });
        cy.location("pathname").should("eq", "/suche/");

        cy.get(".product-list").find(".thumb-title").should("contain", search);
    });

    it("should search for item by id", () =>
    {
        const itemName = "Loungesessel Herkules";
        const search = 116;

        cy.clickElement("searchbox-select");
        cy.get(".search-input").type(search, { delay: 35 });

        cy.server().route("GET", "/rest/io/item/search/autocomplete/**").as("autocomplete");
        cy.wait("@autocomplete");

        cy.get(".search-input").type("{enter}", { delay: 35 });
        cy.location("pathname").should("eq", "/suche/");

        cy.get(".product-list").find(".thumb-title").should("contain", itemName);

    });

    it("should search for item with autosuggestion", () =>
    {
        const itemName = "Loungesessel Herkules";
        const itemUrl = "/wohnzimmer/sessel-sofas/loungesessel-herkules_116_1014/";

        cy.clickElement("searchbox-select");
        cy.get(".search-input").type(itemName, { delay: 35 });

        cy.server().route("GET", "/rest/io/item/search/autocomplete/**").as("autocomplete");

        cy.wait("@autocomplete").then((xhr) =>
        {
            expect(xhr.status).to.eql(200);
            cy.getByTestingAttr("autocomplete-list").children().first().click();
            cy.location("pathname").should("eq", itemUrl);
        });
    });

    it("Should search for an item that doesnt exist and get 'Did you mean?'", () =>
    {
        const search = "baum";

        cy.server().route("GET", "/rest/io/item/search/autocomplete/**").as("autocomplete");

        cy.clickElement("searchbox-select");
        cy.get(".search-input").type(search, { delay: 35 });
        cy.wait("@autocomplete");
        cy.get(".cmp-search-box .search-submit").click();

        // check for corrected search term
        cy.get(".product-list").find(".thumb-title").should("contain", "braun");
        cy.get(".categoriegrid").should("contain", "Keine Suchergebnisse für \"baum\" gefunden.");
        cy.get(".categoriegrid").should("contain", "Meinten Sie \"braun\"?");
    });

    it("Should link to the suggested search", () =>
    {
        const search = "baum";

        cy.server().route("GET", "/rest/io/item/search/autocomplete/**").as("autocomplete");

        cy.clickElement("searchbox-select");
        cy.get(".search-input").type(search, { delay: 35 });
        cy.wait("@autocomplete");
        cy.get(".cmp-search-box .search-submit").click();

        // check for corrected search term
        cy.get(".product-list").find(".thumb-title").should("contain", "braun");
        cy.get(".categoriegrid").should("contain", "Keine Suchergebnisse für \"baum\" gefunden.");
        cy.get(".categoriegrid").should("contain", "Meinten Sie \"braun\"?");

        cy.get("[href='?query=braun']").click();
        cy.location("pathname").should("eq", "/suche/");

        cy.get(".product-list").find(".thumb-title").should("contain", "braun");
    });
});
