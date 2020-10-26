// / <reference types="cypress" />
context("Header topbar currencies", () =>
{
    beforeEach(() =>
    {
        cy.visit("/");
    });

    it("should open and close basket preview on click", () =>
    {
        cy.get(".control-basket > a").should("exist");
        cy.get(".control-basket > a").click();

        cy.get("body").should("have.class", "basket-open");

        cy.get(".basket-preview-header").find(".close").click();
        cy.get("body").should("not.have.class", "basket-open");
    });

    it("should add item to basket preview", () =>
    {
        const itemUrl = "/wohnzimmer/sessel-sofas/loungesessel-herkules_116_1014/";

        cy.visit(itemUrl);


        cy.get(".add-to-basket-container > button").should("exist");
        cy.get(".add-to-basket-container > button").click();

        cy.get(".control-basket > a").should("exist");
        cy.get(".control-basket > a").click();

        cy.get("body").should("have.class", "basket-open");

        cy.get(".basket-item").should("exist");
    });

    it("should add item to basket and show correct price in header", () =>
    {
        const itemUrl = "/wohnzimmer/sessel-sofas/loungesessel-herkules_116_1014/";

        cy.visit(itemUrl);


        cy.get(".add-to-basket-container > button").should("exist");
        cy.get(".add-to-basket-container > button").click();

        cy.get(".control-basket > a").should("exist");
        cy.get(".control-basket > a").click();

        cy.get("body").should("have.class", "basket-open");

        cy.get(".basket-item").should("exist");

        cy.getByTestingAttr("totals-price").invoke("text").then((text) =>
        {
            const priceTotals = text.replace(/(\r\n|\n|\r|\s)/gm, "");

            cy.get(".toggle-basket-preview").invoke("text").then((text) =>
            {
                const previewButtonPriceTotals = text.replace(/(\r\n|\n|\r|\s)/gm, "");

                expect(priceTotals).to.eql(previewButtonPriceTotals);
            });
        });
    });
});
