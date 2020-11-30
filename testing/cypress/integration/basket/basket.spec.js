// / <reference types="cypress" />
context("Basket", () =>
{
    const ITEM_PRICE_NET = 0.59;
    const ITEM_PRICE = 0.70;
    const SHIPPING_COST_NET = 5.23;
    const SHIPPING_COST = 5.99;

    beforeEach(() =>
    {
        cy.addBasketItem(1014);
        cy.visit("/warenkorb");
        cy.location("pathname").should("eq", "/warenkorb/");
    });

    it("Should add an item to the basket", () =>
    {
        checkSums();
    });
    it.only("Should update the basket item quantity", () =>
    {
        cy.getByTestingAttr("quantity-btn-increase").click().click();
        cy.getByTestingAttr("quantity-btn-decrease").click();
        checkSums(2);
    });
    it("Should delete the basket item", () =>
    {
        cy.get("basket-item-delete").click();
        checkSums(0);
    });
    it("Should link to the correct single item", () =>
    {
        
    });
    // TODO move to own spec
    it("Should add coupon", () =>
    {});
    it("Should display the correct shipping costs", () =>
    {});

    function checkSums(itemQuantity = 1)
    {
        return true;
    }
});
