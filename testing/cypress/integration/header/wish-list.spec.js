// / <reference types="cypress" />
context("Header topbar wishlist", () =>
{
    beforeEach(() =>
    {
        cy.visit("/");
    });

    it("should check for wishlist", () =>
    {
        cy.get(".control-wish-list > a").should("exist");
        cy.get(".control-wish-list > a").click();
        cy.location("pathname").should("eq", "/wish-list/");
    });

    function addItemToWishList()
    {
        const itemUrl = "/wohnzimmer/sessel-sofas/loungesessel-herkules_116_1014/";

        const wishlistUrl = "/wish-list/";

        cy.visit(itemUrl);

        cy.server().route("POST", "/rest/io/itemWishList/").as("addToWishlist");

        cy.get(".widget-add-to-wish-list > button").should("exist");
        cy.get(".widget-add-to-wish-list > button").click();

        cy.wait("@addToWishlist");

        cy.get(".control-wish-list > a").scrollIntoView().should("exist").click();

        cy.location("pathname").should("eq", wishlistUrl);

        // check if there is an item in the wishlist
        cy.get(".basket-item").should("exist");
    }

    it("should add item to wishlist", () =>
    {
        addItemToWishList();
    });

    it("should remove item from wishlist", () =>
    {
        addItemToWishList();

        // delete item from wishlist
        cy.server().route("DELETE", "/rest/io/itemWishList/**").as("removeItem");
        cy.clickElement("remove-wlist-item");

        cy.wait("@removeItem").then((xhr) =>
        {
            expect(xhr.status).to.eql(200);
            cy.get(".basket-item").should("not.exist");
        });
    });

});
