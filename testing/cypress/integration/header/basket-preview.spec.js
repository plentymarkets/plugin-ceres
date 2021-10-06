// / <reference types="cypress" />
context("Basket preview", () =>
{
    const ITEM_PRICE_NET = 0.59;
    const ITEM_PRICE = 0.70;
    const SHIPPING_COST_NET = 5.03;
    const SHIPPING_COST = 5.99;

    beforeEach(() =>
    {
        cy.visit("/");
    });

    it("Should open and close basket preview on click", () =>
    {
        cy.getByTestingAttr("basket-preview-button").should("exist").scrollIntoView().click();

        cy.get("body").should("have.class", "basket-open");

        cy.get(".basket-preview-header").find(".close").click();
        cy.get("body").should("not.have.class", "basket-open");
    });

    it("Should add item to basket preview", () =>
    {
        const itemUrl = "/wohnzimmer/sessel-sofas/loungesessel-herkules_116_1014/";

        cy.visit(itemUrl);

        cy.get(".add-to-basket-container > button").click();

        cy.getByTestingAttr("basket-preview-button").click({ force: true });

        cy.get("body").should("have.class", "basket-open");

        cy.get(".basket-item").should("exist");
    });

    it("Should add item to basket and show correct price in header", () =>
    {
        const itemUrl = "/wohnzimmer/sessel-sofas/loungesessel-herkules_116_1014/";

        cy.visit(itemUrl);

        cy.get(".add-to-basket-container > button").click();

        cy.getByTestingAttr("basket-preview-button").click({ force: true });

        cy.get("body").should("have.class", "basket-open");

        cy.get(".basket-item").should("exist");

        cy.getByTestingAttr("item-sum").invoke("text").then((text) =>
        {
            const priceTotals = text.replace(/(\r\n|\n|\r|\s)/gm, "");

            cy.get(".toggle-basket-preview").invoke("text").then((text) =>
            {
                const previewButtonPriceTotals = text.replace(/(\r\n|\n|\r|\s)/gm, "");

                expect(priceTotals).to.eql(previewButtonPriceTotals);
            });
        });
    });

    it("Should add an item to the basket and show correct totals", () =>
    {
        cy.addBasketItem(1014);
        cy.reload();
        cy.getByTestingAttr("basket-preview-button").click();
        checkTotals();
    });

    it("Should update the basket item quantity", () =>
    {
        cy.addBasketItem(1014);
        cy.reload();
        cy.getByTestingAttr("basket-preview-button").click();
        cy.getByTestingAttr("quantity-btn-increase").click().click();
        cy.getByTestingAttr("quantity-btn-decrease").click();
        checkTotals(2);
    });

    it("Should delete the basket item", () =>
    {
        cy.addBasketItem(1014);
        cy.addBasketItem(1007);
        cy.reload();
        cy.getByTestingAttr("basket-preview-button").click();
        cy.getByTestingAttr("basket-item-delete").eq(1).click();
        checkTotals();
    });

    it("Should link to the correct single item", () =>
    {
        cy.addBasketItem(1014);
        cy.reload();
        cy.getByTestingAttr("basket-preview-button").click();
        cy.getByTestingAttr("basket-item-name")
            .should("have.attr", "href")
            .and("include", "/wohnzimmer/sessel-sofas/loungesessel-herkules_116_1014/");
        cy.getByTestingAttr("basket-item-name").click();
        cy.location("pathname").should("eq", "/wohnzimmer/sessel-sofas/loungesessel-herkules_116_1014/");
    });

    function checkTotals(itemQuantity = 1)
    {
        cy.getByTestingAttr("item-sum-net").should("contain", (ITEM_PRICE_NET * itemQuantity).toLocaleString("de"));
        cy.getByTestingAttr("item-sum").should("contain", (ITEM_PRICE * itemQuantity).toLocaleString("de"));
        cy.getByTestingAttr("shipping-amount-net").should("contain", SHIPPING_COST_NET.toLocaleString("de"));
        cy.getByTestingAttr("shipping-amount").should("contain", SHIPPING_COST.toLocaleString("de"));
        cy.getByTestingAttr("basket-amount-net").should("contain", (SHIPPING_COST_NET + ITEM_PRICE_NET * itemQuantity).toLocaleString("de"));
        cy.getByTestingAttr("vat-amount");
        cy.getByTestingAttr("basket-amount").should("contain", (SHIPPING_COST + ITEM_PRICE * itemQuantity).toLocaleString("de"));
    }
});
