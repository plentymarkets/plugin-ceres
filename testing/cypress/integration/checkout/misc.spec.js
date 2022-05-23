context("Checkout misc", () =>
{
    const PRE_PAYMENT_ID = 6000;

    it("should show the info that the mail changed for user and hide it again after switching to original address", () =>
    {
        cy.login("mailchange@test.de");
        cy.addBasketItem(1014);
        cy.visit("/checkout/");
        cy.location("pathname").should("eq", "/checkout/");

        cy.intercept("PUT", "/rest/io/customer/address/**/?typeId=1").as("selectAddress");
        cy.getByTestingAttr("billing-address-select").click();
        cy.getByTestingAttr("billing-address-select-dropdown").find("li").eq(1).click();

        cy.wait("@selectAddress").then((res) =>
        {
            expect(res.response.statusCode).to.eql(200);
            cy.get(".mail-changed-info").should("contain", "Alle Informationen zum Auftrag werden an CHANGED@test.de gesendet. Ihr Login erfolgt weiterhin mit mailchange@test.de");
        });

        cy.intercept("PUT", "/rest/io/customer/address/**/?typeId=1").as("selectAddress");
        cy.getByTestingAttr("billing-address-select").click();
        cy.getByTestingAttr("billing-address-select-dropdown").find("li").eq(0).click();

        cy.wait("@selectAddress").then((res) =>
        {
            expect(res.response.statusCode).to.eql(200);
            cy.get(".mail-changed-info").should("not.exist");
        });
    });

    it("should not show the info that the mail changed for user if the mail didn't change", () =>
    {
        cy.login("mailchange@test.de");
        cy.addBasketItem(1014);
        cy.visit("/checkout/");
        cy.location("pathname").should("eq", "/checkout/");

        cy.get(".mail-changed-info").should("not.exist");
    });

    it("should not show the info that the mail changed for guest", () =>
    {
        cy.loginAsGuest();
        cy.addBasketItem(1014);
        cy.visit("/checkout/");
        cy.location("pathname").should("eq", "/checkout/");

        addAddress();

        cy.get(".mail-changed-info").should("not.exist");
    });

    it("should not show basket item consent checkbox if no basket item with property is in the basket", () =>
    {
        cy.login("mailchange@test.de");
        cy.addBasketItem(1014);
        cy.visit("/checkout/");
        cy.location("pathname").should("eq", "/checkout/");

        cy.getByTestingAttr("basket-item-consent-check").should("not.exist");
    });

    it("should show basket item consent checkbox if basket item with property is in the basket", () =>
    {
        cy.login("mailchange@test.de");
        cy.addBasketItem(1137);
        cy.visit("/checkout/");
        cy.location("pathname").should("eq", "/checkout/");

        cy.getByTestingAttr("basket-item-consent-check").should("exist");
    });

    it("should fail when basket item consent checkbox is required and not checked", () =>
    {
        cy.login("mailchange@test.de");
        cy.addBasketItem(1137);
        cy.visit("/checkout/");
        cy.location("pathname").should("eq", "/checkout/");

        cy.getByTestingAttr("basket-item-consent-check").should("exist");

        cy.get("input[id^=gtc-accept]").click();
        cy.getByTestingAttr("place-order").click();

        cy.get(".alert-danger").should("exist");
        cy.getByTestingAttr("basket-item-consent-check").parent().should("have.class", "error");
    });

    it("should work when basket item consent checkbox is required and checked", () =>
    {
        cy.login("mailchange@test.de");
        cy.addBasketItem(1137);
        cy.visit("/checkout/");
        cy.location("pathname").should("eq", "/checkout/");

        cy.getByTestingAttr("basket-item-consent-check").click();

        completeOrder();
    });

    function completeOrder()
    {
        cy.get(`[data-id='${PRE_PAYMENT_ID}']`).click();
        cy.get("input[id^=gtc-accept]").click();
        cy.getByTestingAttr("place-order").click();
        cy.location("pathname").should("eq", "/bestellbestaetigung/");
    }

    function addAddress()
    {
        // Force Modal
        cy.getByTestingAttr("billing-address-select-add").click({ force: true });

        cy.getByTestingAttr("billing-address-de-email-input").type("CHANGED@test.de", { delay: 40 });
        cy.getByTestingAttr("billing-address-de-name-inputs").find(`input[name="firstName"]`).type("Plenty", { delay: 40 });
        cy.getByTestingAttr("billing-address-de-name-inputs").find(`input[name="lastName"]`).type("Test");
        cy.getByTestingAttr("billing-address-de-street-inputs").find(`input[name="street"]`).type("Abby Road");
        cy.getByTestingAttr("billing-address-de-street-inputs").find(`input[name="housenumber"]`).type("1337");
        cy.getByTestingAttr("billing-address-de-zip").type("12345");
        cy.getByTestingAttr("billing-address-de-town").type("Kassel");
        cy.getByTestingAttr("modal-submit").first().click();
    }
});
