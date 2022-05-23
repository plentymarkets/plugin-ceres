// / <reference types="cypress" />
context("prices", () =>
{

    const url1 = "/wohnzimmer/sessel-sofas/loungesessel-herkules_116_1014/";
    const url2 = "/testartikel/merkmale_145_1134/";

    it("should change the item price for b2b class", () =>
    {
        cy.visit(url1);
        cy.get(".price").should("contain", "0,70");
        cy.get(".crossprice").should("contain", "0,80");
        cy.login("bernd.business@plentye2etest.de", "Testuser1234");
        cy.reload();
        cy.get(".crossprice").should("contain", "0,61");
        cy.get(".price").should("contain", "0,53");

    });

    it.only("should change graduated prices for b2b customer", () =>
    {
        cy.login("bernd.business@plentye2etest.de", "Testuser1234");
        cy.visit(url1);
        cy.get(".graduated-prices-table").children().first().children().find(".graduated-price").should("contain", "0,38");
        cy.get(".graduated-prices-table").children().first().children().eq(2).find(".graduated-price").should("contain", "0,08");
    });

    it("should display netto price for b2b class", () =>
    {
        cy.login("bernd.business@plentye2etest.de", "Testuser1234");
        cy.visit(url1);
        cy.get(".price").should("contain", "0,53");
        cy.get(".crossprice").should("contain", "0,61");
    });

    it("should display brutto price for b2c class", () =>
    {
        cy.login("stefan.standard@plentye2etest.de", "Testuser1234");
        cy.visit(url1);
        cy.get(".price").should("contain", "0,70");
        cy.get(".crossprice").should("contain", "0,80");
    });

    it("should show dhl b2b shipping profile for b2b class", () =>
    {
        cy.login("bernd.business@plentye2etest.de", "Testuser1234");
        cy.addBasketItem("1014");
        cy.visit("/checkout/");
        cy.get(`[data-id="${8}"]`).should("exist");
    });

    it("should show correct price for dhl b2b profile", () =>
    {
        cy.login("bernd.business@plentye2etest.de", "Testuser1234");
        cy.addBasketItem("1014");
        cy.visit("/checkout/");
        cy.get(`[data-id="${8}"]`).find(".content").should("contain", "1,68");
    });

    it("should show shipping profiles for b2c class", () =>
    {
        cy.login("stefan.standard@plentye2etest.de", "Testuser1234");
        cy.addBasketItem("1014");
        cy.visit("/checkout/");
        cy.get(`[data-id="${8}"]`).should("not.exist");
    });

    it("should apply correct shipping price for item with postage (porto) for b2c", () =>
    {
        cy.login("stefan.standard@plentye2etest.de", "Testuser1234");
        // item with 10€ postage
        cy.addBasketItem("1031");
        cy.visit("/checkout/");
        cy.get(`[data-id="${7}"]`).should("contain", "10,00");

    });

    it("should apply correct shipping price for item with postage (porto) for b2b", () =>
    {
        cy.login("bernd.business@plentye2etest.de", "Testuser1234");
        // item with 10€ postage
        cy.addBasketItem("1031");
        cy.visit("/checkout/");
        cy.get(`[data-id="${7}"]`).should("contain", "8,40");

    });

    it("should display correct graduated prices at basket preview", () =>
    {
        cy.addBasketItem("1014", 5);
        cy.reload();
        cy.get(".control-basket > a").should("exist").scrollIntoView().click();
        cy.getByTestingAttr("item-sum").should("contain", "2,50");
    });

    // Eigenschaften / Merkmale / Order Properties

    it("should add correct price for radio button order property", () =>
    {
        cy.visit(url2);
        cy.getByTestingAttr("order-property-input-radio").eq(0).click();
        cy.get(".price").should("contain", "90,00");
        cy.getByTestingAttr("order-property-input-radio").eq(1).click();
        cy.get(".price").should("contain", "100,00");
        cy.getByTestingAttr("order-property-input-radio").eq(2).click();
        cy.get(".price").should("contain", "95,00");
    });

    it("should add correct price for multi checkbox button order property", () =>
    {
        cy.visit(url2);
        cy.getByTestingAttr("order-property-next-slide").click();
        cy.getByTestingAttr("order-property-input-checkbox").eq(0).click();
        cy.getByTestingAttr("order-property-input-checkbox").eq(1).click();
        cy.getByTestingAttr("order-property-input-checkbox").eq(2).click();
        cy.get(".price").should("contain", "105,00");
        cy.getByTestingAttr("order-property-input-checkbox").eq(1).click();
        cy.get(".price").should("contain", "100,00");

    });

    it("should add correct price for file upload order property", () =>
    {
        cy.visit(url2);
        cy.getByTestingAttr("order-property-next-slide").click().click().click().click();
        cy.fixture("test.png").then(fileContent =>
        {
            cy.getByTestingAttr("order-property-input-file").last().attachFile({
                fileContent: fileContent.toString(),
                fileName: "test.png",
                mimeType: "image/png"
            });
        });
        cy.get(".price").should("contain", "95,00");
    });

    it("should add correct price for selectbox order property", () =>
    {
        cy.visit(url2);
        cy.getByTestingAttr("order-property-next-slide").click().click().click().click();
        cy.getByTestingAttr("order-property-selection").eq(1).select("Option 1");
        cy.getByTestingAttr("order-property-selection").eq(1).should("contain", "Option 1");
        cy.get(".price").should("contain", "95,00");
    });

    it("should add correct price for text order property", () =>
    {
        cy.visit(url2);
        const value = "Lorem ipsum dolor sit amet consectetur adipisicing elit.";

        cy.getByTestingAttr("order-property-next-slide").click().click().click().click();
        cy.getByTestingAttr("order-property-input-text").last().type(value);
        cy.get(".price").should("contain", "95,00");
    });

    it("should add correct price for integer order property", () =>
    {
        cy.visit(url2);
        const value = 123;

        cy.getByTestingAttr("order-property-next-slide").click().click().click().click();
        cy.getByTestingAttr("order-property-input-int").last().type(value);
        cy.get(".price").should("contain", "95,00");
    });

    it("should add correct price for float order property", () =>
    {
        cy.visit(url2);
        const value = 1.23;

        cy.getByTestingAttr("order-property-next-slide").click().click().click().click();
        cy.getByTestingAttr("order-property-input-float").last().type(value);
        cy.get(".price").should("contain", "95,00");
    });
});
